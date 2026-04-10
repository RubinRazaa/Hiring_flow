const N8N_WEBHOOK_URL = 'https://your-n8n-domain.com/webhook/candidate-intake'; // Replace with actual URL

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('intake-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const header = document.querySelector('.header');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous errors
        errorMessage.classList.remove('show');
        
        // Set UI to loading state
        submitBtn.classList.add('loading');
        btnText.textContent = 'Sending...';
        
        // Collect field values
        const formData = new FormData(form);
        try {
            // Send POST request (FormData handles multipart/form-data including files)
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                body: formData
            });
            
            // For a robust webhook approach, ensure you handle network failures and timeout
            
            // Show success animation
            form.style.display = 'none';
            header.style.display = 'none';
            successMessage.classList.add('show');
            
        } catch (error) {
            console.error('Submission error:', error);
            // Show error message
            errorMessage.classList.add('show');
            
            // Reset button state
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Submit Application';
        }
    });
});
