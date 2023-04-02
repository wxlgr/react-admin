const express=require('express')
const app =express();

// 上传文件
const multer  = require('multer')

// body参数解析
const bodyParser=require('body-parser')
app.use(bodyParser.json())


const login = require('./routes/login');
app.use('/api/login', login)

const {validIsLogin} = require('./middleware');
// //注册授权中间件
app.use(validIsLogin)



//静态文件夹
app.use(express.static('./data'))



// 配置路由
const useRouterFn=require("./routes/index")
useRouterFn(app)


//cors 解决跨域
const cors = require("cors")
app.use(cors)


app.use((err,req,res,next)=>{
    console.info(err.stack)
    res.status(500).send('服务器端出错')
})

app.listen(3030,()=>{
    console.log("server running at http://localhost:3030");
})