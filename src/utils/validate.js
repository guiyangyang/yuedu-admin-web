/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function valiteText_r (rule, value, callback) {
  if (!value) {
    callback(new Error('不能为空'));
  } else {
    callback();
  }

}
export function valiteNum_r (rule, value, callback) {
  let numReg = /^[0-9]$/g;
  if (!value) {
    callback(new Error('不能为空'));
  } else if (!numReg.test(value)) {
    callback(new Error('请输入数字'));
  } else {
    callback();
  }
}
export function valitUrl_r (rule, value, callback) {
  let urlReg = /^(http)/;
  if (!value) {
    callback(new Error('不能为空'));
  } else if (!urlReg.test(value)) {
    callback(new Error('请输入正确的网址'));
  } else {
    callback();
  }
}
