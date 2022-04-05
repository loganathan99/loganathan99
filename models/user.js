const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
        name: String,
        phone: Number,
        email: String,
        password: String,
       confirm_password: String, 
        verified: { type: Boolean, default: false },
        
        todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'todo' }],
        
    }, {timestamps: true});

    module.exports = { _users: mongoose.model('User', userSchema) }