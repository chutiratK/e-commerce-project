// import Vue from "vue";
// import Vuex from "vuex";
// import liff from "@line/liff";

// Vue.use(Vuex);

// export const state = () => ({
//   user: false,
// });

// export const mutations = {
//   ON_AUTH_STATE_CHANGED_MUTATION: (
//     state: { user: any },
//     { authUser, claims }: any
//   ) => {
//     if (authUser) {
//       const { uid } = authUser;
//       state.user = {
//         uid,
//       };
//     } else if (liff.isLoggedIn()) {
//       liff
//         .init({ liffId: "2003517508-8gKpw6JQ" })
//         .then(async () => {
//           const uid = (await liff.getProfile()).userId;
//           state.user = {
//             uid,
//           };
//           console.log("uid", uid);
//         })
//         .catch((error) => {
//           console.error("Error initializing LIFF: ", error);
//         });
//     } else {
//       state.user = false;
//     }
//   },
// };

import Vue from "vue";
import Vuex from "vuex";
import { Commit } from "vuex";
import liff from "@line/liff";

Vue.use(Vuex);

export const state = () => ({
  user: false,
});

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (
    state: { user: any },
    { authUser, claims }: any
  ) => {
    if (authUser) {
      const { uid } = authUser;
      state.user = {
        uid,
      };
    }
  },
  SET_USER: (state: { user: any }, payload: { uid: string }) => {
    state.user = {
      uid: payload.uid,
    };
  },
};

export const actions = {
  async fetchUser({ commit }: { commit: Commit }) {
    if (liff.isLoggedIn()) {
      try {
        await liff.init({ liffId: "2003517508-8gKpw6JQ" });
        const uid = (await liff.getProfile()).userId;
        commit("SET_USER", { uid });
        console.log("uiddddddd", uid);
      } catch (error) {
        console.error("Error initializing LIFF: ", error);
      }
    }
  },
  async onAuthStateChangedAction(
    { commit }: { commit: Commit },
    { authUser, claims }: any
  ) {
    commit("ON_AUTH_STATE_CHANGED_MUTATION", { authUser, claims });
  },
};
