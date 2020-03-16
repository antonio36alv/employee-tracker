const inquirer = require("inquirer")

require("dotenv").config()
const cTABLE = require("console.table")

const PORT = process.env.port || 3000

const mysql = require("mysql")

const actions = ["Add Departments", "Add Roles", "Add Employees", "View Departments", "View Roles", "View Employees", /*"Update Employee Roles", "Update Employee Managers", "View Employees by Manager", "Delete Departments", "Delete Roles", "Delete Employees", "View Department Budgets",*/ "Exit"]

const options = []

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: "employees_db"
})

connection.connect(err => {
    if (err) throw err

    console.log(`Connected as id: ${connection.threadId}`)
    interface()
})

async function interface() {

    try {
        let action = await prompt()

        while (action.answer !== "Exit") {
            switch (action.answer) {
                case "View Departments":
                    viewTable(await getEntity(action.answer), true)
                    break
                case "View Roles":
                    viewTable(await getEntity(action.answer), true)
                    break
                case "View Employees":
                    viewTable(await getEntity(action.answer), true)
                    break
                /*case "Update Employee Roles":
                    let v = await viewTable("else", false)
                    console.log(v + "33")
                    let newRole = await pickEntity()

                    updateRole(newRole)
                    break*/
                default:
                    //default adding
                    let values
                    if (action.answer.includes("Departments")) values = await addingDepartments()
                    else if (action.answer.includes("Roles")) values = await addingRoles()
                    else if (action.answer.includes("Employees")) values = await addingEmployees()
                    addEntity(await getEntity(action.answer), values)
                    break
            }
            action = await prompt()
        }
        connection.end()
    } catch (err) {
        if (err) throw console.log(err)
    }
}

function prompt() {
    return inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            choices: actions,
            name: "answer"
        }
    )
}

function addEntity(entity, ...values) {

    let valuesString
    let insertValues
    switch (entity) {
        case "Departments":
            valuesString = "name"
            insertValues = `'${values[0].name}'`
            break
        case "Roles":
            valuesString = "title, salary, department_id"
            insertValues = `'${values[0].roleTitle}', ${values[0].salary}, ${values[0].departmentID}`
            break
        default:
            valuesString = "first_name, last_name, role_id, manager_id"
            insertValues = `'${values[0].firstName}', '${values[0].lastName}', ${values[0].roleID}, ${values[0].departmentID}`
            break
    }
    connection.query(`INSERT INTO ${entity.toLowerCase()}(${valuesString}) VALUES(${insertValues})`, [entity.toLowerCase()], (err, res) => {
        if (err) console.log(err)
        console.log(`${entity.substring(0, entity.length - 1)} was added.`)
    })
}

function addingDepartments() {
    return inquirer.prompt({
        type: "input",
        message: "Enter Department Name:",
        name: "name"
    })
}

function addingRoles() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter Role title:",
            name: "roleTitle"
        },
        {
            type: "input",
            message: "Enter Role salary:",
            name: "salary"
        },
        {
            type: "input",
            message: "Enter department id for role:",
            name: "departmentID"
        }
    ])
}

function addingEmployees() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter First Name:",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter Last Name:",
            name: "lastName"
        },
        {
            type: "input",
            message: "Enter role ID",
            name: "roleID"
        },
        {
            type: "input",
            message: "Enter departmentID:",
            name: "departmentID"
        }
    ])
}

// function pickEntity() {
//     return inquirer.prompt(//[
//         // {
//             // type: "list",
//             // message: "Who's Role would you like to change?",
//             // choices: options,
//             // name: "entity"
//         // },
//         {
//             type: "input",
//             message: "Enter New Role:",
//             name: "newRole"
//         }
//     // ])
//     )
// }

// function updateRole(newRole) {

//     connection.query("UPDATE employees SET role_id = ? WHERE employees.id = ?", [newRole.entity, newRole.newRole], (err, res) => {
//         if (err) throw err
//         console.log("Employee Role was updated")
//     })
// }

function getEntity(answer) {
    const blank = answer.lastIndexOf(" ")
    return answer.substring(blank, answer.length).trim()
}

function viewTable(entity, view) {


    if (entity === "Departments" || entity === "Roles") {
        connection.query(`SELECT * FROM ${entity.toLowerCase()}`, (err, res) => {
            if (err) throw err
            
            // if (res[0].name) for (record of res) options.push(`${record.id} ${record.name}`)
            // if (res[0].title) for (record of res) options.push(`${record.id} ${record.title}`)
            // console.log("dep/roles")
            // if (view) console.table(res)
            console.table(res)
        })
    } else {
         connection.query("SELECT e.id AS ID, e.first_name AS FirstName, e.last_name AS 'Last Name', r.title AS Role, r.salary AS Salary, m.first_name AS Manager, d.name AS Department FROM employees as e INNER JOIN employees AS m ON e.manager_id=m.id INNER JOIN roles as r ON e.role_id=r.id INNER JOIN departments as d ON r.department_id=d.id ORDER BY e.id ASC", (err, res) => {
            if (err) throw err

            // for (record of res) await q.push(`${record.ID} ${record.FirstName}`)
            // if(view) console.table(res)
            console.table(res)            
        })
    }
}
/*
function deleteEntity(entity) {
    inquirer.prompt({
        type: "list",
        message: "Which/Who would you like to delete?",
        choices: ["a", "b", "c", "d"],
        name: "value"
    }).then(err => {
        connection.query("DELETE FROM ?? WHERE id = ?", [entity, value], (err, res) => {
            if (err) throw err
            return res

        })
    })
}*/