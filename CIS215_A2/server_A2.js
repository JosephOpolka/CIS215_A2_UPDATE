document.addEventListener("DOMContentLoaded", function () {

    function resultsDisplay(result) {
        var successMessage = document.getElementById("successMessage");
        successMessage.textContent = result;
        successMessage.style.display = "block";
        setTimeout(function () {
            successMessage.style.display = "none";
        }, 2500);
    }

    function showSelectedForm() {
        var selectedOption = document.getElementById("add_drop").value;
        console.log("Selected Option = ", selectedOption);

        // Hide all form elements
        var forms = document.querySelectorAll('[id^="add_entry_"]');
        forms.forEach(function (form) {
            form.style.display = 'none';
        });
        
        // Show the selected form
        var selectedForm = document.getElementById('add_entry_' + selectedOption);
        console.log('Selected form:', selectedForm);
        if (selectedForm) {
            selectedForm.style.display = 'grid';
        }
        resultsDisplay("Add Entry: table selected");
    }

    // Add event listener to the dropdown
    var tableDrop = document.getElementById("add_drop");
    tableDrop.addEventListener("change", showSelectedForm);

    showSelectedForm();


    // BEGGINING OF DATA COLLECTION


    function fetchData(endpoint) {
        return fetch(endpoint) // Make an HTTP GET request to the backend API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
        })
        .then(drivers => {
            console.log(drivers);
            createDriversTable(drivers);
        })
        .catch(error => {
            console.error('Error fetching data:', error); // Handle any errors that occur during the fetch
        });
    }
    


    // Save Json data as alt variable of sorts in JavaScript
    // think about asyncronous here
    // Start small when displaying results
    // Watch videos about JavaScript "Promises"
    //
    // RetrieveDrivers, get http request for driver data

    fetchData('http://localhost:3000/api/drivers');

    var tablesDisplayDrop = document.getElementById("table_drop");
    tablesDisplayDrop.addEventListener('change', function() {
        const selectedTable = tablesDisplayDrop.value;
        if (selectedTable === 'Drivers') {
            console.log("Drivers Works");
            fetchData('http://localhost:3000/api/drivers');
            resultsDisplay("Tables: Drivers table selected");

        } else if (selectedTable === 'Vehicles') {
            console.log("Vehicles Works");
            fetchData('http://localhost:3000/api/vehicles');
            resultsDisplay("Tables: Vehicles table selected");

        } else if (selectedTable === 'Passengers') {
            console.log("Passengers Works");
            fetchData('http://localhost:3000/api/passengers');
            resultsDisplay("Tables: Passengers table selected");

        } else if (selectedTable === 'Trips') {
            console.log("Trips Works");
            fetchData('http://localhost:3000/api/trips');
            resultsDisplay("Tables: Trips table selected");

        } else {
            tableDisplay.innerHTML = '';
        }
    });





    //Create actual table data based on JSON data
    function createDriversTable(data) {
        console.log("in createDriversTable, data = ");
        console.log(data);

        const table = document.createElement('table');
        table.classList.add('driver-table');

        // create table headers
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = Object.keys(data[0]);
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        const tableDisplay = document.querySelector('.table_display');
        tableDisplay.innerHTML = '';
        tableDisplay.appendChild(table);
    }
});