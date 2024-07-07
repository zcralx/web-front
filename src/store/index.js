import { createStore } from 'vuex'

export default createStore({
    state: {
        bgColor: 'cornflowerblue',
        pColor: '#A4D7E8'
    },
    getters: {
        getBgColor (state) {
            return state.bgColor
        },
        getPColor (state) {
            return state.pColor
        }
    },
    mutations: {
        SET_BGCOLOR (state, newColor) {
            state.bgColor = newColor
        },
        SET_PCOLOR (state, newColor) {
            state.pColor = newColor
        }
    },
    actions: {
        updateBgColor ({ commit }, newColor) {
            commit('SET_BGCOLOR', newColor)
        },
        updatePColor ({ commit }, newColor) {
            commit('SET_PCOLOR', newColor)
        }
    },
    modules: {
    }
})
