// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initTestimonialSlider();
    initFormValidation();
    initScrollAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }

            // Get target section
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        reviewCards.forEach(card => {
            card.classList.remove('active');
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Ensure index is within bounds
        if (index < 0) {
            currentIndex = reviewCards.length - 1;
        } else if (index >= reviewCards.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Show current slide and activate corresponding dot
        reviewCards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Event listeners for previous button
    prevBtn.addEventListener('click', function () {
        showSlide(currentIndex - 1);
    });

    // Event listeners for next button
    nextBtn.addEventListener('click', function () {
        showSlide(currentIndex + 1);
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
        });
    });

    // Auto slide every 5 seconds
    setInterval(function () {
        showSlide(currentIndex + 1);
    }, 5000);
}

// Form validation functionality
function initFormValidation() {
    const form = document.getElementById('appointment-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const messageError = document.getElementById('message-error');

    // Form submission event
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset previous errors
        resetErrors();

        // Validate inputs
        let isValid = true;

        // Name validation
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Name is required';
            nameInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }

        // Email validation
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }

        // Phone validation
        if (!phoneInput.value.trim()) {
            phoneError.textContent = 'Phone number is required';
            phoneInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else if (!isValidPhone(phoneInput.value)) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }

        // Message validation
        if (!messageInput.value.trim()) {
            messageError.textContent = 'Message is required';
            messageInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }

        // If form is valid, submit
        if (isValid) {
            submitForm();
        }
    });

    // Real-time validation for inputs
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim()) {
            nameError.textContent = '';
            nameInput.style.borderColor = '';
        }
    });

    emailInput.addEventListener('input', function () {
        if (emailInput.value.trim() && isValidEmail(emailInput.value)) {
            emailError.textContent = '';
            emailInput.style.borderColor = '';
        }
    });

    phoneInput.addEventListener('input', function () {
        if (phoneInput.value.trim() && isValidPhone(phoneInput.value)) {
            phoneError.textContent = '';
            phoneInput.style.borderColor = '';
        }
    });

    messageInput.addEventListener('input', function () {
        if (messageInput.value.trim() && messageInput.value.trim().length >= 10) {
            messageError.textContent = '';
            messageInput.style.borderColor = '';
        }
    });

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to validate phone
    function isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }

    // Reset all error messages
    function resetErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        messageError.textContent = '';

        nameInput.style.borderColor = '';
        emailInput.style.borderColor = '';
        phoneInput.style.borderColor = '';
        messageInput.style.borderColor = '';
    }

    // Form submission success
    function submitForm() {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(function () {
            // Show success message
            alert('Thank you! Your appointment request has been submitted. We will contact you within 24 hours to confirm.');

            // Reset form
            form.reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Scroll to top of form
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1500);
    }
}

// Scroll animations
function initScrollAnimations() {
    // Get all sections
    const sections = document.querySelectorAll('.section');

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Set minimum date for appointment form to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Add CSS for animated sections
const style = document.createElement('style');
style.textContent = `
    .section .service-card,
    .section .about-content > div,
    .section .contact-card,
    .section .form-container {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .section.animated .service-card,
    .section.animated .about-content > div,
    .section.animated .contact-card,
    .section.animated .form-container {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Stagger animation for service cards */
    .services-grid .service-card:nth-child(1) { transition-delay: 0.1s; }
    .services-grid .service-card:nth-child(2) { transition-delay: 0.2s; }
    .services-grid .service-card:nth-child(3) { transition-delay: 0.3s; }
    .services-grid .service-card:nth-child(4) { transition-delay: 0.4s; }
    .services-grid .service-card:nth-child(5) { transition-delay: 0.5s; }
    .services-grid .service-card:nth-child(6) { transition-delay: 0.6s; }
`;
document.head.appendChild(style);