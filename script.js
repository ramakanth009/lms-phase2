// Section paths configuration
const sectionPaths = {
    'dashboard': 'dashboard/dashboard.html',
    'profile': 'profile/profile.html',
    'curriculum': 'curriculam/curriculam.html',
    'rolecontent': 'curriculam/rolecontent.html',
    'assessments': 'assessments/assessments.html',
    'ai-quiz': 'aiquiz/aiquiz.html',
    'blog': 'blog/blog.html',
    'gigalibrary': 'gigalibrary/gigalibrary.html',
    'analytics': 'analytics/analytics.html'
};

// Main initialization function
async function initializeApplication() {
    // Load content for each section
    for (const [id, path] of Object.entries(sectionPaths)) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const content = await response.text();
            document.getElementById(id.replace('-', '')).innerHTML = content;
        } catch (error) {
            console.error(`Error loading ${id}:`, error);
        }
    }

    // Initialize all components
    initializeNavigation();
    initializeDashboard();
    initializeCurriculum();
    initializeAssessment();
    initializeQuiz();
    initializeBlog();
    initializeAnalytics();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApplication);

// Add calendar initialization when profile section is shown
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function(e) {
        if (this.getAttribute("data-target") === "profile") {
            setTimeout(initializeCalendarSection, 100);
        }
    });
});
// });
// Navigation Functionality
function initializeNavigation() {
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const target = this.getAttribute("data-target");
            
            // Hide all sections
            document.querySelectorAll(".main-content > div").forEach((section) => {
                section.style.display = "none";
            });
            
            // Show target section
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.style.display = "block";
                // Initialize metrics if this is the assessments section
                if (target === 'assessments') {
                    const metricsManager = new AssessmentMetrics();
                    setTimeout(() => metricsManager.initialize(), 100);
                }
            }
            
            // Update active state
            document.querySelectorAll(".nav-link").forEach((nav) => {
                nav.classList.remove("active");
            });
            this.classList.add("active");
        });
    });
}

// Dashboard Initialization
function initializeDashboard() {
  // Metric Value Animation
  document.querySelectorAll('.metric-value').forEach(metric => {
      const target = parseInt(metric.textContent);
      let count = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      function updateCount() {
          if (count < target) {
              count += increment;
              metric.textContent = Math.round(count) + '%';
              requestAnimationFrame(updateCount);
          } else {
              metric.textContent = target + '%';
          }
      }
      updateCount();
  });

  // Progress Ring Animation
  document.querySelectorAll('.progress-ring-circle').forEach(circle => {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const percent = 75;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
  });
}



// Helper function to generate role HTML
// function generateRoleHTML(content) {
//     return `
//         <div class="role-card">
//             <div class="role-header">
//                 <h2 class="role-title">Job Title: ${content.title || "Role Title Not Available"}</h2>
//             </div>
//             ${content.note ? `<div class="role-note"><i class="fas fa-info-circle"></i> ${content.note}</div>` : ""}
//             ${content.description ? `
//                 <div class="description-section mb-4">
//                     <h4 class="mb-2">Job Description</h4>
//                     <p>${content.description}</p>
//                 </div>` : ""
//             }
//             ${content.sectionDescription ? `
//                 <div class="section-description mb-4">
//                     <h4 class="mb-2">Overview</h4>
//                     <p>${content.sectionDescription}</p>
//                 </div>` : ""
//             }
//             <div class="skills-section">
//                 <h4 class="mb-3">Required Skills</h4>
//                 <div class="skills-container">
//                     ${content.skills.map(skill => `
//                         <div class="skill-badge">
//                             <i class="fas fa-check-circle"></i>
//                             ${skill}
//                         </div>
//                     `).join("")}
//                 </div>
//             </div>
//         </div>`;
// }


// Update initializeAssessment function
function initializeAssessment() {
    // Add assessment initialization logic
    document.getElementById('timer').textContent = '90:00';
    
    if (document.getElementById('assessment-intro')) {
        document.getElementById('assessment-intro').style.display = 'block';
    }
    if (document.getElementById('main-assessment')) {
        document.getElementById('main-assessment').style.display = 'none';
    }
}

// Add Assessment Event Handlers
function startAssessment() {
    if (document.getElementById('assessment-intro')) {
        document.getElementById('assessment-intro').style.display = 'none';
    }
    if (document.getElementById('main-assessment')) {
        document.getElementById('main-assessment').style.display = 'block';
        startTimer();
    }
}

let timer;
let timeLeft = 5400; // 90 minutes in seconds

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        if (document.getElementById('timer')) {
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAssessment();
        }
    }, 1000);
}

// Update existing functions
function selectOption(option) {
    const options = option.parentElement.getElementsByClassName('assessment-option');
    Array.from(options).forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
}

function nextSection(section) {
    document.querySelectorAll('.assessment-section').forEach(sect => {
        sect.style.display = 'none';
    });
    
    const targetSection = document.getElementById(`${section}Section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('active');
        if (step.dataset.step === section) {
            step.classList.add('active');
        }
    });
}

function submitAssessment() {
    clearInterval(timer);
    alert('Assessment submitted successfully!');
    // Reset timer and sections
    timeLeft = 5400;
    document.getElementById('timer').textContent = '90:00';
    document.getElementById('assessment-intro').style.display = 'block';
    document.getElementById('main-assessment').style.display = 'none';
}

// Quiz Functionality
function initializeQuiz() {
    if (typeof QuizManager === 'undefined') {
        console.error('QuizManager not loaded');
        return;
    }
    const quizManager = new QuizManager();
}

function initializeAnalytics() {
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", function(e) {
            if (this.getAttribute("data-target") === "analytics") {
                setTimeout(() => {
                    new AnalyticsDashboard();
                }, 100);
            }
        });
    });
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    const isVisible = dropdown.style.display === 'block';
    
    // Hide all dropdowns first
    hideAllDropdowns();
    
    // Toggle current dropdown
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// User Menu Toggle Function
function toggleUserMenu() {
    const dropdown = document.getElementById('userMenuDropdown');
    const isVisible = dropdown.style.display === 'block';
    
    // Hide all dropdowns first
    hideAllDropdowns();
    
    // Toggle current dropdown
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// Hide all dropdowns
function hideAllDropdowns() {
    const dropdowns = document.querySelectorAll('.notification-dropdown, .profile-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const notificationContainer = document.querySelector('.notification-container');
    const userProfile = document.querySelector('.user-profile');
    
    if (!notificationContainer.contains(event.target) && !userProfile.contains(event.target)) {
        hideAllDropdowns();
    }
});

// Mark all notifications as read
document.querySelector('.mark-all-read').addEventListener('click', function() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
        item.classList.remove('unread');
    });
    
    // Update notification badge
    document.querySelector('.notification-badge').style.display = 'none';
});

// Initialize notification items click handler
document.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.remove('unread');
        updateNotificationBadge();
    });
});

// Update notification badge count
function updateNotificationBadge() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.notification-badge');
    
    if (unreadCount === 0) {
        badge.style.display = 'none';
    } else {
        badge.style.display = 'block';
        badge.textContent = unreadCount;
    }
}

// In script.js
function initializeCurriculum() {
    if (document.querySelector('.curriculum-container')) {
        new RoleContentManager();
    }
}