// api.js

// Bitrix24 API configuration
const BITRIX_CONFIG = {
    baseUrl: 'https://b24-2ely1d.bitrix24.by/rest/1/lx0ka99op8lp6cyj',
    entities: {
        banner: 1044,
        solutions: 1052,
        benefits: 1056,
        projects: 1060,
        news: 1064
    }
};

// Static images configuration
const STATIC_IMAGES = {
    solutions: [
        "./static/public/products-3.svg",
        "./static/public/products.svg", 
        "./static/public/products-2.svg",
        "./static/public/products-1.svg"
    ],
    benefits: [
        "./static/public/icon-4.svg",
        "./static/public/icon-1.svg",
        "./static/public/icon.svg",
        "./static/public/icon-5.svg"
    ],
    news: "./static/public/news-banner.jpg" // Заглушка для новостей
};

class BitrixAPI {
    constructor() {
        this.useFallback = false;
        this.cache = new Map();
    }

    async fetchData(entityTypeId) {
        if (this.cache.has(entityTypeId)) {
            console.log(`Using cache for entity ${entityTypeId}`);
            return this.cache.get(entityTypeId);
        }

        if (this.useFallback) {
            console.log(`Using fallback for entity ${entityTypeId}`);
            return null;
        }

        try {
            const url = `${BITRIX_CONFIG.baseUrl}/crm.item.list?entityTypeId=${entityTypeId}`;
            console.log(`Fetching from: ${url}`);
            
            const response = await fetch(url);
            console.log(`Response status: ${response.status} for entity ${entityTypeId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`Raw API response for entity ${entityTypeId}:`, data);
            
            if (!data || !data.result || !data.result.items) {
                console.warn(`No items found in response for entity ${entityTypeId}`);
                return null;
            }
            
            console.log(`Found ${data.result.items.length} items for entity ${entityTypeId}`);
            this.cache.set(entityTypeId, data);
            return data;
        } catch (error) {
            console.error(`API request failed for entity ${entityTypeId}:`, error);
            this.useFallback = true;
            return null;
        }
    }

    async getBannerData() {
        console.log('=== GETTING BANNER DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.banner);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('No banner data from API, using defaults');
            return {
                title: "РАЗРАБАТЫВАЕМ СИСТЕМЫ АВТОМАТИЗАЦИИ ДЕЯТЕЛЬНОСТИ ПРЕДПРИЯТИЙ",
                description: "Предлагаем инновационные решения для вашего бизнеса",
                buttonText: "Узнать подробнее",
                buttonLink: "#"
            };
        }

        const item = data.result.items[0];
        console.log('Banner item:', item);
        
        return {
            title: item.title || "РАЗРАБАТЫВАЕМ СИСТЕМЫ АВТОМАТИЗАЦИИ ДЕЯТЕЛЬНОСТИ ПРЕДПРИЯТИЙ",
            description: item.ufCrm9_1758575077917 || "Предлагаем инновационные решения для вашего бизнеса",
            buttonText: item.ufCrm9_1758575177325 || "Узнать подробнее",
            buttonLink: item.ufCrm9_1758575241102 || "#"
        };
    }

    async getSolutionsData() {
        console.log('=== GETTING SOLUTIONS DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.solutions);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('No solutions data from API, using defaults');
            return [
                {
                    title: "АСМОграф",
                    description: "Кроссплатформенный векторный графический редактор для создания инженерных и деловых схем. Поддерживает совместную работу, импорт и экспорт схем Visio и AutoCAD, заменяет иностранные решения.",
                    image: STATIC_IMAGES.solutions[0]
                },
                {
                    title: "АСМО-ТОиР",
                    description: "Автоматизирует процессы планирования, учёта и документооборота по техническому обслуживанию и ремонту оборудования.",
                    image: STATIC_IMAGES.solutions[1]
                },
                {
                    title: "АСМО-диспетчер",
                    description: "Обработка оперативной и планово‑экономической информации в диспетчерских службах. Обеспечивает контроль за технологическим режимом.",
                    image: STATIC_IMAGES.solutions[2]
                },
                {
                    title: "АСМО-ВТиПО",
                    description: "Учёт и сопровождение вычислительной техники и программного обеспечения на предприятии. Оптимизирует управление ИТ-активами и их жизненным циклом.",
                    image: STATIC_IMAGES.solutions[3]
                }
            ];
        }

        return data.result.items.map((item, index) => ({
            title: item.title || `Решение ${index + 1}`,
            description: item.ufCrm13_1758570658765 || 'Описание решения',
            image: STATIC_IMAGES.solutions[index] || STATIC_IMAGES.solutions[0]
        }));
    }

    async getBenefitsData() {
        console.log('=== GETTING BENEFITS DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.benefits);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('No benefits data from API, using defaults');
            return [
                {
                    title: "Эксперты IT-рынка",
                    description: "Компания АО «Информатика» основана в 1957 г.",
                    icon: STATIC_IMAGES.benefits[0]
                },
                {
                    title: "Импортозамещение",
                    description: "Наши решения — это на 100% российское ПО, которое создаётся, учитывая потребности заказчиков и рынка в целом",
                    icon: STATIC_IMAGES.benefits[1]
                },
                {
                    title: "Полный цикл",
                    description: "Наша компания оказывает услуги по внедрению, сопровождению, технической поддержке и развитию программного обеспечения",
                    icon: STATIC_IMAGES.benefits[2]
                },
                {
                    title: "Проектный опыт",
                    description: "Более 500 успешных внедрений решений на крупнейших промышленных предприятиях страны",
                    icon: STATIC_IMAGES.benefits[3]
                }
            ];
        }

        return data.result.items.map((item, index) => ({
            title: item.title || `Преимущество ${index + 1}`,
            description: item.ufCrm15_1758604933734 || 'Описание преимущества',
            icon: STATIC_IMAGES.benefits[index] || STATIC_IMAGES.benefits[0]
        }));
    }

    async getProjectsData() {
        console.log('=== GETTING PROJECTS DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.projects);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('No projects data from API, using defaults');
            return [
                {
                    company: "ООО «ИНВЕСТ ТРЕЙД»",
                    shortDescription: "Поставка компании лицензий на АСМОГРАФ",
                    fullDescription: "В рамках программы импортозамещения была успешно осуществлена поставка программного обеспечения АСМОграф. Решение стало ключевым инструментом для оптимизации работы и сокращения зависимости от зарубежных продуктов.",
                    readMoreText: "Читать подробнее",
                    readMoreLink: "#"
                },
                {
                    company: "ООО «НСТЭЦ»",
                    shortDescription: "Поставка компании лицензий на АСМОГРАФ",
                    fullDescription: "Успешная поставка лицензий на программное обеспечение АСМОграф для оптимизации работы с инженерными схемами и документооборотом.",
                    readMoreText: "Читать подробнее",
                    readMoreLink: "#"
                },
                {
                    company: "ООО «АРГОС»",
                    shortDescription: "Поставка компании лицензий на АСМОГРАФ",
                    fullDescription: "В рамках программы импортозамещения была успешно осуществлена поставка программного обеспечения АСМОграф. Решение стало ключевым инструментом для оптимизации работы и сокращения зависимости от зарубежных продуктов.",
                    readMoreText: "Читать подробнее",
                    readMoreLink: "#"
                }
            ];
        }

        return data.result.items.map((item, index) => ({
            company: item.title || `Компания ${index + 1}`,
            shortDescription: item.ufCrm17_1758605563770 || 'Краткое описание проекта',
            fullDescription: item.ufCrm17_1758605593150 || 'Полное описание проекта',
            readMoreText: item.ufCrm17_1758605628876 || 'Читать подробнее',
            readMoreLink: item.ufCrm17_1758606055746 || '#'
        }));
    }

    async getNewsData() {
        console.log('=== GETTING NEWS DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.news);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('No news data from API, using defaults');
            return [
                {
                    title: "ПОДТВЕРЖДЕНИЕ ЛИДЕРСТВА: ИТОГИ ПРЕМИИ «ИНДЕКС ДЕЛА»",
                    shortDescription: "17 июня в Санкт-Петербурге прошёл финал всероссийской государственной премии «Индекс Дела», организованной при поддержке Минэкономразвития России...",
                    fullDescription: "Полное описание новости..."
                },
                // Add more defaults if needed, but truncated in original
            ];
        }

        return data.result.items.map(item => ({
            title: item.title,
            shortDescription: item.ufCrm19_1758606468 || 'Краткое описание',
            fullDescription: item.ufCrm19_1758606495 || 'Полное описание'
        }));
    }
}

class DataRenderer {
    constructor() {
        this.api = new BitrixAPI();
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    updateElement(selector, content) {
        const element = document.querySelector(selector);
        if (element && content) {
            console.log(`Updating ${selector} with:`, content);
            element.textContent = content;
            element.classList.remove('loading');
        } else {
            console.warn(`Element ${selector} not found or no content provided`);
        }
    }

    async renderBanner() {
        try {
            console.log('Starting banner rendering...');
            const data = await this.api.getBannerData();
            console.log('Banner data to render:', data);

            this.updateElement('.hero-title', data.title);
            this.updateElement('.hero-description', data.description);
            
            const button = document.querySelector('.hero-cta-btn');
            if (button) {
                button.textContent = data.buttonText;
                button.classList.remove('loading');
                if (data.buttonLink && data.buttonLink !== '#') {
                    button.onclick = () => window.location.href = data.buttonLink;
                }
            }
            
            console.log('Banner rendering completed');
        } catch (error) {
            console.error('Error rendering banner:', error);
        }
    }

    async renderSolutions() {
        try {
            console.log('Starting solutions rendering...');
            const data = await this.api.getSolutionsData();
            console.log('Solutions data to render:', data);

            const carousel = document.getElementById('productsCarousel');
            if (!carousel) {
                console.error('Products carousel element not found!');
                return;
            }

            // Рендер карточек (fallback или API)
            carousel.innerHTML = data.map(item => `
                <div class="product-card">
                    <div class="product-content">
                        <h3 class="product-title">${this.escapeHtml(item.title)}</h3>
                        <p class="product-description">${this.escapeHtml(item.description)}</p>
                    </div>
                    ${item.image ? `<img src="${item.image}" alt="${this.escapeHtml(item.title)}" class="product-image">` : ''}
                </div>
            `).join('');

            // Инициализация карусели: добавляем слушатели на кнопки
            this.initCarousel();

            carousel.classList.remove('loading');
            console.log('Solutions rendering completed, items:', data.length);
        } catch (error) {
            console.error('Error rendering solutions:', error);
        }
    }

// Новая метод: инициализация карусели
initCarousel() {
    const carousel = document.getElementById('productsCarousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!carousel || !prevBtn || !nextBtn) return;

    const scrollStep = 380;  // Ширина карточки (360px) + gap (20px)

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });

    // Опционально: дизейбл кнопок на краях (если нужно)
    carousel.addEventListener('scroll', () => {
        prevBtn.disabled = carousel.scrollLeft <= 0;
        nextBtn.disabled = carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth);
    });
}

    async renderBenefits() {
        try {
            console.log('Starting benefits rendering...');
            const data = await this.api.getBenefitsData();
            console.log('Benefits data to render:', data);

            const container = document.querySelector('.benefits-list');
            if (!container) {
                console.error('Benefits list element not found!');
                return;
            }

            container.innerHTML = data.map(item => `
                <div class="benefit-item">
                    ${item.icon ? `<img src="${item.icon}" alt="${this.escapeHtml(item.title)}" class="benefit-icon">` : ''}
                    <div class="benefit-content">
                        <h3 class="benefit-title">${this.escapeHtml(item.title)}</h3>
                        ${item.description ? `<p class="benefit-description">${this.escapeHtml(item.description)}</p>` : ''}
                    </div>
                </div>
            `).join('');

            container.classList.remove('loading');
            console.log('Benefits rendering completed, items:', data.length);
        } catch (error) {
            console.error('Error rendering benefits:', error);
        }
    }

    async renderProjects() {
        try {
            console.log('Starting projects rendering...');
            const data = await this.api.getProjectsData();
            console.log('Projects data to render:', data);

            const container = document.querySelector('.projects-list');
            if (!container) {
                console.error('Projects list element not found!');
                return;
            }

            container.innerHTML = data.map((item, index) => `
                <div class="project-item" data-project="${index + 1}">
                    <div class="project-header">
                        <div class="project-number">${(index + 1).toString().padStart(2, '0')}</div>
                        <div class="project-company">${this.escapeHtml(item.company)}</div>
                        <div class="project-description">${this.escapeHtml(item.shortDescription)}</div>
                        <button class="project-toggle" aria-label="Развернуть проект">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div class="project-details">
                        <p class="project-details-text">${this.escapeHtml(item.fullDescription)}</p>
                        <button class="project-details-btn" onclick="window.location.href='${item.readMoreLink}'">${this.escapeHtml(item.readMoreText)}</button>
                    </div>
                </div>
            `).join('');

            // Re-init toggles after render
            window.projectsManager = new ProjectsManager();
            container.classList.remove('loading');
            console.log('Projects rendering completed, items:', data.length);
        } catch (error) {
            console.error('Error rendering projects:', error);
        }
    }

    async renderNews() {
        try {
            console.log('Starting news rendering...');
            const data = await this.api.getNewsData();
            console.log('News data to render:', data);

            const container = document.querySelector('.news-grid');
            if (!container) {
                console.error('News grid element not found!');
                return;
            }

            if (data.length > 0) {
                const featured = data[0];
                const regular = data.slice(1);

                container.innerHTML = `
                    <article class="news-featured">
                        <div class="news-content">
                            <time class="news-date">01.01.2025</time>
                            <h4 class="news-title">${this.escapeHtml(featured.title)}</h4>
                            <p class="news-excerpt">${this.escapeHtml(featured.shortDescription)}</p>
                        </div>
                    </article>
                    <div class="news-regular">
                        ${regular.map(item => `
                            <article class="news-item">
                                <div class="news-content">
                                    <time class="news-date">01.01.2025</time>
                                    <h4 class="news-title">${this.escapeHtml(item.title)}</h4>
                                    <div class="news-text">
                                        <p>${this.escapeHtml(item.shortDescription)}</p>
                                    </div>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                `;
            }

            container.classList.remove('loading');
            console.log('News rendering completed, items:', data.length);
        } catch (error) {
            console.error('Error rendering news:', error);
        }
    }

    async init() {
        console.log('=== INITIALIZING DATA RENDERER ===');
        
        try {
            await Promise.all([
                this.renderBanner(),
                this.renderSolutions(),
                this.renderBenefits(),
                this.renderProjects(),
                this.renderNews()
            ]);
            
            console.log('=== DATA RENDERING COMPLETED SUCCESSFULLY ===');
            
            // Убираем индикаторы загрузки со всей страницы
            document.querySelectorAll('.loading').forEach(el => {
                el.classList.remove('loading');
            });
            
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CONTENT LOADED ===');
    const renderer = new DataRenderer();
    window.dataRenderer = renderer;
    
    setTimeout(() => {
        console.log('Starting data initialization...');
        renderer.init();
    }, 100);
});