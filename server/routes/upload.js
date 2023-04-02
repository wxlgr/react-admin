const express = require('express')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/upload')
    },
    filename: function (req, file, cb) {

        // cb(null, Date.now() + '_' + file.originalname)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('', upload.single('file'), function (req, res, next) {
    const { file } = req;
    console.log('file'.file);
    res.send({
        code: '00000',
        file: { url: file.path.split('data')[1] }
    })

})


module.exports = router