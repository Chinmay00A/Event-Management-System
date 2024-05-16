function searchEvents() {
    const selectedMonth = document.getElementById('monthSelect').value;
    const url = selectedMonth ? `/events?month=${selectedMonth}` : '/events';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
       
        displayEvents(data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }
  
  function displayEvents(events) {
    const eventTableBody = document.getElementById('eventTableBody');
    eventTableBody.innerHTML = '';
  
    events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.title}</td>
        <td>${event.date}</td>
        <td>${event.time}</td>
        <td>${event.location}</td>
        <td><button onclick="deleteEvent(${event.id})">Delete</button></td>
      `;
      eventTableBody.appendChild(row);
    });
  }
  