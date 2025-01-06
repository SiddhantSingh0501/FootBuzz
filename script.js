const API_CONFIG = {
    url: "https://example.com/api/live-scores", 
    token: "your_api_token_here" 
};

const mockData = [
    {
        league: "Liga Leumit",
        teamA: "Hapoel Ramat HaSharon",
        teamB: "Hapoel Umm al-Fahm",
        scoreA: Math.floor(Math.random() * 5),
        scoreB: Math.floor(Math.random() * 5),
        time: "30'"
    },
    {
        league: "1. Division",
        teamA: "Pafos",
        teamB: "AEL",
        scoreA: Math.floor(Math.random() * 5),
        scoreB: Math.floor(Math.random() * 5),
        time: "29'"
    },
    {
        league: "Friendlies Clubs",
        teamA: "Red Bull Salzburg",
        teamB: "Bayern München",
        scoreA: Math.floor(Math.random() * 5),
        scoreB: Math.floor(Math.random() * 5),
        time: "29'"
    }
];

async function fetchLiveScores() {
    if (API_CONFIG.url && API_CONFIG.token) {
        try {
            const response = await fetch(API_CONFIG.url, {
                headers: {
                    Authorization: `Bearer ${API_CONFIG.token}`
                }
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            const data = await response.json();
            return data.matches; 
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return mockData; 
        }
    } else {
        console.warn("API URL or token not configured. Using mock data.");
        return mockData;
    }
}

async function renderMatches() {
    const matches = await fetchLiveScores();
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = ""; 

    matches.forEach((match) => {
        const matchCard = document.createElement("div");
        matchCard.className = "match-card";

        matchCard.innerHTML = `
            <div class="match-info">
                <h3>${match.teamA} vs ${match.teamB}</h3>
                <div class="league">${match.league}</div>
                <div class="time">${match.time}</div>
            </div>
            <div class="scores">
                <div>${match.scoreA} - ${match.scoreB}</div>
            </div>
        `;

        scoreboard.appendChild(matchCard);
    });
}

setInterval(renderMatches, 5000);

renderMatches();
