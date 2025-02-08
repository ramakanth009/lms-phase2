// class RoleContentManager {
//     constructor() {
//         // Initialize all key elements
//         this.branchSelect = document.getElementById('branchSelect');
//         this.roleSelect = document.getElementById('roleSelect');
//         this.contentContainer = document.querySelector('.role-content-container');
//         this.selectedRoleSpan = document.getElementById('selectedRole');
//         this.roleDetailsContent = document.getElementById('roleDetailsContent');
//         this.curriculumSteps = document.querySelectorAll('.curriculum-card');

//         // Role data by branch
//         this.rolesByBranch = {
//             'cs': [
//                 'Full Stack Developer',
//                 'Front-End Developer',
//                 'Back-End Developer',
//                 'DevOps Engineer',
//                 'Cloud Engineer',
//                 'Data Scientist',
//                 'Machine Learning Engineer'
//             ]
//             // Add other branches as needed
//         };

//         this.initialize();
//     }

//     initialize() {
//         console.log('Initializing RoleContentManager...');
        
//         // Add event listeners
//         if (this.branchSelect) {
//             this.branchSelect.addEventListener('change', (e) => {
//                 console.log('Branch selected:', e.target.value);
//                 this.handleBranchChange(e);
//             });
//         }

//         if (this.roleSelect) {
//             this.roleSelect.addEventListener('change', (e) => {
//                 console.log('Role selected:', e.target.value);
//                 this.handleRoleChange(e);
//             });
//         }

//         // Initial setup
//         this.setupInitialState();
//     }

//     setupInitialState() {
//         // Hide role select initially
//         if (this.roleSelect) {
//             this.roleSelect.style.display = 'none';
//         }

//         // Hide content container initially
//         if (this.contentContainer) {
//             this.contentContainer.style.display = 'none';
//         }
//     }

//     handleBranchChange(event) {
//         const selectedBranch = event.target.value;
//         console.log('Handling branch change:', selectedBranch);

//         if (!selectedBranch) return;

//         // Reset state
//         if (this.contentContainer) {
//             this.contentContainer.style.display = 'none';
//         }

//         // Show and populate role select
//         if (this.roleSelect) {
//             this.roleSelect.style.display = 'block';
//             this.populateRoleSelect(selectedBranch);
//         }

//         // Show curriculum steps
//         this.showCurriculumSteps();

//         // Update Step 1 content
//         const step1Content = document.getElementById('step1Content');
//         if (step1Content) {
//             step1Content.innerHTML = `
//                 <div class="step-highlight">
//                     <strong>Great choice!</strong>
//                     <p>You've selected your branch. Now, choose your preferred job role to explore detailed career information.</p>
//                 </div>`;
//         }
//     }

//     handleRoleChange(event) {
//         const selectedRole = event.target.options[event.target.selectedIndex].text;
//         console.log('Handling role change:', selectedRole);

//         if (!selectedRole || selectedRole === 'Select Role') return;

//         // Hide curriculum cards
//         this.hideCurriculumSteps();

//         // Show role content
//         if (this.contentContainer) {
//             this.contentContainer.style.display = 'block';
//         }

//         if (this.selectedRoleSpan) {
//             this.selectedRoleSpan.textContent = selectedRole;
//         }

//         // Get and display role details
//         const roleDetails = this.getRoleDetails(selectedRole);
//         this.displayRoleDetails(roleDetails);
//     }

//     populateRoleSelect(branch) {
//         if (!this.roleSelect) return;

//         // Clear current options
//         this.roleSelect.innerHTML = '<option value="" selected disabled>Select Role</option>';

//         // Get roles for selected branch
//         const roles = this.rolesByBranch[branch] || [];
        
//         // Add new options
//         roles.forEach(role => {
//             const option = document.createElement('option');
//             option.value = role.toLowerCase().replace(/\s+/g, '-');
//             option.textContent = role;
//             this.roleSelect.appendChild(option);
//         });

//         // Show the select
//         this.roleSelect.style.display = 'block';
//     }

//     getRoleDetails(role) {
//         if (!window.jobDescriptions) {
//             console.error('Job descriptions data not loaded!');
//             return null;
//         }

//         return window.jobDescriptions[role] || {
//             title: role,
//             description: `Detailed information for ${role} will be available soon.`,
//             skills: ["Skill information being updated"],
//             marketTrends: [
//                 { trend: "Industry Growth", description: "Information being updated" }
//             ]
//         };
//     }

//     displayRoleDetails(details) {
//         if (!this.roleDetailsContent || !details) return;

//         this.roleDetailsContent.innerHTML = `
//             <div class="role-details-grid p-4">
//                 <div class="details-section mb-4">
//                     <h4 class="mb-3">Role Description</h4>
//                     <p class="text-muted">${details.description}</p>
//                 </div>
                
//                 <div class="details-section mb-4">
//                     <h4 class="mb-3">Required Skills</h4>
//                     <div class="skills-grid">
//                         ${details.skills.map(skill => `
//                             <div class="skill-item p-2 bg-light rounded mb-2">
//                                 <i class="fas fa-check-circle text-success me-2"></i>
//                                 ${skill}
//                             </div>
//                         `).join('')}
//                     </div>
//                 </div>
                
