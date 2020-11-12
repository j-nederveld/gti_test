# Chart Data

   ![gif]()

To get started, make sure Node.js is installed, and then add a "config.js" file in public > assets > scripts.

Inside the config.js file, use the following logic to set the api_key and client_id


    var config = {    
    MY_KEY : '',
    CLIENT_ID : '' 
    }

Add your api_key and client_id to the file, and then run `npm install`, and finally `node server.js`.

Open your browser to http://localhost:8080 once the server has started.

## Libraries Used:

Litepicker - responsive calendar that lets users easily choose a date range

https://wakirin.github.io/Litepicker/

Chart.js - simple, elegant js chart library that can be updated based on user input

https://www.chartjs.org/

## NPM Packages:

Express - being used here for running the local server

jest/jest-cli - testing purposes. run `npm test` to begin test

