// Function to handle file upload
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const content = e.target.result;
    try {
      const data = JSON.parse(content);
      displayAvailableFields(data.products);
    } catch (error) {
      console.error('Error parsing JSON file: ', error);
    }
  };

  reader.readAsText(file);
});

// Function to display available fields
function displayAvailableFields(products) {
  const availableFields = document.getElementById('availableFields');
  availableFields.innerHTML = '';

  for (const productId in products) {
    const product = products[productId];
    for (const key in product) {
      if (!availableFields.querySelector(`[value="${key}"]`)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        availableFields.appendChild(option);
      }
    }
  }
}

// Function to handle moving fields
document.getElementById('moveRight').addEventListener('click', function() {
  moveFields('availableFields', 'fieldsToDisplay');
});

document.getElementById('moveLeft').addEventListener('click', function() {
  moveFields('fieldsToDisplay', 'availableFields');
});

function moveFields(fromId, toId) {
  const fromSelect = document.getElementById(fromId);
  const toSelect = document.getElementById(toId);
  const selectedOptions = Array.from(fromSelect.selectedOptions);

  selectedOptions.forEach(option => {
    toSelect.appendChild(option);
  });
}

// Function to display sorted data based on popularity
document.getElementById('nextButton').addEventListener('click', function() {
  const fieldsToDisplay = Array.from(document.getElementById('fieldsToDisplay').options)
    .map(option => option.value);

  const file = document.getElementById('fileInput').files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const content = e.target.result;
    try {
      const data = JSON.parse(content);
      const products = data.products;

      const sortedProducts = Object.values(products).sort((a, b) => {
        return parseInt(b.popularity) - parseInt(a.popularity);
      });

      displaySortedProducts(sortedProducts, fieldsToDisplay);
    } catch (error) {
      console.error('Error parsing JSON file: ', error);
    }
  };

  reader.readAsText(file);
});

// Function to display sorted products
// Function to display sorted products with additional fields
// Function to display sorted products with additional fields
function displaySortedProducts(products, fieldsToDisplay) {
  const displayTableSection = document.getElementById('displayTableSection');
  displayTableSection.innerHTML = '';

  const table = document.createElement('table');
  const tableHeader = table.createTHead();
  const headerRow = tableHeader.insertRow();

  // Update the fields to display
  const fields = ['title', 'subcategory', 'price', 'popularity'];

  fieldsToDisplay.forEach(field => {
    const headerCell = document.createElement('th');
    headerCell.textContent = field;
    headerRow.appendChild(headerCell);
  });

  products.forEach(product => {
    const row = table.insertRow();
    fieldsToDisplay.forEach(field => {
      const cell = row.insertCell();
      cell.textContent = product[field];
    });
  });

  displayTableSection.appendChild(table);
}
