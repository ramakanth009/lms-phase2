function initializeCurriculum() {
    const curriculumIntro = document.querySelector('.curriculum-intro');
    const contentDisplay = document.getElementById('content-display');

    // Show intro initially if content is empty
    if (!contentDisplay.innerHTML.trim()) {
        curriculumIntro.style.display = 'block';
    }

    // Branch Selection
    document.querySelectorAll(".dropdown-item[data-branch]").forEach((item) => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            const selectedBranch = this.getAttribute("data-branch");

            // Update UI elements
            document.getElementById("dropdown-branch-button").textContent = selectedBranch;
            document.getElementById("second-dropdown-container").style.display = "block";
            document.getElementById("branch-selected-message").style.display = "block";
            curriculumIntro.style.display = "none"; // Hide intro

            // Reset role selection UI
            document.getElementById("dropdown-subject-button").textContent = "Indicate Job Preference";
            document.getElementById("role-selected-message").style.display = "none";

            // Hide all job roles initially
            document.querySelectorAll(".job-roles").forEach(list => list.classList.add("d-none"));

            // Show relevant job roles
            const targetRoles = document.getElementById(`${selectedBranch}-roles`);
            if (targetRoles) targetRoles.classList.remove("d-none");

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

            // Update UI elements
            document.getElementById("branch-selected-message").style.display = "none";
            document.getElementById("role-selected-message").style.display = "block";
            document.getElementById("dropdown-subject-button").textContent = selectedRole;

            // Display role content
            const content = jobDescriptions[selectedRole];
            if (content) {
                contentDisplay.innerHTML = generateRoleHTML(content);
                contentDisplay.style.display = "block";
            } else {
                contentDisplay.innerHTML = '<div class="alert alert-warning">Job role details not found.</div>';
                contentDisplay.style.display = "block";
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
