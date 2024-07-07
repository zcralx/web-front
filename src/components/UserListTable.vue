<template>
  <h2>用户管理</h2>
  <el-row type="flex" justify="space-between">
    <el-col :span="6">
      <el-form-item>
        <el-button type="primary" plain @click="state.dialogVisible = true">+新建</el-button>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item>
        <el-input type="text" placeholder="请输入昵称" v-model="state.searchKeyword">
          <template v-slot:append>
            <el-button @click="searchByName">+搜索</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-dialog
      v-model="state.editDialogVisible"
      title="编辑用户"
      width="500"
      :before-close="handleClose"
  >
    <el-form :model="editingUserData" :rules="rules" ref="state.editForm">
      <el-form-item label="省份" prop="province">
        <el-select v-model="editingUserData.province" @change="handleProvinceChange">
          <el-option v-for="province in state.provinceOptions"
                     :key="province.value"
                     :label="province.label"
                     :value="province.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市区" prop="city">
        <el-select v-model="editingUserData.city">
          <el-option v-for="city in state.cityOptions"
                     :key="city.value"
                     :label="city.label"
                     :value="city.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address"><el-input v-model="editingUserData.address"></el-input></el-form-item>
      <el-form-item label="邮编" prop="zip"><el-input v-model="editingUserData.zip"></el-input></el-form-item>
      <el-form-item label="日期" prop="date"><el-date-picker v-model="editingUserData.date" type="date" placeholder="选择日期"></el-date-picker></el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEditForm">保存</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
      v-model="state.dialogVisible"
      title="新建用户"
      width="500"
      :before-close="handleClose"
  >
    <el-form :model="newUserData" :rules="rules" ref="state.newUserForm">
      <el-form-item label="姓名" prop="name"><el-input v-model="newUserData.name"></el-input></el-form-item>
      <el-form-item label="省份" prop="province">
        <el-select v-model="newUserData.province" @change="handleProvinceChange">
          <el-option
              v-for="province in state.provinceOptions"
              :key="province.value"
              :label="province.label"
              :value="province.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市区" prop="city">
        <el-select v-model="newUserData.city">
          <el-option
              v-for="city in state.cityOptions"
              :key="city.value"
              :label="city.label"
              :value="city.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address"><el-input v-model="newUserData.address"></el-input></el-form-item>
      <el-form-item label="邮编" prop="zip"><el-input v-model="newUserData.zip"></el-input></el-form-item>
      <el-form-item label="日期" prop="date"><el-date-picker v-model="newUserData.date" type="date" placeholder="选择日期"></el-date-picker></el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </div>
    </template>
  </el-dialog>
  <el-table v-loading="state.listLoading" :data="paginatedTableData" border fit highlight-current-row style="width: 100%;height: 400px">
    <el-table-column prop="id" label="序号" />
    <el-table-column prop="date" label="日期"/>
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="province" label="省份"/>
    <el-table-column prop="city" label="市区"/>
    <el-table-column prop="address" label="地址"/>
    <el-table-column label="邮编" prop="zip"/>
    <el-table-column label="操作" prop="work">
      <template v-slot:default="{ row }">
        <el-button type="text" size="small" @click="editRow(row)">编辑</el-button>
        <el-button type="text" size="small" style="color: red;" @click="deleteRow(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-container>
    <p>共{{ state.tableData.length }}条数据，该页共{{ paginatedTableData.length }}条数据</p>
    <el-pagination
        :total="state.tableData.length"
        :page-size="5"
        background
        :current-page="state.currentPage"
        @current-change="handlePageChange"
        layout="prev, pager, next"
    />
  </el-container>
</template>
<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import axios from "axios";
import { provinceAndCityData } from 'element-china-area-data';


const state = reactive({
  tableData: [],
  listLoading: false,
  searchKeyword: '',
  currentPage: 1,
  filterTableData: [],
  dialogVisible : false,
  newUserForm: ref(ElForm),
  editDialogVisible: false,
  editForm: ref(ElForm),
  cityOptions: [],
  provinceOptions: provinceAndCityData.map(province => ({ value: province.value, label: province.label })),
  selectedProvince: '',
  selectedCity: '',
})
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  province: [
    { required: true, message: '请输入省份', trigger: 'blur' }
  ],
  city: [
    { required: true, message: '请输入市区', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' }
  ],
  date: [
    { required: true, message: '请输入日期', trigger: 'blur' }
  ],
  zip: [
    { required: true, message: '请输入邮编', trigger: 'blur' }
  ]
}
const paginatedTableData = computed(() => {
  const start = (state.currentPage - 1) * 5
  const end = state.currentPage * 5
  return state.tableData.slice(start, end)
})
const handlePageChange = (newPage) => {
  state.currentPage = newPage
}
const handleProvinceChange = (value) => {
  state.selectedProvince = value;
  const selectedProvinceData = provinceAndCityData.find(province => province.value === value);
  if (selectedProvinceData) {
    state.cityOptions = selectedProvinceData.children.map(city => ({ value: city.value, label: city.label }));
    //ElMessage.success(`已选择 ${value}，城市列表为：${JSON.stringify(state.cityOptions)}`)
    state.selectedCity = '';
  }
}
const handleClose = function (done) {
  ElMessageBox.confirm('你确定要关闭对话框吗？')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}
