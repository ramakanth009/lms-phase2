class RoleContentManager {
    constructor() {
        this.branchSelect = document.getElementById('branchSelect');
        this.roleSelect = document.getElementById('roleSelect');
        this.contentContainer = document.querySelector('.role-content-container');
        this.roleDetailsContent = document.getElementById('roleDetailsContent');

        this.initialize();
    }

    initialize() {
        if (this.branchSelect) {
            this.branchSelect.addEventListener('change', this.handleBranchChange.bind(this));
        }
        if (this.roleSelect) {
            this.roleSelect.addEventListener('change', this.handleRoleChange.bind(this));
        }
    }

    handleBranchChange(event) {
        const branch = event.target.value;
        if (!branch) return;

        // Show and populate role select
        this.roleSelect.style.display = 'block';
        this.populateRoles(branch);

        // Hide content container
        if (this.contentContainer) {
            this.contentContainer.style.display = 'none';
        }
    }

    handleRoleChange(event) {
        const selectedRole = event.target.options[event.target.selectedIndex].text;
        if (!selectedRole || selectedRole === 'Select Role') return;

        // Show role content and display details
        if (this.contentContainer) {
            this.contentContainer.style.display = 'block';
            const roleDetails = window.jobDescriptions[selectedRole];
            this.displayRoleDetails(roleDetails);
        }
    }

    displayRoleDetails(details) {
        if (!this.roleDetailsContent || !details) return;
        // Hide stepsSection and protip
        const stepsSection = document.getElementById('stepsSection');
        const protip = document.getElementById('protip');

        if (stepsSection) stepsSection.style.display = 'none';
        if (protip) protip.style.display = 'none';

        this.roleDetailsContent.innerHTML = `
            <div class="container py-5">
                <!-- Header with Badges -->
                <div class="d-flex flex-wrap mb-4">
                    ${details.badges.map(badge => `
                        <div class="branch-badge">
                            <i class="fas fa-code me-2"></i>
                            ${badge}
                        </div>
                    `).join('')}
                </div>

                <!-- Main Content -->
                <div class="content-card">
                    <h1 class="job-title">${details.title}</h1>
                    
                    <div class="d-flex flex-wrap">
                        ${details.quickInfo.map(info => `
                            <div class="job-tag">
                                <i class="${info.icon}"></i>
                                ${info.text}
                            </div>
                        `).join('')}
                    </div>

                    <div class="section-title">Job Description</div>
                    <p class="lead text-muted">${details.description}</p>

                    <div class="section-title">Key Responsibilities</div>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                ${details.responsibilities.slice(0, Math.ceil(details.responsibilities.length / 2)).map(resp => `
                                    <li><i class="fas fa-check-circle text-success me-2 mb-3 keypoints"></i>${resp}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                ${details.responsibilities.slice(Math.ceil(details.responsibilities.length / 2)).map(resp => `
                                    <li><i class="fas fa-check-circle text-success me-2 mb-3 keypoints"></i>${resp}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>

                    <div class="section-title">Technical Skills Required</div>
                    <div class="d-flex flex-wrap">
                        ${details.technicalSkills.map(skill => `
                            <div class="skill-badge">
                                <i class="${skill.icon}"></i>
                                ${skill.name}
                            </div>
                        `).join('')}
                    </div>

                    <div class="section-title">Soft Skills</div>
                    <div class="d-flex flex-wrap">
                        ${details.softSkills.map(skill => `
                            <div class="skill-badge">
                                <i class="${skill.icon}"></i>
                                ${skill.name}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Market Trends Section -->
                <div class="content-card">
                    <div class="section-title">Market Trends</div>
                    ${details.marketTrends.map(trend => `
                        <div class="trend-item">
                            <h5><i class="${trend.icon} me-2"></i>${trend.title}</h5>
                            <p>${trend.description}</p>
                        </div>
                    `).join('')}
                </div>

                <!-- Companies Section -->
                <div class="content-card">
                    <div class="section-title">Top Companies Hiring</div>
                    <div class="row text-center">
                        ${Object.entries(details.companies).map(([category, companies]) => `
                            <div class="col-md-4 mb-3">
                                <h5>${category}</h5>
                                ${companies.map(company => `
                                    <div class="company-badge">${company}</div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Learning Resources & Communities -->
            <div class="content-card">
                <div class="section-title">Resources & Communities</div>
                <div class="row">
                    ${Object.entries(details.resources).map(([category, items]) => `
                        <div class="col-md-6">
                            <h5><i class="fas fa-book-reader me-2"></i>${category}</h5>
                            <ul class="list-unstyled">
                                ${items.map(item => `
                                    <li>
                                        <a href="${item.link}" target="_blank" class="resource-link">
                                            • ${item.name}
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        `;

        // Initialize hover effects
        this.initializeHoverEffects();
    }

    populateRoles(branch) {
        this.roleSelect.innerHTML = '<option value="" disabled selected>Select Role</option>';
        const roles = Object.keys(window.jobDescriptions).filter(role =>
            window.jobDescriptions[role].branch === (branch === 'cs' ? 'CSE / IT' : branch)
        );

        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.toLowerCase().replace(/\s+/g, '-');
            option.textContent = role;
            this.roleSelect.appendChild(option);
        });
    }

    initializeHoverEffects() {
        const addHoverEffect = (elements) => {
            elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'translateY(-2px)';
                });
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'translateY(0)';
                });
            });
        };

        addHoverEffect(document.querySelectorAll('.skill-badge'));
        addHoverEffect(document.querySelectorAll('.company-badge'));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RoleContentManager();
});