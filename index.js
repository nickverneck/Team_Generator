const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const fs = require("fs");
const readline = require("readline");
var htmlCards = '';
// array to hold the questions that will be promped when manager is selected
// ------------------------------------------------------------------------
const managerQ = [
    {
        type: "input",
        name: "name",
        message: " Please enter the manager's name:",

    },
    {
        type: "input",
        name: "id",
        message: " Please enter the team manager's ID:",
        validate: (id) => {
            if (isNaN(id)) {
                return "Please enter a number";
            }
            return true;
        }

    },
    {
        type: "input",
        name: "email",
        message: " Please enter the team manager's email:",

    },
    {
        type: "input",
        name: "officeNumber",
        message: " Please enter the team manager's office number:",

    },
    {
        type: "list",
        name: "addNew",
        message: "Would like to add a new Team Member?",
        choices: ["Engineer", "Intern", "No"],

    },
]
// ------------------------------------------------------------
// array to hold the questions that will be promped when engineer is selected
// ------------------------------------------------------------------------
const engineerQ = [
    {
        type: "input",
        name: "name",
        message: " Please enter the engineer's name:",

    },
    {
        type: "input",
        name: "id",
        message: " Please enter the engineer's ID:",
        validate: (id) => {
            if (isNaN(id)) {
                return "Please enter a number";
            }
            return true;
        }

    },
    {
        type: "input",
        name: "email",
        message: " Please enter the engineer's email:",

    },
    {
        type: "input",
        name: "gitHub",
        message: " Please enter the engineer's GitHub:",

    },
    {
        type: "list",
        name: "addNew",
        message: "Would like to add a new Team Member?",
        choices: ["Engineer", "Intern", "No"],

    },
]
// ------------------------------------------------------------
// array to hold the questions that will be promped when Intern is selected
// ------------------------------------------------------------------------
const internQ = [
    {
        type: "input",
        name: "name",
        message: " Please enter the intern's name:",

    },
    {
        type: "input",
        name: "id",
        message: " Please enter the intern's ID:",
        validate: (id) => {
            if (isNaN(id)) {
                return "Please enter a number";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: " Please enter the intern's email:",

    },
    {
        type: "input",
        name: "school",
        message: " Please enter the intern's school:",

    },
    {
        type: "list",
        name: "addNew",
        message: "Would like to add a new Team Member?",
        choices: ["Engineer", "Intern", "No"],

    },
]
// ------------------------------------------------------------

addMember = (role) => {
    switch (role) {
        case 'Engineer':
            return inquirer.prompt(engineerQ).then(({ name, id, email, gitHub, addNew }) => {
                var engineer = new Engineer(name, id, email, gitHub);
                renderCard(engineer);
                if (addNew === 'No') {
                    renderHtml();
                }
                else {
                    return addMember(addNew);
                }
            })
        case 'Intern':
            return inquirer.prompt(internQ).then(({ name, id, email, school, addNew }) => {
                var intern = new Intern(name, id, email, school)
                renderCard(intern);
                if (addNew === 'No') {
                    renderHtml();
                }
                else {
                    return addMember(addNew);
                }
            })

    }
}
// this function will get the employee information
// acordding to his role it will change some of the things being displayed
// then everything will be added into a html template card which is added to the variable htmlCards

renderCard = (data) => {
    var thirdItem;
    switch (data.getRole()) {
        case 'Manager':
            thirdItem = `Office Number: ${data.officeNumber}`
            break
        case 'Intern':
            thirdItem = `School: ${data.school}`
            break
        case 'Engineer':
            thirdItem = `GitHub: ${data.gitHub}`
            break
    }
    htmlCards += `<div class="col">
    <div class="card bg-grey" style="width: 18rem;">
        <div class="card-body bg-dark">
            <h4 class="card-title text-light">${data.name}</h4>
            <h4 class="card-text text-light">${data.getRole()}</h4>
        </div>
        <ul class="list-group list-group-flush p-3">
            <li class="list-group-item">ID: ${data.id}</li>
            <li class="list-group-item">Email: ${data.email}</li>
            <li class="list-group-item">${thirdItem}</li>
        </ul>
    </div>
</div>`;
}
// grabs the var htmlCards and add into the final file 
// by creating a writestream so we can continously add data into the file
// then we create an interface by calling readline so we can read line by line of our teamplate
// our interface will check if it has a matching line of <!--cards--> and will replace that with our variable
// that holds all the cards generated by renderCards()
renderHtml = () => {
    let ws = fs.createWriteStream('./dist/index.html')
    var interface = readline.createInterface(
        {
            input: fs.createReadStream('./src/index.html'),

        }
    )

    interface.on('line', (line) => {
        if (line.match(/<!--cards-->/)) {

            line = line.replace(/<!--cards-->/, htmlCards)

        }
        ws.write(`${line}\n`);
        
    })



}
// menu function holds the first inquirer
// we start with the manager questions and the last question makes 
// the user choose if he wants to add one more member or not
// we add the managers info into a htmldata formarted by calling rendercard()
// then we check if we want to add a new user or not.
// if we add a new member we call the function addMember() which restart the questions
// with the proper questions for it's role
// otherwise we render the full HTML file 

menu = () => {
    inquirer.prompt(managerQ).then(({ name, id, email, officeNumber, addNew }) => {
        const manager = new Manager(name, id, email, officeNumber);
        renderCard(manager);
        if (addNew === 'No') {
            renderHtml();
        }
        else {
            return addMember(addNew);
        }
    })
}

 menu();