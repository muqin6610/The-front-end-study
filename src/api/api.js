import axios from "axios"

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function getApi(url, params = {} ) {
    return new Promise((resolve, reject) => {
	  axios.get(url,{params}).then(res => {
	    resolve(res.data)
	  }).catch(err => {
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
 export function deleteApi(url, params = {} ) {
     return new Promise((resolve, reject) => {
      axios.delete(url, {
       params:params
      })
      .then(res => {
          resolve(res.data)
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
 export function postApi(url, data ) {
    return new Promise((resolve, reject) => {
	  axios.post(url, data).then(res => {
	    resolve(res.data)
	  }).catch(err => {
	    reject(err)
	  })
	})
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function putApi(url, data ) {
    return new Promise((resolve, reject) => {
	  axios.put(url, data).then(res => {
	    resolve(res.data)
	  }).catch(err => {
	    reject(err)
	  })
	})
}
