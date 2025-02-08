class CurriculumNavigator {
    constructor() {
        this.branchSelect = document.getElementById('branchSelect');
        this.roleSelect = document.getElementById('roleSelect');
        this.step1Content = document.getElementById('step1Content');

        this.rolesByBranch = {
            cs: [
                'Full Stack Developer',
                "Front-End Developer",
                "Back-End Developer",
                "DevOps Engineer",
                "Data Engineer",
                "Mobile App Developer",
                "SQL Developer",
                "Data Scientist",
                "Data Analyst",
                "Data Engineer",
                "Machine Learning Engineer",
                "BI Analyst",
                "Data Quality Analyst",
                "Data Researcher",
                "Python Developer",
            ],
            elec: [
                'Embedded Application Developer (ECE)',
                'Electrical Design Engineer (EEE)',
                'PCB Design Engineer (EEE/ECE)',
                'Engineer - PLC Programmer',
                'VLSI Design Engineer',
                'Industrial Automation Engineer',
            ],
            mech: [
                'Mechanical Engineering Intern',
                'Structural/Mechanical Engineer',
                'R&D Intern Design',
            ],
            chem: ['Process Engineer (Chemical)',

                'Consultant (Chemical Engineering)',
                'Production Engineer (Pharmaceutical)',
                'R&D Engineer',
                'Technical Service Engineer (Chemical)',
                'Process Safety Engineer',
                'Environmental Engineer',
                'Process Design Engineer',

            ],
            civil: ['Site Engineer (Construction)',
                'Structural Design Engineer',
                'AutoCAD Designer (Architecture)']
        };

        this.initialize();
    }

    initialize() {
        // Set up event listeners
        this.branchSelect?.addEventListener('change', this.handleBranchChange.bind(this));

        // Add hover effects to cards
        this.initializeCardEffects();
    }

    // handleBranchChange(event) {
    //     const selectedBranch = event.target.value;

    //     if (!selectedBranch || !this.roleSelect || !this.step1Content) return;

    //     // Update Step 1 content
    //     this.step1Content.innerHTML = `
    //         <p class="step-highlight">
    //             <strong>Great choice!</strong><br>
    //             You've selected your branch. Now, choose your preferred job role to explore detailed career information.
    //         </p>`;

    //     // Show and populate role select
    //     this.roleSelect.style.display = 'block';
    //     this.populateRoleSelect(selectedBranch);

    //     // Animate cards
    //     this.animateCards();
    // }
    handleBranchChange(event) {
        const selectedBranch = event.target.value;

        if (!selectedBranch || !this.roleSelect || !this.step1Content) return;

        // Hide any existing role content
        const roleContent = document.querySelector('.role-content-container');
        if (roleContent) {
            roleContent.style.display = 'none';
        }

        // Show curriculum cards if they were hidden
        const curriculumCards = document.querySelectorAll('.curriculum-card');
        curriculumCards.forEach(card => {
            card.style.display = 'block';
        });

        // Update Step 1 content
        this.step1Content.innerHTML = `
            <p class="step-highlight">
                <strong>Great choice!</strong><br>
                You've selected your branch. Now, choose your preferred job role to explore detailed career information.
            </p>`;

        // Show and populate role select
        this.roleSelect.style.display = 'block';
        this.populateRoleSelect(selectedBranch);
    }

    populateRoleSelect(branch) {
        this.roleSelect.innerHTML = '<option value="" selected disabled>Select Role</option>';

        if (!this.rolesByBranch[branch]) return;

        this.rolesByBranch[branch].forEach(role => {
            const option = document.createElement('option');
            option.value = role.toLowerCase().replace(/\s+/g, '-');
            option.textContent = role;
            this.roleSelect.appendChild(option);
        });
    }

    animateCards() {
        const cards = document.querySelectorAll('.curriculum-card');
        cards.forEach(card => {
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });
    }

    initializeCardEffects() {
        const cards = document.querySelectorAll('.curriculum-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize when the curriculum section becomes visible
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're in the curriculum section
    const curriculumSection = document.querySelector('.curriculum-container');
    if (curriculumSection) {
        new CurriculumNavigator();
    }

    // Add listener for navigation changes
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            if (this.getAttribute('data-target') === 'curriculum') {
                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    new CurriculumNavigator();
                }, 100);
            }
        });
    });
});