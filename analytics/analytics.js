class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.initialize();
    }

    initialize() {
        this.initializeCharts();
        this.initializeEventListeners();
        this.loadAnalyticsData();
    }

    initializeCharts() {
        // Skill Progress Timeline
        this.initializeSkillProgressChart();
        
        // Performance Distribution
        this.initializePerformanceDistChart();
        
        // Learning Pattern
        this.initializeLearningPatternChart();
        
        // Initialize progress rings
        this.initializeProgressRings();
    }

    initializeSkillProgressChart() {
        const ctx = document.getElementById('skillProgressChart');
        if (!ctx) return;

        this.charts.skillProgress = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Frontend',
                    data: [65, 70, 75, 80, 85, 90],
                    borderColor: '#6c5ce7',
                    tension: 0.4
                }, {
                    label: 'Backend',
                    data: [45, 52, 60, 65, 70, 75],
                    borderColor: '#00cec9',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    initializePerformanceDistChart() {
        const ctx = document.getElementById('performanceDistribution');
        if (!ctx) return;

        this.charts.performanceDist = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Technical Skills', 'Problem Solving', 'Communication', 'Team Work', 'Project Management'],
                datasets: [{
                    label: 'Current Level',
                    data: [85, 75, 80, 70, 65],
                    backgroundColor: 'rgba(108, 92, 231, 0.2)',
                    borderColor: '#6c5ce7',
                    pointBackgroundColor: '#6c5ce7'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    initializeLearningPatternChart() {
        const ctx = document.getElementById('learningPattern');
        if (!ctx) return;

        this.charts.learningPattern = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Hours Spent',
                    data: [4.5, 5, 3.5, 4, 5.5, 3, 2],
                    backgroundColor: '#6c5ce7'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    initializeProgressRings() {
        document.querySelectorAll('.progress-ring-circle').forEach(circle => {
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const percent = parseFloat(circle.closest('.metric-card')
                .querySelector('.metric-value').textContent);

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
        });
    }

    initializeEventListeners() {
        // Time range selector
        const timeSelector = document.querySelector('.header-actions select');
        if (timeSelector) {
            timeSelector.addEventListener('change', (e) => {
                this.updateChartTimeRange(e.target.value);
            });
        }

        // Add hover effects for skill items
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseover', () => {
                const progressBar = item.querySelector('.progress-bar');
                progressBar.style.transform = 'scaleX(1.02)';
            });

            item.addEventListener('mouseout', () => {
                const progressBar = item.querySelector('.progress-bar');
                progressBar.style.transform = 'scaleX(1)';
            });
        });
    }

    updateChartTimeRange(range) {
        // Update charts based on selected time range
        this.loadAnalyticsData(range);
    }

    loadAnalyticsData(timeRange = 'last6months') {
        // Simulate API call to fetch analytics data
        setTimeout(() => {
            // Update charts with new data
            this.updateChartsWithNewData();
        }, 500);
    }

    updateChartsWithNewData() {
        // Update each chart with new data
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.update();
            }
        });
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new AnalyticsDashboard();
});
