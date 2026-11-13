const Employee = require('../models/employeeModel');

const isValid = ({ name, email, role }) => name && email && role;

const getEmployees = async (req, res) => {
  try {
    res.json(await Employee.getAll());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({ message: 'name, email and role are required' });
  }
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({ message: 'name, email and role are required' });
  }
  try {
    const employee = await Employee.update(req.params.id, req.body);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee };