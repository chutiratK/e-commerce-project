import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => ({
    user: false,
    isCartOpen: false,
});

export const mutations = {
    ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
        if (authUser) {
            const { uid, email, emailVerified } = authUser;
            state.user = { uid, email, emailVerified };
        } else {
            state.user = false;
        }
    },
    setUser(state, user) {
        state.user = user;
    },
    toggleCart(state) {
        state.isCartOpen = !state.isCartOpen;
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