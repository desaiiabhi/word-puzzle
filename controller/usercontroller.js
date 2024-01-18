const admin = require('../model/adminmodel');
const user = require('../model/usermodel');
const category = require('../model/categorymodel');
const puzzle = require('../model/puzzlemodel');
const storage = require('node-persist');


exports.registration = async(req,res) => {
    try {
        res.render('register');
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error
        })
    }
}

exports.login = async(req,res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error)
    }
}


exports.user_registration = async (req, res) => {
    try {

        var data = await user.create(req.body)

        res.status(200).json({
            status: "registration succesfully",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error
        })
    }
}

exports.user_login = async (req, res) => {
    try {
        email = req.body.email

        var chk_email = await user.find({ "email":  req.body.email  })

        if (chk_email != 0) {
            if (chk_email[0].password == req.body.password) {
                await storage.init( /* options ... */);
                var d = await storage.setItem('_id', chk_email[0]._id);
                res.redirect('/show_category')
            } else {
                res.redirect('/login')
                res.status(200).json({
                    status: "user password incorrect"
                })
            }
        } else {
            res.status(200).json({
                status: "user email incorrect"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error
        })
    }
}

exports.show_category = async (req,res) =>{
    try {
        var data = await category.find();

        res.render('show_category',{results:data});

    } catch (error) {
        console.log(error);
    }
}


exports.show_category_puzzle = async (req,res) =>{
    try {

        let id = req.params.id;

        var data = await puzzle.find({cat_id:id});

        res.render('show_category_puzzle',{results:data});
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}

exports.show_single_puzzle = async (req,res) =>{
    try {

        let id = req.params.id;

        var data = await puzzle.find({_id:id});

        res.render('show_single_puzzle',{results:data});

    } catch (error) {
      
        res.status(200).json({
            error
        })
    }
}





exports.win_puzzle = async(req,res) =>{
    try {
        let id = req.params.id;

        let chk_data = await puzzle.find({_id:id})
     
        if(chk_data[0].puzzle_name == req.body.name)
        {
            await storage.init( /* options ... */);
            var win_id = await storage.getItem('_id')
            var data = await puzzle.findByIdAndUpdate(id, { $push: { win_id: win_id } }, { new: true });
            
        res.status(200).json({
            status:"you is win",
            data
        })
        }else{
            res.status(200).json({
               status:"not win"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(200).json({
            error
        })
    }
}