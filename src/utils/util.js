/**
* 项目常用的JS方法封装
 */

/**
* 判断一个值的数据类型
*@param 任意值
*@return 返回对应的数据类型
 */
export function type(para) {
  return Object.prototype.toString.call(para).slice(8,-1)
}


/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj == 'object')) {
    return;
  }

  for ( var key in obj) {
    if (obj.hasOwnProperty(key)
      && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
      delete obj[key];
    }
  }
  return obj;
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if (arguments.length === 1) {
    let [length] = arguments
  // 生成指定长度的随机数字，首位一定不是 0
    let nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (arguments.length >= 2) {
    let [min, max] = arguments
    return random(min, max)
  } else {
    return Number.NaN
  }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
  if (!length) length = 1
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let str = ''
  for (let i = 0; i < length; i++) {
    let num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase(string){
  return string.replace( /_([a-z])/g, function( all, letter ) {
    return letter.toUpperCase();
  });
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
  let chats = '0123456789abcdef'
  return randomString(32, chats)
}

/**
* 冒泡排序(升序)
*@param Array 需要排序的数组
*@return Array 排序完成的数组
 */
export function bubbleAsSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

/**
* 冒泡排序(降序)
*@param Array 需要排序的数组
*@return Array 排序完成的数组
 */
export function bubbleDeSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

/**
* 数组去重
*@param Array 需要去重的数组
*@return Array 去重完成的数组
 */
export function arrDemp(arr) {
  let newArr = [];
  let m = {};
  for (let i = 0; i < arr.length; i++) {
    let n = arr[i];
    if (m[n]) {
    } else {
      newArr.push(arr[i]);
      m[n] = true;
    }
  }
  return newArr;
}

/**
* 数组对象去重
*@param objArr 需要去重的数组对象
*@param para 将要进行去重的字段(String类型)
*@return objArr 去重完成的数组对象
 */
export function objArrDemp(objArr, para) {
  let result = [];
    let temp = {};
    for (let i = 0; i < objArr.length; i++) {
        let parameter = objArr[i][para];
        if (temp[parameter]) {
            continue;//不继续执行接下来的代码，跳转至循环开头
        }
        temp[parameter] = true;//为temp添加此属性（parameter）且将其值赋为true
        result.push(objArr[i]);//将这一项复制到结果数组result中去
    }
    return result;
}

/**
* 数字超过9显示省略号
*@param number 
*@return  超过9返回省略号,否则返回原数字
 */
export function num_filter(num) {
  num = num ? num - 0 : 0;
  if (num > 9 ) {
    return "…"
  }else{
    return num;
  }
}

/**
* 数字超过99显示99+
*@param number 
*@return  超过99返回99+,否则返回原数字
 */
export function ninenum_filter(num) {
  num = num ? num - 0 : 0;
  if (num > 99 ) {
    return "99+"
  }else{
    return num;
  }
}

/**
* 银行卡号分割
*@param number 银行卡号
*@return string 分割完成的银行卡号
 */
export function bank_filter(val) {
  val += '';
  console.log(val)
  val = val.replace(/(\s)/g,'').replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'');
  return val;
}

/**
* 字符替换
*@param str 表示将要替换的字符串
*@param l 表示你将要替换的字符
*@param r 表示你想要替换的字符
*@return string 替换完成的字符串 
 */
export function transFormat(str, l, r) {
  let reg = new RegExp(l, 'g') // g表示全部替换，默认替换第一个
  str = str.replace(reg, r)
  return str
}