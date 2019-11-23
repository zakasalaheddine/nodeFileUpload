import express from 'express';
import multer from 'multer';
import path from 'path';



(async () => {
    const app = express();
    const storage = multer.diskStorage({
        destination: "./public/uploads/",
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    const upload = multer({
        storage: storage,
    }).single('image');
    
    app.use(express.static('./public'));
    app.get("/", (req, res) => {
        res.json({
            response: "AZERTYUIO"
        });
    })

    app.post('/upload', (req, res) => {
        upload(req, res, (err) => {
            if(err){
                return res.json({
                    error: err,
                    data: null
                })
            }
            else{
                if(req.file == undefined){
                    return res.json({
                        error: 'Error: No File Selected!',
                        data: null
                    })
                }
                return res.json({
                    data: {
                        file: `uploads/${req.file.filename}`
                    }
                })
            }
        })
    })

    app.listen(4000, () => {
        console.log('server started');
    })
})()