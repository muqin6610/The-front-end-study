let url = require('url');

const db = require('./db.js')
exports.start = (req,res)=>{
}
// 登录注册处理
exports.login = (req,res)=>{
    let params = url.parse(req.url, true).query
    console.log(params)
    if(params.username === 'admin' && params.password === '123456') {
        res.send({
            success: true,
            message: '登录成功!',
            token: 'asfafsa16a51f6a51fa'
        })
    }else {
        res.send({
            success: false,
            message: '账户或密码错误!请重新输入!'
        })
    }
}
exports.register = (req,res)=>{
    console.log(req.body)
    res.send('测试')
}