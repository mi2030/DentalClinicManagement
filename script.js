document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
        });
    });

    const apiBase = 'http://localhost:3000';

    // Handle appointment form submission
    const appointmentForm = document.getElementById('appointment-form');
    const appointmentsList = document.getElementById('appointments-list');
    appointmentForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const patientName = document.getElementById('patient-name-appointment').value;
        const appointmentDate = document.getElementById('appointment-date').value;
        const appointmentTime = document.getElementById('appointment-time').value;

        try {
            const response = await fetch(`${apiBase}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patientName,
                    date: appointmentDate,
                    time: appointmentTime
                })
            });

            if (!response.ok) throw new Error('Failed to add appointment');
            
            const newAppointment = await response.json();
            const listItem = document.createElement('li');
            listItem.textContent = `${newAppointment.patientName} - ${new Date(newAppointment.date).toLocaleDateString()} at ${newAppointment.time}`;
            appointmentsList.appendChild(listItem);
            appointmentForm.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add appointment');
        }
    });

    // Handle patient form submission
    const patientForm = document.getElementById('patient-form');
    const patientsList = document.getElementById('patients-list');
    patientForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const patientName = document.getElementById('patient-name').value;
        const patientAge = document.getElementById('patient-age').value;
        const patientGender = document.getElementById('patient-gender').value;
        const patientContact = document.getElementById('patient-contact').value;
        const patientEmail = document.getElementById('patient-email').value;
        const patientAddress = document.getElementById('patient-address').value;
        const patientHistory = document.getElementById('patient-history').value;

        try {
            const response = await fetch(`${apiBase}/patients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: patientName,
                    age: patientAge,
                    gender: patientGender,
                    contact: patientContact,
                    email: patientEmail,
                    address: patientAddress,
                    history: patientHistory
                })
            });

            if (!response.ok) throw new Error('Failed to add patient');

            const newPatient = await response.json();
            const listItem = document.createElement('li');
            listItem.textContent = `Name: ${newPatient.name}, Age: ${newPatient.age}, Gender: ${newPatient.gender}, Contact: ${newPatient.contact}, Email: ${newPatient.email}, Address: ${newPatient.address}, History: ${newPatient.history}`;
            patientsList.appendChild(listItem);
            patientForm.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add patient');
        }
    });

    // Handle treatment plan form submission
    const treatmentForm = document.getElementById('treatment-form');
    const treatmentList = document.getElementById('treatment-list');
    treatmentForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const patientName = document.getElementById('patient-name-treatment').value;
        const treatmentDetails = document.getElementById('treatment-details').value;

        try {
            const response = await fetch(`${apiBase}/treatmentPlans`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patientName,
                    details: treatmentDetails
                })
            });

            if (!response.ok) throw new Error('Failed to add treatment plan');

            const newTreatmentPlan = await response.json();
            const listItem = document.createElement('li');
            listItem.textContent = `${newTreatmentPlan.patientName} - Treatment: ${newTreatmentPlan.details}`;
            treatmentList.appendChild(listItem);
            treatmentForm.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add treatment plan');
        }
    });

    // Handle print treatment plans
    const printButton = document.getElementById('print-treatment-plans');
    printButton.addEventListener('click', function() {
        const printContents = document.getElementById('treatment-list').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    });
});
