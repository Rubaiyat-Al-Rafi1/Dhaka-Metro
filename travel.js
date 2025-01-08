// Complete fare chart data between stations
// Complete fare chart data between stations
const fareChart = {
    "Uttara North": {
        "Uttara North": 0, "Uttara Center": 20, "Uttara South": 30, "Pallabi": 40,
        "Mirpur 11": 50, "Mirpur 10": 60, "Kazipara": 70, "Shewrapara": 80,
        "Agargaon": 90, "Bijoy Sarani": 100, "Farmgate": 110, "Karwan Bazar": 120,
        "Shahbag": 130, "Dhaka University": 140, "Bangladesh Secretariat": 150, "Motijheel": 160
    },
    "Uttara Center": {
        "Uttara North": 20, "Uttara Center": 0, "Uttara South": 20, "Pallabi": 30,
        "Mirpur 11": 40, "Mirpur 10": 50, "Kazipara": 60, "Shewrapara": 70,
        "Agargaon": 80, "Bijoy Sarani": 90, "Farmgate": 100, "Karwan Bazar": 110,
        "Shahbag": 120, "Dhaka University": 130, "Bangladesh Secretariat": 140, "Motijheel": 150
    },
    "Uttara South": {
        "Uttara North": 30, "Uttara Center": 20, "Uttara South": 0, "Pallabi": 10,
        "Mirpur 11": 20, "Mirpur 10": 30, "Kazipara": 40, "Shewrapara": 50,
        "Agargaon": 60, "Bijoy Sarani": 70, "Farmgate": 80, "Karwan Bazar": 90,
        "Shahbag": 100, "Dhaka University": 110, "Bangladesh Secretariat": 120, "Motijheel": 130
    },
    "Pallabi": {
        "Uttara North": 40, "Uttara Center": 30, "Uttara South": 10, "Pallabi": 0,
        "Mirpur 11": 10, "Mirpur 10": 20, "Kazipara": 30, "Shewrapara": 40,
        "Agargaon": 50, "Bijoy Sarani": 60, "Farmgate": 70, "Karwan Bazar": 80,
        "Shahbag": 90, "Dhaka University": 100, "Bangladesh Secretariat": 110, "Motijheel": 120
    },
    "Mirpur 11": {
        "Uttara North": 50, "Uttara Center": 40, "Uttara South": 20, "Pallabi": 10,
        "Mirpur 11": 0, "Mirpur 10": 10, "Kazipara": 20, "Shewrapara": 30,
        "Agargaon": 40, "Bijoy Sarani": 50, "Farmgate": 60, "Karwan Bazar": 70,
        "Shahbag": 80, "Dhaka University": 90, "Bangladesh Secretariat": 100, "Motijheel": 110
    },
    "Mirpur 10": {
        "Uttara North": 60, "Uttara Center": 50, "Uttara South": 30, "Pallabi": 20,
        "Mirpur 11": 10, "Mirpur 10": 0, "Kazipara": 10, "Shewrapara": 20,
        "Agargaon": 30, "Bijoy Sarani": 40, "Farmgate": 50, "Karwan Bazar": 60,
        "Shahbag": 70, "Dhaka University": 80, "Bangladesh Secretariat": 90, "Motijheel": 100
    },
    "Kazipara": {
        "Uttara North": 70, "Uttara Center": 60, "Uttara South": 40, "Pallabi": 30,
        "Mirpur 11": 20, "Mirpur 10": 10, "Kazipara": 0, "Shewrapara": 10,
        "Agargaon": 20, "Bijoy Sarani": 30, "Farmgate": 40, "Karwan Bazar": 50,
        "Shahbag": 60, "Dhaka University": 70, "Bangladesh Secretariat": 80, "Motijheel": 90
    },
    "Shewrapara": {
        "Uttara North": 80, "Uttara Center": 70, "Uttara South": 50, "Pallabi": 40,
        "Mirpur 11": 30, "Mirpur 10": 20, "Kazipara": 10, "Shewrapara": 0,
        "Agargaon": 10, "Bijoy Sarani": 20, "Farmgate": 30, "Karwan Bazar": 40,
        "Shahbag": 50, "Dhaka University": 60, "Bangladesh Secretariat": 70, "Motijheel": 80
    },
    "Agargaon": {
        "Uttara North": 90, "Uttara Center": 80, "Uttara South": 60, "Pallabi": 50,
        "Mirpur 11": 40, "Mirpur 10": 30, "Kazipara": 20, "Shewrapara": 10,
        "Agargaon": 0, "Bijoy Sarani": 10, "Farmgate": 20, "Karwan Bazar": 30,
        "Shahbag": 40, "Dhaka University": 50, "Bangladesh Secretariat": 60, "Motijheel": 70
    },
    "Bijoy Sarani": {
        "Uttara North": 100, "Uttara Center": 90, "Uttara South": 70, "Pallabi": 60,
        "Mirpur 11": 50, "Mirpur 10": 40, "Kazipara": 30, "Shewrapara": 20,
        "Agargaon": 10, "Bijoy Sarani": 0, "Farmgate": 10, "Karwan Bazar": 20,
        "Shahbag": 30, "Dhaka University": 40, "Bangladesh Secretariat": 50, "Motijheel": 60
    },
    "Farmgate": {
        "Uttara North": 110, "Uttara Center": 100, "Uttara South": 90, "Pallabi": 80,
        "Mirpur 11": 70, "Mirpur 10": 60, "Kazipara": 50, "Shewrapara": 40,
        "Agargaon": 30, "Bijoy Sarani": 20, "Farmgate": 0, "Karwan Bazar": 10,
        "Shahbag": 20, "Dhaka University": 30, "Bangladesh Secretariat": 40, "Motijheel": 50
    },
    "Karwan Bazar": {
        "Uttara North": 120, "Uttara Center": 110, "Uttara South": 100, "Pallabi": 90,
        "Mirpur 11": 80, "Mirpur 10": 70, "Kazipara": 60, "Shewrapara": 50,
        "Agargaon": 40, "Bijoy Sarani": 30, "Farmgate": 20, "Karwan Bazar": 0,
        "Shahbag": 10, "Dhaka University": 20, "Bangladesh Secretariat": 30, "Motijheel": 40
    },
    "Shahbag": {
        "Uttara North": 130, "Uttara Center": 120, "Uttara South": 110, "Pallabi": 100,
        "Mirpur 11": 90, "Mirpur 10": 80, "Kazipara": 70, "Shewrapara": 60,
        "Agargaon": 50, "Bijoy Sarani": 40, "Farmgate": 30, "Karwan Bazar": 20,
        "Shahbag": 0, "Dhaka University": 10, "Bangladesh Secretariat": 20, "Motijheel": 30
    },
    "Dhaka University": {
        "Uttara North": 140, "Uttara Center": 130, "Uttara South": 120, "Pallabi": 110,
        "Mirpur 11": 100, "Mirpur 10": 90, "Kazipara": 80, "Shewrapara": 70,
        "Agargaon": 60, "Bijoy Sarani": 50, "Farmgate": 40, "Karwan Bazar": 30,
        "Shahbag": 20, "Dhaka University": 0, "Bangladesh Secretariat": 10, "Motijheel": 20
    },
    "Bangladesh Secretariat": {
        "Uttara North": 150, "Uttara Center": 140, "Uttara South": 130, "Pallabi": 120,
        "Mirpur 11": 110, "Mirpur 10": 100, "Kazipara": 90, "Shewrapara": 80,
        "Agargaon": 70, "Bijoy Sarani": 60, "Farmgate": 50, "Karwan Bazar": 40,
        "Shahbag": 30, "Dhaka University": 20, "Bangladesh Secretariat": 0, "Motijheel": 10
    },
    "Motijheel": {
        "Uttara North": 160, "Uttara Center": 150, "Uttara South": 140, "Pallabi": 130,
        "Mirpur 11": 120, "Mirpur 10": 110, "Kazipara": 100, "Shewrapara": 90,
        "Agargaon": 80, "Bijoy Sarani": 70, "Farmgate": 60, "Karwan Bazar": 50,
        "Shahbag": 40, "Dhaka University": 30, "Bangladesh Secretariat": 20, "Motijheel": 0
    }
};

