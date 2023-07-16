
const e = require("express");
const Employee = require("../models/Employee");


async function findAllEmployees(req, res) {
    try {
        const employees = await Employee.find({})
        res.json(employees);
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Employees not found" })
    }
}

async function findEmployeeById(req, res) {
    const id = req.params.id

    try {
        const employee = await Employee.findOne({ id })

        if (employee === null)
            return res.json({ message: `Employee with the id:${id} not found` })

        res.json(employee);
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Employee not found" })
    }

}

async function createEmployee(req, res) {

    const newEmployee = req.body

    try {
        const savedNewEmployee = new Employee(newEmployee);
        savedNewEmployee.save()
        res.json(savedNewEmployee);

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Couldn't create an employee" })
    }

}

async function editEmployee(req, res) {
    const id = req.params.id
    const newEmployeeData = req.body

    try {
        const editEmployee = await Employee.findOne({ id });

        for (let key in newEmployeeData) {
            key = key.toLowerCase()
            editEmployee[key] = newEmployeeData[key];
        }
        console.log(editEmployee)
        editEmployee.save()
        res.json(editEmployee);


    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Couldn't update an employee" })
    }

}

async function deleteEmployee(req, res) {
    const id = req.params.id

    try {
        const deletedEmployee = await Employee.findOneAndDelete({ id });
        res.json(deletedEmployee);

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Couldn't update an employee" })
    }


    // res.json({message : "Deleted Employee num: " + id });
}

module.exports = {
    findAllEmployees,
    findEmployeeById,
    createEmployee,
    editEmployee,
    deleteEmployee
}