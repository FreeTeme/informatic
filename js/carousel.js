// Carousel functionality for products section
class ProductCarousel {
    constructor() {
        this.carousel = document.getElementById('productsCarousel');
        this.prevBtn = document.getElementById('productsPrev');
        this.nextBtn = document.getElementById('productsNext');
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.totalItems = 4; // Total number of products
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        if (!this.carousel) return;
        
        // Set initial state
        this.updateCarousel();
        this.updateButtons();
    }

    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            const newItemsPerView = this.getItemsPerView();
            if (newItemsPerView !== this.itemsPerView) {
                this.itemsPerView = newItemsPerView;
                this.currentIndex = Math.min(this.currentIndex, this.getMaxIndex());
                this.updateCarousel();
                this.updateButtons();
            }
        });

        // Touch/swipe support for mobile
        this.setupTouchEvents();
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 4;
    }

    getMaxIndex() {
        return Math.max(0, this.totalItems - this.itemsPerView);
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
            this.updateButtons();
        }
    }

    next() {
        const maxIndex = this.getMaxIndex();
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
            this.updateButtons();
        }
    }

    updateCarousel() {
        if (!this.carousel) return;
        
        const cards = this.carousel.querySelectorAll('.product-card');
        const cardWidth = 100 / this.itemsPerView;
        const translateX = -(this.currentIndex * cardWidth);
        
        // Apply transform to show current items
        cards.forEach((card, index) => {
            card.style.transform = `translateX(${translateX}%)`;
            card.style.width = `${cardWidth}%`;
            
            // Add animation delay for staggered effect
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    updateButtons() {
        if (!this.prevBtn || !this.nextBtn) return;
        
        const maxIndex = this.getMaxIndex();
        
        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
        
        // Add visual feedback
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
    }

    setupTouchEvents() {
        if (!this.carousel) return;
        
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // Prevent vertical scrolling if horizontal swipe is detected
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        this.carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            isDragging = false;
        }, { passive: true });
    }

    // Auto-play functionality (optional)
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            const maxIndex = this.getMaxIndex();
            if (this.currentIndex >= maxIndex) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.updateCarousel();
            this.updateButtons();
        }, interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Go to specific slide
    goToSlide(index) {
        const maxIndex = this.getMaxIndex();
        this.currentIndex = Math.max(0, Math.min(index, maxIndex));
        this.updateCarousel();
        this.updateButtons();
    }
}

// News carousel for mobile
class NewsCarousel {
    constructor() {
        this.newsGrid = document.querySelector('.news-grid');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (!this.newsGrid || window.innerWidth > 768) return;
        
        this.setupMobileCarousel();
    }

    setupMobileCarousel() {
        const newsItems = this.newsGrid.querySelectorAll('.news-featured, .news-regular');
        
        if (newsItems.length <= 1) return;
        
        // Create carousel container
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'news-carousel-container';
        
        const carousel = document.createElement('div');
        carousel.className = 'news-carousel';
        
        // Move news items to carousel
        newsItems.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'news-slide';
            wrapper.appendChild(item.cloneNode(true));
            carousel.appendChild(wrapper);
        });
        
        carouselContainer.appendChild(carousel);
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'news-dots';
        
        newsItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `news-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        carouselContainer.appendChild(dotsContainer);
        
        // Replace original grid
        this.newsGrid.parentNode.replaceChild(carouselContainer, this.newsGrid);
        
        // Setup touch events
        this.setupTouchEvents(carousel);
        
        // Add CSS
        this.addCarouselStyles();
    }

    setupTouchEvents(carousel) {
        let startX = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
        });
    }

    goToSlide(index) {
        const slides = document.querySelectorAll('.news-slide');
        const dots = document.querySelectorAll('.news-dot');
        
        if (!slides.length) return;
        
        this.currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - this.currentIndex) * 100}%)`;
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    nextSlide() {
        const slides = document.querySelectorAll('.news-slide');
        if (this.currentIndex < slides.length - 1) {
            this.goToSlide(this.currentIndex + 1);
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.goToSlide(this.currentIndex - 1);
        }
    }

    addCarouselStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .news-carousel-container {
                position: relative;
                overflow: hidden;
            }
            
            .news-carousel {
                display: flex;
                transition: transform 0.3s ease;
            }
            
            .news-slide {
                min-width: 100%;
                transition: transform 0.3s ease;
            }
            
            .news-dots {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
            }
            
            .news-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background: #ccc;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .news-dot.active {
                background: var(--primary-blue);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.productCarousel = new ProductCarousel();
    window.newsCarousel = new NewsCarousel();
    
    // Reinitialize on window resize for responsive behavior
    window.addEventListener('resize', () => {
        // Debounce resize events
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(() => {
            if (window.innerWidth <= 768 && !document.querySelector('.news-carousel-container')) {
                window.newsCarousel = new NewsCarousel();
            }
        }, 250);
    });
});