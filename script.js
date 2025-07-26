// Load students from localStorage on page load
window.onload = function () {
    loadStudents();
  };
  
  // Add new student to the table and localStorage
  function addStudent() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const studentClass = document.getElementById('class').value;
    const roll = document.getElementById('roll').value;
  
    if (!name || !id || !studentClass || !roll) {
      alert("Please fill in all fields.");
      return;
    }
  
    const student = { name, id, studentClass, roll };
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
  
    appendRow(student, students.length - 1);
    clearForm();
  }
  
  // Display students from localStorage
  function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach((student, index) => appendRow(student, index));
  }
  
  // Append row to the table
  function appendRow(student, index) {
    const table = document.getElementById('studentTable');
    const row = table.insertRow();
  
    row.insertCell(0).innerText = student.name;
    row.insertCell(1).innerText = student.id;
    row.insertCell(2).innerText = student.studentClass;
    row.insertCell(3).innerText = student.roll;
  
    const actions = row.insertCell(4);
    actions.classList.add('actions');
  
    const resetBtn = document.createElement('button');
    resetBtn.innerText = 'Reset';
    resetBtn.onclick = () => resetRow(index);
    actions.appendChild(resetBtn);
  
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = () => deleteRow(index);
    actions.appendChild(deleteBtn);
  }
  
  // Reset student data in the row and localStorage
  function resetRow(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students[index] = { name: '', id: '', studentClass: '', roll: '' };
    localStorage.setItem('students', JSON.stringify(students));
    refreshTable();
  }
  
  // Delete student from table and localStorage
  function deleteRow(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    refreshTable();
  }
  
  // Clear input form
  function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('id').value = '';
    document.getElementById('class').value = '';
    document.getElementById('roll').value = '';
  }
  
  // Re-render the entire table
  function refreshTable() {
    document.getElementById('studentTable').innerHTML = '';
    loadStudents();
  }