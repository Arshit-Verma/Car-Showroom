// Contact form functionality using Formspree
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    // Attach event listeners
    this.attachEventListeners();
  }

  attachEventListeners() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
      // Prevent default form submission to handle it with custom logic
      contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    // Get form data
    const form = event.target;
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Validate inputs
    if (!this.validateForm(name, email, subject, message)) {
      return;
    }

    // Disable submit button
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      // Prepare data as JSON
      const payload = {
        email: email,
        name: name,
        subject: subject,
        message: message,
        _replyto: email
      };

      // Send email via Formspree using JSON
      const response = await fetch('https://formspree.io/f/xykbwddr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      console.log('Formspree response:', data, 'Status:', response.status);

      if (response.ok) {
        console.log('Email sent successfully via Formspree');
        
        // Show success message
        this.showMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
      } else {
        throw new Error(data.error || `Failed to send email (Status: ${response.status})`);
      }

    } catch (error) {
      console.error('Formspree error:', error);
      this.showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  validateForm(name, email, subject, message) {
    if (!name || name.length < 2) {
      this.showMessage('Please enter a valid name (at least 2 characters).', 'error');
      return false;
    }

    if (!this.isValidEmail(email)) {
      this.showMessage('Please enter a valid email address.', 'error');
      return false;
    }

    if (!subject || subject.length < 3) {
      this.showMessage('Please enter a subject (at least 3 characters).', 'error');
      return false;
    }

    if (!message || message.length < 10) {
      this.showMessage('Please enter a message (at least 10 characters).', 'error');
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showMessage(text, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.contact-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `contact-message ${type}`;
    messageDiv.textContent = text;

    // Add styles
    messageDiv.style.cssText = `
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      animation: slideDown 0.3s ease;
      ${type === 'success' 
        ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
        : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
      }
    `;

    // Insert message above form
    const form = document.querySelector('#contact form');
    form.parentNode.insertBefore(messageDiv, form);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageDiv.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;
document.head.appendChild(style);

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});
