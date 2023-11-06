import bcrypt from 'bcrypt';
import User from "../models/user.js"
export const createUser=async(request,response,next)=>{
    const{name,email,password}=request.body;
    try{
    const existingUser= await User.findOne({email});
    console.log(existingUser);
    if(existingUser){
        return response.status(404).json({ msg: 'User Already Existed'});
    }
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = { name: request.body.name, email: request.body.email, password: hashedPassword }

    const newUser= new User(user);
    await newUser.save();
   // return response.status(200).json({ msg: 'Signup successfull' });
   return response.status(200).json({newUser});
    }
catch(error){
     return response.status(500).json({ msg: 'Error while signing up user' });
}
}

export const userLogin=async(request,response,next)=>{
    try{
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
        return response.status(404).json({ msg: 'User not found' });
    }
    let match = await bcrypt.compare(request.body.password, user.password);
    if(!match){
        return response.status(404).json({ msg: 'Password did not match!' });
    }
    return response.status(202).json({ msg: 'Login Successfully!', user:user});
   }
   catch(error){
    return response.status(500).json({ msg: 'Error while Logging user' });
   }
}
