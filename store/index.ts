import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  isLineUser: boolean;
}

// interface PaymentInfo {
//   products: any[];
//   shippingAddress: any;
//   totalAmount: number;
// }
export const state = () => ({
  user: false,
});

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (
    state: { user: any },
    { authUser, claims }: any
  ) => {
    if (authUser) {
      const { uid, email, emailVerified } = authUser;
      state.user = {
        uid,
        email,
        emailVerified,
      };
    } else {
      state.user = false;
    }
  },
};
