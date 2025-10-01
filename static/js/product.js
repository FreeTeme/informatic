// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    // Schemes navigation
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const schemesGrid = document.querySelector('.schemes-grid');
    let currentIndex = 0;
    
    if (prevBtn && nextBtn && schemesGrid) {
        const schemeCards = schemesGrid.querySelectorAll('.scheme-card');
        const totalCards = schemeCards.length;
        
        function updateSchemes() {
            schemeCards.forEach((card, index) => {
                if (window.innerWidth <= 768) {
                    // Mobile: show one card at a time
                    card.style.display = index === currentIndex ? 'block' : 'none';
                } else if (window.innerWidth <= 1024) {
                    // Tablet: show two cards at a time
                    const startIndex = Math.floor(currentIndex / 2) * 2;
                    card.style.display = (index >= startIndex && index < startIndex + 2) ? 'block' : 'none';
                } else {
                    // Desktop: show all cards
                    card.style.display = 'block';
                }
            });
        }
        
        prevBtn.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1;
            } else if (window.innerWidth <= 1024) {
                currentIndex = currentIndex > 1 ? currentIndex - 2 : totalCards - 2;
            }
            updateSchemes();
        });
        
        nextBtn.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                currentIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
            } else if (window.innerWidth <= 1024) {
                currentIndex = currentIndex < totalCards - 2 ? currentIndex + 2 : 0;
            }
            updateSchemes();
        });
        
        // Initialize
        updateSchemes();
        
        // Update on window resize
        window.addEventListener('resize', updateSchemes);
    }
    
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
    
    // Mobile menu toggle (if needed)
    const menuBtn = document.querySelector('.menu-btn');
    const navigation = document.querySelector('.navigation');
    
    if (menuBtn && navigation) {
        menuBtn.addEventListener('click', function() {
            navigation.classList.toggle('mobile-open');
        });
    }
    
    // Form handling for callback buttons
    const callbackBtns = document.querySelectorAll('.callback-btn, .footer-callback-btn, .cta-btn, .download-btn, .download-presentation-btn');
    
    callbackBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple alert for demo purposes
            // In a real application, you would open a modal or redirect to a form
            if (this.textContent.includes('Скачать')) {
                alert('Функция скачивания будет доступна после регистрации');
            } else {
                alert('Форма обратного звонка будет открыта');
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .scheme-card, .detail-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .scheme-card, .detail-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (max-width: 768px) {
            .navigation.mobile-open {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(3, 11, 57, 0.95);
                flex-direction: column;
                padding: 20px;
                gap: 15px;
            }
        }
    `;
    document.head.appendChild(style);
});