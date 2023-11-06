import { request, response } from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import mongoose from "mongoose";


export const getAllblogs=async(request,response,next)=>{
    let getblog;
    try{
        getblog=await Blog.find().populate("user");
    }
    catch(error){
        return response.status(500).json({ msg: 'Error while fetching all blogs' });
    }
    if(!getblog){
        return response.status(500).json({ msg: 'blog  not found' });
    }
    return response.status(200).json(getblog);
    
}

export const createBlog=async(request,response,next)=>{
   // let newblog;
   const{title,description,image,user,createdDate}=request.body;
   let AlreadyUser;
   try{
        AlreadyUser=await User.findById(user);
        console.log(AlreadyUser);
        if(!AlreadyUser){
            return response.status(404).json({msg:"User not found!"});
        }

   }catch(error){
    return response.status(404).json({msg:"User not found!"});
   }
         const newBlog=new Blog({
            title,
            description,
            image,
            user,
            createdDate
    });
    try{
        const session=await mongoose.startSession();
        session.startTransaction();
       await newBlog.save({session});
        AlreadyUser.blogs.push(newBlog);
       await AlreadyUser.save({session});
       await session.commitTransaction();
         }
    catch(error){
        return response.status(500).json({ msg: 'Error while creating new blog' });
    }
    return response.status(200).json({msg:"Blog Created Successfully!"});
}

export const updateBlog=async(request,response,next)=>{
    // try{
    // const blog=await Blog.findById(request.params.id);
    // console.log(blog);
    // if(!blog){
    //     return response.status(404).json({msg:"Blog not found"});
    // }
    // await Blog.findByIdAndUpdate(request.params.id, { blog })
    // console.log(response);
    // return response.status(200).json({msg:"Blog updated successfully"});
    // }
    // catch(error){
    //     return response.status(500).json({msg:"An error occured while Updating the Blog"});
    // }
    try {
        console.log(request.body.id);
        const post = await Blog.findById(request.params.id);
          
        //console.log(post);
            
        if (!post) {
            return response.status(404).json({ msg: 'Blog not found' })
        }
        
       await Blog.findByIdAndUpdate( request.params.id, { $set: request.body
        })
       console.log(response);
        
        return response.status(200).json({ msg: 'Blog updated successfully' });
    } catch (error) {
       return response.status(500).json({ msg: 'Error while Updating blog to database' });
    }
    
}

export const deleteBlog=async(request,response,next)=>{
      let blog;
    try{
        blog=await Blog.findById(request.params.id);
        if(!blog){
            return response.status(404).json({msg:"Blog not Found!"});
        }
           //await Blog.deleteOne(blog);
          blog=await Blog.findByIdAndRemove(request.params.id).populate("user");
           await blog.user.blogs.pull(blog);
           await blog.user.save();
           return response.status(200).json({msg:"blog is Deleted!"});
    }
    catch(error){
        return response.status(500).json({ msg: 'Error while deleting the Blog to database' });
    }

}



export const getAllUserBlogsById=async (request, response, next)=>{
    let userId= request.params.id;
    let allBlogs;
   try{
     allBlogs = await User.findById(userId).populate("blogs");

   }catch(error){
    return response.status(500).json({ msg: 'Error while fetching all the Blog of a user from database' });
   }
   if(!allBlogs){
    return response.status(404).json({msg:"No Blog Found!"});
   }
   return response.status(200).json(allBlogs);
}

export const getBlogByid=async(request,response,next)=>{
    const blogId= request.params.id;
    let blog;
    try{
       blog=await Blog.findById(blogId);
       if(blog){
        return response.status(200).json({blog});
       }
       return response.status(404).json({msg:"blog not found"});
    }
    catch(error){
         return response.status(404).json({msg:"Error ocuured while fetching the blog"});
    }
}