const router = require('express').Router();
const todoController = require('../controllers/todo-controller');
const validator = require('../validators/todo-validators');

router.get('/', validator.validateGetTodos, todoController.getTodos);
router.get('/count', validator.validateGetTodosCount, todoController.findMatchingTodosCount);
router.get('/:id', validator.validateFindTodoById, todoController.findTodoById);
router.post('/', validator.validateAddTodo, todoController.addTodo);
router.put('/', validator.validateUpdateMatchingTodos, todoController.updateMatchingTodos);
router.put('/:id', validator.validateUpdateTodo, todoController.updateTodo);
router.delete('/', validator.validateDeleteTodos, todoController.deleteTodos);
router.delete('/:id', validator.validateDeleteTodoById, todoController.deleteTodoById);

module.exports = router;
