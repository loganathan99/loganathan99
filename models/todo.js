const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

    task: String,
    priority: String,
   
    _createdAt: { type: Date, default: Date.now() },
});

module.exports = { _todos: mongoose.model('todo', todoSchema) }