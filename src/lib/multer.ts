import multer from 'multer';
import { v4 as uuidv4} from 'uuid';
import path from 'path'

const storage = multer.diskStorage({
    destination : 'public',
    filename : (req, file, cb) => {
        if(file) cb(null, uuidv4() + path.extname(file.originalname));
    }
});

function checkFileTypes(file:any , cb:any){
    // Allowed file types
    const filetypes = /jpeg|png|jpg|gif/;

    // Check ext
    const ext = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(ext && mimetype){
        cb(null, true);
    } else {
        cb('Error: Solo se permiten imagenes.')
    }
}
 
export default multer({
    storage,
    limits : { fileSize : 1000000 },
    fileFilter : function (req, file, cb){
        checkFileTypes(file , cb);
    }
});

