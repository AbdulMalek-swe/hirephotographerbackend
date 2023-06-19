const Photographer = require("../model/photographer.model");
module.exports.getPhotographerService =async()=>{
    const result = await Photographer.find({});
    return result;
} 
module.exports.postPhotographerService =async(data)=>{
    const result = await Photographer.create(data);
    return result;
} 
module.exports.postUserOrder =async(data)=>{
    console.log(data);
    const result = await Photographer.create(data);
    return result;
} 
 
module.exports.deletePhotographerService =async(id)=>{
    const result = await Photographer.deleteOne({_id:id});
    return result;
} 
module.exports.statusPhotographerService = async(id,value)=>{
    console.log(value);
    const result = await Photographer.updateOne({_id:id},{$set:value},{ruvalidators:true})
    return result;
}


// module.exports.postSignInService = async(email)=>{
//     const result = await User.findOne({email:email});
//     return result;
// }
// module.exports.findUserByEmail=async(email)=>{
   
//        return await User.findOne({email:email})
// }
// module.exports.userImageUploadService = async(email,picName)=>{
//     const result = await User.findOne({email:email?.email});
//    const updateResult = await User.updateOne({_id:result._id},{$set:{pic:'http://localhost:5000/'+picName?.path}},{ruvalidators:true});
//    return updateResult; 
// }
// module.exports.userMakeAdminService = async(email)=>{
     
//     const result = await User.findOne({email:email});
    
//     const admin = await User.updateOne({_id:result._id},{$set:{status:'admin'}},{ruvalidators:true});
//     return admin; 
// }