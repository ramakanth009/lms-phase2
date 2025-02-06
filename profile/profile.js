function initializeProfile() {
    const editButton = document.getElementById('editButton');
    const form = document.getElementById('profileForm');
    const successMessage = document.getElementById('successMessage');
    let isEditing = false;

    if (!editButton || !form || !successMessage) {
        console.error('Required profile elements not found');
        return;
    }

    editButton.addEventListener('click', function() {
        const inputs = form.getElementsByTagName('input');
        
        if (!isEditing) {
            // Enable editing
            Array.from(inputs).forEach(input => {
                input.disabled = false;
                input.classList.remove('form-control-plaintext');
                input.classList.add('form-control', 'editing');
            });
            editButton.textContent = 'Save Changes';
            editButton.classList.add('saving');
        } else {
            // Save changes
            Array.from(inputs).forEach(input => {
                input.disabled = true;
                input.classList.remove('form-control', 'editing');
                input.classList.add('form-control-plaintext');
            });
            editButton.textContent = 'Edit Profile';
            editButton.classList.remove('saving');
            
            // Show success message
            successMessage.classList.remove('d-none');
            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 3000);
        }
        isEditing = !isEditing;
    });

    // Debug log
    console.log('Profile initialization complete');
}

// Call initialization when the profile section is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the profile section
    const profileSection = document.getElementById('profile');
    if (profileSection) {
        initializeProfile();
        initializeCalendar();
        initializeAttendanceChart();
        initializeAttendanceCircles();
        initializeSystemActivity(); // Add this line
    }

    // Add listener for navigation changes
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (this.getAttribute('data-target') === 'profile') {
                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    initializeProfile();
                    initializeCalendar();
                    initializeAttendanceChart();
                    initializeAttendanceCircles();
                    initializeSystemActivity(); // Add this line
                }, 100);
            }
        });
    });
});

// Calendar Initialization
function initializeCalendar() {
    const calendar = new AcademicCalendar();
    
    // Initialize navigation event listeners
    // initializeCalendarNavigation();
    
    // Initialize trends chart
    initializeAttendanceChart();
}

class AcademicCalendar {
    constructor() {
        // Ensure elements exist
        if (!document.getElementById('calendarDays')) {
            console.error('Calendar container not found');
            return;
        }

        this.currentDate = new Date();
        this.selectedMonth = new Date();
        this.activities = new Map();
        this.filters = new Set();
        this.viewMode = 'month'; // Add view mode tracking
        this.semesterData = {
            examSchedule: [
                {
                    type: "mid-term",
                    dates: [
                        { subject: "CS401", date: "2024-02-15", time: "10:00 AM" },
                        { subject: "CS402", date: "2024-02-20", time: "10:00 AM" },
                        { subject: "CS451", date: "2024-03-10", time: "02:00 PM" },
                        { subject: "CS452", date: "2024-03-15", time: "02:00 PM" }
                    ]
                },
                {
                    type: "final",
                    dates: [
                        { subject: "CS401", date: "2024-05-02", time: "10:00 AM" },
                        { subject: "CS402", date: "2024-05-05", time: "10:00 AM" },
                        { subject: "CS451", date: "2024-05-08", time: "02:00 PM" },
                        { subject: "CS452", date: "2024-05-10", time: "02:00 PM" }
                    ]
                }
            ],
            practicalSchedule: [
                { subject: "CS401 Lab", date: "2024-03-05", type: "lab-assessment" },
                { subject: "CS402 Lab", date: "2024-03-06", type: "lab-assessment" },
                { subject: "CS451 Lab", date: "2024-03-07", type: "lab-assessment" },
                { subject: "CS452 Lab", date: "2024-03-08", type: "lab-assessment" }
            ],
            projectReviews: [
                { phase: "Project Synopsis", date: "2024-01-15", type: "review" },
                { phase: "First Review", date: "2024-02-25", type: "review" },
                { phase: "Second Review", date: "2024-03-25", type: "review" },
                { phase: "Final Project", date: "2024-04-20", type: "review" }
            ],
            events: [
                { name: "Industry Expert Talk", date: "2024-01-20", type: "event" },
                { name: "Technical Symposium", date: "2024-02-10", type: "event" },
                { name: "Career Fair", date: "2024-03-20", type: "event" },
                { name: "Alumni Meet", date: "2024-04-15", type: "event" }
            ]
        };
        
        this.loadMockData();
        this.renderCalendar();
        this.attachEventListeners();
        this.initializeViewToggle();
    }

