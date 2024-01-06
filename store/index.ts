import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
}

interface PaymentInfo {
    products: any[]; 
    shippingAddress: any; 
    totalAmount: number;
}
export const state = () => ({
    user: false,
    isCartOpen: false,
    paymentInfo: {
        products: [],
        shippingAddress: {},
        totalAmount: 0,
    } as PaymentInfo,
});
  
export const mutations = {
    ON_AUTH_STATE_CHANGED_MUTATION: (state: { user: any; }, { authUser, claims }: any) => {
        if (authUser) {
            const { uid, email, emailVerified } = authUser;
            state.user = { uid, email, emailVerified };
        } else {
            state.user = false;
        }
    },
    setUser(state: { user: any; }, user: any) {
        state.user = user;
    },
    toggleCart(state: { isCartOpen: boolean; }) {
        state.isCartOpen = !state.isCartOpen;
    },
    setPaymentInfo(state: { paymentInfo: PaymentInfo }, payload: PaymentInfo) {
        state.paymentInfo = payload;
    },
    
};

// const actions = {
//     onAuthStateChangedAction : (ctx, {authUser, claims}) => {
//         if (!authUser) {
//             ctx.commit('SET_USER', null)

//             this.$router.push({
//                 path: '/auth/signin',
//             })
//         } else {
//           // Do something with the authUser and the claims object...
//           const { uid, email } = authUser
//           ctx.commit('SET_USER', { uid, email, })
//         }
//     },

// } 

// const mutations = {
//     SET_USER(ctx, user) {
//         ctx.user = user
//     },
// }

// const ctx = () => ({
//     user: null,
// })

// const getters = {
//     getUser(ctx) {
//         return ctx.user
//     },
// }

// export default {
//     ctx, 
//     actions,
//     mutations,
//     getters,
// }