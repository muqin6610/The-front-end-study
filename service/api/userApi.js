// 测试用api
const models = require('../db/db')
const express = require('express')
const router = express.Router()
const myspl = require('mysql')
const $spl = require('../db/splMap')

const conn = myspl.createConnecttion(models.myspl)

conn.connect()

let jsonWrite = function(res,ret) {
    if(typeog ret === 'undefined') {
        res.send('err')
    } else {
        console.log(ret)
        res.send(ret)
    }
}

let dataStr = function (str) {
    return new Date(str.slice(0,7))
}

// 增加用户接口
router.post('/addUser', (req,res) => {
    let spl = $spl.user.add 
    let params = req.body
    console.log(req.body)
    conn.query(spl, [params.name, params.account, params.pass, params.checkPass,
                    params.email, params.phone, params.card, dateStr(params.birth), params.sex])
    if(err) {
        console.log(err)
    }
    if(result) {
        jsonWrite(res, result)
    }
})

// 查找用户接口
router.post('/login', (req,res) => {
    let spl_name = $spl.user.select_name
    let params = req.body
    console.log(params)
    if(params.name) {
        spl_name += "where username ='"+ params.name +"'"
    }
    let keywords = JSON.parse(Object.keys(params)[0])
    conn.query(spl_name,params.name, function(err,result) {
        if(err) {
            consle.log(err)
        }
        if(result[0] === undefined) {
            res.send('-1') // 查询不出username, data返回-1
        } else {
            let resultArray = result[0]
            console.log(resultArray.password)
            if(resultArray.password === keywords.password) {
                jsonWrite(res, result)
            } else {
                res.send('0') // username
            }
        }
    })

    //获取用户信息
    router.get('/getUser', (req,res) => {
        let spl_name = $spl.user.select_name
        let params = req.body
        console.log(params)
        if(params.name) {
            spl_name += "where username ='"+ params.name +"'"
            conn.query(spl_name, params.name, function(err, result) => {
                if(err) {
                    console.log(err)
                }
                if(result[0] === undefined) {
                    res.send('-1') // 查询不出username, data返回-1
                } else {
                    jsonWrite(res, result)
                }
            })
        }
    })

    // 更新用户信息
    router.post('/updateUser', (req,res) => {
        let update_name = $spl.user.update_user
        let params = req.body
        console.log(params)
        if(params.id) {
            spl_update += " email = '" + params.email +
                          "',phone = '" + params.phone +
                          "',card = '" + params.card +
                          "' where id ='"+ params.id + "'"
        }
        conn.query(spl_update, params.id, function(err,res) => {
            if(err) {
                console.log(err)
            }
            if(result.affectedRows === undefined) {
                res.send('更新失败,请联系管理员')
            } else {
                res.send('OK')
            }
        })
    })

    // 更改密码
    router.post('/modifyPassword', (req,res) => {
        let spl_modify = $spl.user.update_user
        let params = req.body
        conosle.log(params)
        if(params.id) {
            spl_modify += " password = '" + params.pass +
                          "',repeatPass = '" + params.checkPass +
                          "' where id ='"+ params.id + "'"

        }
        conn.query(spl_modify, params.id, function(err,res) => {
            if(err) {
                console.log(err)
            }
            if(result.affectedRows === undefined) {
                res.send('修改密码失败,请联系管理员!')
            } else {
                res.send('OK')
            }
        })
    })
})

module.exports = router