// main.js

import { toggleAccordion, updateSchemesDisplay, nextScheme, previousScheme, playVideo, toggleMobileMenu, ModalManager, ProjectsManager, Carousel, initializeSchemes } from './ui.js';

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
        this.setupFooterUnderConstruction();
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
        
        // Initialize schemes
        // initializeSchemes();
        updateSchemesDisplay();
        
        // Setup schemes navigation
        this.setupSchemesNavigation();
        
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
        
        // Дополнительная проверка аккордеона
        setTimeout(() => {
            const accordionItems = document.querySelectorAll('.accordion-item');
            console.log('Финальная проверка: найдено блоков аккордеона:', accordionItems.length);
            accordionItems.forEach((item, index) => {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                console.log(`Блок ${index + 1}: "${header?.textContent.trim()}", активен: ${item.classList.contains('active')}, контент: ${content ? 'есть' : 'нет'}`);
            });
        }, 500);
    }

    setupFooterUnderConstruction() {
        const ensureModalExists = () => {
            if (document.getElementById('underConstructionModal')) return;
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.id = 'underConstructionModal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Страница в разработке</h3>
                        <button class="modal-close" id="ucModalClose" aria-label="Закрыть">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <p style="margin-bottom: 16px; color: var(--primary-black); opacity: 0.8;">Мы работаем над этим разделом. Загляните позже, пожалуйста.</p>
                        <button class="form-submit-btn" id="ucOkBtn">Понятно</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            const close = () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            };
            modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
            modal.querySelector('#ucModalClose').addEventListener('click', close);
            modal.querySelector('#ucOkBtn').addEventListener('click', close);
        };

        const openModal = () => {
            ensureModalExists();
            const modal = document.getElementById('underConstructionModal');
            if (!modal) return;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const isInactiveHref = (href) => {
            if (!href) return true;
            const trimmed = href.trim();
            if (trimmed === '#' || trimmed === '') return true;
            if (trimmed.startsWith('#')) return true;
            if (trimmed.toLowerCase().startsWith('javascript:')) return true;
            return false;
        };

        document.addEventListener('click', (e) => {
            const footer = e.target.closest('.footer');
            if (!footer) return;

            const clickable = e.target.closest('a, button');
            if (!clickable) return;

            // Allow real links and functional buttons
            if (clickable.tagName === 'A') {
                const href = clickable.getAttribute('href');
                // Skip mailto/tel/http(s)
                if (href && /^(mailto:|tel:|https?:)/i.test(href)) return;
                if (!isInactiveHref(href)) return; // real route
            } else if (clickable.tagName === 'BUTTON') {
                // If button has known functional classes, skip
                if (clickable.classList.contains('footer-cta-btn')) {
                    // let existing handler open callback modal
                    return;
                }
            }

            e.preventDefault();
            openModal();
        });

        // Header: show under-construction modal on header buttons/links without real routes
        document.addEventListener('click', (e) => {
            const header = e.target.closest('.header');
            if (!header) return;

            const clickable = e.target.closest('a, button');
            if (!clickable) return;

            // Exclude burger toggle and offcanvas controls
            if (clickable.id === 'mobileMenuBtn') return;

            if (clickable.tagName === 'A') {
                const href = clickable.getAttribute('href');
                if (href && /^(mailto:|tel:|https?:)/i.test(href)) return;
                if (!isInactiveHref(href)) return;
            }

            // For header buttons (e.g., .cta-btn) always show under-construction
            e.preventDefault();
            // prevent other listeners (like callback modal) from firing
            e.stopImmediatePropagation();
            openModal();
        });
    }

    setupAccordion() {
        console.log('Настройка аккордеона...');
        
        // Делегирование событий: надёжнее при любых изменениях DOM
        document.addEventListener('click', (event) => {
            const header = event.target.closest('.accordion-header');
            if (!header) return;
            const item = header.closest('.accordion-item');
            if (!item) return;
            event.preventDefault();

            console.log('Клик по аккордеону:', header.textContent.trim());
            const isActive = item.classList.contains('active');
            
            // Переключаем только текущий элемент
            if (isActive) {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.maxHeight = '0px';
                }
                console.log('Закрыт блок:', header.textContent.trim());
            } else {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                if (content) {
                    const scrollH = content.scrollHeight + 40;
                    content.style.maxHeight = `${scrollH}px`;
                }
                console.log('Открыт блок:', header.textContent.trim());
            }
        });

        // Инициализация высоты для уже открытых по умолчанию
        setTimeout(() => {
            const items = document.querySelectorAll('.accordion-item');
            console.log('Найдено элементов аккордеона:', items.length);
            
            items.forEach((item) => {
                if (item.classList.contains('active')) {
                    const content = item.querySelector('.accordion-content');
                    if (content) {
                        const scrollH = content.scrollHeight + 40;
                        content.style.maxHeight = `${scrollH}px`;
                        console.log('Инициализирован активный блок:', item.querySelector('.accordion-header').textContent.trim());
                    }
                }
            });
        }, 100);
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

    setupSchemesNavigation() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                previousScheme();
                console.log('Previous scheme clicked');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextScheme();
                console.log('Next scheme clicked');
            });
        }
        
        console.log('Schemes navigation setup complete');
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
    console.log('DOM загружен, инициализация приложения...');
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