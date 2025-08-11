# automation-assignment

Project Description:
The repository has 2 tasks of the given assignment:
  Task 2- Validates all the options withing the navigation menu, 
          and navigates to the "where is my stuff page" using the "customer service" page and its search bar.
  Task 3- Before the test: Adds 2 diffrent products to the purchase cart using two diffrent methods:1. directly going to its url, 2. searching for it in the searchbar.
          During the test: Validating the 2 products are in the cart and there is no free shipping, then increasing there amount and making sure the free shipping unclocks.
          After the test: removing all of the products from the cart.


Initial File path:

├── cypress/
│ ├── e2e/ # End-to-end test specs
│ ├── fixtures/ # Test data and mock responses
│ ├── support/ # Commands and Cypress hooks
│ └── tsconfig.json # TypeScript config for Cypress
├── .gitignore
├── package.json
├── tsconfig.json # Root TypeScript configuration
└── README.md


Setup/Running Instructions:
1. In a desired path/location, open the git bash and enter the following command: "git clone https://github.com/danshamash2002/automation-assignment.git"
2. Within the folder the previous command opened, open a command line terminal and write the following command: "npx cypress open"
3. Within the cypress tab we just opened, choose "E2E Testing", then choose the chrome browser and press "Start E2E Testing in Chrome"
4. Finally, within specs, click on the file named after the task you would like to run.
