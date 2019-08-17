import reqwest from 'reqwest';
import { Toast } from 'antd-mobile'

export default (e, backFn, errFn) => { // Promise 和 回调都可以
  if (!e) return errFn ? errFn('请配置参数') : '';
  // return
  return new Promise(function (resolve, reject) {
    try {
      reqwest({
        url: e.url,
        method: e.method ? e.method : 'get', // post
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data: e.data ? e.data : undefined,
        success: (data) => {
          if (data && data.result && data.result === 'succeed') {
            if (backFn) {
              backFn(data.data);
            }
            if (resolve) {
              resolve(data.data);
            }
          } else {
            Toast.fail(`请求失败:${data.message}`, 1);
            if (reject) {
              reject(data);
            }
            if (errFn) {
              errFn(data);
            }
          }
        },
        error: (err) => {
          Toast.fail(`请求失败:${err}`, 1);
          if (reject) {
            reject(err);
          }
          if (errFn) {
            errFn(err);
          }
        },
      });
    } catch (error) {
      if (reject) {
        reject(error);
      }
    }
  });
}