    renderCalendar() {
        const year = this.selectedMonth.getFullYear();
        const month = this.selectedMonth.getMonth();
        const currentMonth = document.getElementById('currentMonth');
        
        if (currentMonth) {
            currentMonth.textContent = this.selectedMonth.toLocaleString('default', { 
                month: 'long', 
                year: 'numeric' 
            });
        }

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        const calendarDays = document.getElementById('calendarDays');
        if (!calendarDays) return;

        calendarDays.innerHTML = '';

        // Add empty cells for days before the first day
        for (let i = 0; i < startingDay; i++) {
            calendarDays.appendChild(this.createDayElement());
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            calendarDays.appendChild(this.createDayElement(day));
        }
    }

    createDayElement(day = '') {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        if (day) {
            const date = new Date(
                this.selectedMonth.getFullYear(),
                this.selectedMonth.getMonth(),
                day
            );
            const dateString = date.toISOString().split('T')[0];

            dayElement.innerHTML = `
                <div class="day-number">${day}</div>
                <div class="day-indicator"></div>
            `;

            if (this.isToday(date)) {
                dayElement.classList.add('today');
            }

            // Add activity indicators
            if (this.activities.has(dateString)) {
                const indicators = dayElement.querySelector('.day-indicator');
                const activities = this.activities.get(dateString);
                activities.forEach(activity => {
                    if (!this.filters.size || this.filters.has(activity.type)) {
                        const dot = document.createElement('div');
                        dot.className = `indicator-dot ${activity.type}`;
                        indicators.appendChild(dot);
                    }
                });
            }
        }

        return dayElement;
    }

    loadMockData() {
        // Mock activities data
        const activities = [
            {
                date: '2025-02-15',
                type: 'exam',
                title: 'Mid-term Examination'
            },
            {
                date: '2025-02-20',
                type: 'event',
                title: 'Technical Symposium'
            },
            {
                date: '2025-02-22',
                type: 'practical',
                title: 'Lab Assessment'
            }
        ];

        // Generate attendance data
        const daysInMonth = new Date(2025, 2, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `2025-02-${String(day).padStart(2, '0')}`;
            if (!this.activities.has(date)) {
                this.activities.set(date, []);
            }

            if (Math.random() < 0.85) {
                this.activities.get(date).push({
                    type: 'present',
                    title: 'Present'
                });
            } else {
                this.activities.get(date).push({
                    type: 'absent',
                    title: 'Absent'
                });
            }
        }

        activities.forEach(activity => {
            if (!this.activities.has(activity.date)) {
                this.activities.set(activity.date, []);
            }
            this.activities.get(activity.date).push(activity);
        });
    }

