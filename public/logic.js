// logic.js
async function fetchData(url, method, data) {
    const response = await axios.get('https://fuel-consumption-api.onrender.com/api/vehicles', {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

async function loadVehicles() {
    axios.get('https://fuel-consumption-api.onrender.com/api/vehicles')
        .then(data => {
            console.log(data);
            const vehiclesList = document.getElementById('vehicles-list');
            vehiclesList.innerHTML = '';

            data.forEach(vehicle => {
                const vehicleDiv = document.createElement('div');
                vehicleDiv.innerHTML = `
                    <p>Description: ${vehicle.description}</p>
                    <p>reg_number: ${vehicle.reg_number}</p>
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
    axios.post('https://fuel-consumption-api.onrender.com/api/vehicle', 'POST', { description })
        .then(() => {
            loadVehicles();

        })
        .catch(error => console.error('Error adding vehicle:', error));
}

async function recordRefuel(vehicleId, amountPaid, liters, distance, filledUp) {
    axios.post('https://fuel-consumption-api.onrender.com/api/refuel', 'POST', { vehicleId, amountPaid, liters, distance, filledUp })
        .then(() => {
            loadVehicles();

        })
        .catch(error => console.error('Error recording refuel:', error));
}

document.addEventListener('alpine:init', () => {
    Alpine.data(loadVehicles(),logic);
});

