// user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['editor', 'viewer'] }, // Add the role field
    // Add any other fields you need for your User model
});

const User = mongoose.model('User', userSchema);

module.exports = User;
