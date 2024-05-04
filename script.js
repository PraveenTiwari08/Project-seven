// Static array of student data
const studentsData = [
  {
      "id": 1,
      "first_name": "Raj",
      "last_name": "Thakur",
      "email": "john.doe@example.com",
      "gender": "male",
      "class": 12,
      "marks": 85,
      "passing": false,
      "image": "https://randomuser.me/api/portraits/men/1.jpg"
  },  {
    "id": 1,
    "first_name": "Shailendra",
    "last_name": "Thakur",
    "email": "john.doe@example.com",
    "gender": "male",
    "class": 10,
    "marks": 92,
    "passing": true,
    "image": "https://randomuser.me/api/portraits/men/1.jpg"
},  {
  "id": 1,
  "first_name": "Sourabh",
  "last_name": "Bansotiya",
  "email": "john.doe@example.com",
  "gender": "male",
  "class": 11,
  "marks": 67,
  "passing": false,
  "image": "https://randomuser.me/api/portraits/men/1.jpg"
},
  // Add more student data here...
];

// Store original data for resetting purposes
let originalData = [...studentsData];

// Display students initially
displayStudents(studentsData);

function displayStudents(data) {
  // Function to display students in a table
  const table = document.getElementById('studentsTable');
  // Clear existing table
  table.innerHTML = '';
  // Create table headers
  const headers = ['Image', 'Name', 'Email', 'Marks', 'Passing', 'Class'];
  const headerRow = document.createElement('div');
  headerRow.classList.add('row', 'header');
  headers.forEach(headerText => {
      const header = document.createElement('div');
      header.textContent = headerText;
      headerRow.appendChild(header);
  });
  table.appendChild(headerRow);
  // Create table rows
  data.forEach(student => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.innerHTML = `
          <div><img src="${student.image}" alt="${student.first_name}"></div>
          <div>${student.first_name} ${student.last_name}</div>
          <div>${student.email}</div>
          <div>${student.marks}</div>
          <div>${student.passing ? 'Passing' : 'Failed'}</div>
          <div>${student.class}</div>
      `;
      table.appendChild(row);
  });
}

function search() {
  // Function to filter data based on search input
  const searchInput = document.getElementById('search').value.toLowerCase();
  const filteredData = originalData.filter(student =>
      student.first_name.toLowerCase().includes(searchInput) ||
      student.last_name.toLowerCase().includes(searchInput) ||
      student.email.toLowerCase().includes(searchInput)
  );
  displayStudents(filteredData);
}

function sort(criteria, reverse = false) {
  // Function to sort data based on given criteria
  let sortedData = [...originalData];
  switch (criteria) {
      case 'name':
          sortedData.sort((a, b) => {
              let nameA = a.first_name + ' ' + a.last_name;
              let nameB = b.first_name + ' ' + b.last_name;
              return reverse ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
          });
          break;
      case 'marks':
          sortedData.sort((a, b) => reverse ? b.marks - a.marks : a.marks - b.marks);
          break;
      case 'passing':
          sortedData = sortedData.filter(student => student.passing);
          break;
      case 'class':
          sortedData.sort((a, b) => reverse ? b.class - a.class : a.class - b.class);
          break;
  }
  displayStudents(sortedData);
}

function showGenderTables() {
  // Function to display separate tables for male and female students
  const maleStudents = originalData.filter(student => student.gender === 'male');
  const femaleStudents = originalData.filter(student => student.gender === 'female');
  const maleTable = createTable(maleStudents, 'Male Students');
  const femaleTable = createTable(femaleStudents, 'Female Students');
  const genderTables = document.createElement('div');
  genderTables.appendChild(maleTable);
  genderTables.appendChild(femaleTable);
  document.getElementById('studentsTable').innerHTML = '';
  document.getElementById('studentsTable').appendChild(genderTables);
}

function createTable(data, title) {
  // Function to create a table
  const table = document.createElement('div');
  table.innerHTML = `<h2>${title}</h2>`;
  data.forEach(student => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.innerHTML = `
          <div><img src="${student.image}" alt="${student.first_name}"></div>
          <div>${student.first_name} ${student.last_name}</div>
          <div>${student.email}</div>
          <div>${student.marks}</div>
          <div>${student.passing ? 'Passing' : 'Failed'}</div>
          <div>${student.class}</div>
      `;
      table.appendChild(row);
  });
  return table;
}
