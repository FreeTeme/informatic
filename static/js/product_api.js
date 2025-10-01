// создаем файл js/api-integration.js

// Конфигурация API
const API_CONFIG = {
    baseUrl: 'https://b24-2ely1d.bitrix24.by/rest/1/lx0ka99op8lp6cyj',
    endpoints: {
        banner: 'crm.item.list?entityTypeId=1068',
        about: 'crm.item.list?entityTypeId=1072',
        schemes: 'crm.item.list?entityTypeId=1076',
        details: 'crm.item.list?entityTypeId=1080',
        cta: 'crm.item.list?entityTypeId=1084',
        features: 'crm.item.list?entityTypeId=1088',
        licensing: 'crm.item.list?entityTypeId=1100',
        video: 'crm.item.list?entityTypeId=1104',
        registry: 'crm.item.list?entityTypeId=1108',
        documentation: 'crm.item.list?entityTypeId=1112',
        recommendations: 'crm.item.list?entityTypeId=1116',
        consultation: 'crm.item.list?entityTypeId=1120'
    }
};

// Сервис для работы с API
class ApiService {
    async fetchData(endpoint) {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}/${endpoint}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            return data.result.items || [];
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return [];
        }
    }

    // Получаем URL файла из объекта файла Bitrix
    getFileUrl(fileObject) {
        return fileObject?.url || '#';
    }
}

// Сервис для рендеринга контента
class ContentRenderer {
    constructor(apiService) {
        this.api = apiService;
    }

