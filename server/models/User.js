const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String
});

// push model schema to mongoose
mongoose.model('users',userSchema);
