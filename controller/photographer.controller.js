 
const Photographer = require("../model/photographer.model");
const User = require("../model/user.model");
const { postPhotographerService,
  getPhotographerService, 
  postUserOrderService,
deletePhotographerService ,
statusPhotographerService,
ratingPhotographerService} = require("../services/photographer.service");
 
 
module.exports.postPhotographer = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body) {
      return res.status(400).json({
        error: "not possible register for a photographer"
      })
    }
    const result = await postPhotographerService(req.body)

    if (!result) {
     return res.status(400).json({
        error: "account not create"
      })
    }
   
    res.status(200).json({
      message: "wait for 24 hour to active your account",      
    })
  }
  catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

module.exports.getPhotographer = async (req, res, next) => {
  try {
    const result = await getPhotographerService();
   
    res.status(200).json({
      message: "user find",
      data:result
    })
  }

  catch (error) {
    res.status(501).json({
      message: "unAuthorized",
      error: error.message
    })
  }
}

module.exports.updateUserOrderPhotographer = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the specified photographer by their ID
    const photographer = await Photographer.findById(id);
    console.log(photographer);
    if (!photographer) {
      return res.status(404).json({ message: 'Photographer not found' });
    }
  // const result = await User.findOne({email:{$in:req.user.email}})
  // if (!result || result.length === 0) {
  //   return res.status(404).json({ message: 'Photographers not found' });
  // }

    // Update the hiredPhotographer field of the user
    const user = await User.findByIdAndUpdate(
      result._id, // assuming you have implemented authentication middleware
      { $push:{hiredPhotographer:id }},
      { new: true }
    );

    return res.json({ message: 'Photographer hired successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error',error:err.message });
  }
}

module.exports.deletePhotographer =async(req,res)=>{
  try {
    const {id} = req.params;
    console.log(id);
    const result = await  deletePhotographerService(id)
    console.log(result);
    res.status(200).json({
      result
    })
  } catch (error) {
    res.status(200).json({
     error:error.message
    })
  }
}
module.exports.statusPhotographer =async(req,res)=>{
  try {
    const {id} = req.params;
    
    const result = await  statusPhotographerService(id,req.body)
    console.log(result);
    res.status(200).json({
      result
    })
  } catch (error) {
    res.status(200).json({
     error:error.message
    })
  }
}
module.exports.ratingPhotographer =async(req,res)=>{
  try {
    const {id} = req.params;
    
    const result = await  ratingPhotographerService(id,req.body)
    console.log(result);
    res.status(200).json({
      result
    })
  } catch (error) {
    res.status(200).json({
     error:error.message
    })
  }
}










// module.exports.getPhotographer = async(req,res,next)=>{
//   try{
//       const {email }= req.user;
 
//       const result = await findUserByEmail(email);
//        const {password, ...users}= result.toObject()
      
//        if(!result){
//         return res.status(501).json({
//          error: "not find user",
//         })
//        }
//       res.status(200).json({
//         message:"user find successfully",
//           user:users,
//        })
//   }
//   catch (error) {
//     res.status(501).json({
//       message: "unAuthorized",
//       error: error.message
//     })
//   }
// }