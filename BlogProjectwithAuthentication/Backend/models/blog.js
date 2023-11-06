import mongoose from 'mongoose';

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    createdDate: {
        type: Date,
        required:true
    }
});

const blog = mongoose.model('blog', BlogSchema);

export default blog;