// index.js
import 'babel-polyfill';
// 需 npm i vue --save
import Vue from 'vue';
import App from './App.vue'
import './icons'
// 入口文件main.js中引入
import 'amfe-flexible/index.js'



new Vue({
    el: '#app',
    render: h => h(App),
});