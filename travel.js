const tripsData = [
    {
        id: 1,
        destination: "Turkey",
        budget: 1200,
        duration: "7 Days",
        description: "Enjoy a blend of Ottoman culture and modernity in Istanbul and Antalya",
        features: ["4-Star Hotel", "Flight Tickets", "Sightseeing Tours", "Travel Insurance"],
        icon: "fas fa-mosque",
        color: "#FF6B6B"
    },
    {
        id: 2,
        destination: "Malaysia",
        budget: 1500,
        duration: "8 Days",
        description: "Discover Malaysian beauty from Kuala Lumpur to tropical islands",
        features: ["5-Star Hotel", "Flight Tickets", "Breakfast Included", "Airport Transfer"],
        icon: "fas fa-torii-gate",
        color: "#4ECDC4"
    },
    {
        id: 3,
        destination: "Dubai, UAE",
        budget: 2000,
        duration: "5 Days",
        description: "Experience luxury in Dubai with skyscrapers and golden beaches",
        features: ["5-Star Hotel", "Flight Tickets", "Luxury Transfer", "Burj Khalifa Tickets"],
        icon: "fas fa-building",
        color: "#45B7D1"
    },
    {
        id: 4,
        destination: "Egypt",
        budget: 800,
        duration: "6 Days",
        description: "Journey to the land of Pharaohs to explore pyramids and archaeological museums",
        features: ["3-Star Hotel", "Flight Tickets", "Archaeological Tours", "Tour Guide"],
        icon: "fas fa-landmark",
        color: "#FFA500"
    },
    {
        id: 5,
        destination: "Greece",
        budget: 1800,
        duration: "8 Days",
        description: "Discover the cradle of Western civilization with visits to Athens and Greek islands",
        features: ["4-Star Hotel", "Flight Tickets", "Historical Tours", "Cruise Trips"],
        icon: "fas fa-monument",
        color: "#96CEB4"
    },
    {
        id: 6,
        destination: "Italy",
        budget: 2200,
        duration: "9 Days",
        description: "Explore historical Rome, romantic Venice, and modern Milan",
        features: ["4-Star Hotel", "Flight Tickets", "Museum Tours", "Food Tasting"],
        icon: "fas fa-pizza-slice",
        color: "#FFEAA7"
    },
    {
        id: 7,
        destination: "Spain",
        budget: 1700,
        duration: "7 Days",
        description: "Unique experience between culture, art and Islamic architecture in Andalusia",
        features: ["4-Star Hotel", "Flight Tickets", "Barcelona Tours", "Flamenco Shows"],
        icon: "fas fa-guitar",
        color: "#DDA0DD"
    },
    {
        id: 8,
        destination: "Thailand",
        budget: 1000,
        duration: "10 Days",
        description: "Enjoy golden beaches and rich Thai culture",
        features: ["4-Star Hotel", "Flight Tickets", "Island Trips", "Thai Massage"],
        icon: "fas fa-umbrella-beach",
        color: "#98D8C8"
    },
    {
        id: 9,
        destination: "Japan",
        budget: 2800,
        duration: "10 Days",
        description: "Unique blend of ancient traditions and cutting-edge technology",
        features: ["4-Star Hotel", "Flight Tickets", "Shinkansen Ticket", "Temple Tours"],
        icon: "fas fa-torii-gate",
        color: "#F7DC6F"
    },
    {
        id: 10,
        destination: "South Korea",
        budget: 2400,
        duration: "8 Days",
        description: "Discover modern Seoul, K-pop culture, and delicious food",
        features: ["4-Star Hotel", "Flight Tickets", "Seoul Tours", "Food Tasting"],
        icon: "fas fa-landmark",
        color: "#BB8FCE"
    }
];

const destinationSelect = document.getElementById('destination');
const budgetSlider = document.getElementById('budget');
const budgetValue = document.getElementById('budget-value');
const searchButton = document.getElementById('search-button');
const resultsSection = document.getElementById('results-section');
const resultsGrid = document.getElementById('results-grid');
const resultsCount = document.getElementById('results-count');
const emptyState = document.getElementById('empty-state');
const showAllButton = document.getElementById('show-all-btn');

