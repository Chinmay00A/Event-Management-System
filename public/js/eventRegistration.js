// eventRegistration.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("event-form");

  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const eventDetails = document.getElementById('details').value;
      const eventDate = document.getElementById('date').value;
      const eventTime = document.getElementById('time').value;
      const location = document.getElementById('location').value;
      

      const eventData = {
          eventDetails: eventDetails,
          eventDate: eventDate,
          eventTime: eventTime,
          location: location
      };

      try {
          const response = await fetch("http://localhost:5500/EventRegistation", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(eventData)
          });
          console.log(eventData);
          if (response.ok) {
              window.location.href = 'http://localhost:5500/dashboard.html'
          } else {
              console.error("Error sending event data:", response.status);
          }
      } catch (error) {
          console.error("Error sending event data:", error);
      }
  });
});
