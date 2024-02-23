document.addEventListener("DOMContentLoaded", function () {
    // Shows specified entry section
    function showHideEntrySections() {
        var selectedTable = document.getElementById("table_drop").value;

        // hides all sections
        var entrySections = document.querySelectorAll('.enter');
        entrySections.forEach(function (section) {
            section.style.display = 'none';
        });
        
        // Except for the selected one
        var selectedEntrySection = document.getElementById('ent_' + selectedTable);
        if (selectedEntrySection) {
            selectedEntrySection.style.display = 'block';
        }
    }

    // Relate this to the drop-down menu
    var tableDrop = document.getElementById("table_drop");
    tableDrop.addEventListener("change", showHideEntrySections);

    showHideEntrySections();

    function submitDriverForm() {
        const formData = {
            firstName: document.getElementById('fName').value,
            midName: document.getElementById('mName').value,
            lastName: document.getElementById('lName').value,
            dob: document.getElementById('dob').value,
            address: document.getElementById('street').value,
            zip: document.getElementById('zip').value,
            licenseNumber: document.getElementById('licenseNumber').value
        };

        fetch('/api/drivers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                
            } else {
                // Handle errors
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        document.getElementById('fName').value = '';
        document.getElementById('mName').value = '';
        document.getElementById('lName').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('street').value = '';
        document.getElementById('zip').value = '';
        document.getElementById('licenseNumber').value = '';

        var successMessage = document.getElementById("successMessage");
        successMessage.textContent = "Entry submitted successfully!";
        successMessage.style.display = "block";
                setTimeout(function () {
                    successMessage.style.display = "none";
                }, 3000);
    }

    var submitDriverBtn = document.getElementById("submitDriverBtn");
    submitDriverBtn.addEventListener("click", submitDriverForm);

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('car-trips.db');

    function displayTableData() {
        var selectedTable = document.getElementById("table_drop_2").value;

        // Fetch data from API endpoint
        fetch('/api/' + selectedTable)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch data');
                }
            })
            .then(data => {
                // Generate HTML table
                var tableHtml = '<table>';
                // table headers
                tableHtml += '<tr>';
                for (const key in data[0]) {
                    tableHtml += '<th>' + key + '</th>';
                }
                tableHtml += '</tr>';
                // Add table rows
                data.forEach(item => {
                    tableHtml += '<tr>';
                    for (const key in item) {
                        tableHtml += '<td>' + item[key] + '</td>';
                    }
                    tableHtml += '</tr>';
                });
                tableHtml += '</table>';

                // Display table data
                var tableContainer = document.getElementById("table_container");
                tableContainer.innerHTML = tableHtml;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Relate table display to the dropdown menu
    var tableDrop = document.getElementById("table_drop_2");
    tableDrop.addEventListener("change", displayTableData);

    displayTableData();
});