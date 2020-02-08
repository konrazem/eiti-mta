const mongoose = require('mongoose');

// define collection structure
const UsersSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
});

const Users = mongoose.model('users', UsersSchema); 
module.exports = Users;