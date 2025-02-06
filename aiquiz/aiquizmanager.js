class QuizManager {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.quizHistory = {
            "JavaScript Fundamentals": {
                topic: "JavaScript Fundamentals",
                score: 6,
                totalQuestions: 10,
                date: "2024-03-10",
                questions: [
                    {
                        question: "What is closure in JavaScript?",
                        userAnswer: "A function with access to outer scope",
                        correctAnswer: "A function that has access to variables in its outer scope",
                        isCorrect: true
                    },
                    {
                        question: "What is hoisting?",
                        userAnswer: "Moving functions to the top",
                        correctAnswer: "Moving declarations to the top",
                        isCorrect: false
                    },
                    {
                        question: "What is the difference between let and var?",
                        userAnswer: "let is block scoped",
                        correctAnswer: "let is block scoped, var is function scoped",
                        isCorrect: true
                    },
                    {
                        question: "What is the event loop?",
                        userAnswer: "Handles async operations",
                        correctAnswer: "Manages execution of async operations",
                        isCorrect: true
                    },
                    {
                        question: "What is prototype inheritance?",
                        userAnswer: "Wrong answer given",
                        correctAnswer: "Objects inheriting properties from other objects",
                        isCorrect: false
                    },
                    {
                        question: "Explain async/await",
                        userAnswer: "Handles promises easily",
                        correctAnswer: "Syntactic sugar for handling promises",
                        isCorrect: true
                    }
                ]
            },
            "React Components": {
                topic: "React Components",
                score: 5,
                totalQuestions: 10,
                date: "2024-03-11",
                questions: [
                    {
                        question: "What is the Virtual DOM?",
                        userAnswer: "A lightweight copy of the actual DOM",
                        correctAnswer: "A lightweight copy of the actual DOM",
                        isCorrect: true
                    },
                    {
                        question: "What are React Hooks?",
                        userAnswer: "Functions that let you use state in functional components",
                        correctAnswer: "Functions that let you use state in functional components",
                        isCorrect: true
                    },
                    {
                        question: "Explain React lifecycle methods",
                        userAnswer: "Wrong answer provided",
                        correctAnswer: "Methods that run at different stages of component life",
                        isCorrect: false
                    },
                    {
                        question: "What is JSX?",
                        userAnswer: "JavaScript XML",
                        correctAnswer: "JavaScript XML",
                        isCorrect: true
                    },
                    {
                        question: "What is state in React?",
                        userAnswer: "Object that holds component data",
                        correctAnswer: "Object that holds component data",
                        isCorrect: true
                    }
                ]
            },
            "CSS Layouts": {
                topic: "CSS Layouts",
                score: 7,
                totalQuestions: 10,
                date: "2024-03-12",
                questions: [
                    {
                        question: "What is the CSS Box Model?",
                        userAnswer: "Content, padding, border, margin",
                        correctAnswer: "Content, padding, border, margin",
                        isCorrect: true
                    },
                    {
                        question: "What is the difference between flex and grid?",
                        userAnswer: "Flex is 1D, Grid is 2D",
                        correctAnswer: "Flex is 1D, Grid is 2D",
                        isCorrect: true
                    },
                    {
                        question: "How does flexbox handle space distribution?",
                        userAnswer: "Using justify-content",
                        correctAnswer: "Using justify-content and align-items",
                        isCorrect: false
                    },
                    {
                        question: "What is the purpose of flex-wrap?",
                        userAnswer: "Allows items to wrap to new line",
                        correctAnswer: "Allows items to wrap to new line",
                        isCorrect: true
                    },
                    {
                        question: "How to center an element with flexbox?",
                        userAnswer: "justify-content: center; align-items: center",
                        correctAnswer: "justify-content: center; align-items: center",
                        isCorrect: true
                    },
                    {
                        question: "What is flex-basis?",
                        userAnswer: "Initial size of flex item",
                        correctAnswer: "Initial size of flex item",
                        isCorrect: true
                    },
                    {
                        question: "Explain flex-grow property",
                        userAnswer: "Wrong answer provided",
                        correctAnswer: "Determines how much item grows relative to others",
                        isCorrect: false
                    }
                ]
            },
            "HTML Basics": {
                topic: "HTML Basics",
                score: 9,
                totalQuestions: 10,
                date: "2024-03-13",
                questions: [
                    {
                        question: "What is semantic HTML?",
                        userAnswer: "HTML elements that carry meaning",
                        correctAnswer: "HTML elements that carry meaning",
                        isCorrect: true
                    },
                    {
                        question: "What is the purpose of the alt attribute?",
                        userAnswer: "Describes image content for accessibility",
                        correctAnswer: "Describes image content for accessibility",
                        isCorrect: true
                    },
                    {
                        question: "Explain the difference between <div> and <span>",
                        userAnswer: "Block vs inline elements",
                        correctAnswer: "Block vs inline elements",
                        isCorrect: true
                    },
                    {
                        question: "What is the purpose of meta tags?",
                        userAnswer: "Provide metadata about HTML document",
                        correctAnswer: "Provide metadata about HTML document",
                        isCorrect: true
                    },
                    {
                        question: "What is the role of DOCTYPE declaration?",
                        userAnswer: "Specifies HTML version",
                        correctAnswer: "Specifies HTML version",
                        isCorrect: true
                    },
                    {
                        question: "Explain HTML forms submission",
                        userAnswer: "Wrong answer provided",
                        correctAnswer: "Process of sending form data to server",
                        isCorrect: false
                    },
                    {
                        question: "What are data attributes?",
                        userAnswer: "Custom attributes starting with data-",
                        correctAnswer: "Custom attributes starting with data-",
                        isCorrect: true
                    },
                    {
                        question: "Purpose of HTML5 localStorage",
                        userAnswer: "Store data in browser",
                        correctAnswer: "Store data in browser",
                        isCorrect: true
                    },
                    {
                        question: "What is the canvas element?",
                        userAnswer: "Element for drawing graphics",
                        correctAnswer: "Element for drawing graphics",
                        isCorrect: true
                    }
                ]
            }
        };
        this.initialize();
    }

    initialize() {
        document.querySelector('.start-quiz-btn')?.addEventListener('click', () => this.startQuiz('new'));
        document.querySelectorAll('.review-quiz-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => this.startQuiz('review', index));
        });
        
        document.querySelector('.close-modal')?.addEventListener('click', () => this.closeQuiz());
        document.getElementById('nextButton')?.addEventListener('click', () => this.nextQuestion());
        document.getElementById('closeResults')?.addEventListener('click', () => this.closeQuiz());

        // Add ESC key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeQuiz();
            }
        });

        // Update close button visibility
        const closeButton = document.querySelector('.close-modal');
        if (closeButton) {
            closeButton.style.display = 'block';
            closeButton.style.cursor = 'pointer';
            closeButton.addEventListener('click', () => this.closeQuiz());
        }

        // Add click outside listener
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('quizModal');
            const modalContent = modal.querySelector('.quiz-modal-content');
            if (e.target === modal) {
                this.closeQuiz();
            }
        });
    }

    startQuiz(type, quizId = null) {
        if (type === 'review' && quizId !== null) {
            this.showQuizReview(quizId);
            return;
        }
        this.currentQuiz = type === 'new' ? newQuizQuestions : reviewQuizQuestions;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        
        document.getElementById('quizModal').style.display = 'block';
        document.getElementById('quizContent').classList.remove('d-none');
        document.getElementById('resultsContainer').classList.add('d-none');
        
        this.updateProgress();
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.currentQuiz[this.currentQuestion];
        document.getElementById('questionText').textContent = question.question;
        
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });

        document.getElementById('nextButton').classList.add('d-none');
    }

    selectAnswer(index) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        options[index].classList.add('selected');
        
        const question = this.currentQuiz[this.currentQuestion];
        const isCorrect = index === question.correct;
        
        options.forEach(option => option.disabled = true);
        options[index].classList.add(isCorrect ? 'correct' : 'incorrect');
        if (!isCorrect) {
            options[question.correct].classList.add('correct');
        }
        
        this.answers.push({
            question: this.currentQuestion,
            selected: index,
            correct: question.correct
        });

        if (isCorrect) this.score++;
        
        document.getElementById('nextButton').classList.remove('d-none');
    }

    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.currentQuiz.length) {
            this.updateProgress();
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.currentQuiz.length) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
        document.getElementById('currentQuestion').textContent = this.currentQuestion + 1;
        document.getElementById('totalQuestions').textContent = this.currentQuiz.length;
    }

    showResults() {
        document.getElementById('quizContent').classList.add('d-none');
        document.getElementById('resultsContainer').classList.remove('d-none');
        
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('totalScore').textContent = this.currentQuiz.length;
        
        const detailedResults = document.getElementById('detailedResults');
        detailedResults.innerHTML = '';
        
        this.answers.forEach((answer, index) => {
            const question = this.currentQuiz[index];
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <p class="mb-2"><strong>Question ${index + 1}:</strong> ${question.question}</p>
                <p class="mb-1">Your answer: ${question.options[answer.selected]}</p>
                <p class="mb-0 ${answer.selected === answer.correct ? 'text-success' : 'text-danger'}">
                    ${answer.selected === answer.correct ? '✓ Correct' : '✗ Incorrect - Correct answer: ' + question.options[answer.correct]}
                </p>
            `;
            detailedResults.appendChild(resultItem);
        });
    }

    showQuizReview(quizId) {
        const quizCards = document.querySelectorAll('.quiz-detail-card');
        const quizInfo = quizCards[quizId];
        const quizTitle = quizInfo.querySelector('.quiz-title').textContent;
        const quiz = this.quizHistory[quizTitle];

        if (!quiz) {
            console.error('Quiz not found:', quizTitle);
            return;
        }

        const modal = document.getElementById('quizModal');
        const content = document.createElement('div');
        content.className = 'quiz-review-content';
        
        content.innerHTML = `
            <div class="quiz-review-header">
                <h3>${quiz.topic}</h3>
                <div class="quiz-meta">
                    <span class="topic-badge">Topic: ${quiz.topic}</span>
                    <span class="score-badge">Score: ${quiz.score}/${quiz.totalQuestions}</span>
                    <span class="time-badge">
                        <i class="far fa-calendar"></i>
                        ${new Date(quiz.date).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <div class="questions-review">
                ${quiz.questions.map((q, index) => `
                    <div class="question-review ${q.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="question-number">${index + 1}</div>
                        <div class="question-details">
                            <div class="question-text">${q.question}</div>
                            <div class="user-answer">Your answer: ${q.userAnswer}</div>
                            ${!q.isCorrect ? `
                                <div class="correct-answer">Correct answer: ${q.correctAnswer}</div>
                            ` : ''}
                        </div>
                        <div class="answer-status">
                            ${q.isCorrect ? 
                                '<i class="fas fa-check"></i>' : 
                                '<i class="fas fa-times"></i>'}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="performance-summary">
                <h4>Performance Summary</h4>
                <p>Accuracy: ${(quiz.score/quiz.totalQuestions * 100).toFixed(1)}%</p>
            </div>
        `;

        modal.style.display = 'block';
        const modalContent = modal.querySelector('.quiz-modal-content');
        modalContent.innerHTML = '';
        modalContent.appendChild(content);
    }

    closeQuiz() {
        document.getElementById('quizModal').style.display = 'none';
    }
}

// Export the class
window.QuizManager = QuizManager;
