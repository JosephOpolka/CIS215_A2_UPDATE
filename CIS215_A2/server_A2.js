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

    // Call the function initially to show the appropriate form based on the default selection
    showSelectedForm();

    

    function fetchData(endpoint) {
        fetch('/api/drivers') // Make an HTTP GET request to the backend API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
        })
        .then(data => {
            // Process the JSON data received from the server
            console.log(data); // Display the data in the browser console
            // Further processing or rendering of the data in the UI
        })
        .catch(error => {
            console.error('Error fetching data:', error); // Handle any errors that occur during the fetch
        });
    }

    //fetchData("http://localhost:3000/api/drivers");
    fetchData("");

    function showTheTable() {
        const tableDrop = document.getElementById('table_drop');
        const tableDisplay = document.querySelector('.table_display');

        tableDrop.addEventListener('change', function() {
            const selectedTable = tableDrop.value;

            if (selectedTable === 'Drivers') {
                createDriversTable();
            } else {
                tableDisplay.innerHTML = '';
            }
        });

        function createDriversTable() {
            const data = [
                { id: 1, name: "John" },
                { id: 2, name: "Alice" },
                { id: 3, name: "Bob" }
            ];

            const table = document.createElement('table');
            table.classList.add('driver-table');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = ['ID', 'Name'];
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

            tableDisplay.innerHTML = '';
            tableDisplay.appendChild(table);
        }
    }

    showTheTable();

    /*
    document.getElementById('table_drop').addEventListener('change', function() {
        var selectedOption = this.value;
        var apiUrl = 'http://localhost:3000/api/' + selectedOption.toLowerCase();
        console.log("apiUrl: " + apiUrl);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                var tableHtml = '<table>';
                // Assuming each object in the JSON array has the same structure
                data.forEach(item => {
                    tableHtml += '<tr>';
                    for (const key in item) {
                        tableHtml += '<td>' + item[key] + '</td>';
                    }
                    tableHtml += '</tr>';
                });
                tableHtml += '</table>';
    
                document.querySelector('.table_display').innerHTML = tableHtml;
            })
            .catch(error => console.error('Error:', error));
    }); */
});