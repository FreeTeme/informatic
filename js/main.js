// main.js

import { toggleAccordion, updateSchemesDisplay, nextScheme, previousScheme, playVideo, toggleMobileMenu, ModalManager, ProjectsManager, Carousel } from './ui.js';

// Utility functions from main.js
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

class App {
    constructor() {
        this.init();
    }

    init() {
        console.log('Initializing main.js');
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupHeroPagination();
        this.setupCallbackButtons();
        this.setupAccordion();
        // HTML5 видео заменено на встроенный YouTube iframe — инициализация не нужна

        // From product.js DOMContentLoaded
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Initialize schemes display
        updateSchemesDisplay();
        
        // Header search toggle from product.js
        const searchContainer = document.querySelector('.header-search');
        const searchButton = document.querySelector('.btn-search');
        const searchInput = document.querySelector('.search-input');
        if (searchButton && searchContainer && searchInput) {
            searchButton.addEventListener('click', function() {
                searchContainer.classList.toggle('active');
                if (searchContainer.classList.contains('active')) {
                    setTimeout(() => searchInput.focus(), 10);
                }
            });

            // Close on Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
                    searchContainer.classList.remove('active');
                }
            });
        }

        // Initialize managers
        window.modalManager = new ModalManager();
        window.projectsManager = new ProjectsManager();
        window.productCarousel = new Carousel('productsCarousel');
        window.newsCarousel = new Carousel('newsGrid', 'news');
    }

    setupAccordion() {
        const items = document.querySelectorAll('.accordion-item');
        console.log('Found accordion items:', items.length);
        if (!items.length) return;
        items.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            if (!header) return;
            header.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Accordion clicked:', index);
                const isActive = item.classList.contains('active');
                // Закрываем все открытые блоки
                document.querySelectorAll('.accordion-item.active').forEach(opened => opened.classList.remove('active'));
                // Если блок был закрыт, открываем его
                if (!isActive) {
                    item.classList.add('active');
                    console.log('Opening accordion item:', index);
                }
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navOffcanvas = document.getElementById('navOffcanvas');
        const backdrop = document.getElementById('navBackdrop');
        const closeOffcanvas = () => {
            mobileMenuBtn && mobileMenuBtn.classList.remove('active');
            navOffcanvas && navOffcanvas.classList.remove('active');
            backdrop && backdrop.classList.remove('active');
            navOffcanvas && navOffcanvas.setAttribute('aria-hidden', 'true');
        };
        const openOffcanvas = () => {
            mobileMenuBtn && mobileMenuBtn.classList.add('active');
            navOffcanvas && navOffcanvas.classList.add('active');
            backdrop && backdrop.classList.add('active');
            navOffcanvas && navOffcanvas.setAttribute('aria-hidden', 'false');
        };

        if (mobileMenuBtn && navOffcanvas && backdrop) {
            mobileMenuBtn.addEventListener('click', () => {
                if (navOffcanvas.classList.contains('active')) {
                    closeOffcanvas();
                } else {
                    openOffcanvas();
                }
            });

            // Close on backdrop click
            backdrop.addEventListener('click', closeOffcanvas);

            // Close on ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeOffcanvas();
            });

            // Close when clicking on any link/button inside offcanvas
            navOffcanvas.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('click', closeOffcanvas);
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
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all elements for animation (merged from product.js, main.js, projects.js)
        const animateElements = document.querySelectorAll('.section-title, .product-card, .benefit-item, .news-item, .section, .hero-section, .cta-section, .registry-section, .action-section');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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

    // Simple video play overlay
    setupVideoPlayer() {
        const video = document.getElementById('promoVideo');
        const playBtn = document.getElementById('promoVideoPlay');
        const wrapper = document.getElementById('promoVideoWrapper');
        if (!video || !playBtn || !wrapper) return;

        const play = () => {
            playBtn.style.display = 'none';
            video.play();
        };
        playBtn.addEventListener('click', play);
        wrapper.addEventListener('click', (e) => {
            if (e.target === wrapper) play();
        });
        video.addEventListener('pause', () => {
            playBtn.style.display = '';
        });
        video.addEventListener('play', () => {
            playBtn.style.display = 'none';
        });
    }
}

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

    // Animate hero section from product.js
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButton = document.querySelector('.hero-content .btn-primary');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroDescription) {
        setTimeout(() => {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroButton) {
        setTimeout(() => {
            heroButton.style.opacity = '1';
            heroButton.style.transform = 'translateY(0)';
        }, 900);
    }

    // Initial hero animation CSS from product.js
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-content .btn-primary');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
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