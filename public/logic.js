// app.js
async function fetchData(url, method, data) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

async function loadVehicles() {
    fetchData('/api/vehicles', 'GET')
        .then(data => {
            const vehiclesList = document.getElementById('vehicles-list');
            vehiclesList.innerHTML = '';

            data.forEach(vehicle => {
                const vehicleDiv = document.createElement('div');
                vehicleDiv.innerHTML = `
                    <p>Description: ${vehicle.description}</p>
                    <p>Total Distance Travelled: ${vehicle.total_distance}</p>
                    <p>Total Fuel Spent: ${vehicle.total_fuel_spent}</p>
                    <p>Fuel Consumption: ${vehicle.fuel_consumption}</p>
                `;
                vehiclesList.appendChild(vehicleDiv);
            });
        })
        .catch(error => console.error('Error loading vehicles:', error));
}

async function addVehicle(description) {
    fetchData('/api/vehicle', 'POST', { description })
        .then(() => {
            loadVehicles();
            // Optionally: Clear input fields or navigate to the list page
        })
        .catch(error => console.error('Error adding vehicle:', error));
}

async function recordRefuel(vehicleId, amountPaid, liters, distance, filledUp) {
    fetchData('/api/refuel', 'POST', { vehicleId, amountPaid, liters, distance, filledUp })
        .then(() => {
            loadVehicles();
            // Optionally: Clear input fields or navigate to the list page
        })
        .catch(error => console.error('Error recording refuel:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadVehicles();
});
