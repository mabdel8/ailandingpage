// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelectorAll('.nav-links a');
    const dots = document.querySelectorAll('.slider-nav .dot');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial');

    // Add mobile navigation menu to the DOM
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <ul class="mobile-nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#download">Download</a></li>
        </ul>
    `;
    document.body.appendChild(mobileNav);
    
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when a nav link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - 80; // Offset for fixed header
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function for smooth scroll
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add smooth scrolling to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            smoothScroll(href, 800);
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            smoothScroll(href, 800);
        });
    });

    // Testimonial Slider
    function updateTestimonialSlider(index) {
        // Update slider position
        testimonialSlider.scrollTo({
            left: testimonials[index].offsetLeft,
            behavior: 'smooth'
        });

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateTestimonialSlider(index);
        });
    });

    // Auto slide testimonials every 5 seconds
    let currentSlide = 0;
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        updateTestimonialSlider(currentSlide);
    }, 5000);

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.feature-card, .step, .testimonial');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 150) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add reveal class to CSS for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .feature-card, .step, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.revealed, .step.revealed, .testimonial.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);

    // Check for elements to reveal on initial load and scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}); 