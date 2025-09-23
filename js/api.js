
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

// Fallback data
const FALLBACK_DATA = {
    banner: {
        title: "РАЗРАБАТЫВАЕМ СИСТЕМЫ АВТОМАТИЗАЦИИ ДЕЯТЕЛЬНОСТИ ПРЕДПРИЯТИЙ",
        description: "Предлагаем инновационные решения для вашего бизнеса",
        buttonText: "Узнать подробнее",
        buttonLink: "#"
    },
    solutions: [
        {
            title: "АСМОграф",
            description: "Кроссплатформенный векторный графический редактор для создания инженерных и деловых схем. Поддерживает совместную работу, импорт и экспорт схем Visio и AutoCAD, заменяет иностранные решения.",
            image: "/products-3.svg"
        }
    ],
    benefits: [
        {
            title: "Эксперты IT-рынка",
            description: "Компания АО «Информатика» основана в 1957 г.",
            icon: "/icon-4.svg"
        }
    ],
    projects: [
        {
            company: "ООО «ИНВЕСТ ТРЕЙД»",
            shortDescription: "Поставка компании лицензий на АСМОГРАФ",
            fullDescription: "В рамках программы импортозамещения была успешно осуществлена поставка программного обеспечения АСМОграф.",
            readMoreText: "Читать подробнее",
            readMoreLink: "#"
        }
    ],
    news: [
        {
            title: "ПОДТВЕРЖДЕНИЕ ЛИДЕРСТВА: ИТОГИ ПРЕМИИ «ИНДЕКС ДЕЛА»",
            shortDescription: "17 июня в Санкт-Петербурге прошёл финал всероссийской государственной премии «Индекс Дела»...",
            fullText: "17 июня в Санкт-Петербурге прошёл финал всероссийской государственной премии «Индекс Дела»",
            image: "",
            newsLink: "#"
        }
    ]
};

class BitrixAPI {
    constructor() {
        this.useFallback = false;
    }

    async fetchData(entityTypeId) {
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
            return data;
        } catch (error) {
            console.error(`API request failed for entity ${entityTypeId}:`, error);
            this.useFallback = true;
            return null;
        }
    }

    extractImageUrl(fileData) {
        if (!fileData) {
            console.log('No file data provided');
            return null;
        }
        
        console.log('File data structure:', fileData);
        
        // Try different possible image URL fields
        if (fileData.url) {
            console.log('Found image URL in url field:', fileData.url);
            return fileData.url;
        }
        if (fileData.urlMachine) {
            console.log('Found image URL in urlMachine field:', fileData.urlMachine);
            return fileData.urlMachine;
        }
        if (fileData.downloadUrl) {
            console.log('Found image URL in downloadUrl field:', fileData.downloadUrl);
            return fileData.downloadUrl;
        }
        
        console.log('No valid image URL found in file data');
        return null;
    }

    async getBannerData() {
        console.log('=== GETTING BANNER DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.banner);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('Using fallback banner data');
            return FALLBACK_DATA.banner;
        }

        const item = data.result.items[0];
        console.log('Banner item:', item);
        
        const bannerData = {
            title: item.title || FALLBACK_DATA.banner.title,
            description: item.ufCrm9_1758575077917 || FALLBACK_DATA.banner.description,
            buttonText: item.ufCrm9_1758575177325 || FALLBACK_DATA.banner.buttonText,
            buttonLink: item.ufCrm9_1758575241102 || FALLBACK_DATA.banner.buttonLink,
            image: this.extractImageUrl(item.ufCrm9_1758575313219)
        };
        
        console.log('Processed banner data:', bannerData);
        return bannerData;
    }

    async getSolutionsData() {
        console.log('=== GETTING SOLUTIONS DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.solutions);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('Using fallback solutions data');
            return FALLBACK_DATA.solutions;
        }

        const solutions = data.result.items.map((item, index) => {
            console.log(`Solution item ${index}:`, item);
            
            const solution = {
                title: item.title || `Решение ${index + 1}`,
                description: item.ufCrm13_1758570658765 || 'Описание решения',
                image: this.extractImageUrl(item.ufCrm13_1758570688028)
            };
            
            console.log(`Processed solution ${index}:`, solution);
            return solution;
        });

        return solutions;
    }

    async getBenefitsData() {
        console.log('=== GETTING BENEFITS DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.benefits);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('Using fallback benefits data');
            return FALLBACK_DATA.benefits;
        }

        const benefits = data.result.items.map((item, index) => {
            console.log(`Benefit item ${index}:`, item);
            
            const benefit = {
                title: item.title || `Преимущество ${index + 1}`,
                description: item.ufCrm15_1758604933734 || 'Описание преимущества',
                icon: this.extractImageUrl(item.ufCrm15_1758604988689)
            };
            
            console.log(`Processed benefit ${index}:`, benefit);
            return benefit;
        });

        return benefits;
    }

    async getProjectsData() {
        console.log('=== GETTING PROJECTS DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.projects);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('Using fallback projects data');
            return FALLBACK_DATA.projects;
        }

        const projects = data.result.items.map((item, index) => {
            console.log(`Project item ${index}:`, item);
            
            const project = {
                company: item.title || `Компания ${index + 1}`,
                shortDescription: item.ufCrm17_1758605563770 || 'Краткое описание проекта',
                fullDescription: item.ufCrm17_1758605593150 || 'Полное описание проекта',
                readMoreText: item.ufCrm17_1758605628876 || 'Читать подробнее',
                readMoreLink: item.ufCrm17_1758606055746 || '#',
                viewAllText: item.ufCrm17_1758606099754 || 'Смотреть все проекты',
                viewAllLink: item.ufCrm17_1758606129103 || '#'
            };
            
            console.log(`Processed project ${index}:`, project);
            return project;
        });

        return projects;
    }

    async getNewsData() {
        console.log('=== GETTING NEWS DATA ===');
        const data = await this.fetchData(BITRIX_CONFIG.entities.news);
        
        if (!data || !data.result || !data.result.items || data.result.items.length === 0) {
            console.log('Using fallback news data');
            return FALLBACK_DATA.news;
        }

        const news = data.result.items.map((item, index) => {
            console.log(`News item ${index}:`, item);
            
            const newsItem = {
                title: item.title || `Новость ${index + 1}`,
                shortDescription: item.ufCrm19_1758608108818 || 'Краткое описание новости',
                fullText: item.ufCrm19_1758608198531 || 'Полный текст новости',
                image: this.extractImageUrl(item.ufCrm19_1758608297600),
                newsLink: item.ufCrm19_1758608787313 || '#',
                allNewsText: item.ufCrm19_1758608817346 || 'Перейти ко всем новостям',
                allNewsLink: item.ufCrm19_1758608866947 || '#'
            };
            
            console.log(`Processed news item ${index}:`, newsItem);
            return newsItem;
        });

        return news;
    }
}

