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
    return "…";
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
    return "99+";
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
  let reg = new RegExp(l, 'g'); // g表示全部替换，默认替换第一个
  str = str.replace(reg, r);
  return str;
}

/**
*返回yyyy-mm-dd hh:mm:ss日期格式
*@param new Date() 日期
*@return json: ymdhms: yyy-mm-dd hh:mm:ss, yyyy-mm-dd h:m, yyyy-mm-dd, mm-dd, hh:mm:ss, hh:mm,
*yyyy年mm月dd日 hh:mm:ss, ymd: yyyy年mm月dd日, mm月dd日
 */
export function dateFormat(D) {
  let date = new Date(D);
  let year = date.getFullYear();
  // 日期格式中月份是从0开始因此要加上1
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return {
    ymdhms: year + "-"+ month + "-" + day + " " + hours + ":" + minutes + ":" + seconds,
    ymdhm: year + "-" + month + "-" + day + " " + hours + ":" + minutes,
    ymd: year + "-" + month + "-" + day,
    md: month + "-" + day,
    hms: hours + ":" + minutes + ":" + seconds,
    hm: hours + ":" + minutes,
    ymdhmsCN: year + "年" + month + "月" + day + "日" + " " + hours + ":" + minutes + ":" + seconds,
    ymdCN: year + "年" + month + "月" + day + "日",
    mdCN: month + "月" + day + "日",
    y: year,
    m: month,
    d: day
  };
}

/**
*深克隆
*@param object: 需要克隆的对象{}
*@return object: 克隆后的对象
 */
export function deepClone(obj, hash = new WeakMap()) {
    let target = null;
    // 判断是否为null
    if (obj === null) return null;
    // 设置hash表，判断是否是循环引用
    if (hash.has(obj)) return hash.get(obj);
    // 判断Symbol
    let symKeys = Object.getOwnPropertySymbols(obj);
    if (symKeys.length) {
        symKeys.forEach(symKey =>{
            if (typeof obj[symKey] === 'object') {
                target[symKey] = deepClone(obj[symKey], hash);
            } else {
                target[symKey] = obj[symKey];
            }
        });
    }
    // 判断是否是对象，如果不是对象，则直接返回，如果是对象，则继续执行
    if (typeof obj === 'object' || typeof obj === 'function') {
        let result;
        hash.set(obj, target);
        let objType = Object.prototype.toString.call(obj);
        switch (objType) {
        case '[object Object]':
            target = {};
            break;
        case '[object Array]':
            target = [];
            break;
        case '[object Map]':
            // 处理Map对象
            result = new Map();
            obj.forEach((value, key) =>{
                result.set(key, deepClone(value, hash))
            }) 
            return result
            break;
        case '[object Set]':
            // 处理Set对象
            obj.forEach((value) =>{
                result.add(deepClone(value, hash))
            }) 
            return result
            break;
        case '[object Date]':
            // 处理Date对象
            return new Date(obj)
            break;
        default:
            // 直接返回正则、函数
            return obj;
            break;
        }
    } else {
        // 不是对象的情况
        return obj;
    }
    for (var key in obj) {
        if (typeof obj[key] === 'object') {
            target[key] = deepClone(obj[key], hash);
        } else {
            target[key] = obj[key];
        }
    }
    return target;
}

/**
*防抖函数(立即执行版)
*@param function
*@param number
 */
export function debounce(fn, time = 200) {
    if (typeof fn !== 'function') {
        throw Error('fn必须是一个函数')
    };
    let timer;
    return function() {
        let context = this;
        let args = arguments;
        if(timer) clearTimeout(timer);
        let callNow = !timer;
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, time);
        if (callNow) fn.apply(context, args);
    }
}

/**
*防抖函数
*@param function
*@param number
 */
export function throttle(fn, time = 200) {
    if (typeof fn !== 'function') {
        throw Error('fn必须是一个函数')
    };
    let timer;
    return function() {
        let context = this;
        let args = arguments;
        if(!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(context, args);
            }, time);
        }
    }
}