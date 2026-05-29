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
        statusDiv.textContent = 'Thank you! Your quote request has been sent. We\'ll be in touch shortly.';
        form.reset();
      } else {
        const data = await response.json();
        const errorMsg = data.errors
          ? data.errors.map(err => err.message).join(', ')
          : 'Something went wrong. Please try again or call us directly.';
        statusDiv.className = 'form-status error';
        statusDiv.textContent = errorMsg;
      }
    } catch (err) {
      statusDiv.className = 'form-status error';
      statusDiv.textContent = 'Network error. Please check your connection and try again.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Quote Request';
    }
  });
}
