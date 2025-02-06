document.addEventListener('DOMContentLoaded', function() {
    // Initialize metrics animation
    animateMetrics();
    
    // Initialize bookmarks
    initializeBookmarks();
});

function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    
    metrics.forEach(metric => {
        const value = parseInt(metric.textContent);
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const increment = value / (duration / 16); // 60fps

        function updateValue() {
            if (currentValue < value) {
                currentValue += increment;
                metric.textContent = Math.round(currentValue) + '%';
                requestAnimationFrame(updateValue);
            } else {
                metric.textContent = value + '%';
            }
        }

        updateValue();
    });
}

function initializeBookmarks() {
    const bookmarks = document.querySelectorAll('.metric-bookmark');
    
    bookmarks.forEach(bookmark => {
        bookmark.addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.style.color = '#6c5ce7';
            } else {
                this.style.color = '#e2e8f0';
            }
        });
    });
}

// Add hover effect to career items
document.querySelectorAll('.career-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
        this.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});




// Initialize timeline items
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Add entrance animation delay
        item.style.animation = `fadeInLeft 0.5s ease forwards ${index * 0.2}s`;
        
        // Add click interaction
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
});