// Main JavaScript functionality
class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupHeroPagination();
        this.setupCallbackButtons();
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const nav = document.getElementById('nav');

        if (mobileMenuBtn && nav) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                nav.classList.toggle('active');
            });

            // Close menu when clicking on nav links
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !nav.contains(e.target)) {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                }
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.section-title, .product-card, .benefit-item, .news-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .section-title, .product-card, .benefit-item, .news-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupHeroPagination() {
        const dots = document.querySelectorAll('.dot');
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Remove active class from all dots
                dots.forEach(d => d.classList.remove('active'));
                // Add active class to clicked dot
                dot.classList.add('active');
                
                // Here you could add logic to change hero content/background
                console.log(`Switched to slide ${index}`);
            });
        });
    }

    setupCallbackButtons() {
        const callbackButtons = document.querySelectorAll('.cta-btn, .hero-cta-btn, .contact-cta-btn, .footer-cta-btn');
        
        callbackButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // Open modal or handle callback request
                if (window.modalManager) {
                    window.modalManager.openModal();
                } else {
                    console.log('Callback requested');
                    alert('Спасибо за интерес! Мы свяжемся с вами в ближайшее время.');
                }
            });
        });
    }
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Format phone number
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
        }
        return phone;
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
});

// Handle window resize
window.addEventListener('resize', utils.debounce(() => {
    // Recalculate layouts if needed
    console.log('Window resized');
}, 250));

// Handle scroll events
window.addEventListener('scroll', utils.throttle(() => {
    // Handle scroll-based animations or effects
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, 100));

// Add CSS for header scroll effect
const headerScrollStyle = document.createElement('style');
headerScrollStyle.textContent = `
    .header {
        transition: background-color 0.3s ease;
    }
    
    .header.scrolled {
        background-color: rgba(3, 11, 57, 0.95);
        backdrop-filter: blur(10px);
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(headerScrollStyle);