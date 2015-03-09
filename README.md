# entomatic-server
web server for gathering data from a WSN

Steps for running the server on your local machine (Windows user):

- Install Git and clone the repository.
- Install node.js https://nodejs.org/download/ and make sure node.js is set on the enviroment variable Path.
- Open the console and type "npm install sails -g" (this will install the sails packge globally).
- Also type "npm install sails-postgresql" (for the postgreSql controller).
- Create a postgreSQL database or select an existing one.
- Open the project using your favourite IDE or file editor (I use Webstorm) and under the config/connections place the information from your postgreSQL database.
- Once again, open the console, and select the directory of the application.
- Type "sails lift" and the server will start.
- Test the application by typing http://localhost:1337/ on your explorer.





