import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - nuxt-firebase",
    title: "nuxt-firebase",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/firebase.ts", mode: "client" },
    { src: "~/plugins/liff.ts", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  router: {
    // '../router/index.ts': {}
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyDSJ-UKS-cZcT5SkTCh9na2admp-UwtHN4",
          authDomain: "nuxt-firebase-auth-6c26b.firebaseapp.com",
          databaseURL:
            "https://nuxt-firebase-auth-6c26b-default-rtdb.asia-southeast1.firebasedatabase.app/",
          projectId: "nuxt-firebase-auth-6c26b",
          storageBucket: "nuxt-firebase-auth-6c26b.appspot.com",
          messagingSenderId: "783600074081",
          appId: "1:783600074081:web:07976fb0b0f67c910c1920",
          measurementId: "G-G69JL6WLC5",
        },
        services: {
          auth: {
            persistence: "local", // default
            initialize: {
              onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
              onAuthStateChangedAction: "onAuthStateChangedAction",
              subscribeManually: false,
            },
            ssr: false,
          },
        },
      },
      "@nuxtjs/axios",
      "@nuxtjs/dotenv",
      '@nuxtjs/auth',
    ],
  ],

  auth: {
    strategies: {
      line: {
        _scheme: 'oauth2',
        authorization_endpoint: 'https://access.line.me/oauth2/v2.1/authorize',
        userinfo_endpoint: 'https://api.line.me/v2/profile',
        scope: ['profile', 'openid', 'email'],
        response_type: 'code',
        token_key: 'access_token',
        client_id: '2003517508',
        client_secret: '943a7d4f3afb547049878bea17e721e9',
        redirect_uri: 'https://bca9-2001-fb1-55-75c-1495-dc3a-1e68-9faf.ngrok-free.app',
      },
    },
  },

  axios: {
    baseURL: "/",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGEING_SENDER_ID: process.env.FIREBASE_MESSAGEING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIEBASE_MEASUREMENT_ID: process.env.FIEBASE_MEASUREMENT_ID,
    STRIPE_API_PUBLIC_KEY: process.env.STRIPE_API_PUBLIC_KEY,
    STRIPE_API_SECRET_KEY: process.env.STRIPE_API_SECRET_KEY,
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  serverMiddleware: ["~/server/index.ts"],
};
