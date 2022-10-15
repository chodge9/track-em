const inquirer= require("inquirer")
const db= require("./db/connection");

function mainMenu (){
    inquirer.prompt({
        type: "list", message: "which action would you like to take?", choices: ["view departments", "view roles", "view employees", "view company"], name:"directions"
    }).then(answer => {
        if(answer.directions=== "view departments"){
            viewDepartments()
        }
        if(answer.directions=== "view roles"){
            viewRoles()
        }
    })
}
function viewDepartments(){
    db.promise().query("SELECT * FROM department").then(([response]) => console.log(response))
}
function viewRoles(){
    db.promise().query("SELECT * FROM role").then(([response]) => {
        console.table(response)
        mainMenu()
    })
}

mainMenu()