function initializeAssessment() {
    document.getElementById('timer').textContent = '90:00';

    if (document.getElementById('assessment-intro')) {
        document.getElementById('assessment-intro').style.display = 'block';
    }
    if (document.getElementById('main-assessment')) {
        document.getElementById('main-assessment').style.display = 'none';
    }
}

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

// For handling auto-save in written section
let autoSaveTimer;
function initializeAutoSave() {
    const writtenAnswer = document.querySelector('#writtenSection textarea');
    if (writtenAnswer) {
        writtenAnswer.addEventListener('input', () => {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                localStorage.setItem('writtenAnswer', writtenAnswer.value);
            }, 1000);
        });
    }
}

// Load saved answer if exists
function loadSavedAnswer() {
    const writtenAnswer = document.querySelector('#writtenSection textarea');
    const savedAnswer = localStorage.getItem('writtenAnswer');
    if (writtenAnswer && savedAnswer) {
        writtenAnswer.value = savedAnswer;
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeAssessment();
    initializeAutoSave();
    loadSavedAnswer();
});