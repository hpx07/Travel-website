// Main JavaScript file for Wanderlust travel website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNav();
    initTestimonialSlider();
    initStickyHeader();
    initNewsletterForm();
    initScrollAnimation();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Toggle icon between hamburger and close
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-nav-toggle') && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Handle page navigation in mobile view
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

/**
 * Testimonial Slider functionality
 */
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (testimonialSlides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Start the automatic slider
    startSlider();
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopSlider();
            showPreviousSlide();
            startSlider();
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopSlider();
            showNextSlide();
            startSlider();
        });
    }
    
    // Indicator clicks
    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                stopSlider();
                showSlide(index);
                startSlider();
            });
        });
    }
    
    function startSlider() {
        // Change slide every 5 seconds
        slideInterval = setInterval(showNextSlide, 5000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    function showSlide(slideIndex) {
        // Remove active class from all slides and indicators
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        if (indicators.length > 0) {
            indicators.forEach(indicator => indicator.classList.remove('active'));
        }
        
        // Add active class to current slide and indicator
        currentSlide = slideIndex;
        testimonialSlides[currentSlide].classList.add('active');
        if (indicators.length > 0 && indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
    }
    
    function showNextSlide() {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= testimonialSlides.length) {
            nextSlide = 0;
        }
        showSlide(nextSlide);
    }
    
    function showPreviousSlide() {
        let prevSlide = currentSlide - 1;
        if (prevSlide < 0) {
            prevSlide = testimonialSlides.length - 1;
        }
        showSlide(prevSlide);
    }
    
    // Pause slider on hover
    const testimonialContainer = document.querySelector('.testimonial-slider');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', stopSlider);
        testimonialContainer.addEventListener('mouseleave', startSlider);
    }
}

/**
 * Sticky Header on scroll
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const stickyThreshold = 50; // Scroll threshold to make header sticky
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > stickyThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

/**
 * Newsletter Form Submission
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }
        
        // In a real implementation, you would send the form data to a server
        // This is a simulation for demonstration purposes
        
        // Show success message
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        
        // Reset form
        newsletterForm.reset();
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('hiding');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
}

/**
 * Scroll Animation - Animate elements when they come into view
 */
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.destination-card, .feature, .value-card, .team-member, .gallery-item, .booking-option-card');
    
    if (animatedElements.length === 0) return;
    
    // Add initial invisible class to elements
    animatedElements.forEach(element => {
        if (!element.classList.contains('animated')) {
            element.classList.add('animate-on-scroll');
        }
    });
    
    // Check which elements are visible on page load
    checkVisibility();
    
    // Check again when page is scrolled
    window.addEventListener('scroll', throttle(checkVisibility, 200));
    
    function checkVisibility() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && element.classList.contains('animate-on-scroll')) {
                element.classList.remove('animate-on-scroll');
                element.classList.add('animated');
            }
        });
    }
    
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Throttle function to limit how often a function is called
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    }
}

/**
 * FAQ Accordion functionality
 * This is initialized if there are FAQ items on the page
 */
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});
