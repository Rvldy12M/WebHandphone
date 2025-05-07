// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
  
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
  
  // Navbar background change on scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.padding = '10px 0';
      navbar.style.background = 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(58, 12, 163, 0.95)) !important';
    } else {
      navbar.style.padding = '15px 0';
      navbar.style.background = 'linear-gradient(135deg, rgba(18, 18, 18, 0.8), rgba(58, 12, 163, 0.8)) !important';
    }
  });
  
  // Animate elements on scroll
  function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      } else {
        reveals[i].classList.remove('active');
      }
    }
  }
  
  window.addEventListener('scroll', reveal);
  
  // Add reveal classes to elements after DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to feature cards
    const featureCards = document.querySelectorAll('#fitur .card');
    featureCards.forEach((card, index) => {
      card.classList.add('reveal', 'fade-bottom');
      card.style.transitionDelay = `${0.1 * index}s`;
    });
    
    // Add animation classes to specification rows
    const specRows = document.querySelectorAll('#spesifikasi tr');
    specRows.forEach((row, index) => {
      row.classList.add('reveal', 'fade-left');
      row.style.transitionDelay = `${0.05 * index}s`;
    });
    
    // Add animation to section headings
    document.querySelectorAll('section h2').forEach(heading => {
      heading.classList.add('reveal', 'fade-bottom');
    });
    
    // Add animation to the form
    const form = document.getElementById('preorderForm');
    if (form) {
      form.classList.add('reveal', 'fade-bottom');
    }
    
    // Call reveal for initial check
    setTimeout(reveal, 100);
  });
  
  // Form validation and submission
  document.getElementById('preorderForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const nohp = document.getElementById('nohp').value.trim();
    const warna = document.getElementById('warna').value;
    const catatan = document.getElementById('catatan').value.trim();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\- ]{8,15}$/;
  
    // Validation with visual feedback
    let isValid = true;
    
    // Validate name
    if (!nama) {
      showError('nama', 'Nama harus diisi');
      isValid = false;
    } else {
      removeError('nama');
    }
    
    // Validate email
    if (!email) {
      showError('email', 'Email harus diisi');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError('email', 'Format email tidak valid');
      isValid = false;
    } else {
      removeError('email');
    }
    
    // Validate phone
    if (!nohp) {
      showError('nohp', 'Nomor HP harus diisi');
      isValid = false;
    } else if (!phoneRegex.test(nohp)) {
      showError('nohp', 'Format nomor HP tidak valid');
      isValid = false;
    } else {
      removeError('nohp');
    }
    
    // Validate color selection
    if (!warna) {
      showError('warna', 'Pilih warna');
      isValid = false;
    } else {
      removeError('warna');
    }
    
    // Validate notes
    if (!catatan) {
      showError('catatan', 'Catatan harus diisi');
      isValid = false;
    } else {
      removeError('catatan');
    }
  
    if (isValid) {
      // Show success message with animation
      showSuccess();
      this.reset();
    }
  });
  
  // Function to show error message
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = field.nextElementSibling;
    
    // Remove existing error if exists
    if (existingError && existingError.classList.contains('error-message')) {
      existingError.remove();
    }
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger mt-1';
    errorDiv.innerText = message;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
    field.classList.add('is-invalid');
    
    // Shake animation
    field.classList.add('shake');
    setTimeout(() => {
      field.classList.remove('shake');
    }, 500);
  }
  
  // Function to remove error message
  function removeError(fieldId) {
    const field = document.getElementById(fieldId);
    const existingError = field.nextElementSibling;
    
    if (existingError && existingError.classList.contains('error-message')) {
      existingError.remove();
    }
    
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
  }
  
  // Function to show success message
  function showSuccess() {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'toast show';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
      <div class="toast-header bg-success text-white">
        <strong class="me-auto">Nova X1</strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        <div class="d-flex align-items-center">
          <i class="bi bi-check-circle-fill text-success me-2 fs-4"></i>
          <span>Terima kasih telah melakukan pre-order! Kami akan segera menghubungi Anda.</span>
        </div>
      </div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toastEl);
    
    // Add close button functionality
    const closeButton = toastEl.querySelector('.btn-close');
    closeButton.addEventListener('click', function() {
      toastEl.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      toastEl.remove();
    }, 5000);
    
    // Reset form validation visuals
    document.querySelectorAll('.is-valid').forEach(el => {
      el.classList.remove('is-valid');
    });
  }
  
  // Add shake animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
    
    .shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    .toast {
      animation: fadeInRight 0.5s ease;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      border: none;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .toast-header {
      padding: 0.75rem 1rem;
    }
    
    .toast-body {
      padding: 1rem;
      background-color: white;
    }
  `;
  document.head.appendChild(style);
  
  // Add typed.js effect to hero heading if Typed.js is available
  if (typeof Typed !== 'undefined') {
    const heroHeading = document.querySelector('#home h1');
    const originalText = heroHeading.textContent;
    heroHeading.textContent = '';
    
    new Typed(heroHeading, {
      strings: [originalText],
      typeSpeed: 50,
      backSpeed: 0,
      startDelay: 500,
      showCursor: false
    });
  }
  
  // Add parallax effect to hero section
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const homeSection = document.getElementById('home');
    
    if (homeSection) {
      const homeImg = homeSection.querySelector('img');
      if (homeImg) {
        homeImg.style.transform = `translateY(${scrollPosition * 0.05}px)`;
      }
    }
  });