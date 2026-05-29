// ============================================
// Apex Freight Solutions — Scripts
// ============================================

// --- Mobile nav toggle ---
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// --- Quote form submission via Fetch (AJAX) ---
const form      = document.getElementById('quote-form');
const statusDiv = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset status
    statusDiv.className = 'form-status';
    statusDiv.textContent = '';

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusDiv.className = 'form-status success';
        statusDiv.textContent = 'Your inquiry has been received. A logistics specialist will be in contact within one business day.';
        form.reset();
      } else {
        const data = await response.json();
        const errorMsg = data.errors
          ? data.errors.map(err => err.message).join(', ')
          : 'An error occurred processing your request. Please try again or contact us directly.';
        statusDiv.className = 'form-status error';
        statusDiv.textContent = errorMsg;
      }
    } catch (err) {
      statusDiv.className = 'form-status error';
      statusDiv.textContent = 'Unable to connect. Please verify your network connection and resubmit.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Inquiry';
    }
  });
}
