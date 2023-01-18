import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const stripe = Stripe('pk_test_51MEZJPLfKONO35vsu4eZDVilCBbmKWKupxY781MnczHE5WKsgCuyb49CSQRopPw0PZzCmo17DhmxSOs127SqQQ7F00msnpAFKN');

createApp(App)
.use(store)
.use(router)
.use(stripe)
.mount('#app')