//                 ${details.marketTrends ? `
//                     <div class="details-section">
//                         <h4 class="mb-3">Market Trends</h4>
//                         <div class="trends-grid">
//                             ${details.marketTrends.map(trend => `
//                                 <div class="trend-item p-3 bg-light rounded mb-3">
//                                     <h5 class="text-primary">${trend.trend}</h5>
//                                     <p class="mb-0 text-muted">${trend.description}</p>
//                                 </div>
//                             `).join('')}
//                         </div>
//                     </div>
//                 ` : ''}
//             </div>
//         `;
//     }

//     showCurriculumSteps() {
//         this.curriculumSteps.forEach(card => {
//             card.style.display = 'block';
//         });
//     }

//     hideCurriculumSteps() {
//         this.curriculumSteps.forEach(card => {
//             card.style.display = 'none';
//         });
//     }
// }

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('Initializing curriculum section...');
//     const curriculumSection = document.querySelector('.curriculum-container');
//     if (curriculumSection) {
//         new RoleContentManager();
//     }
// });
class RoleContentManager {
    constructor() {
        // Initialize DOM elements
        this.branchSelect = document.getElementById('branchSelect');
        this.roleSelect = document.getElementById('roleSelect');
        this.stepsSection = document.getElementById('stepsSection');
        this.contentContainer = document.querySelector('.role-content-container');
        this.selectedRoleSpan = document.getElementById('selectedRole');
        this.roleDetailsContent = document.getElementById('roleDetailsContent');
        
        this.initialize();
    }

    initialize() {
        // Bind event listeners
        if (this.branchSelect) {
            this.branchSelect.addEventListener('change', this.handleBranchChange.bind(this));
        }
        if (this.roleSelect) {
            this.roleSelect.addEventListener('change', this.handleRoleChange.bind(this));
        }
        
        // Set initial state
        this.hideRoleContent();
    }

    handleBranchChange(event) {
        const branch = event.target.value;
        
        // Reset and show steps
        this.showSteps();
        this.hideRoleContent();
        
        // Update step 1 content to show selection
        const step1Content = document.getElementById('step1Content');
        if (step1Content) {
            step1Content.innerHTML = `
                <div class="step-highlight">
                    <strong>Great choice!</strong>
                    <p>Branch selected: ${event.target.options[event.target.selectedIndex].text}</p>
                </div>
            `;
        }

        // Show and populate role select
        this.roleSelect.style.display = 'block';
        this.populateRoles(branch);
    }

    handleRoleChange(event) {
        const selectedRole = event.target.options[event.target.selectedIndex].text;
        
        // Hide steps and show role content
        this.hideSteps();
        this.showRoleContent(selectedRole);
        
        // Get and display role details
        const roleDetails = window.jobDescriptions[selectedRole];
        if (roleDetails) {
            this.displayRoleDetails(roleDetails);
        }
    }

    populateRoles(branch) {
        // Clear current options
        this.roleSelect.innerHTML = '<option value="" disabled selected>Select Role</option>';
        
        // Get roles for selected branch
        const roles = Object.keys(window.jobDescriptions).filter(role => 
            window.jobDescriptions[role].branch === (branch === 'cs' ? 'CSE / IT' : branch)
        );

        // Add role options
        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.toLowerCase().replace(/\s+/g, '-');
            option.textContent = role;
            this.roleSelect.appendChild(option);
        });
    }

    displayRoleDetails(details) {
        if (!this.roleDetailsContent) return;

        this.roleDetailsContent.innerHTML = `
            <div class="role-details-grid p-4">
                <div class="details-section mb-4">
                    <h4 class="mb-3">Role Description</h4>
                    <p class="text-muted">${details.description}</p>
                </div>
                
                <div class="details-section mb-4">
                    <h4 class="mb-3">Required Skills</h4>
                    <div class="skills-grid">
                        ${details.skills.map(skill => `
                            <div class="skill-item p-2 bg-light rounded mb-2">
                                <i class="fas fa-check-circle text-success me-2"></i>
                                ${skill}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${details.marketTrends ? `
                    <div class="details-section">
                        <h4 class="mb-3">Market Trends</h4>
                        <div class="trends-grid">
                            ${details.marketTrends.map(trend => `
                                <div class="trend-item p-3 bg-light rounded mb-3">
                                    <h5 class="text-primary">${trend.trend}</h5>
                                    <p class="mb-0 text-muted">${trend.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    showSteps() {
        if (this.stepsSection) {
            this.stepsSection.style.display = 'flex';
        }
    }

    hideSteps() {
        if (this.stepsSection) {
            this.stepsSection.style.display = 'none';
        }
    }

    showRoleContent(role) {
        if (this.contentContainer) {
            this.contentContainer.style.display = 'block';
        }
        if (this.selectedRoleSpan) {
            this.selectedRoleSpan.textContent = role;
        }
    }

    hideRoleContent() {
        if (this.contentContainer) {
            this.contentContainer.style.display = 'none';
        }
    }
}

// Initialize the manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RoleContentManager();
});