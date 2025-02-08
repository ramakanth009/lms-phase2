class CurriculumNavigator {
    constructor() {
        this.branchSelect = document.getElementById('branchSelect');
        this.roleSelect = document.getElementById('roleSelect');
        this.step1Content = document.getElementById('step1Content');

        this.rolesByBranch = {
            cs: [
                'Full Stack Developer',
                'Front-End Developer',
                'Back-End Developer',
                'Software Engineer',
                'DevOps Engineer',
                'Mobile App Developer',
                'Game Developer',
                'UI/UX Developer',
                'QA Engineer',
                // 'Technical Lead (Full Stack)',
                // 'Architect (Full Stack)',

                'Data Scientist',
                'Data Analyst',
                'Machine Learning Engineer',
                'Data Engineer',
                'Statistician',
                'Business Intelligence Analyst',
                'Data Architect',
                'Database Administrator',
                'AI Specialist',
                'Research Scientist (Data Science)',
                'Data Visualization Engineer',
                'MLOps Engineer'],
            elec: [
                'Power Systems Engineer',
                'Electronics Designer',
                'Control Systems Engineer',
                'IoT Specialist',
                'Hardware Engineer',
                'Embedded Systems Engineer',
                'VLSI Engineer',
                'RF Engineer',
                'Telecommunications Engineer',
                'Network Engineer',
                'FPGA Engineer',
                'ASIC Design Engineer',
                'Signal Processing Engineer',
                'Instrumentation Engineer',
                'Robotics Engineer',
                'Cybersecurity Engineer (Hardware focus)',
                'Technical Sales Engineer (Hardware/Telecom focus)',
                'EEE (Electrical and Electronics Engineering)',
                'Electrical Design Engineer',
                'Renewable Energy Engineer',
                'Automation Engineer',
                'VLSI Engineer (Power focus)',
                'Power Electronics Engineer',
                'Smart Grid Engineer',
                'Electrical Project Engineer',
                'EIE (Electronics and Instrumentation Engineering)',
                'Process Control Engineer',
                'Biomedical Instrumentation Engineer',
                'PLC/SCADA Engineer',
                'Industrial Automation Engineer',
                'IoT Engineer (Instrumentation focus)',
                'Calibration Engineer',
                'Project Engineer (Instrumentation/Control systems)'],
            mech: ['Design Engineer',
                'Production Manager',
                'R&D Engineer',
                'Project Manager',
                'Manufacturing Engineer',
                'Mechanical Engineer',
                'Project Engineer',
                'Maintenance Engineer',
                'HVAC Engineer',
                'Automotive Engineer',
                'Aerospace Engineer',
                'Robotics Engineer',
                'Industrial Engineer',
                'Thermal Engineer',
                'CAD Technician',
                'CAM Technician',
                'FEA Analyst',
                'CFD Engineer',
                'Materials Engineer',
                'Energy Engineer',
                'Mechatronics Engineer',
                'Biomechanical Engineer',
                'Process Engineer',
                'Quality Engineer',
                'Test Engineer',
                'Product Development Engineer',
                'Technical Sales Engineer',
                'Consultant (Mechanical Engineering)',
                'Research and Development Engineer',
                'Machine Design Engineer',
                'Tooling Engineer',
                'Plant Engineer',
                'Operations Manager (in a manufacturing setting)'],
            chem: ['Power Systems Engineer',
                'Electronics Designer',
                'Control Systems Engineer',
                'IoT Specialist',
                'Process Engineer',
                'Chemical Engineer',
                'Design Engineer',
                'Production Engineer',
                'Manufacturing Engineer',
                'Research and Development Engineer',
                'Process Development Engineer',
                'Project Engineer',
                'Plant Engineer',
                'Operations Engineer',
                'Quality Control Engineer',
                'Environmental Engineer',
                'Safety Engineer',
                'Product Development Engineer',
                'Formulation Chemist',
                'Analytical Chemist',
                'Process Control Engineer',
                'Petrochemical Engineer',
                'Pharmaceutical Engineer',
                'Biochemical Engineer',
                'Food Processing Engineer',
                'Materials Engineer',
                'Energy Engineer',
                'Wastewater Treatment Engineer',
                'Consultant (Chemical Engineering)',
                'Technical Sales Engineer'],
            civil: ['Structural Engineer',
                'Construction Manager',
                'Environmental Engineer',
                'Urban Planner',
                'Civil Engineer',
                'Transportation Engineer',
                'Geotechnical Engineer',
                'Water Resources Engineer',
                'Construction Engineer',
                'Project Engineer',
                'Highway Engineer',
                'Bridge Engineer',
                'Dam Engineer',
                'Irrigation Engineer',
                'Site Engineer',
                'Geotechnical Consultant',
                'Structural Consultant',
                'Transportation Consultant',
                'Environmental Consultant',
                'Design Engineer (Civil)',
                'Estimator',
                'Surveyor',
                'CAD Technician (Civil)',
                'GIS Specialist (Civil)',
                'Municipal Engineer',
                'Public Works Engineer',
                'Sanitary Engineer',
                'Water Resources Manager']
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
        this.populateRoleSelect(selectedBranch);}

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