// Functions for fare calculation, payment processing, and route image remain the same as in the previous code.

// Function to calculate fare
function calculateFare() {
    const fromStation = document.getElementById('current-station').value;
    const toStation = document.getElementById('destination-station').value;
    const fareDisplay = document.getElementById('fare-display');

    if (!fromStation || !toStation) {
        fareDisplay.innerText = 'Please select both stations.';
        return;
    }

    const fare = fareChart[fromStation]?.[toStation];

    fareDisplay.innerText = fare !== undefined ? `Fare: ${fare} tk` : 'Invalid station combination.';
}

// Function to handle proceeding to payment
function proceedToPayment() {
    const fromStation = document.getElementById('current-station').value;
    const toStation = document.getElementById('destination-station').value;
    const travelTime = document.getElementById('travel-time').value;
    const journeyDate = document.getElementById('journey-date').value;

    if (!fromStation || !toStation || !travelTime || !journeyDate) {
        alert('All fields are required.');
        return;
    }

    const fare = fareChart[fromStation]?.[toStation];

    if (fare === undefined) {
        alert('Invalid station combination.');
        return;
    }

    sessionStorage.setItem('fare', fare);
    sessionStorage.setItem('fromStation', fromStation);
    sessionStorage.setItem('toStation', toStation);
    sessionStorage.setItem('travelTime', travelTime);
    sessionStorage.setItem('journeyDate', journeyDate);

    window.location.href = 'payment.html';
}

// Function to show route image
function showRouteImage() {
    const route = document.getElementById('stations-root').value;
    const routeImage = document.getElementById('route-image');

    if (route) {
        routeImage.src = `images/${route.replace(/ /g, '_')}.jpg`;
        routeImage.classList.remove('hidden');
    } else {
        routeImage.classList.add('hidden');
    }
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('proceed-payment-btn')?.addEventListener('click', proceedToPayment);
    document.getElementById('stations-root')?.addEventListener('change', showRouteImage);
});
