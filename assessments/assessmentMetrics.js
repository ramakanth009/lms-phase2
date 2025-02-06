class AssessmentMetrics {
    constructor() {
        this.charts = {};
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        };
    }

    initialize() {
        console.log('Initializing AssessmentMetrics...');
        // Wait for DOM to be fully loaded
        setTimeout(() => {
            try {
                this.initializeSectionPerformance();
                this.initializeTimeDistribution();
                this.initializeQuestionPerformance();
                console.log('Charts initialized successfully');
            } catch (error) {
                console.error('Error initializing charts:', error);
            }
        }, 100);
    }

    initializeSectionPerformance() {
        const ctx = document.getElementById('sectionPerformance');
        if (!ctx) {
            console.error('Section Performance canvas not found');
            return;
        }
        console.log('Initializing Section Performance chart...');
        this.charts.sectionPerformance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['MCQ', 'Written', 'Coding'],
                datasets: [{
                    label: 'Score (%)',
                    data: [75, 60, 55],
                    backgroundColor: 'rgba(108, 99, 255, 0.7)',
                    borderColor: 'rgba(108, 99, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                ...this.chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    initializeTimeDistribution() {
        const ctx = document.getElementById('timeDistribution');
        if (!ctx) {
            console.error('Time Distribution canvas not found');
            return;
        }
        console.log('Initializing Time Distribution chart...');
        this.charts.timeDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['MCQ', 'Written', 'Coding'],
                datasets: [{
                    data: [30, 25, 20],
                    backgroundColor: [
                        'rgba(108, 99, 255, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(75, 192, 192, 0.7)'
                    ]
                }]
            },
            options: this.chartOptions
        });
    }

    initializeQuestionPerformance() {
        const ctx = document.getElementById('questionPerformance');
        if (!ctx) {
            console.error('Question Performance canvas not found');
            return;
        }
        console.log('Initializing Question Performance chart...');
        this.charts.questionPerformance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['JavaScript', 'React', 'Node.js', 'Database', 'System Design'],
                datasets: [{
                    label: 'Your Performance',
                    data: [80, 65, 70, 60, 55],
                    backgroundColor: 'rgba(108, 99, 255, 0.2)',
                    borderColor: 'rgba(108, 99, 255, 1)',
                    pointBackgroundColor: 'rgba(108, 99, 255, 1)'
                }]
            },
            options: {
                ...this.chartOptions,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    destroyCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
}

// Initialize metrics when this section becomes visible
document.addEventListener('DOMContentLoaded', () => {
    const metricsManager = new AssessmentMetrics();
    
    // Initialize immediately if the section is visible
    if (document.getElementById('assessment-metrics')?.offsetParent !== null) {
        console.log('Assessment metrics section is visible, initializing...');
        setTimeout(() => {
            metricsManager.initialize();
        }, 100);
    }

    // Also watch for visibility changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.style.display === 'block') {
                console.log('Assessment section became visible');
                setTimeout(() => {
                    metricsManager.initialize();
                }, 100);
            } else if (mutation.target.style.display === 'none') {
                console.log('Assessment section hidden, destroying charts');
                metricsManager.destroyCharts();
            }
        });
    });

    const assessmentSection = document.getElementById('assessments');
    if (assessmentSection) {
        observer.observe(assessmentSection, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
});
