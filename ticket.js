// Check if the user is logged in
const checkSession = async () => {
    try {
        const response = await fetch('check_session.php');
        const data = await response.json();

        if (data.loggedIn) {
            document.getElementById('ticket-card').classList.remove('hidden');
            document.getElementById('buttons-container').classList.remove('hidden');
            document.getElementById('login-warning').classList.add('hidden');
            initializeTicket();
        } else {
            document.getElementById('login-warning').classList.remove('hidden');
            document.getElementById('ticket-card').classList.add('hidden');
            document.getElementById('buttons-container').classList.add('hidden');
        }
    } catch (error) {
        console.error('Error checking session:', error);
        document.getElementById('login-warning').innerText = 'Unable to verify login status. Please try again later.';
        document.getElementById('login-warning').classList.remove('hidden');
    }
};

// Fetch Ticket Data from Session Storage
const fetchTicketData = async () => {
    const fromStation = sessionStorage.getItem('fromStation') || 'Unknown';
    const toStation = sessionStorage.getItem('toStation') || 'Unknown';
    const travelDate = sessionStorage.getItem('journeyDate') || 'Unknown';
    const travelTime = sessionStorage.getItem('travelTime') || 'Unknown';
    const fare = sessionStorage.getItem('fare') || '0 tk';

    return {
        journey: `${fromStation} to ${toStation}`,
        date: travelDate,
        time: travelTime,
        seat: "Auto Assigned",
        fare: fare,
        ticketId: generateTicketID()
    };
};

// Generate a Unique Ticket ID
const generateTicketID = () => {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `DM${randomPart}${timestamp.toString().slice(-4)}`;
};

// Display Ticket Information
const displayTicketInfo = (ticketData) => {
    const infoDiv = document.getElementById('ticket-info');
    infoDiv.innerHTML = `
        <p><strong>Journey:</strong> ${ticketData.journey}</p>
        <p><strong>Date:</strong> ${ticketData.date}</p>
        <p><strong>Time:</strong> ${ticketData.time}</p>
        <p><strong>Seat:</strong> ${ticketData.seat}</p>
        <p><strong>Fare:</strong> ${ticketData.fare}</p>
        <p><strong>Ticket ID:</strong> ${ticketData.ticketId}</p>
    `;
};

// Generate QR Code
const generateQRCode = (ticketData) => {
    const qrDiv = document.getElementById('qr-code');
    qrDiv.innerHTML = ""; // Clear any existing QR code
    new QRCode(qrDiv, {
        text: JSON.stringify(ticketData),
        width: 100,
        height: 100
    });
};

// Download Ticket as PDF
const downloadPDF = async (ticketData) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Dhaka Metro - Ticket", 20, 20);
    doc.text(`Journey: ${ticketData.journey}`, 20, 40);
    doc.text(`Date: ${ticketData.date}`, 20, 50);
    doc.text(`Time: ${ticketData.time}`, 20, 60);
    doc.text(`Seat: ${ticketData.seat}`, 20, 70);
    doc.text(`Fare: ${ticketData.fare}`, 20, 80);
    doc.text(`Ticket ID: ${ticketData.ticketId}`, 20, 90);

    const qrCanvas = document.querySelector('#qr-code canvas');
    if (qrCanvas) {
        const imgData = qrCanvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 150, 30, 50, 50);
    }

    doc.save("ticket.pdf");
};

// Initialize Ticket Display
const initializeTicket = async () => {
    const ticketData = await fetchTicketData();
    displayTicketInfo(ticketData);
    generateQRCode(ticketData);

    document.getElementById('download-pdf-btn').onclick = () => downloadPDF(ticketData);
};

// Check session on page load
window.onload = checkSession;
