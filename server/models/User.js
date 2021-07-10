const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    githubID: String,
    credits: {type: Number, default: 0} //define type and default value
});

// push model schema to mongoose
mongoose.model('users',userSchema);