const searchByName = () => {
  if (state.searchKeyword === '') {
    ElMessage.warning('请输入搜索内容')
    return
  }
  state.filterTableData = state.tableData.filter(item => {
    return item.name.includes(state.searchKeyword)
  })
  state.tableData = state.filterTableData
  ElMessage.success('搜索完成')
}
const newUserData = reactive({
  name: '',
  province: '',
  city: '',
  address: '',
  zip: '',
  date: ''
})
const getProvinceLabel = (value) => {
  const province = state.provinceOptions.find(province => province.value === value)
  return province ? province.label : ''
}
const getCityLabel = (value) => {
  const city = state.cityOptions.find(city => city.value === value)
  return city ? city.label : ''
}
const formatDateString = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}
const submitForm = () => {
  newUserData.province = getProvinceLabel(newUserData.province)
  newUserData.city = getCityLabel(newUserData.city)
  axios.post('http://localhost:8001/add', newUserData)
      .then(res => {
        if (res.data.code === 1) {
          state.tableData.push({
            id: state.tableData.length + 1,
            name: newUserData.name,
            province: newUserData.province,
            city: newUserData.city,
            address: newUserData.address,
            zip: newUserData.zip,
            date: formatDateString(newUserData.date)
          })
          ElMessage.success('添加成功')
          resetForm()
          state.dialogVisible = false
        } else {
          ElMessage.error('添加失败')
        }
      })
      .catch(err => {
        ElMessage.error('添加失败')
        console.log(err)
      })
}

function resetForm () {
  Object.keys(newUserData).forEach(key => {
    newUserData[key] = ''
  })
  state.cityOptions = []
  state.provinceOptions = provinceAndCityData.map(province => ({ value: province.value, label: province.label }))
}


let editingRowIndex = -1

const editingUserData = reactive({
  province: '',
  city: '',
  address: '',
  zip:'',
  date: ''
})
function editRow (row) {
  editingRowIndex = state.tableData.indexOf(row)
  editingUserData.province = row.province
  editingUserData.city = row.city
  editingUserData.address = row.address
  editingUserData.zip = row.zip
  editingUserData.date = row.date
  state.editDialogVisible = true
}
const submitEditForm = () => {
  editingUserData.province = getProvinceLabel(editingUserData.province)
  editingUserData.city = getCityLabel(editingUserData.city)
  axios.put(`http://localhost:8001/update/${state.tableData[editingRowIndex].id}`, editingUserData).then(response => {
    if (response.data.code === 1) {
      ElMessage.success('修改成功')
    } else {
      ElMessage.error('修改失败')
    }
  })
  state.tableData[editingRowIndex].province = editingUserData.province
  state.tableData[editingRowIndex].city = editingUserData.city
  state.tableData[editingRowIndex].address = editingUserData.address
  state.tableData[editingRowIndex].zip = editingUserData.zip
  state.tableData[editingRowIndex].date = formatDateString(editingUserData.date)
  state.currentPage = 1
  state.editDialogVisible = false
  resetEditForm()
}
function resetEditForm () {
  Object.keys(editingUserData).forEach(key => {
    editingUserData[key] = ''
  })
}
function deleteRow (row) {
  ElMessageBox.confirm('确定要删除该用户吗？', '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = state.tableData.indexOf(row)
    state.tableData.splice(index, 1)
    // 如果当前删除的是当前页的最后一行数据，且总数据量大于当前页数乘以每页数量，则向前翻一页
    if (index === state.tableData.length && state.tableData.length > state.currentPage * 5) {
      state.currentPage--
    }
    axios.delete(`http://localhost:8001/delete/${row.id}`).then(response => {
      if (response.data.code === 1) {
        ElMessage.success('用户删除成功')
      } else {
        ElMessage.error('用户删除失败')
      }
    })
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

onMounted(() => {
  // 确保在DOM渲染后执行
  setTimeout(() => {
    state.newUserForm.value = document.querySelector('.el-form')
  }, 0)
  axios.get('http://localhost:8001/init').then(res => {
    state.tableData = res.data.data
  })
})
</script>
<style scoped>
.el-container {
  position: fixed;
  bottom: 0;
  z-index: 100;
}
</style>
