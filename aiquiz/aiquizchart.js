// Update initializeCharts function with better error handling
function initializeCharts() {
    console.log('Initializing charts...');
    console.log('Initializing charts...');
    
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not found! Charts cannot be initialized.');
        return;
    }

    // Check if canvas elements exist
    const canvasIds = ['successRateChart', 'failureRateChart', 'improvementAreasChart', 'overallProgressChart'];
    const missingCanvases = canvasIds.filter(id => !document.getElementById(id));
    
    if (missingCanvases.length > 0) {
        console.error('Missing canvas elements:', missingCanvases);
        return;
    }

    try {
        // Clear any existing charts
        canvasIds.forEach(id => {
            const existingChart = Chart.getChart(id);
            if (existingChart) {
                existingChart.destroy();
            }
        });

        // Initialize each chart with error handling
        initializeSuccessRateChart();
        initializeFailureRateChart();
        initializeImprovementAreasChart();
        initializeOverallProgressChart();
        
        // Initialize insights
        initializePerformanceInsights();
        
        console.log('All charts and insights initialized successfully');
    } catch (error) {
        console.error('Error in initialization:', error);
    }
}

// Add individual chart initialization functions
function initializeSuccessRateChart() {
    const ctx = document.getElementById('successRateChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Success Rate',
                data: [65, 75, 80, 85, 90],
                borderColor: '#48bb78',
                backgroundColor: 'rgba(72, 187, 120, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function initializeFailureRateChart() {
    const ctx = document.getElementById('failureRateChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Failure Rate',
                data: [35, 25, 20, 15, 10],
                borderColor: '#f56565',
                backgroundColor: 'rgba(245, 101, 101, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function initializeImprovementAreasChart() {
    const ctx = document.getElementById('improvementAreasChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['JavaScript', 'React', 'HTML', 'CSS', 'Data Structures', 'Algorithms'],
            datasets: [{
                label: 'Performance Score',
                data: [75, 65, 25, 35, 70, 85],
                backgroundColor: '#4299e1',
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function initializeOverallProgressChart() {
    const ctx = document.getElementById('overallProgressChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Overall Progress',
                data: [60, 70, 75, 82, 90],
                borderColor: '#6c5ce7',
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Add this function after initializeOverallProgressChart
function initializePerformanceInsights() {
    const insights = [
        {
            icon: '📈',
            text: 'Your success rate has improved by 25% in the last 5 months',
            color: 'text-success'
        },
        {
            icon: '🎯',
            text: 'React and HTML/CSS are your strongest subjects',
            color: 'text-primary'
        },
        {
            icon: '🚀',
            text: 'Focus on improving Algorithms and Data Structures',
            color: 'text-warning'
        },
        {
            icon: '💡',
            text: 'Consistent monthly progress shows great learning potential',
            color: 'text-info'
        }
    ];

    const insightsContainer = document.getElementById('performanceInsights');
    if (insightsContainer) {
        insightsContainer.innerHTML = insights.map(insight => `
            <li class="list-group-item d-flex align-items-center">
                <span class="insight-icon ${insight.color} me-3">${insight.icon}</span>
                <span>${insight.text}</span>
            </li>
        `).join('');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // ...existing code...
    
    // Add chart initialization when AI Quiz section is shown
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", function(e) {
            if (this.getAttribute("data-target") === "aiquiz") {
                console.log('AI Quiz section activated');
                setTimeout(initializeCharts, 300);
            }
        });
    });
});