function createBackgroundDots() {
    const bgDots = document.getElementById('bg-dots');
    const dotsCount = 50;

    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';

        const size = Math.random() * 4 + 1;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;

        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;

        dot.style.opacity = Math.random() * 0.6 + 0.1;

        const duration = Math.random() * 20 + 10;
        dot.style.animationDuration = `${duration}s`;

        dot.style.animationDelay = `${Math.random() * 5}s`;

        bgDots.appendChild(dot);
    }
}

function formatBudget(value) {
    return '$' + parseInt(value).toLocaleString();
}

budgetSlider.addEventListener('input', function () {
    budgetValue.textContent = formatBudget(this.value);
});

function searchTrips() {
    const destination = destinationSelect.value;
    const budget = parseInt(budgetSlider.value);

    let filteredTrips;

    if (destination === 'all' || destination === '') {

        filteredTrips = tripsData.filter(trip => trip.budget <= budget);
    } else {

        filteredTrips = tripsData.filter(trip =>
            trip.destination.includes(destination) && trip.budget <= budget
        );
    }

    displayResults(filteredTrips);
}


function displayResults(trips) {
    resultsGrid.innerHTML = '';

    if (trips.length === 0) {
        resultsSection.style.display = 'block';
        emptyState.style.display = 'block';
        resultsCount.textContent = '0 results';
        return;
    }

    emptyState.style.display = 'none';
    resultsCount.textContent = `${trips.length} results`;

    trips.forEach(trip => {
        const card = document.createElement('div');
        card.className = 'destination-card';

        const savings = parseInt(budgetSlider.value) - trip.budget;
        const hasSavings = savings > 200;

        card.innerHTML = `
            ${hasSavings ? `<div class="card-badge">Save ${savings}$</div>` : ''}
            <div class="card-image" style="background: linear-gradient(135deg, ${trip.color}80, ${trip.color})">
                <i class="${trip.icon}"></i>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${trip.destination}</h3>
                        <div class="card-duration">
                            <i class="far fa-calendar"></i> ${trip.duration}
                        </div>
                    </div>
                    <div class="card-budget">${formatBudget(trip.budget)}</div>
                </div>
                <p style="color: var(--gray); margin-bottom: 15px; line-height: 1.5;">${trip.description}</p>
                <ul class="card-features">
                    ${trip.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
                </ul>
                <button class="action-btn" onclick="showTripDetails('${trip.destination}', ${trip.budget})">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
            </div>
        `;

        resultsGrid.appendChild(card);
    });

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showAllTrips() {
    destinationSelect.value = 'all';
    searchTrips();
}


function showTripDetails(destination, budget) {
    const trip = tripsData.find(t => t.destination === destination);
    if (!trip) return;

    const message = `
        Trip Details to ${destination}:
        
        💰 Required Budget: ${formatBudget(budget)}
        📅 Suggested Duration: ${trip.duration}
        
        🎯 Included Features:
        ${trip.features.map(f => `• ${f}`).join('\n')}
        
        💡 Additional Tips:
        ${budgetSlider.value > budget + 500 ?
            'You can upgrade your hotel or add extra activities!' :
            'This trip fits perfectly within your budget!'}
        
        🎫 To Book: Check travel agencies or online booking websites.
    `;

    alert(message.replace(/\n\s*\n/g, '\n'));
}

const textInput = document.createElement('input');
textInput.type = 'text';
textInput.id = 'destination-text';
textInput.placeholder = 'Type any country or city name';
textInput.style.cssText = `
    width: 100%;
    padding: 16px 20px 16px 50px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    margin-top: 10px;
    display: none;
`;

destinationSelect.addEventListener('change', function () {
    if (this.value === '') {
        textInput.style.display = 'block';
        this.parentNode.appendChild(textInput);
    } else {
        textInput.style.display = 'none';
    }
});

searchButton.addEventListener('click', searchTrips);
showAllButton.addEventListener('click', showAllTrips);

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchTrips();
    }
});

window.addEventListener('load', function () {

    createBackgroundDots();


    budgetValue.textContent = formatBudget(budgetSlider.value);

    const randomTrips = [...tripsData]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .filter(trip => trip.budget <= parseInt(budgetSlider.value));

    if (randomTrips.length > 0) {
        displayResults(randomTrips);
    }
});