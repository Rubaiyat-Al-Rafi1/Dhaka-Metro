// Save Ticket to History
const saveTicketToHistory = (ticketData) => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.push({
        ...ticketData,
        timestamp: new Date().toLocaleString(),
        qrCodeDataUrl: document.querySelector('#qr-code canvas').toDataURL('image/png'),
    });
    localStorage.setItem('tickets', JSON.stringify(tickets));
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

// Initialize Ticket Display
const initializeTicket = async () => {
    const ticketData = await fetchTicketData();
    displayTicketInfo(ticketData);
    generateQRCode(ticketData);

    document.getElementById('download-pdf-btn').onclick = () => downloadPDF(ticketData);
    document.getElementById('save-ticket-btn').onclick = () => {
        saveTicketToHistory(ticketData);
        alert('Ticket saved to history!');
    };
};

// Add Save Button on Ticket Page
document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-ticket-btn';
    saveBtn.className = 'button green-button';
    saveBtn.textContent = 'Save to History';
    document.getElementById('buttons-container').appendChild(saveBtn);
});

// Check session on page load
window.onload = checkSession;
