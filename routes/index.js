var express = require('express');
var router = express.Router();
var admin = require('../controller/admincontroller')
var user = require('../controller/usercontroller')
const multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage })
  
  router.get('/register',user.registration);
  router.get('/login',user.login);  
  router.post('/register',user.user_registration);             http://localhost:3000/registration
   router.post('/login',user.user_login);                         http://localhost:3000/login
router.get('/show_category',user.show_category);
router.get('/show_category_puzzle/:id',user.show_category_puzzle);
router.get('/show_category_puzzle/show_single_puzzle/:id',user.show_single_puzzle);
router.post('/win_puzzle/:id',user.win_puzzle);


router.post('/admin',admin.admin_post);                        http://localhost:3000/admin

router.post('/admin/add_category',upload.single('cat_image'),admin.add_category) ;
router.post('/admin/update_category/:id',upload.single('cat_image'),admin.update_category) ;
router.get('/admin/delete_category/:id',admin.delete_category) ;
router.post('/admin/add_puzzle/:id',upload.single('puzzle_image'),admin.add_puzzle) ;
router.post('/admin/update_puzzle/:id',upload.single('puzzle_image'),admin.update_puzzle) ;
router.get('/admin/delete_puzzle/:id',admin.delete_puzzle) ;



module.exports = router;
