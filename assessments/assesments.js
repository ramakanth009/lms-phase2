// Global variables
let currentQuestion = 1;
let currentSection = 'mcq';
let timer;
let timeLeft = 5400; // 90 minutes
let answers = {
    mcq: [],
    written: [],
    coding: []
};

// Dashboard initialization
function initializeAssessmentDashboard() {
    const statCards = document.querySelectorAll('.stat-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    statCards.forEach(card => {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    initializeSectionCards();
    initializeAutoSave();
}

function initializeSectionCards() {
    const sectionCards = document.querySelectorAll('.section-card');
    sectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Assessment navigation and control
function startAssessment() {
    const dashboard = document.querySelector('.assessment-dashboard');
    const assessmentContainer = document.getElementById('assessments');
    
    if (dashboard) dashboard.style.display = 'none';
    if (assessmentContainer) assessmentContainer.style.display = 'block';
    
    document.getElementById('assessment-intro').style.display = 'block';
    document.getElementById('main-assessment').style.display = 'none';
    document.getElementById('timer').textContent = '90:00';
    
    startTimer();
    loadQuestions();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAssessment();
        }
    }, 1000);
}

function loadQuestions() {
    updateQuestionDisplay();
    attachOptionListeners();
}

function updateQuestionDisplay() {
    const questionData = assessmentQuestions[currentSection][currentQuestion - 1];
    document.querySelector('.question-text').textContent = questionData.question;
    
    if (currentSection === 'mcq') {
        const optionsContainer = document.querySelector('.assessment-options');
        optionsContainer.innerHTML = questionData.options.map((option, index) => `
            <div class="assessment-option" data-index="${index}">${option}</div>
        `).join('');
    }
    
    updateProgress();
}

function updateProgress() {
    const totalQuestions = assessmentQuestions[currentSection].length;
    document.querySelector('.question-count').textContent = 
        `Question ${currentQuestion} of ${totalQuestions}`;
        
    const progress = (currentQuestion / totalQuestions) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

// Question navigation and interaction
function selectOption(option) {
    document.querySelectorAll('.assessment-option').forEach(opt => 
        opt.classList.remove('selected'));
    option.classList.add('selected');
    
    saveAnswer();
    enableNextButton();
}

function nextSection(section) {
    saveProgress();
    
    document.querySelectorAll('.assessment-section').forEach(sect => 
        sect.style.display = 'none');
    
    document.getElementById(`${section}Section`).style.display = 'block';
    
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('active');
        if (step.dataset.step === section) step.classList.add('active');
    });
    
    currentSection = section;
    currentQuestion = 1;
    updateQuestionDisplay();
}

// Auto-save functionality
function initializeAutoSave() {
    const writtenAnswer = document.querySelector('#writtenSection textarea');
    if (writtenAnswer) {
        let autoSaveTimer;
        writtenAnswer.addEventListener('input', () => {
            clearTimeout(autoSaveTimer);
            const autosaveIndicator = document.querySelector('.autosave-indicator');
            autosaveIndicator.style.opacity = '1';
            
            autoSaveTimer = setTimeout(() => {
                saveAnswer();
                autosaveIndicator.style.opacity = '0';
            }, 1000);
        });
    }
}

function saveAnswer() {
    const answer = {
        question: currentQuestion,
        timestamp: new Date().toISOString()
    };
    
    if (currentSection === 'mcq') {
        const selected = document.querySelector('.assessment-option.selected');
        if (selected) answer.answer = selected.textContent.trim();
    } else if (currentSection === 'written') {
        answer.answer = document.querySelector('#writtenSection textarea').value;
    } else if (currentSection === 'coding') {
        answer.code = document.querySelector('.code-input').value;
    }
    
    answers[currentSection][currentQuestion - 1] = answer;
}

// Scoring and results
function calculateScore() {
    const mcqScore = answers.mcq.reduce((score, answer, index) => {
        return score + (answer.answer === assessmentQuestions.mcq[index].correct ? 1 : 0);
    }, 0);
    
    const writtenScore = evaluateWrittenAnswers();
    const codingScore = evaluateCodingAnswers();
    
    return {
        mcq: mcqScore,
        written: writtenScore,
        coding: codingScore,
        total: mcqScore + writtenScore + codingScore
    };
}

function evaluateWrittenAnswers() {
    return answers.written.reduce((score, answer) => {
        // Simple length-based scoring for demo
        return score + (answer.answer.length > 100 ? 1 : 0);
    }, 0);
}

