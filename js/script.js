console.log("Código JavaScript está sendo executado.");
function loadCSV() {
    const csvFilePath = 'actions.csv';
    console.log("loadCSV");
    Papa.parse(csvFilePath, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function (results) {
            const actions = results.data;
            const tableBody = document.querySelector('#actions-table tbody');

            tableBody.innerHTML = '';

           
            actions.forEach(function (action) {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const descriptionCell = document.createElement('td');

                nameCell.textContent = action.Ação;
                descriptionCell.textContent = action.Descrição;

                row.appendChild(nameCell);
                row.appendChild(descriptionCell);
                tableBody.appendChild(row);
            });
        }
    });
}

function loadGoogleSheetData() {
    const spreadsheetId = '1ihDKTFz01jymt-bZmeOMuoyR3po7aImcYmiUNdF3hOo';
    
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'avisos' 
    }).then(function(response) {
        const data = response.result.values;
        const tableBody = document.querySelector('#actions-table tbody');

        tableBody.innerHTML = '';

        data.forEach(function(row) {
            const rowData = row.map(item => item || ''); 
            const tableRow = document.createElement('tr');
            rowData.forEach(function(cellData) {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                tableRow.appendChild(cell);
            });

            tableBody.appendChild(tableRow);
        });
    });
}

function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyCavRdS-Ktp9IhXDaG5GYSVv9gkMtPY6UY',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    });
}

gapi.load('client', initGoogleSheetsApi);


