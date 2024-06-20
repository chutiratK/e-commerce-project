import Vue from "vue";

declare module "*.vue" {
  export default Vue;
}

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $axios: any;
    Stripe: any;
  }
}
