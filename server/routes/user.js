const express = require('express')
const router = express.Router()
const sqlFn = require('../mysql')
const remove = require('lodash/remove')
const { nanoid } = require('nanoid')
const CryptoJs = require('crypto-js')

router.post('/add', (req, res, next) => {
    const sql = `select * from user where locate(?,account)>0`
    sqlFn(sql, [req.body.account], (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data && data.length) {//已有记录
            res.send({ code: '-1', message: '该账号已存在' })
        } else {
            const sql = 'insert into user values (null,?,?,?,?,?,?,null,?)'
            const { name, account, area, tel, email, pic } = req.body
            // 随机产生8位临时密码
            const pwd = nanoid(8);
            
            sqlFn(sql, [name, account, area, tel, email, pic, pwd], (err, data) => {
                if (err) {
                    next(err)
                    return
                }
                if (data.affectedRows) {
                    res.send({
                        code: '00000',
                        success: true
                    })
                }
            })
        }
    })
})


router.get('/list', (req, res, next) => {
    const { query } = req
    const { current = 1, pageSize = 3, name } = query

    const sql = `select count(*) as num from user ${name ?
        'where locate(?,name)>0' : ''}`;
    sqlFn(sql, [name], (err, data) => {
        if (err) {
            next(err)
            return
        }
        const total = data[0].num

        const sql2 = `select * from user ${req.query.name ? 'where locate(?,name)>0' : ''} 
        limit ${pageSize * (current - 1)},${pageSize}`//条件过滤
        sqlFn(sql2, [name], (err, data) => {
            if (err) {
                next(err)
                return
            }
            res.send({
                code: '00000',
                records: data,
                pagination: { total, pageSize }
            })
        })
    })

})

//编辑更新
router.post('/update', (req, res, next) => {
    const sql = 'update user set name=?,account=?,area=?,tel=?,email=?,pic=? where id=?';
    const { name, account, area, tel, email, pic, id } = req.body
    const arr = [name, account, area, tel, email, pic, id]
    sqlFn(sql, arr, (err, data) => {
        console.log(data);
        if (err) {
            next(err)
            return
        }

        if (data.affectedRows) {
            res.send({
                code: '00000',
                success: true
            })
        }


    })
})

//删除
router.post('/delete', (req, res, next) => {
    const sql = 'delete from user where id=?'
    sqlFn(sql, [req.body.id], (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data.affectedRows) {
            res.send({
                code: '00000',
                success: true
            })
        }
    })
})

router.get('/relateMenus', (req, res, next) => {
    const sql = `select * from menu where isOfAdmin=2`;
    sqlFn(sql, [], (err, data) => {
        if (err) {
            return next(err)
        }
        const getMenuTree = ((menus = []) => {
            menus.map(item => {
                menus.map(menu => {
                    if (item.pid == menu.id) {
                        menu.children = menu.children || []
                        menu.children.push(item)
                    }
                })
            })
            remove(menus, (menu => menu.pid != -1))//去除非顶级菜单

            return menus
        })

        res.send({
            code: '00000',
            records: getMenuTree(data)
        })
    })
})


router.post('/updateRelatedMenus', (req, res, next) => {
    const sql = 'update user set relatedMenus=? where id=?';
    const { relatedMenus, id } = req.body
    const arr = [relatedMenus, id]
    sqlFn(sql, arr, (err, data) => {
        console.log(data);
        if (err) {
            next(err)
            return
        }

        if (data.affectedRows) {
            res.send({
                code: '00000',
                success: true
            })
        }


    })
})


module.exports = router