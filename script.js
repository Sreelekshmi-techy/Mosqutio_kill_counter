// ==========================================
// ZAPGUARD
// JavaScript Logic
// ==========================================


// ==========================================
// INITIAL DATA
// ==========================================

let totalKills = 127;
const dailyGoal = 150;

// Stores timestamps of zap events
let zapEvents = [];


// ==========================================
// PAGE NAVIGATION
// ==========================================

const navButtons = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("page-title");


navButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active state from buttons

        navButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Hide all pages

        pages.forEach((page) => {
            page.classList.remove("active-page");
        });


        // Get selected page

        const pageName = button.dataset.page;


        // Show selected page

        const selectedPage =
            document.getElementById(pageName);

        selectedPage.classList.add("active-page");


        // Update title

        const titles = {
            dashboard: "Dashboard",
            map: "Mosquito Risk Map",
            history: "Activity History",
            about: "About ZAPGUARD"
        };

        pageTitle.textContent = titles[pageName];

    });

});


// ==========================================
// ACTIVITY CHART
// ==========================================

const chartCanvas =
    document.getElementById("activityChart");


// Demo activity data

const activityData = [
    3,
    5,
    6,
    8,
    7,
    10,
    9,
    11,
    8,
    6,
    4,
    7
];


const activityChart = new Chart(chartCanvas, {

    type: "line",

    data: {

        labels: [
            "6 AM",
            "7 AM",
            "8 AM",
            "9 AM",
            "10 AM",
            "12 PM",
            "2 PM",
            "4 PM",
            "6 PM",
            "7 PM",
            "8 PM",
            "NOW"
        ],

        datasets: [{

            label: "Zap Activity",

            data: activityData,

            borderColor: "#8b5cf6",

            backgroundColor:
                "rgba(139, 92, 246, 0.12)",

            borderWidth: 3,

            tension: 0.4,

            fill: true,

            pointBackgroundColor:
                "#8b5cf6",

            pointRadius: 4,

            pointHoverRadius: 7

        }]

    },


    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            }

        },

        scales: {

            y: {

                beginAtZero: true,

                grid: {
                    color: "#eef0f4"
                },

                ticks: {
                    stepSize: 2
                }

            },

            x: {

                grid: {
                    display: false
                }

            }

        }

    }

});


// ==========================================
// SIMULATE ZAP
// ==========================================

const simulateButton =
    document.getElementById("simulate-zap");

const killCountElement =
    document.getElementById("kill-count");

const goalCurrentElement =
    document.getElementById("goal-current");

const goalProgressElement =
    document.getElementById("goal-progress");

const zapRateElement =
    document.getElementById("zap-rate");

const activityLevelElement =
    document.getElementById("activity-level");

const recentList =
    document.getElementById("recent-list");

const insightText =
    document.getElementById("insight-text");


// When button is clicked

simulateButton.addEventListener("click", () => {

    registerZap();

});


// ==========================================
// REGISTER A ZAP EVENT
// ==========================================

function registerZap() {

    // Increase kill count

    totalKills++;


    // Save timestamp

    zapEvents.push(Date.now());


    // Remove events older than 1 minute

    const oneMinuteAgo =
        Date.now() - 60000;

    zapEvents =
        zapEvents.filter(
            (time) => time > oneMinuteAgo
        );


    // Update interface

    updateDashboard();


    // Add new graph point

    updateChart();


    // Add recent activity

    addRecentActivity();


    // Button animation

    simulateButton.textContent =
        "✓ ZAP DETECTED!";

    setTimeout(() => {

        simulateButton.textContent =
            "⚡ Simulate Zap";

    }, 1000);

}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    // Update total kills

    killCountElement.textContent =
        totalKills;


    // Update goal

    goalCurrentElement.textContent =
        totalKills;


    // Calculate progress percentage

    let progress =
        (totalKills / dailyGoal) * 100;


    // Limit progress to 100%

    if (progress > 100) {
        progress = 100;
    }


    goalProgressElement.style.width =
        progress + "%";


    // Calculate zap rate

    const zapRate =
        zapEvents.length;


    zapRateElement.textContent =
        zapRate + "/min";


    // Calculate activity level

    updateActivityLevel(zapRate);

}


// ==========================================
// ACTIVITY LEVEL
// ==========================================

function updateActivityLevel(rate) {

    let level;
    let insight;


    if (rate >= 8) {

        level = "HIGH";

        insight =
            "High mosquito activity detected. The area may require increased monitoring.";

    }

    else if (rate >= 4) {

        level = "MODERATE";

        insight =
            "Moderate mosquito activity detected. Continue monitoring the area.";

    }

    else {

        level = "LOW";

        insight =
            "Mosquito activity is currently low.";

    }


    activityLevelElement.textContent =
        level;


    insightText.textContent =
        insight;

}


// ==========================================
// UPDATE CHART
// ==========================================

function updateChart() {

    // Add new random activity value

    const newValue =
        Math.floor(Math.random() * 6) + 5;


    // Remove first value

    activityChart.data.datasets[0].data.shift();


    // Add latest value

    activityChart.data.datasets[0].data.push(
        newValue
    );


    // Update chart

    activityChart.update();

}


// ==========================================
// ADD RECENT ACTIVITY
// ==========================================

function addRecentActivity() {

    // Create new activity element

    const newActivity =
        document.createElement("div");


    newActivity.classList.add(
        "activity-item"
    );


    newActivity.innerHTML = `

        <div class="activity-icon">
            ⚡
        </div>

        <div>

            <strong>
                New zap event detected
            </strong>

            <p>
                Just now
            </p>

        </div>

    `;


    // Add to top of list

    recentList.prepend(
        newActivity
    );


    // Keep only 5 activities

    while (
        recentList.children.length > 5
    ) {

        recentList.removeChild(
            recentList.lastChild
        );

    }

}


// ==========================================
// RISK MAP DATA
// ==========================================

const zoneData = {

    A: {
        activity: "LOW",
        emoji: "🟢",
        zaps: 12,
        risk: "Low",
        time: "6:00 AM"
    },

    B: {
        activity: "MODERATE",
        emoji: "🟡",
        zaps: 24,
        risk: "Moderate",
        time: "5:30 PM"
    },

    C: {
        activity: "HIGH",
        emoji: "🔴",
        zaps: 38,
        risk: "Elevated",
        time: "7:30 PM"
    },

    D: {
        activity: "LOW",
        emoji: "🟢",
        zaps: 9,
        risk: "Low",
        time: "8:00 AM"
    }

};


const zones =
    document.querySelectorAll(".zone");

const zoneName =
    document.getElementById("zone-name");

const zoneStatus =
    document.getElementById("zone-status");

const zoneZaps =
    document.getElementById("zone-zaps");

const zoneRisk =
    document.getElementById("zone-risk");

const zoneTime =
    document.getElementById("zone-time");


// Add click functionality

zones.forEach((zone) => {

    zone.addEventListener("click", () => {

        const zoneLetter =
            zone.dataset.zone;


        const data =
            zoneData[zoneLetter];


        // Update zone details

        zoneName.textContent =
            "Zone " + zoneLetter;


        zoneStatus.textContent =
            data.emoji +
            " " +
            data.activity +
            " ACTIVITY";


        zoneZaps.textContent =
            data.zaps;


        zoneRisk.textContent =
            data.risk;


        zoneTime.textContent =
            data.time;

    });

});


// ==========================================
// INITIALIZE DASHBOARD
// ==========================================

function initializeDashboard() {

    const progress =
        (totalKills / dailyGoal) * 100;


    goalProgressElement.style.width =
        progress + "%";

}


// Run when website loads

initializeDashboard();