function evaluateCodingAnswers() {
    return answers.coding.reduce((score, answer) => {
        // Simple presence check for demo
        return score + (answer.code.length > 50 ? 1 : 0);
    }, 0);
}

function submitAssessment() {
    clearInterval(timer);
    const scores = calculateScore();
    const percentage = Math.round((scores.total / 30) * 100);
    
    displayResults(percentage, scores);
    saveToHistory(percentage, scores);
}

function displayResults(percentage, scores) {
    const mainAssessment = document.getElementById('main-assessment');
    mainAssessment.innerHTML = generateResultsHTML(percentage, scores);
}

function generateResultsHTML(percentage, scores) {
    return `
        <div class="results-container">
            <div class="results-header">
                <h2>Assessment Results</h2>
                <div class="results-score ${percentage >= 70 ? 'passing' : 'failing'}">
                    ${percentage}%
                </div>
                <div class="results-status">
                    ${percentage >= 70 ? 'Passed!' : 'Need Improvement'}
                </div>
            </div>
            
            <div class="section-scores">
                ${generateScoreItems(scores)}
            </div>
            
            <div class="results-actions">
                <button class="btn btn-primary" onclick="location.reload()">Return to Dashboard</button>
                <button class="btn btn-outline-primary" onclick="reviewAssessment()">Review Answers</button>
            </div>
        </div>
    `;
}

function generateScoreItems(scores) {
    return `
        <div class="score-item">
            <div class="score-label">Multiple Choice</div>
            <div class="score-value">${scores.mcq}/20</div>
            <div class="progress">
                <div class="progress-bar" style="width: ${(scores.mcq/20)*100}%"></div>
            </div>
        </div>
        <div class="score-item">
            <div class="score-label">Written Response</div>
            <div class="score-value">${scores.written}/5</div>
            <div class="progress">
                <div class="progress-bar" style="width: ${(scores.written/5)*100}%"></div>
            </div>
        </div>
        <div class="score-item">
            <div class="score-label">Coding Challenge</div>
            <div class="score-value">${scores.coding}/5</div>
            <div class="progress">
                <div class="progress-bar" style="width: ${(scores.coding/5)*100}%"></div>
            </div>
        </div>
    `;
}

// Review functionality
function reviewAssessment() {
    const mainAssessment = document.getElementById('main-assessment');
    mainAssessment.innerHTML = `
        <div class="review-container">
            <div class="review-header">
                <h2>Assessment Review</h2>
                <div class="section-tabs">
                    <button class="tab-btn active" onclick="showReviewSection('mcq')">MCQ</button>
                    <button class="tab-btn" onclick="showReviewSection('written')">Written</button>
                    <button class="tab-btn" onclick="showReviewSection('coding')">Coding</button>
                </div>
            </div>
            
            <div class="review-sections">
                <div id="mcqReview" class="review-section">${generateMCQReview()}</div>
                <div id="writtenReview" class="review-section" style="display: none;">
                    ${generateWrittenReview()}</div>
                <div id="codingReview" class="review-section" style="display: none;">
                    ${generateCodingReview()}</div>
            </div>
        </div>
    `;
}

function generateMCQReview() {
    return answers.mcq.map((answer, index) => {
        const question = assessmentQuestions.mcq[index];
        const isCorrect = answer.answer === question.correct;
        
        return `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="question-number">Q${index + 1}</div>
                <div class="review-content">
                    <div class="question-text">${question.question}</div>
                    <div class="your-answer">
                        Your Answer: ${answer.answer}
                        <span class="answer-icon">${isCorrect ? '✓' : '✗'}</span>
                    </div>
                    ${!isCorrect ? `
                        <div class="correct-answer">
                            Correct Answer: ${question.correct}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function showReviewSection(section) {
    document.querySelectorAll('.review-section').forEach(sect => 
        sect.style.display = 'none');
    document.getElementById(`${section}Review`).style.display = 'block';
    
    document.querySelectorAll('.tab-btn').forEach(btn => 
        btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initializeAssessmentDashboard();
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (this.getAttribute('data-target') === 'assessments') {
                const dashboard = document.querySelector('.assessment-dashboard');
                const assessmentContainer = document.getElementById('assessments');
                
                if (dashboard && assessmentContainer) {
                    dashboard.style.display = 'block';
                    assessmentContainer.style.display = 'none';
                }
            }
        });
    });
});