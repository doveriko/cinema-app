import axios from 'axios';

export default {
    state() {
        return {
            offsiteProducts: [],
        };
    },
    actions: {
        async loadOffsiteProducts(context) {
            await axios
                .get(process.env.VUE_APP_API_URL + "/offsiteproducts")
                .then((response) => {
                    let allOffsiteProducts = []
                    allOffsiteProducts = response.data
                    context.commit('loadOffsiteProducts', allOffsiteProducts)
                })
                .catch((err) => console.log(err));                
        }
    },
    mutations: {
        loadOffsiteProducts(state, payload) {
            state.offsiteProducts = payload
        },
    },
    getters: {
        allOffsiteProducts(state) {
            return state.offsiteProducts;
        }
    }
};