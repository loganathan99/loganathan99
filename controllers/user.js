const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customENV = require('custom-env');
const { _users } = require('../models/user');
const { _todos } = require('../models/todo');

customENV.env(true, './');
const saltRounds = 14;

const getAllUsers = async (req, res) => {
    try {
        const users = await _users.find().populate('todos').select('-password');
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (req, res) => {
    try {
        const data = await _users.findById(req.params.id).select('-password').populate('todos');
        return res.json(data);
    } catch (e) {
        console.log(e);
    }
}

const updateUserById = async (req, res) => {
    try {
        const data = await _users.findByIdAndUpdate(req.params.id, req.body).select('-password').bcrypt;
        return res.json(data);
    } catch (e) {
        console.log(e);
    }
}
const deleteUserById = async (req, res) => {
    try {
        const data = await _users.findByIdAndDelete(req.params.id).select('-password');
        return res.json(data);
    } catch (e) {
        console.log(e);
    }
}

const signupUser = async (req, res) => {
    try {
        const users = await _users.find({ email: req.body.email });
        if (users.length > 0) { res.json({ message: 'Account with that E-Mail already exists!' }); }
        else {
            const body = req.body;
            const hash = await bcrypt.hash(body.password, saltRounds);
            body.password = hash;
            const newuser = await _users.create(body);
            res.json({ message: 'ok' });
        }
    } catch (e) {
        console.log(e);
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await _users.findOne({ email: req.body.email });
        if (!user) { res.json({ message: 'Account Not Found for the E-Mail' }); }
        else {
            const check = await bcrypt.compare(req.body.password, user.get('password'));
            if (check === true) {
                const token = jwt.sign({ id: user._id, role: user.get('role') }, process.env.HASH_SECRET);
                res.json({ message: 'ok', token: token, id: user._id, role: user.get('role') });
            } else { res.json({ message: 'Wrong Password!' }); }
        }
    } catch (e) {
        console.log(e);
    }
}

const createtodo = async (req, res) => {
    try {
        const todo= await _todos.create(req.body);
        const user = await _users.findByIdAndUpdate(req.params.id, { $push: { todos: todo._id } });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

const getusertodo = async (req, res) => {
    try {
        const todo = await _users.findById(req.params.id).populate('todos');
        res.json(todo.get('todos'));
    } catch (error) {
        console.log(error);
    }
}


const getTodoById = async (req, res) => {
    try {
        const todo = await _todos.findById(req.params.id);
        res.json(todo);
    } catch (error) {
        console.log(error);
    }
}

const updateTodoById = async (req, res) => {
    try {
        const todo = await _todos.findByIdAndUpdate(req.params.id, req.body);
        res.json(todo);
        console.log(todo);
        
    } catch(e) {
        console.log(e)
    }
}

const deletetodoById = async (req, res) => {
try{
    const todo =await _todos.findByIdAndDelete(req.params.id);
    res.json(todo);
}
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    signupUser,
    loginUser,
    createtodo,
    getusertodo,
    getTodoById,
    updateTodoById,
    deletetodoById,
}