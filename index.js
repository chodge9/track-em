const inquirer= require("inquirer")
const db= require("./db/connection");

function mainMenu (){
    inquirer.prompt({
        type: "list", message: "which action would you like to take?", choices: ["view departments", "view roles", "view employees", "view company", "add department", "update department", "delete department"], name:"directions"
    }).then(answer => {
        if(answer.directions=== "view departments"){
            viewDepartments()
        }
        if(answer.directions=== "view roles"){
            viewRoles()
        }
        if(answer.directions=== "view employees"){
            viewEmployee()
        }
        if(answer.directions=== "view company"){
            viewCompany()
        }
        if(answer.directions=== "add department"){
            addDepartment()
        }
        if(answer.directions=== "update department"){
            updateDepartment()
        }
        if(answer.directions=== "delete department"){
            deleteDepartment()
        }
    })
}
function viewDepartments(){
    db.promise().query("SELECT * FROM department").then(([response]) => {
        console.table(response)
        mainMenu()
    })
}
function viewRoles(){
    db.promise().query("SELECT * FROM role").then(([response]) => {
        console.table(response)
        mainMenu()
    })
}
function viewEmployee(){
    db.promise().query("SELECT * FROM employee").then(([response]) => {
        console.table(response)
        mainMenu()
    })
}
function viewCompany(){
    db.promise().query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.dept_id=department.id").then(([response]) => {
        console.table(response)
        mainMenu()
    })
}
function addDepartment(){
    inquirer.prompt({
        type: "input", 
        name: "dept_name",
        message: "please enter the department name"
    }).then(answer=> {
        let deptObject= {
            dept_name: answer.dept_name
        }
        db.promise().query("INSERT INTO department SET ?", deptObject).then(([response]) => {
            if(response.affectedRows > 0){
                viewDepartments()
            }
        })
    })
}
async function updateDepartment(){
    const [departments]= await db.promise().query("SELECT * FROM department")
    const departmentArray= departments.map(({id, dept_name})=> (
        {name: dept_name, value: id}
    ))
    inquirer.prompt([
        {
            type: "list", name: "dept_id", message: "which department would you like to update", choices: departmentArray
        },{
            type: "input", name: "dept_name", message: "what is the new name of the department", 
    }
    ])
    .then(answers => {
        db.promise().query("UPDATE department SET ? WHERE id=?", [{dept_name: answers.dept_name}, answers.dept_id]).then(([response]) => {
            if(response.affectedRows > 0){
                viewDepartments()
            }
        })
    })
}
async function deleteDepartment(){
    const [departments]= await db.promise().query("SELECT * FROM department")
    const departmentArray= departments.map(({id, dept_name})=> (
        {name: dept_name, value: id}
    ))
    inquirer.prompt([
        {
            type: "list", name: "dept_id", message: "which department would you like to delete", choices: departmentArray
        }
    ])
    .then(answers => {
        db.promise().query("DELETE FROM department WHERE id=?", answers.dept_id).then(([response]) => {
            if(response.affectedRows > 0){
                viewDepartments()
            }
        })
    })
}
mainMenu()