    // 1. Баннер (с поддержкой слайдера)
    async renderBanner() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.banner);
        const container = document.querySelector('.hero-content');
        
        if (!items.length || !container) return;

        // Если один баннер - просто обновляем
        if (items.length === 1) {
            const item = items[0];
            const title = container.querySelector('.hero-title');
            const description = container.querySelector('.hero-description');
            const button = container.querySelector('.download-btn');

            if (title) title.textContent = item.title || 'АСМОграф';
            if (description) description.textContent = item.ufCrm21_1758633193449 || '';
            if (button) {
                button.textContent = item.ufCrm21_1758633288248 || 'Скачать пробную версию';
                button.onclick = () => window.location.href = item.ufCrm21_1758633317948 || '#';
            }
        } else {
            // Реализация слайдера для нескольких баннеров
            this.renderBannerSlider(items, container);
        }
    }

    renderBannerSlider(items, container) {
        // Упрощенная реализация слайдера
        const sliderHTML = `
            <div class="banner-slider">
                <div class="slider-container">
                    ${items.map((item, index) => `
                        <div class="slide ${index === 0 ? 'active' : ''}">
                            <h1 class="hero-title">${item.title || 'АСМОграф'}</h1>
                            <p class="hero-description">${item.ufCrm21_1758633193449 || ''}</p>
                            <button class="download-btn" onclick="window.location.href='${item.ufCrm21_1758633317948 || '#'}'">
                                ${item.ufCrm21_1758633288248 || 'Скачать пробную версию'}
                            </button>
                        </div>
                    `).join('')}
                </div>
                ${items.length > 1 ? `
                    <div class="slider-controls">
                        <button class="slider-prev">‹</button>
                        <button class="slider-next">›</button>
                    </div>
                ` : ''}
            </div>
        `;

        container.innerHTML = sliderHTML;
        this.initBannerSlider();
    }

    initBannerSlider() {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }
    }

    // 2. О продукте (динамические карточки)
    async renderAboutProduct() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.about);
        const grid = document.querySelector('.features-grid');
        
        if (!items.length || !grid) return;

        grid.innerHTML = items.map(item => `
            <div class="feature-card">
                <img src="./static/public/icon-15.svg" alt="Иконка" class="feature-icon">
                <div class="feature-content">
                    <h3 class="feature-title">${item.title || 'Заголовок'}</h3>
                    <p class="feature-description">${item.ufCrm21_1758633193449 || 'Описание'}</p>
                </div>
            </div>
        `).join('');
    }

    // 3. Схемы (динамические карточки)
    async renderSchemes() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.schemes);
        const grid = document.querySelector('.schemes-grid');
        
        if (!items.length || !grid) return;

        grid.innerHTML = items.map(item => `
            <div class="scheme-card">
                <img src="./static/public/image-152344.png" alt="${item.title || 'Схема'}" class="scheme-image">
                <h3 class="scheme-title">${item.title || 'Название схемы'}</h3>
            </div>
        `).join('');

        this.initSchemesNavigation();
    }

    initSchemesNavigation() {
        // Базовая реализация навигации для схем
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const cards = document.querySelectorAll('.scheme-card');
        
        if (!prevBtn || !nextBtn) return;

        let currentIndex = 0;

        const updateVisibility = () => {
            cards.forEach((card, index) => {
                card.style.display = Math.abs(index - currentIndex) <= 1 ? 'block' : 'none';
            });
        };

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateVisibility();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateVisibility();
            }
        });

        updateVisibility();
    }

    // 4. Детали о продукте
    async renderProductDetails() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.details);
        const container = document.querySelector('.details-cards');
        
        if (!items.length || !container) return;

        container.innerHTML = items.map(item => `
            <div class="detail-card">
                <h3 class="card-title">${item.title || 'АСМОграф — векторный графический редактор'}</h3>
                <div class="feature-list">${this.formatFeatureList(item.ufCrm27_1758637288768)}</div>
                <button class="download-presentation-btn" onclick="window.location.href='${this.api.getFileUrl(item.ufCrm27_1758867865582)}'">
                    ${item.ufCrm27_1758867847354 || 'Скачать презентацию'}
                </button>
            </div>
        `).join('');
    }

    formatFeatureList(text) {
        if (!text) return '';
        // Преобразуем текст в список, разделяя по точкам или переносам
        const features = text.split(/[.•]/).filter(f => f.trim());
        return features.map(feature => `<li>${feature.trim()}</li>`).join('');
    }

    // 5. Призыв к действию
    async renderCallToAction() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.cta);
        const container = document.querySelector('.cta-content');
        
        if (!items.length || !container) return;

        const item = items[0];
        container.innerHTML = `
            <h2 class="cta-title">${item.title || 'ПОПРОБУЙТЕ «АСМОГРАФ»'}</h2>
            <p class="cta-subtitle">БЕСПЛАТНО в течение 30 дней</p>
            <p class="cta-description">${item.ufCrm29_1758637384462 || ''}</p>
            <button class="cta-btn" onclick="window.location.href='${item.ufCrm29_1758637463440 || '#'}'">
                ${item.ufCrm29_1758637419951 || 'Скачать бесплатную пробную версию'}
            </button>
        `;
    }

    // 6. Функциональные возможности (аккордеон)
    async renderFeatures() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.features);
        const accordion = document.querySelector('.accordion');
        
        if (!items.length || !accordion) return;

        accordion.innerHTML = items.map((item, index) => `
            <div class="accordion-item ${index === 2 ? 'active' : ''}">
                <button class="accordion-header">${item.title || 'Функциональность'}</button>
                <div class="accordion-content">
                    <div class="accordion-content-inner">
                        <div class="accordion-text">
                            ${this.formatFeatureDescription(item.ufCrm31_1758637729665)}
                        </div>
                        <div class="accordion-image">
                            <img src="./static/public/icon-${index + 1}.svg" alt="${item.title}" class="feature-image">
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.initAccordion();
    }

    formatFeatureDescription(text) {
        if (!text) return '<p>Описание недоступно</p>';
        return `<p>${text.replace(/\n/g, '</p><p>')}</p>`;
    }

    initAccordion() {
        const headers = document.querySelectorAll('.accordion-header');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');
                
                // Закрываем все элементы
                document.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                });
                
                // Открываем текущий, если был закрыт
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // 7. Лицензирование
    async renderLicensing() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.licensing);
        const container = document.querySelector('.licensing-left');
        
        if (!items.length || !container) return;

        const item = items[0];
        container.innerHTML = `
            <h3 class="licensing-subtitle">${item.ufCrm37_1758872221641 || 'Лицензирование'}</h3>
            <div class="licensing-list">${this.formatLicensingText(item.ufCrm37_1758872265280)}</div>
        `;
    }

    formatLicensingText(text) {
        if (!text) return '';
        const items = text.split(/(?=\d+\.)|(?=•)/).filter(item => item.trim());
        return items.map(item => `<li>${item.trim()}</li>`).join('');
    }

    // 8. Видео презентация
    async renderVideo() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.video);
        const container = document.querySelector('.video-wrapper');
        
        if (!items.length || !container) return;

        const item = items[0];
        const videoId = this.extractYouTubeId(item.ufCrm39_1758872882974);
        
        container.innerHTML = `
            <div class="video-embed">
                <iframe src="https://www.youtube.com/embed/${videoId}" 
                        title="${item.title || 'Видео презентация'}" 
                        frameborder="0" 
                        allowfullscreen>
                </iframe>
            </div>
            <div class="video-caption">
                <a href="${item.ufCrm39_1758873054014 || '#'}" target="_blank">
                    ${item.ufCrm39_1758872922161 || 'Смотрите видео уроки'}
                </a>
            </div>
        `;
    }

    extractYouTubeId(url) {
        if (!url) return 'dQw4w9WgXcQ';
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : 'dQw4w9WgXcQ';
    }

    // 9. Реестр
    async renderRegistry() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.registry);
        const container = document.querySelector('.registry-content');
        
        if (!items.length || !container) return;

        const item = items[0];
        container.innerHTML = `
            <img src="./static/public/img.png" alt="Сертификат" class="registry-image">
            <h2 class="registry-title">${item.title || 'ВКЛЮЧЕН В РЕЕСТР'}</h2>
            <p class="registry-description">${item.ufCrm41_1758873367930 || ''}</p>
        `;
    }

    // 10. Документация
    async renderDocumentation() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.documentation);
        const grid = document.querySelector('.docs-grid');
        
        if (!items.length || !grid) return;

        grid.innerHTML = items.map(item => `
            <a href="${this.api.getFileUrl(item.ufCrm43_1758874119458)}" download class="doc-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <!-- SVG иконка скачивания -->
                    <path d="M13.855 12.6875C13.53 12.6875 13.2675 12.9525 13.2675 13.275V14.82H2.7375V13.275C2.7375 12.95 2.4725 12.6875 2.15 12.6875C1.8275 12.6875 1.5625 12.9525 1.5625 13.275V15.4075C1.5625 15.7325 1.8275 15.995 2.15 15.995H13.8575C14.1825 15.995 14.445 15.73 14.445 15.4075V13.275C14.445 12.9525 14.18 12.6875 13.855 12.6875Z" fill="url(#paint0_linear_104397_1552)"/>
                    <path d="M7.63858 13.695L7.65858 13.7125C7.77108 13.8125 7.91108 13.8675 8.05608 13.8675C8.20858 13.8675 8.36108 13.805 8.47108 13.695L12.2086 9.955C12.3886 9.7875 12.4436 9.53 12.3536 9.3125C12.2661 9.09 12.0486 8.94 11.8161 8.94L10.2011 8.92V0.5875C10.2011 0.2625 9.93608 0 9.61358 0H6.40108C6.07608 0 5.81358 0.265 5.81358 0.5875V8.8625L4.20608 8.8425C3.97358 8.8425 3.76358 8.98 3.66358 9.2C3.56858 9.4275 3.62358 9.69 3.79108 9.845L7.63858 13.695Z" fill="url(#paint1_linear_104397_1552)"/>
                    <defs>
                        <linearGradient id="paint0_linear_104397_1552" x1="8.00375" y1="15.995" x2="8.00375" y2="12.6875" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1439BF"/><stop offset="1" stop-color="#030B39"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_104397_1552" x1="8.00664" y1="13.8675" x2="8.00664" y2="0" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1439BF"/><stop offset="1" stop-color="#030B39"/>
                        </linearGradient>
                    </defs>
                </svg>
                ${item.title || 'Документ'}
            </a>
        `).join('');
    }

    // 11. Рекомендации
    async renderRecommendations() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.recommendations);
        const grid = document.querySelector('.recommend-grid');
        
        if (!items.length || !grid) return;

        grid.innerHTML = items.map((item, index) => `
            <a href="${item.ufCrm45_1758874737074 || '#'}" class="recommend-card">
                <div class="recommend-title">${item.title || 'Продукт'}</div>
                <p class="recommend-text">${item.ufCrm45_1758874634639 || 'Описание продукта'}</p>
                <div class="recommend-image">
                    <!-- Статичная SVG иконка -->
                    <svg width="200" height="202" viewBox="0 0 200 202" fill="none">
                        <!-- SVG контент остается как в оригинале -->
                    </svg>
                </div>
            </a>
        `).join('');
    }

    // 12. Консультация
    async renderConsultation() {
        const items = await this.api.fetchData(API_CONFIG.endpoints.consultation);
        const container = document.querySelector('.contact-content');
        
        if (!items.length || !container) return;

        const item = items[0];
        container.innerHTML = `
            <h2 class="section-title contact-title">${item.title || 'ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ'}</h2>
            <p class="contact-description">${item.ufCrm47_1758875110915 || ''}</p>
            <button class="contact-cta-btn" onclick="window.location.href='${item.ufCrm47_1758875181967 || '#'}'">
                ${item.ufCrm47_1758875149540 || 'Заказать консультацию'}
            </button>
        `;
    }

    // Инициализация всех компонентов
    async init() {
        try {
            await Promise.all([
                this.renderBanner(),
                this.renderAboutProduct(),
                this.renderSchemes(),
                this.renderProductDetails(),
                this.renderCallToAction(),
                this.renderFeatures(),
                this.renderLicensing(),
                this.renderVideo(),
                this.renderRegistry(),
                this.renderDocumentation(),
                this.renderRecommendations(),
                this.renderConsultation()
            ]);
            
            console.log('All components initialized successfully');
        } catch (error) {
            console.error('Error initializing components:', error);
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const apiService = new ApiService();
    const renderer = new ContentRenderer(apiService);
    renderer.init();
});