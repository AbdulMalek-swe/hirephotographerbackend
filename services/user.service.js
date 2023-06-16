const User = require("../model/user.model");
module.exports.postSignUpService =async(data)=>{
    const result = await User.create(data);
    return result;
} 
module.exports.postSignInService = async(email)=>{
    const result = await User.findOne({email:email});
    return result;
}
module.exports.findUserByEmail=async(email)=>{
       return await User.findOne({email:email})
}
module.exports.userImageUploadService = async(email,picName)=>{
    const result = await User.findOne({email:email?.email});
   const updateResult = await User.updateOne({_id:result._id},{$set:{pic:'http://localhost:5000/'+picName?.path}},{ruvalidators:true});
   return updateResult; 
}
module.exports.userMakeAdminService = async(email)=>{
    const result = await User.findOne({email:email});
    const admin = await User.updateOne({_id:result._id},{$set:{status:'admin'}},{ruvalidators:true});
    return admin; 
}
module.exports.userImageUploadService = async(email,picName)=>{
    console.log(email);
    const result = await User.findOne({email:email});
    console.log(result);
    const updateResult = await User.updateOne({_id:result._id},{$set:{imageUrl:'http://localhost:5000/'+picName?.path}},{ruvalidators:true});
    return updateResult;     
}