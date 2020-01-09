import axios from "axios"

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function httpGet(url, params ) {
     return new Promise ((resolve, reject) => {
         axios.get(url, {
             params:params
         })
         .then(response => {
             resolve(response.data)
         })
         .catch(err => {
             reject(err)
         })
     })
 }

/**
 * 封装delete方法
 * @param url
 * @param delete
 * @returns {Promise}
 */
 export function httpDelete(url, params ) {
     return new Promise ((resolve, reject) => {
         axios.delete(url, {
             params:params
         })
         .then(response => {
             resolve(response.data)
         })
         .catch(err => {
             reject(err)
         })
     })
 }

 /**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function httpPost(url, data ) {
     return new Promise((resolve,reject) => {
         axios.post(url, data)
              .then(response.data)
     },err => {
         reject(err)
     })
 }

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function httpPut(url, data ) {
     return new Promise((resolve, reject) => {
         axios.put(url, data)
              .then(response.data)
     },err => {
         reject(err)
     })
 }
