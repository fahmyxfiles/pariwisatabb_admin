import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
    // You can add your headers here
    // ================================
    baseURL: 'http://server.mymoments.web.id:8000/api/',
    // timeout: 1000,
    headers: {'Accept': 'application/json'}
})

// Set the AUTH token for any request
axiosIns.interceptors.request.use(function(config) {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

Vue.prototype.$http = axiosIns

export default axiosIns