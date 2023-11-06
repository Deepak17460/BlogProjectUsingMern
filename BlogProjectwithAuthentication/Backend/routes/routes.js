import express from "express";
import { createUser,userLogin} from "../controllers/user-controller.js";
import { getAllblogs,createBlog,updateBlog,deleteBlog, getAllUserBlogsById,getBlogByid} from "../controllers/post-controller.js";

const router = express.Router();



//Handling routing for all HTTP Verbs
//auth route
router.post('/signUp',createUser);
router.post('/login',userLogin);
//create route
router.get('/blogs',getAllblogs);
router.post('/blog/create',createBlog);
//Update Route
router.get('/update/:id',getBlogByid);
router.put('/blog/update/:id',updateBlog);
//delete route
router.delete('/blog/delete/:id',deleteBlog);
router.get('/allUser/blogs/:id',getAllUserBlogsById);




export default router;
