document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('editButton');
    const form = document.getElementById('profileForm');
    const inputs = form.getElementsByTagName('input');
    const successMessage = document.getElementById('successMessage');
    let isEditing = false;

    editButton.addEventListener('click', function() {
        if (!isEditing) {
            // Enable editing
            Array.from(inputs).forEach(input => {
                input.disabled = false;
                input.classList.add('editing');
            });
            editButton.textContent = 'Save Changes';
            editButton.classList.add('saving');
        } else {
            // Save changes
            Array.from(inputs).forEach(input => {
                input.disabled = true;
                input.classList.remove('editing');
            });
            editButton.textContent = 'Edit Profile';
            editButton.classList.remove('saving');
            
            // Show success message
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
        isEditing = !isEditing;
    });
});