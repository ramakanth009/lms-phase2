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
    loadQuestion();
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

// function submitAssessment() {
//     clearInterval(timer);
//     alert('Assessment submitted successfully!');
    
//     // Reset timer and sections
//     timeLeft = 5400;
//     document.getElementById('timer').textContent = '90:00';
//     document.getElementById('assessment-intro').style.display = 'block';
//     document.getElementById('main-assessment').style.display = 'none';
// }

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
    initializeMetricsCharts();
});

let currentQuestionIndex = 0;
let currentSection = 'mcq';
let userAnswers = {
    mcq: [],
    written: [],
    coding: []
};

function loadQuestion() {
    const questionData = assessmentQuestions[currentSection][currentQuestionIndex];
    const contentDiv = document.querySelector('.assessment-content');
    
    // Clear previous content
    contentDiv.innerHTML = `
        <section class="assessment-section" id="${currentSection}Section">
            <div class="question-counter">
                Question ${currentQuestionIndex + 1} of ${assessmentQuestions[currentSection].length}
            </div>
            <div class="question-text mb-4">${questionData.question}</div>
            ${getQuestionHTML(questionData)}
            <div class="d-flex justify-content-between mt-4">
                ${currentQuestionIndex > 0 ? '<button class="btn btn-secondary" onclick="previousQuestion()">Previous</button>' : ''}
                <button class="btn btn-primary" onclick="nextQuestion()">
                    ${isLastQuestion() ? 'Submit' : 'Next'}
                </button>
            </div>
        </section>
    `;
}

function getQuestionHTML(questionData) {
    if (currentSection === 'mcq') {
        return `
            <div class="assessment-options">
                ${questionData.options.map((option, index) => `
                    <div class="assessment-option" onclick="selectOption(this)" data-index="${index}">
                        ${option}
                    </div>
                `).join('')}
            </div>
        `;
    } else if (currentSection === 'written') {
        return `
            <textarea class="form-control mb-4" placeholder="Type your answer here..." rows="8">${userAnswers.written[currentQuestionIndex] || ''}</textarea>
        `;
    } else if (currentSection === 'coding') {
        return `
            <textarea class="form-control mb-4" placeholder="${questionData.boilerplate}" rows="10">${userAnswers.coding[currentQuestionIndex] || questionData.boilerplate}</textarea>
        `;
    }
}

function nextQuestion() {
    saveAnswer();
    
    if (isLastQuestion()) {
        if (currentSection === 'mcq') {
            currentSection = 'written';
            currentQuestionIndex = 0;
        } else if (currentSection === 'written') {
            currentSection = 'coding';
            currentQuestionIndex = 0;
        } else {
            submitAssessment();
            return;
        }
    } else {
        currentQuestionIndex++;
    }
    
    updateProgress();
    loadQuestion();
}

function previousQuestion() {
    saveAnswer();
    currentQuestionIndex--;
    loadQuestion();
}

function saveAnswer() {
    if (currentSection === 'mcq') {
        const selected = document.querySelector('.assessment-option.selected');
        userAnswers.mcq[currentQuestionIndex] = selected ? selected.dataset.index : null;
    } else if (currentSection === 'written') {
        const answer = document.querySelector('textarea').value;
        userAnswers.written[currentQuestionIndex] = answer;
    } else if (currentSection === 'coding') {
        const code = document.querySelector('textarea').value;
        userAnswers.coding[currentQuestionIndex] = code;
    }
}

function isLastQuestion() {
    return currentQuestionIndex === assessmentQuestions[currentSection].length - 1;
}

function updateProgress() {
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('active');
        if (step.dataset.step === currentSection) {
            step.classList.add('active');
        }
    });
}

function initializeMetricsCharts() {
    // Section Performance Chart
    const sectionCtx = document.getElementById('sectionPerformance').getContext('2d');
    new Chart(sectionCtx, {
        type: 'bar',
        data: {
            labels: ['MCQ', 'Written', 'Coding'],
            datasets: [{
                label: 'Score (%)',
                data: [75, 60, 55],
                backgroundColor: [
                    'rgba(108, 99, 255, 0.7)',
                    'rgba(108, 99, 255, 0.7)',
                    'rgba(108, 99, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(108, 99, 255, 1)',
                    'rgba(108, 99, 255, 1)',
                    'rgba(108, 99, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Time Distribution Chart
    const timeCtx = document.getElementById('timeDistribution').getContext('2d');
    new Chart(timeCtx, {
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
        }
    });

    // Question Performance Chart
    const questionCtx = document.getElementById('questionPerformance').getContext('2d');
    new Chart(questionCtx, {
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
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}