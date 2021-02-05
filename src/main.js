import {createApp} from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';

const app = createApp(App);
app.use(VeeValidate, {
    classes: true,
    classNames: {
        valid: "is-valid",
        invalid: "is-invalid"
    }
});
app.mount('#app');
