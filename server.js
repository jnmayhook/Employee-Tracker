const inquirer = require('inquirer');

const mysql = require('mysql2');
require("console.table");

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'Password1',
        database: 'employees_db'
    },
    console.log(`Connected to the courses_db database.`)
);
const questions = [{
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
}];
const deptQuestion = [{
    type: 'input',
    name: 'department',
    message: 'Enter the name of the department'
}]
const roleQuestion = [{
    type: 'input',
    name: 'title',
    message: 'Enter the name for the role',
},
{
    type: 'input',
    name: 'salary',
    message: 'Enter the salary for the role',
},
{
    type: 'input',
    name: 'department_id',
    message: 'Enter the department for the role',
}
];
const employeeQuestion = [{
    type: 'input',
    name: 'first_name',
    message: 'Enter the employee first name',
},
{
    type: 'input',
    name: 'last_name',
    message: 'Enter the employee last name',
},
{
    type: 'input',
    name: 'role_id',
    message: 'Enter the employee role id'
}
];

function init() {
    inquirer.prompt(questions).then(answer => {
        if (answer.menu === "View all departments") {
            viewAllDepts()
        }
        else if (answer.menu === "View all roles") {
            viewAllRoles()
        }
        else if (answer.menu === "View all employees") {
            viewAllEmployees()
        }
        else if (answer.menu === "Add a department") {
            addDept()
        }
        else if (answer.menu === "Add a role") {
            addRole()
        }
        else if (answer.menu === "Add an employee") {
            addEmployee()
        }
        else if (answer.menu === "Update an employee role") {
            updateEmployee()
        }
    })
        .catch(err => {
            console.log(err)
        })
}
function viewAllDepts() {
    db.query("Select * from department", (err, data) => {
        console.table(data);
        init();
    })
}
function viewAllRoles() {
    db.query("Select * from role", (err, data) => {
        console.table(data);
        init();
    })
}
function viewAllEmployees() {
    db.query("Select * from employee", (err, data) => {
        console.table(data);
        init();
    })
}
function addDept() {
    inquirer.prompt(deptQuestion).then(answers => {
        db.query("INSERT into department (name) values(?)", [answers.department], (err, data) => {
            viewAllDepts();
        })
    })
}
function addRole() {
    inquirer.prompt(roleQuestion).then(answers => {
        db.query("INSERT into role (title, salary, department_id) values(?, ?, ?)", [answers.title, answers.salary, answers.department_id], (err, data) => {
            viewAllRoles();
        })
    })
}
function addEmployee() {
    inquirer.prompt(employeeQuestion).then(answers => {
        db.query("INSERT into employee (first_name, last_name, role_id) VALUES(?, ?, ?)", [answers.first_name, answers.last_name, answers.role_id], (err, data) => {
            viewAllEmployees();
        })
    })

}
function updateEmployee() {
    inquirer.prompt(employeeUpdateRole).then(answers => {
        db.query("SELECT * from employee", (err, data) => {
        const employeeUpdateRole = [{
            type: 'list',
            name: 'employee_id',
            message: 'What employee role would you like to change',
        }];
        
        })
    })

}

init();