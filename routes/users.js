const { Router } = require('express');
var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

/* GET users listing. */
router.route('/')
  .get(user.getAllUsers)

router.route('/:id')
  .get(user.getUserById)
 
  

router.route('/login')
  .post(user.loginUser);

router.route('/signup')
  .post(user.signupUser);

  router.route('/:id/newtodo')
  .post(user.createtodo);

router.route('/:id/todos')      
  .get(user.getusertodo)
  .put(user.updateTodoById)
  .delete(user.deleteUserById);


router.route('/:id/todo')      
.get(user.getTodoById)
.delete(user.deletetodoById);

module.exports = router;

