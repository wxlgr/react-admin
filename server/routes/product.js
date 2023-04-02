const express = require('express')
const router = express.Router()
const sqlFn = require('../mysql')

router.post('/add', (req, res, next) => {

    const sql = 'insert into product values (null,?,?,?,?,?,?,?,?)'
    const { name, type, attrs, mainPic, morePic, isOnShelf, price, desc } = req.body
    sqlFn(sql, [name, type, attrs, mainPic, morePic, isOnShelf, price, desc], (err, data) => {
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


router.get('/list', (req, res, next) => {
    const { query } = req
    const { current = 1, pageSize = 3, name,type} = query

    const sql = `select count(*) as num from product 
    where ${name ? 'locate(?,name)>0' : 'name is not null'}
    and ${type ? 'locate(?,type)>0' : 'type is not null'} `
    sqlFn(sql, [name,type], (err, data) => {
        if (err) {
            next(err)
            return
        }
        const total = data[0].num

        const sql2 = `select * from product 
        where ${name ? 'locate(?,name)>0' : 'name is not null'}
        and ${type ? 'locate(?,type)>0' : 'type is not null'} limit ${pageSize * (current - 1)},${pageSize}`//条件过滤

        sqlFn(sql2, [name,type], (err, data) => {
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
    const sql = 'update product set `name`=?,`type`=?,`attrs`=?,`mainPic`=?,`morePic`=?,`isOnShelf`=?,`price`=?,`desc`=? where `id`=?';
    const { name, type, attrs, mainPic, morePic, isOnShelf, price, desc,id} = req.body
    const arr = [name, type, attrs, mainPic, morePic, isOnShelf, price, desc,id]
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
    const sql = 'delete from product where id=?'
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




module.exports = router