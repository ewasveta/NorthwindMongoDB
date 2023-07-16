const express = require('express');
const router = express.Router();
const employeesController = require("../controllers/employees")



/* GET : Get all employees. */
router.get('/', employeesController.findAllEmployees);
  
  /* GET : Get single employee by ID. */
  router.get('/:id', employeesController.findEmployeeById);
  
  /* POST : Create one employee. */
  router.post('/', employeesController.createEmployee);
  
  /* PATCH : Update one employee by id. */
  router.patch('/:id', employeesController.editEmployee);
  
  /* DELETE : Delete one employee by id. */
  router.delete('/:id', employeesController.deleteEmployee);
  

module.exports = router;
