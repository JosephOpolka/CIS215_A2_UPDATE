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

    function showSelectedQueryForm() {
        var selectedTable = document.getElementById("query_drop").value;
        console.log("Selected Table = ", selectedTable);
    
        // Hide all column dropdowns
        var columnDropdowns = document.querySelectorAll('[id^="query_column_"]');
        columnDropdowns.forEach(function (dropdown) {
            dropdown.style.display = 'none';
        });
        
        // Show the selected column dropdown
        var selectedColumnDropdown = document.getElementById('query_column_' + selectedTable);
        console.log('Selected Column Dropdown:', selectedColumnDropdown);
        if (selectedColumnDropdown) {
            selectedColumnDropdown.style.display = 'block';
        }
    }
    
    // Add event listener to the Table dropdown
    var queryTableDrop = document.getElementById("query_drop");
    queryTableDrop.addEventListener("change", showSelectedQueryForm);
    
    showSelectedQueryForm(); 



    // BEGGINING OF DATA COLLECTION


    // For adding table entries
    function AddSubmit(event, table) {
        event.preventDefault(); // Prevent default form submission behavior

        // Extract the form data
        const form = event.target.form;
        console.log("form = " + form);
        const formData = new FormData(form);
        console.log("formData = " + formData);

        formData.forEach((value, key) => {
            // Log only specific key-value pairs
            if (key === 'first_name' || key === 'last_name') {
                console.log(`Entry Example = ${key}: ${value}`);
            }
        });

        // form.json or something
        // casting HTML instead of JSON

        // Construct the data object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send the data to the backend endpoint for adding entry
        fetch(`http://localhost:3000/api/add-${table.toLowerCase()}`, { // Construct the endpoint dynamically based on the table name
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Pass the data directly without including the table name
        })
        .then(response => response.json())
        .then(result => {
            // Display success message
            resultsDisplay("Add Entry: Entry into ${table} successful");
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = result.message;
            successMessage.style.display = 'block';
            
            form.reset();
        })
        .catch(error => console.error('Error:', error));
    }


    document.getElementById('add_submit_Drivers').addEventListener('click', function(event) {
        console.log("Add Driver has been clicked :D");
        AddSubmit(event, 'Drivers');
    });
    
    document.getElementById('add_submit_Vehicles').addEventListener('click', function(event) {
        console.log("Add Vehicle has been clicked :D");
        AddSubmit(event, 'Vehicles');
    });
    
    document.getElementById('add_submit_Passengers').addEventListener('click', function(event) {
        console.log("Add Passenger has been clicked :D");
        AddSubmit(event, 'Passengers');
    });
    
    document.getElementById('add_submit_Trips').addEventListener('click', function(event) {
        console.log("Add Trip has been clicked :D");
        AddSubmit(event, 'Trips');
    });





    // For displaying tables below
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