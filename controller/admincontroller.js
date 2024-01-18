const admin = require('../model/adminmodel');
const user = require('../model/usermodel');
const category = require('../model/categorymodel');
const puzzle = require('../model/puzzlemodel');

exports.admin_post = async (req, res) => {
    try {
        email = req.body.email

        var chk_email = await admin.find({ email: email })

        if (chk_email != 0) {
            if (chk_email[0].password == req.body.password) {
                res.status(200).json({
                    status: "login succesfull"
                })
            } else {
                res.status(200).json({
                    status: "incorrect password"
                })
            }
        } else {
            res.status(200).json({
                status: "incorrect email"
            })
        }
    } catch (error) {
        console.log(error)
    }
}



exports.add_category = async (req,res) =>{
    try {
     var image1 = req.file.originalname;
     var obj={
        cat_name:req.body.cat_name,
         cat_image:image1
     }
 
     var data = await category.create(obj);
 
     res.status(200).json({
         status:"insert succesfully",
         data
     })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error
        })
    }
 }

 exports.update_category = async (req, res) => {
    try {
        const id = req.params.id; // Use const for id and req.params.id for clarity
        const image1 = req.file.originalname;
        
        const obj = {
            cat_name: req.body.cat_name,
            image: image1
        }

        var data = await category.findByIdAndUpdate(id, obj, { new: true }); // Use the obj instead of req.body
        res.status(200).json({
            status: "update successfully",
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ // Use 500 for internal server error
            error
        });
    }
}



exports.delete_category = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the category by id and delete it
        const deletedCategory = await category.findByIdAndDelete(id);

        if (deletedCategory) {
            res.status(200).json({
                status: "delete successfully",
                deletedCategory
            });
        } else {
            res.status(404).json({
                error: "Category not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}



exports.add_puzzle = async (req,res) =>{
    try {

        const nameInput = req.body.puzzle_name.toUpperCase();
        
        //random character generate
        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let randomString = '';
          
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              randomString += characters.charAt(randomIndex);
            }
          
            return randomString;
          }
          
          const randomString = generateRandomString(16-nameInput.length);
        //   console.log("Random character string:", randomString);
        
          //merged string
          let mergedString = '';
        
          mergedString = nameInput + randomString; // merge the user input
        //   mergedString += randomString;//merge random string
        
        //   console.log("Merged string with random characters:", mergedString);
        
          //shuffle
          
          var shuffled = mergedString.split('').sort(function(){return 0.5-Math.random()}).join('');
             

          var id = req.params.id;           //id require kari //g url ma nakhvi te(category ni id)

          req.body.subcategory_id = id;  
         var cat_id= req.body.subcategory_id 
 
     var image1 = req.file.originalname;
     var obj={
        puzzle_name: nameInput,
        puzzle_image:image1,
        puzzle_char:shuffled,
        cat_id:cat_id
     }
 
     var data = await puzzle.create(obj);
 
     res.status(200).json({
         status:"insert succesfully",
         data
     })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error
        })
    }
 }


 exports.update_puzzle = async (req, res) => {
    try {
        const id = req.params.id; // Use const for id and req.params.id for clarity
        const image1 = req.file.originalname;

        const nameInput = req.body.puzzle_name.toUpperCase();
        
        //random character generate
        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let randomString = '';
          
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              randomString += characters.charAt(randomIndex);
            }
          
            return randomString;
          }
          
          const randomString = generateRandomString(16-nameInput.length);
        //   console.log("Random character string:", randomString);
        
          //merged string
          let mergedString = '';
        
          mergedString = nameInput + randomString; // merge the user input
        //   mergedString += randomString;//merge random string
        
        //   console.log("Merged string with random characters:", mergedString);
        
          //shuffle
          
          var shuffled = mergedString.split('').sort(function(){return 0.5-Math.random()}).join('');
        
        const obj = {
            puzzle_name: nameInput,
        puzzle_image:image1,
        puzzle_char:shuffled,
        }

        var data = await puzzle.findByIdAndUpdate(id, obj, { new: true }); // Use the obj instead of req.body
        res.status(200).json({
            status: "update successfully",
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ // Use 500 for internal server error
            error
        });
    }
}

exports.delete_puzzle = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the category by id and delete it
        const deletedCategory = await puzzle.findByIdAndDelete(id);

        if (deletedCategory) {
            res.status(200).json({
                status: "delete successfully",
                deletedCategory
            });
        } else {
            res.status(404).json({
                error
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