    attachEventListeners() {
        const prevButton = document.getElementById('prevMonth');
        const nextButton = document.getElementById('nextMonth');

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                this.selectedMonth = new Date(
                    this.selectedMonth.getFullYear(),
                    this.selectedMonth.getMonth() - 1,
                    1
                );
                this.renderCalendar();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                this.selectedMonth = new Date(
                    this.selectedMonth.getFullYear(),
                    this.selectedMonth.getMonth() + 1,
                    1
                );
                this.renderCalendar();
            });
        }

        // Add filter handlers
        document.querySelectorAll('[data-filter]').forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                const filterType = e.target.dataset.filter;
                
                if (this.filters.has(filterType)) {
                    this.filters.delete(filterType);
                    e.target.classList.remove('active');
                } else {
                    this.filters.add(filterType);
                    e.target.classList.add('active');
                }
                
                if (this.viewMode === 'month') {
                    this.renderCalendar();
                } else {
                    this.loadAndRenderSemesterView();
                }
            });
        });
    }

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    initializeViewToggle() {
        const monthBtn = document.querySelector('button.btn-secondary');
        const semesterBtn = document.querySelector('button.btn-outline-secondary');
        
        monthBtn?.addEventListener('click', () => this.switchView('month'));
        semesterBtn?.addEventListener('click', () => this.switchView('semester'));
    }

    async switchView(mode) {
        this.viewMode = mode;
        const calendarSection = document.querySelector('.calendar-section');
        
        // Update button states
        document.querySelector('button.btn-secondary').classList.remove('active');
        document.querySelector('button.btn-outline-secondary').classList.remove('active');
        
        if (mode === 'month') {
            document.querySelector('button.btn-secondary').classList.add('active');
            calendarSection.classList.remove('semester-mode');
            this.renderCalendar();
            
            // Show navigation elements
            document.getElementById('prevMonth').style.display = 'block';
            document.getElementById('nextMonth').style.display = 'block';
        } else {
            document.querySelector('button.btn-outline-secondary').classList.add('active');
            calendarSection.classList.add('semester-mode');
            
            // Hide navigation elements
            document.getElementById('prevMonth').style.display = 'none';
            document.getElementById('nextMonth').style.display = 'none';
            
            await this.loadAndRenderSemesterView();
        }
    }

    async loadAndRenderSemesterView() {
        const calendarDays = document.getElementById('calendarDays');
        if (!calendarDays) return;

        // Create semester view
        const semesterView = this.createSemesterView();
        calendarDays.innerHTML = '';
        calendarDays.appendChild(semesterView);

        // Update calendar header
        const currentMonth = document.getElementById('currentMonth');
        if (currentMonth) {
            currentMonth.textContent = 'Final Year Academic Calendar (2023-24)';
        }
    }

    createSemesterView() {
        const container = document.createElement('div');
        container.className = 'semester-view';
        
        // 7th Semester Data
        const seventhSemester = {
            months: ['August', 'September', 'October', 'November', 'December'],
            events: {
                examSchedule: [
                    {
                        type: "mid-term",
                        dates: [
                            { subject: "CS701", date: "2023-09-15", time: "10:00 AM" },
                            { subject: "CS702", date: "2023-09-20", time: "10:00 AM" }
                        ]
                    },
                    {
                        type: "final",
                        dates: [
                            { subject: "CS701", date: "2023-12-05", time: "10:00 AM" },
                            { subject: "CS702", date: "2023-12-08", time: "10:00 AM" }
                        ]
                    }
                ],
                practicalSchedule: [
                    { subject: "CS701 Lab", date: "2023-10-05", type: "lab-assessment" },
                    { subject: "CS702 Lab", date: "2023-10-06", type: "lab-assessment" }
                ],
                projectReviews: [
                    { phase: "Project Topic Selection", date: "2023-08-20", type: "review" },
                    { phase: "Initial Review", date: "2023-10-15", type: "review" }
                ],
                events: [
                    { name: "Industrial Visit", date: "2023-09-10", type: "event" },
                    { name: "Workshop on ML", date: "2023-11-15", type: "event" }
                ]
            }
        };

        // 8th Semester Data (existing data)
        const eighthSemester = {
            months: ['January', 'February', 'March', 'April', 'May'],
            events: this.semesterData
        };

        // Create 7th Semester Block
        const seventhBlock = this.createSemesterBlock(
            '7th Semester',
            'Aug 2023 - Dec 2023',
            seventhSemester
        );

        // Create 8th Semester Block
        const eighthBlock = this.createSemesterBlock(
            '8th Semester',
            'Jan 2024 - May 2024',
            eighthSemester
        );

        container.appendChild(seventhBlock);
        container.appendChild(eighthBlock);

        // Add exam session info to December and May
        seventhSemester.events.examSchedule.push({
            type: "final-exams",
            dates: [
                { subject: "End Semester Examinations", date: "2023-12-15", time: "Main Session", note: "Dec 15-30: End Semester Examination Period" }
            ]
        });

        eighthSemester.events.examSchedule.push({
            type: "final-exams",
            dates: [
                { subject: "Final Year Project Submission", date: "2024-05-01", time: "10:00 AM" },
                { subject: "Final Year Project Viva", date: "2024-05-10", time: "09:00 AM" },
                { subject: "End Semester Examinations", date: "2024-05-15", time: "Main Session", note: "May 15-30: End Semester Examination Period" }
            ]
        });

        // Update upcoming activities
        const upcomingActivities = document.querySelector('.upcoming-activities .list-group');
        if (upcomingActivities) {
            upcomingActivities.innerHTML = `
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <div class="fw-medium">End Semester Preparation</div>
                        <small class="text-muted">Study Break Period</small>
                    </div>
                    <span class="badge bg-warning text-dark">Dec 1-14</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <div class="fw-medium">7th Semester Finals</div>
                        <small class="text-muted">End Semester Examinations</small>
                    </div>
                    <span class="badge bg-danger">Dec 15-30</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <div class="fw-medium">Project Dissertation</div>
                        <small class="text-muted">Final Documentation Submission</small>
                    </div>
                    <span class="badge bg-primary">May 1</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <div class="fw-medium">8th Semester Finals</div>
                        <small class="text-muted">Final Year Examinations</small>
                    </div>
                    <span class="badge bg-danger">May 15-30</span>
                </div>
            `;
        }

        return container;
    }

    createSemesterBlock(title, period, data) {
        const block = document.createElement('div');
        block.className = 'semester-block';

        block.innerHTML = `
            <div class="semester-header">
                <h3>${title}</h3>
                <p>${period}</p>
            </div>
            <div class="semester-months">
                ${data.months.map(month => `
                    <div class="semester-month">
                        <h3 class="month-title">${month}</h3>
                        <div class="month-content">
                            ${this.getMonthEventsForSemester(month, data.events)}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        return block;
    }

    getMonthEventsForSemester(month, semesterData) {
        const events = [];
        const monthNum = new Date(`${month} 1, 2024`).getMonth() + 1;
        const adjustedMonthNum = month === 'August' ? 8 :
                                month === 'September' ? 9 :
                                month === 'October' ? 10 :
                                month === 'November' ? 11 :
                                month === 'December' ? 12 : monthNum;

        // Process all event types
        ['examSchedule', 'practicalSchedule', 'projectReviews', 'events'].forEach(category => {
            const categoryData = semesterData[category];
            if (Array.isArray(categoryData)) {
                categoryData.forEach(item => {
                    const date = new Date(item.date);
                    if (date.getMonth() + 1 === adjustedMonthNum) {
                        events.push({
                            date: date.getDate(),
                            type: item.type || category.slice(0, -1),
                            name: item.subject || item.name || item.phase,
                            time: item.time || ''
                        });
                    }
                });
            }
        });

        // Sort events by date
        events.sort((a, b) => a.date - b.date);

        if (month === 'December') {
            events.push({
                date: 1,
                type: 'event',
                name: 'Study Break Begins',
                time: 'Dec 1-14'
            });
            events.push({
                date: 15,
                type: 'exam',
                name: 'End Semester Examinations Begin',
                time: 'Dec 15-30'
            });
        }
        
        if (month === 'May') {
            events.push({
                date: 1,
                type: 'review',
                name: 'Final Project Submission',
                time: '10:00 AM'
            });
            events.push({
                date: 10,
                type: 'review',
                name: 'Project Viva Voce',
                time: '09:00 AM'
            });
            events.push({
                date: 15,
                type: 'exam',
                name: 'Final Semester Examinations',
                time: 'May 15-30'
            });
        }

        return events.map(event => `
            <div class="semester-event ${event.type}">
                <span class="event-date">${event.date}</span>
                <div class="event-details">
                    <span class="event-name">${event.name}</span>
                    ${event.time ? `<span class="event-time">${event.time}</span>` : ''}
                </div>
            </div>
        `).join('');
    }
}