class DataRenderer {
    constructor() {
        this.api = new BitrixAPI();
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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

            if (data.image) {
                const heroSection = document.querySelector('.hero-section');
                if (heroSection) {
                    heroSection.style.backgroundImage = `url('${data.image}')`;
                    console.log('Set background image:', data.image);
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

            carousel.innerHTML = data.map(item => `
                <div class="product-card">
                    <div class="product-content">
                        <h3 class="product-title">${this.escapeHtml(item.title)}</h3>
                        <p class="product-description">${this.escapeHtml(item.description)}</p>
                    </div>
                    ${item.image ? `<img src="${item.image}" alt="${this.escapeHtml(item.title)}" class="product-image" onerror="console.log('Failed to load image: ${item.image}')">` : ''}
                </div>
            `).join('');

            carousel.classList.remove('loading');
            console.log('Solutions rendering completed, items:', data.length);
        } catch (error) {
            console.error('Error rendering solutions:', error);
        }
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
                    ${item.icon ? `<img src="${item.icon}" alt="${this.escapeHtml(item.title)}" class="benefit-icon" onerror="console.log('Failed to load icon: ${item.icon}')">` : ''}
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

            this.initProjectToggles();
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
                        ${featured.image ? `
                        <div class="news-banner" style="background-image: url('${featured.image}')">
                            <div class="news-banner-content">
                                <h3 class="news-banner-title">${this.escapeHtml(featured.title)}</h3>
                                <p class="news-banner-subtitle">${this.escapeHtml(featured.shortDescription)}</p>
                            </div>
                        </div>
                        ` : ''}
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

    initProjectToggles() {
        const items = document.querySelectorAll('.project-item');
        console.log('Initializing project toggles, found items:', items.length);
        
        items.forEach(item => {
            const toggle = item.querySelector('.project-toggle');
            const details = item.querySelector('.project-details');
            
            if (toggle && details) {
                toggle.addEventListener('click', () => {
                    const isExpanded = item.classList.contains('expanded');
                    
                    // Close all items
                    items.forEach(i => i.classList.remove('expanded'));
                    
                    // Open current if not expanded
                    if (!isExpanded) {
                        item.classList.add('expanded');
                    }
                });
            }
        });
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
