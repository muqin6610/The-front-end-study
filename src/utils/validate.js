/**
* 常用正则验证
 */

/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,6})?$|^1(3|4|5|6|7|8|9)\d{9}$/g.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
* 特殊字符
*@param {*} s
 */
export function isSpecial(s) {
  return /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im.test(s)
}

/**
* 密码(只可以输入字母数字)
*@param {*} s
 */
export function isPassword(s) {
  return /^[A-Za-z0-9]+$/.test(s)
}

/**
* 身份证号（——15位一代身份证和18位二代身份证都包含在内
*@param {*} s
 */
export function isIDcard(s) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s)
}

/**
* QQ号码
*@param {*} s
 */
export function isQQnum(s) {
  return /^[1-9][0-9]{4,10}$/.test(s)
}

/**
* 微信号码
*@param {*} s
 */
export function isWXnum(s) {
  return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(s)
}

/**
* 车牌号码
*@param {*} s
 */
export function isLicensePlate(s) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(s)
}
