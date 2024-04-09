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

    // event listener for dropdown
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

    //ADD ENTRY
    function AddDriver(event, table) {
        event.preventDefault();
        const DriverForm = {
            first_name: document.getElementById('driver_first_name').value,
            middle_name: document.getElementById('driver_middle_name').value,
            last_name: document.getElementById('driver_last_name').value,
            dob: document.getElementById('driver_dob').value,
            address_street: document.getElementById('driver_address_street').value,
            address_zip: document.getElementById('driver_address_zip').value,
            license_number: document.getElementById('driver_license_number').value
        }
        console.log(DriverForm);

        for (const key in DriverForm) {
            if (!DriverForm[key]) {
                alert('New entry contains empty field(s). All fields must contain a value.');
                return;
            }
        }

        fetch(`http://localhost:3000/api/add-${table.toLowerCase()}`, { // Construct the endpoint dynamically based on the table name
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DriverForm) // Pass the data directly without including the table name
        })
        .then(response => response.json())
        .then(result => {
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = result.message;
            successMessage.style.display = 'block';

            document.getElementById('driver_first_name').value = '';
            document.getElementById('driver_middle_name').value = '';
            document.getElementById('driver_last_name').value = '';
            document.getElementById('driver_dob').value = '';
            document.getElementById('driver_address_street').value = '';
            document.getElementById('driver_address_zip').value = '';
            document.getElementById('driver_license_number').value = '';
            
            fetchData(`http://localhost:3000/api/${table.toLowerCase()}`);
        })
        .catch(error => console.error('Error:', error));
    }

    function AddVehicle(event, table) {
        event.preventDefault();
        const VehicleForm = {
            start_miles: document.getElementById('vehicle_start_miles').value,
            end_miles: document.getElementById('vehicle_end_miles').value,
            start_fuel: document.getElementById('vehicle_start_fuel').value,
            end_fuel: document.getElementById('vehicle_end_fuel').value,
            start_condition: document.getElementById('vehicle_start_condition').value,
            end_condition: document.getElementById('vehicle_end_condition').value,
            issues: document.getElementById('vehicles_issues').value,
            reason_for_trip: document.getElementById('vehicles_reason_for_trip').value
        }
        console.log(VehicleForm);

        fetch(`http://localhost:3000/api/add-${table.toLowerCase()}`, { // Construct the endpoint dynamically based on the table name
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(VehicleForm) // Pass the data directly without including the table name
        })
        .then(response => response.json())
        .then(result => {
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = result.message;
            successMessage.style.display = 'block';

            document.getElementById('vehicle_start_miles').value = '';
            document.getElementById('vehicle_end_miles').value = '';
            document.getElementById('vehicle_start_fuel').value = '';
            document.getElementById('vehicle_end_fuel').value = '';
            document.getElementById('vehicle_start_condition').value = '';
            document.getElementById('vehicle_end_condition').value = '';
            document.getElementById('vehicles_issues').value = '';
            document.getElementById('vehicles_reason_for_trip').value = '';
            
            fetchData(`http://localhost:3000/api/${table.toLowerCase()}`);
        })
        .catch(error => console.error('Error:', error));
    }

    function AddPassenger(event, table) {
        event.preventDefault();
        const PassForm = {
            first_name: document.getElementById('passenger_first_name').value,
            middle_name: document.getElementById('passenger_middle_name').value,
            last_name: document.getElementById('passenger_last_name').value,
            dob: document.getElementById('passenger_dob').value,
            address_street: document.getElementById('passenger_address_street').value,
            address_zip: document.getElementById('passenger_address_zip').value
        }
        console.log(PassForm);

        fetch(`http://localhost:3000/api/add-${table.toLowerCase()}`, { // Construct the endpoint dynamically based on the table name
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(PassForm) // Pass the data directly without including the table name
        })
        .then(response => response.json())
        .then(result => {
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = result.message;
            successMessage.style.display = 'block';

            document.getElementById('passenger_first_name').value = '';
            document.getElementById('passenger_middle_name').value = '';
            document.getElementById('passenger_last_name').value = '';
            document.getElementById('passenger_dob').value = '';
            document.getElementById('passenger_address_street').value = '';
            document.getElementById('passenger_address_zip').value = '';
            
            fetchData(`http://localhost:3000/api/${table.toLowerCase()}`);
        })
        .catch(error => console.error('Error:', error));
    }

    function AddTrip(event, table) {
        event.preventDefault();
        const TripForm = {
            destination_address: document.getElementById('trip_start_miles').value,
            destination_zip: document.getElementById('trip_end_miles').value,
            to_date: document.getElementById('trip_start_fuel').value,
            to_start_time: document.getElementById('trip_end_fuel').value,
            to_arrival_time: document.getElementById('trip_start_condition').value,
            back_date: document.getElementById('trip_end_condition').value,
            back_start_time: document.getElementById('trip_issues').value,
            back_arrival_time: document.getElementById('trip_reason_for_trip').value,
            vehicle_id: document.getElementById('trip_vehicle_id').value,
            driver_id: document.getElementById('trip_driver_id').value,
            passenger_id: document.getElementById('trip_passenger_id').value
        }
        console.log(TripForm);

        fetch(`http://localhost:3000/api/add-${table.toLowerCase()}`, { // Construct the endpoint dynamically based on the table name
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(TripForm) // Pass the data directly without including the table name
        })
        .then(response => response.json())
        .then(result => {
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = result.message;
            successMessage.style.display = 'block';

            document.getElementById('trip_start_miles').value = '';
            document.getElementById('trip_end_miles').value = '';
            document.getElementById('trip_start_fuel').value = '';
            document.getElementById('trip_end_fuel').value = '';
            document.getElementById('trip_start_condition').value = '';
            document.getElementById('trip_end_condition').value = '';
            document.getElementById('trip_issues').value = '';
            document.getElementById('trip_reason_for_trip').value = '';
            document.getElementById('trip_vehicle_id').value = '';
            document.getElementById('trip_driver_id').value = '';
            document.getElementById('trip_passenger_id').value = '';

            fetchData(`http://localhost:3000/api/${table.toLowerCase()}`);
        })
        .catch(error => console.error('Error:', error));
    }
   
    document.getElementById('add_submit_Drivers').addEventListener('click', function(event) {
        console.log("Add Driver has been clicked :D");
        AddDriver(event, 'Drivers');
    });
    document.getElementById('add_submit_Vehicles').addEventListener('click', function(event) {
        console.log("Add Vehicle has been clicked :D");
        AddVehicle(event, 'Vehicles');
    });
    document.getElementById('add_submit_Passengers').addEventListener('click', function(event) {
        console.log("Add Passenger has been clicked :D");
        AddPassenger(event, "Passengers");
    });
    document.getElementById('add_submit_Trips').addEventListener('click', function(event) {
        console.log("Add Trip has been clicked :D");
        AddTrip(event, 'Trips');
    });

    // REMOVE ENTRY
    function deleteEntry(event) {
        event.preventDefault();

        const table = document.getElementById("delete_drop").value;
        const id = document.getElementById("delete_id").value;

        if (!id) {
            window.alert("Please enter an ID to delete.");
            return;
        } else if (!/^\d+$/.test(id)) {
            alert('Please enter a valid numerical ID number.');
            return;
        }

        const confirmed = window.confirm(`Are you sure you want to delete entry with ID ${id} from ${table} table?`);
        if (confirmed) {
            fetch(`http://localhost:3000/api/delete-${table.toLowerCase()}/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(result => {
                // Display success message or handle any errors
                console.log(result);
                resultsDisplay(result.message);
                document.getElementById("delete_id").value = "";
                fetchData(`http://localhost:3000/api/${table.toLowerCase()}`);
            })
            .catch(error => console.error("Error:", error));
        }
    }

    const deleteButton = document.getElementById("delete_submit");
    deleteButton.addEventListener("click", deleteEntry);



    // QUERYING DATABASE
    document.getElementById("query_submit").addEventListener("click", function (event) {
        event.preventDefault();
    
        const table = document.getElementById("query_drop").value;
        const id = document.getElementById("query_id").value;
        const column = document.getElementById(`query_column_${table}`).value;
        const contain = document.getElementById("query_contain").value;
    
        const queryData = { table, id, column, contain };
    
        fetch(`http://localhost:3000/api/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryData)
        })
        .then(response => response.json())
        .then(result => {
            // Process the query result
            console.log(result);
            resultsDisplay("Query has been made successfully.");
        })
        .catch(error => console.error('Error:', error));
    });



    // DISPLAY TABLE CONTENTS
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