function initializeCurriculum() {
    // Initialize Bootstrap dropdowns
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => 
        new bootstrap.Dropdown(dropdownToggleEl)
    );

    const curriculumIntro = document.querySelector('.curriculum-intro');
    const contentDisplay = document.getElementById('content-display');
    
    // Show intro initially
    if (!contentDisplay.innerHTML.trim()) {
        curriculumIntro.style.display = 'block';
    }

    // Branch Selection
    document.querySelectorAll(".dropdown-item[data-branch]").forEach((item) => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            const selectedBranch = this.getAttribute("data-branch");
            const branchButton = document.getElementById("dropdown-branch-button");
            const secondDropdown = document.getElementById("second-dropdown-container");
            const subjectButton = document.getElementById("dropdown-subject-button");
            
            // Update branch button text
            branchButton.textContent = selectedBranch;
            
            // Show second dropdown
            secondDropdown.style.display = "block";
            
            // Reset subject button text
            subjectButton.textContent = "Indicate Job Preference";
            
            // Hide intro and show branch message
            curriculumIntro.style.display = "none";
            document.getElementById("branch-selected-message").style.display = "block";
            document.getElementById("role-selected-message").style.display = "none";
            
            // Hide all job roles first
            document.querySelectorAll(".job-roles").forEach(list => {
                list.classList.add("d-none");
            });
            
            // Show relevant job roles
            const targetRoles = document.getElementById(`${selectedBranch}-roles`);
            if (targetRoles) {
                targetRoles.classList.remove("d-none");
            }
            
            // Clear previous content
            contentDisplay.style.display = "none";
            contentDisplay.innerHTML = "";
        });
    });

    // Role Selection
    document.querySelectorAll(".dropdown-item[data-role]").forEach((item) => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            const selectedRole = this.getAttribute("data-role");
            const subjectButton = document.getElementById("dropdown-subject-button");
            
            // Update button text
            subjectButton.textContent = selectedRole;
            
            // Update messages
            document.getElementById("branch-selected-message").style.display = "none";
            document.getElementById("role-selected-message").style.display = "block";
            
            // Display role content
            const content = jobDescriptions[selectedRole];
            if (content) {
                contentDisplay.innerHTML = generateRoleHTML(content);
                contentDisplay.style.display = "block";
            } else {
                contentDisplay.innerHTML = '<div class="alert alert-warning">Job role details not found.</div>';
                contentDisplay.style.display = "block";
            }

            // Close the dropdown
            const dropdown = bootstrap.Dropdown.getInstance(subjectButton);
            if (dropdown) {
                dropdown.hide();
            }
        });
    });
}

// Helper function to generate role HTML
function generateRoleHTML(content) {
    return `
        <div class="role-card">
            <div class="role-header">
                <h2 class="role-title">Job Title: ${content.title || "Role Title Not Available"}</h2>
            </div>
            ${content.note ? `<div class="role-note"><i class="fas fa-info-circle"></i> ${content.note}</div>` : ""}
            ${content.description ? `
                <div class="description-section mb-4">
                    <h4 class="mb-2">Job Description</h4>
                    <p>${content.description}</p>
                </div>` : ""
            }
            ${content.sectionDescription ? `
                <div class="section-description mb-4">
                    <h4 class="mb-2">Overview</h4>
                    <p>${content.sectionDescription}</p>
                </div>` : ""
            }
            <div class="skills-section">
                <h4 class="mb-3">Required Skills</h4>
                <div class="skills-container">
                    ${content.skills.map(skill => `
                        <div class="skill-badge">
                            <i class="fas fa-check-circle"></i>
                            ${skill}
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeCurriculum);