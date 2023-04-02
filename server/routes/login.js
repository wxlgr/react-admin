const express = require('express')
const router = express.Router()
const sqlFn = require('../mysql')
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')


router.post('', (req, res, next) => {
    const sql = 'select * from user where account=? and pwd=?'
    let { account, password } = req.body
    password = CryptoJs.AES.decrypt(password, '12345678').toString(CryptoJs.enc.Utf8)

    sqlFn(sql, [account, password], (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data && data.length) {

            // 生成token,jwtSecret为签名
            const token = jwt.sign({
                account: data[0].account,
                nickName:data[0].name//用户名昵称
            }, jwtSecret)

            res.send({
                code: '00000',
                message: '登录成功',
                token
            })
        } else {
            res.send({
                code: '-1',
                message: '登录失败'
            })
        }

    })
})

module.exports = router