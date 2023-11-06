import mongoose from 'mongoose';

const connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@todolist.eecoy8r.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default connection;