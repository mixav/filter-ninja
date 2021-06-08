import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import firebase from "firebase/app";

// import "firebase/analytics";
import "firebase/firestore"

import router from './router'
import store from './store'

const firebaseConfig = {
    apiKey: "AIzaSyDJ6op13XjY_1UpIo7WYBnagztBHDkxP8k",
    authDomain: "ninja-filter.firebaseapp.com",
    databaseURL: "https://ninja-filter.firebaseio.com",
    projectId: "ninja-filter",
    storageBucket: "ninja-filter.appspot.com",
    messagingSenderId: "90019705706",
    appId: "1:90019705706:web:f7b975857695f7f0456b13",
    measurementId: "G-53K86PRQ5R"
};

firebase.initializeApp(firebaseConfig);
const fb = firebase.firestore()
// firebase.analytics();

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(firebase)

export {
    fb
}
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
