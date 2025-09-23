// Accordion functionality
function toggleAccordion(element) {
    const allItems = document.querySelectorAll('.accordion-item');
    const isActive = element.classList.contains('active');
    
    // Close all accordion items
    allItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // If the clicked item wasn't active, open it
    if (!isActive) {
        element.classList.add('active');
    }
}

// Scheme navigation
let currentSchemeIndex = 0;
const schemes = [
    {
        image: "C:/Users/user/Downloads/image (11).png",
        title: "ПЛАН ЭТАЖА"
    },
    {
        image: "C:/Users/user/Downloads/image (12).png",
        title: "СОБЫТИЙНАЯ ЦЕПОЧКА ПРОЦЕССОВ"
    },
    {
        image: "C:/Users/user/Downloads/image (13).png",
        title: "СХЕМА БИЗНЕС-ПРОЦЕССОВ"
    },
    {
        image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        title: "ТЕХНИЧЕСКАЯ СХЕМА"
    },
    {
        image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        title: "ОРГАНИЗАЦИОННАЯ СТРУКТУРА"
    }
];

function updateSchemesDisplay() {
    const schemesGrid = document.querySelector('.schemes-grid');
    if (!schemesGrid) return;
    
    schemesGrid.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const schemeIndex = (currentSchemeIndex + i) % schemes.length;
        const scheme = schemes[schemeIndex];
        
        const schemeCard = document.createElement('div');
        schemeCard.className = 'scheme-card';
        schemeCard.innerHTML = `
            <img src="${scheme.image}" alt="${scheme.title}" class="scheme-image">
            <h3>${scheme.title}</h3>
        `;
        
        schemesGrid.appendChild(schemeCard);
    }
}

function nextScheme() {
    currentSchemeIndex = (currentSchemeIndex + 1) % schemes.length;
    updateSchemesDisplay();
}

function previousScheme() {
    currentSchemeIndex = (currentSchemeIndex - 1 + schemes.length) % schemes.length;
    updateSchemesDisplay();
}

// Video functionality
function playVideo() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        // In a real implementation, you would replace this with actual video player
        alert('Видео будет воспроизведено. В реальной реализации здесь будет видеоплеер.');
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    const sections = document.querySelectorAll('.section, .hero-section, .cta-section, .registry-section, .action-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Header search toggle
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
});

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// Form handling (for callback buttons)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-callback') || 
        (e.target.textContent && e.target.textContent.includes('Обратный звонок'))) {
        e.preventDefault();
        
        // In a real implementation, this would open a modal or form
        const phone = prompt('Введите ваш номер телефона:');
        if (phone) {
            alert(`Спасибо! Мы перезвоним вам по номеру ${phone} в ближайшее время.`);
        }
    }
    
    if (e.target.textContent && (
        e.target.textContent.includes('Скачать') || 
        e.target.textContent.includes('Заказать консультацию'))) {
        e.preventDefault();
        
        // In a real implementation, this would handle downloads or form submissions
        alert('Функция будет реализована. Спасибо за интерес к нашему продукту!');
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero section
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
});

// Add CSS for initial hero animation
document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-content .btn-primary');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});