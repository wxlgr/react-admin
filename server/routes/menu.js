const express = require('express')
const router = express.Router()
const sqlFn = require('../mysql')
const remove = require('lodash/remove')

//新增
router.post('/add', (req, res, next) => {
    const sql = 'insert into menu values (null,?,?,?,?,?,?)';
    const { pid = -1, name, linkUrl, openType, icon, isOfAdmin } = req.body

    const arr = [pid, name, linkUrl, openType, icon, isOfAdmin]
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
//编辑更新
router.post('/update', (req, res, next) => {
    const sql = 'update menu set name=?,linkUrl=?,openType=?,icon=?,isOfAdmin=? where id=?';
    const { name, linkUrl, openType, icon, isOfAdmin, id } = req.body
    const arr = [name, linkUrl, openType, icon, isOfAdmin, id]
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

    const sql = 'select * from menu where pid=?';//有无子菜单
    sqlFn(sql, [req.body.id], (err, data) => {
        console.log(data);
        if (err) {
            next(err)
            return
        }
        if (data && data.length) {
            res.send({
                code: '-1',
                message: "该菜单不能直接删除，请先删除它的子菜单！"
            })
        } else {
            const sql = 'delete from menu where id=?'

            sqlFn(sql,[req.body.id], (err, data) => {
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


//菜单列表
router.get('/list', (req, res, next) => {
    const sql = 'select * from menu'
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err)
            return
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

//菜单名称
router.get('/getMenuName', (req, res, next) => {
    const sql = 'select * from menu where id=?';
    console.log("req", req);
    sqlFn(sql, [req.query.id], (err, data) => {
        if (err) {
            next(err)
            return
        }
        res.send({
            code: '00000',
            record: data[0]
        })
    })
})

module.exports = router