let attendanceChart;

function initializeAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    if (!ctx) return;

    if (attendanceChart) {
        attendanceChart.destroy(); // Destroy previous instance if it exists
    }

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Attendance %',
            data: [85, 92, 88, 90, 85],
            borderColor: '#6c5ce7',
            backgroundColor: 'rgba(108, 92, 231, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    const config = {
        type: 'line',
        data: data,
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
                    beginAtZero: false,
                    min: 60,
                    max: 100
                }
            }
        }
    };

    attendanceChart = new Chart(ctx, config);
}

function initializeAttendanceCircles() {
    const circles = document.querySelectorAll('.progress-ring-circle');
    const circumference = 2 * Math.PI * 54; // 54 is the radius

    circles.forEach(circle => {
        circle.style.strokeDasharray = circumference;
        
        // Get the percentage from the parent's class
        const statCircle = circle.closest('.stat-circle');
        const value = statCircle.querySelector('.stat-value').textContent;
        const percentage = parseFloat(value) / 100;
        
        // Animate the circle fill
        setTimeout(() => {
            circle.style.strokeDashoffset = circumference * (1 - percentage);
        }, 100);
    });
}

function initializeSystemActivity() {
    // Add animation class to all progress bars
    document.querySelectorAll('.progress-bar').forEach(bar => {
        // Get the width from the style attribute
        const width = bar.style.width;
        // Remove and re-add the animation to trigger it
        bar.style.animation = 'none';
        bar.offsetHeight; // Trigger reflow
        bar.style.animation = 'progressFill 1s ease-out forwards';
        bar.style.setProperty('--progress-width', width);
    });
}