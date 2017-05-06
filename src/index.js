import Vue from 'vue'
import App from './app.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import './index.less';
import { Toast } from 'mint-ui';

new Vue({
	el: '#app',
	mounted(){
		Toast("yyy");
	},
	render: h => h(App)
})
