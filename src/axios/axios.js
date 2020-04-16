import axios from 'axios'
import {
  Loading
} from 'element-ui';
axios.defaults.baseURL = '/api';
import ElementUI from 'element-ui';

let loading;
//进行懒加载
function startLoding(Loading) {
  loading = Loading.service({
    text: "拼命加载中!",
    lock: true,
    spinner: 'el-icon-loading'
  });
}

function endLoding() {
  loading.close()
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  startLoding(Loading)
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  endLoding()
  return response;
}, function (error) {
  // 对响应错误做点什么
  ElementUI.Message({
    message: error.response.statusText,
    type: 'error'
  });
  endLoding()
});

export default axios