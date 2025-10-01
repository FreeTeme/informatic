// ui.js

// Accordion functionality from product.js
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

// Scheme navigation from product.js
let currentSchemeIndex = 0;
const schemes = [
    {
        image: "../public/image (11).png",
        title: "ПЛАН ЭТАЖА"
    },
    {
        image: "../public/image (12).png",
        title: "СОБЫТИЙНАЯ ЦЕПОЧКА ПРОЦЕССОВ"
    },
    {
        image: "../public/image (13).png",
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

// Video functionality from product.js
function playVideo() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        // In a real implementation, you would replace this with actual video player
        alert('Видео будет воспроизведено. В реальной реализации здесь будет видеоплеер.');
    }
}

// Mobile menu toggle from product.js
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// Unified ModalManager (merging modal.js and projects.js modals)
class ModalManager {
    constructor() {
        this.modal = document.getElementById('callbackModal');
        this.modalClose = document.getElementById('modalClose');
        this.callbackForm = document.getElementById('callbackForm');
        
        this.init();
    }

    init() {
        if (!this.modal) return;
        
        this.setupEventListeners();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Close modal events
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Form submission
        if (this.callbackForm) {
            this.callbackForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Phone input formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => this.formatPhoneInput(e));
        }
    }

    setupFormValidation() {
        const inputs = this.callbackForm?.querySelectorAll('input[required]');
        
        inputs?.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    openModal() {
        if (!this.modal) return;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = this.modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        // Add animation
        const modalContent = this.modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.9)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
                modalContent.style.transition = 'all 0.3s ease';
            }, 10);
        }
    }

    closeModal() {
        if (!this.modal) return;
        
        const modalContent = this.modal.querySelector('.modal-content');
        
        if (modalContent) {
            modalContent.style.transform = 'scale(0.9)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                this.modal.classList.remove('active');
                document.body.style.overflow = '';
                this.resetForm();
            }, 300);
        } else {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            this.resetForm();
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(this.callbackForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = this.callbackForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Simulate API call
        this.submitForm(data)
            .then(() => {
                this.showSuccessMessage();
                setTimeout(() => this.closeModal(), 2000);
            })
            .catch((error) => {
                this.showErrorMessage(error.message);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    }

    async submitForm(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/error
                if (Math.random() > 0.1) {
                    console.log('Form submitted:', data);
                    resolve();
                } else {
                    reject(new Error('Произошла ошибка при отправке. Попробуйте еще раз.'));
                }
            }, 1500);
        });
    }

    validateForm() {
        const inputs = this.callbackForm.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Это поле обязательно для заполнения';
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Введите корректный email адрес';
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && value) {
            const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Введите корректный номер телефона';
            }
        }
        
        // Name validation
        if (input.name === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Имя должно содержать минимум 2 символа';
            }
        }
        
        this.showFieldError(input, isValid ? '' : errorMessage);
        return isValid;
    }

    showFieldError(input, message) {
        this.clearFieldError(input);
        
        if (message) {
            input.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            
            input.parentNode.appendChild(errorElement);
        }
    }

    clearFieldError(input) {
        input.classList.remove('error');
        
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    formatPhoneInput(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('8')) {
            value = '7' + value.slice(1);
        }
        
        if (value.startsWith('7')) {
            value = value.slice(0, 11);
            const formatted = value.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
            e.target.value = formatted.length > 4 ? formatted : '+7 ' + value.slice(1);
        } else {
            e.target.value = '+7 ' + value;
        }
    }

    showSuccessMessage() {
        const form = this.callbackForm;
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">✓</div>
            <h3>Заявка отправлена!</h3>
            <p>Мы свяжемся с вами в ближайшее время.</p>
        `;
        
        form.style.display = 'none';
        form.parentNode.appendChild(successMessage);
    }

    showErrorMessage(message) {
        const existingError = this.modal.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        this.callbackForm.insertBefore(errorMessage, this.callbackForm.firstChild);
        
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }

    resetForm() {
        if (!this.callbackForm) return;
        
        this.callbackForm.reset();
        
        // Clear all errors
        const inputs = this.callbackForm.querySelectorAll('input');
        inputs.forEach(input => this.clearFieldError(input));
        
        // Remove success/error messages
        const messages = this.modal.querySelectorAll('.success-message, .error-message');
        messages.forEach(message => message.remove());
        
        // Show form again
        this.callbackForm.style.display = 'block';
    }

    // Project modal from projects.js, integrated
    showProjectModal(projectData) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="project-modal-content">
                <div class="project-modal-header">
                    <h3>${projectData.company}</h3>
                    <button class="project-modal-close" aria-label="Закрыть">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="project-modal-body">
                    <h4>${projectData.title}</h4>
                    <div class="project-meta">
                        <span class="project-year">${projectData.year}</span>
                        <span class="project-duration">${projectData.duration}</span>
                    </div>
                    <p class="project-full-description">${projectData.fullDescription}</p>
                    
                    <div class="project-results">
                        <h5>Результаты проекта:</h5>
                        <ul>
                            ${projectData.results?.map(result => `<li>${result}</li>`).join('') || ''}
                        </ul>
                    </div>
                    
                    <div class="project-technologies">
                        <h5>Технологии:</h5>
                        <div class="tech-tags">
                            ${projectData.technologies?.map(tech => `<span class="tech-tag">${tech}</span>`).join('') || ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.project-modal-close');
        closeBtn.addEventListener('click', () => this.closeProjectModal(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal(modal);
            }
        });
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal(modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
}

// ProjectsManager from projects.js
class ProjectsManager {
    constructor() {
        this.projects = document.querySelectorAll('.project-item');
        this.init();
    }

    init() {
        this.setupProjectToggles();
        this.setupProjectAnimations();
    }

    setupProjectToggles() {
        this.projects.forEach(project => {
            const toggle = project.querySelector('.project-toggle');
            
            if (toggle) {
                toggle.addEventListener('click', () => {
                    this.toggleProject(project);
                });
            }
        });
    }

    toggleProject(project) {
        const isExpanded = project.classList.contains('expanded');
        
        if (isExpanded) {
            this.collapseProject(project);
        } else {
            // Collapse all other projects first
            this.projects.forEach(p => {
                if (p !== project && p.classList.contains('expanded')) {
                    this.collapseProject(p);
                }
            });
            
            this.expandProject(project);
        }
    }

    expandProject(project) {
        project.classList.add('expanding');
        
        // Create project details if they don't exist
        let details = project.querySelector('.project-details');
        if (!details) {
            details = this.createProjectDetails(project);
            project.appendChild(details);
        }
        
        // Animate expansion
        setTimeout(() => {
            project.classList.add('expanded');
            project.classList.remove('expanding');
            
            // Scroll to project if needed
            this.scrollToProject(project);
        }, 50);
        
        // Update toggle icon
        const toggle = project.querySelector('.project-toggle');
        if (toggle) {
            toggle.setAttribute('aria-label', 'Свернуть проект');
        }
    }

    collapseProject(project) {
        project.classList.add('collapsing');
        
        setTimeout(() => {
            project.classList.remove('expanded', 'collapsing');
        }, 300);
        
        // Update toggle icon
        const toggle = project.querySelector('.project-toggle');
        if (toggle) {
            toggle.setAttribute('aria-label', 'Развернуть проект');
        }
    }

    createProjectDetails(project) {
        const projectId = project.dataset.project;
        const details = document.createElement('div');
        details.className = 'project-details';
        
        // Get project data (in a real app, this would come from an API or data store)
        const projectData = this.getProjectData(projectId);
        
        details.innerHTML = `
            <p class="project-details-text">${projectData.description}</p>
            <button class="project-details-btn">Читать подробнее</button>
        `;
        
        // Add event listener to details button
        const detailsBtn = details.querySelector('.project-details-btn');
        detailsBtn.addEventListener('click', () => {
            this.showProjectModal(projectData);
        });
        
        return details;
    }

    getProjectData(projectId) {
        const projectsData = {
            '1': {
                id: '1',
                company: 'ООО «ИНВЕСТ ТРЕЙД»',
                title: 'Поставка компании лицензий на АСМОГРАФ',
                description: 'Успешная поставка лицензий на программное обеспечение АСМОграф для оптимизации работы с инженерными схемами и документооборотом.',
                fullDescription: 'В рамках сотрудничества с ООО «ИНВЕСТ ТРЕЙД» была осуществлена поставка лицензий на кроссплатформенный векторный графический редактор АСМОграф. Решение позволило компании значительно улучшить процессы создания и редактирования инженерных схем, а также наладить эффективный документооборот.',
                results: [
                    'Сокращение времени на создание схем на 40%',
                    'Улучшение качества документации',
                    'Снижение зависимости от зарубежного ПО'
                ],
                technologies: ['АСМОграф', 'Векторная графика', 'CAD'],
                duration: '2 месяца',
                year: '2024'
            },
            '2': {
                id: '2',
                company: 'ООО «НСТЭЦ»',
                title: 'Поставка компании лицензий на АСМОГРАФ',
                description: 'Внедрение решения АСМОграф для автоматизации процессов проектирования и создания технической документации.',
                fullDescription: 'Проект по внедрению АСМОграф в ООО «НСТЭЦ» включал не только поставку лицензий, но и полное обучение персонала работе с системой. Особое внимание уделялось интеграции с существующими системами компании.',
                results: [
                    'Автоматизация процессов проектирования',
                    'Стандартизация документооборота',
                    'Повышение производительности на 35%'
                ],
                technologies: ['АСМОграф', 'Интеграция', 'Обучение'],
                duration: '3 месяца',
                year: '2024'
            },
            '3': {
                id: '3',
                company: 'ООО «АРГОС»',
                title: 'Поставка компании лицензий на АСМОГРАФ',
                description: 'В рамках программы импортозамещения была успешно осуществлена поставка программного обеспечения АСМОграф. Решение стало ключевым инструментом для оптимизации работы и сокращения зависимости от зарубежных продуктов.',
                fullDescription: 'Комплексный проект импортозамещения в ООО «АРГОС» включал полный переход с зарубежных решений на отечественное ПО АСМОграф. Проект реализовывался поэтапно с минимальными рисками для производственных процессов.',
                results: [
                    '100% импортозамещение в области векторной графики',
                    'Снижение затрат на лицензии на 60%',
                    'Повышение информационной безопасности',
                    'Создание резерва компетенций'
                ],
                technologies: ['АСМОграф', 'Импортозамещение', 'Миграция данных'],
                duration: '6 месяцев',
                year: '2024'
            }
        };
        
        return projectsData[projectId] || {};
    }

    showProjectModal(projectData) {
        // Create and show detailed project modal
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="project-modal-content">
                <div class="project-modal-header">
                    <h3>${projectData.company}</h3>
                    <button class="project-modal-close" aria-label="Закрыть">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="project-modal-body">
                    <h4>${projectData.title}</h4>
                    <div class="project-meta">
                        <span class="project-year">${projectData.year}</span>
                        <span class="project-duration">${projectData.duration}</span>
                    </div>
                    <p class="project-full-description">${projectData.fullDescription}</p>
                    
                    <div class="project-results">
                        <h5>Результаты проекта:</h5>
                        <ul>
                            ${projectData.results?.map(result => `<li>${result}</li>`).join('') || ''}
                        </ul>
                    </div>
                    
                    <div class="project-technologies">
                        <h5>Технологии:</h5>
                        <div class="tech-tags">
                            ${projectData.technologies?.map(tech => `<span class="tech-tag">${tech}</span>`).join('') || ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.project-modal-close');
        closeBtn.addEventListener('click', () => this.closeProjectModal(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal(modal);
            }
        });
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal(modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }

    scrollToProject(project) {
        const rect = project.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetTop = rect.top + scrollTop - 100; // 100px offset for header
        
        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    }

    setupProjectAnimations() {
        // Add CSS for project animations
        const style = document.createElement('style');
        style.textContent = `
            .project-item {
                transition: all 0.3s ease;
                overflow: hidden;
            }
            
            .project-item.expanding {
                transition: all 0.5s ease;
            }
            
            .project-item.collapsing {
                transition: all 0.3s ease;
            }
            
            .project-details {
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease 0.1s;
            }
            
            .project-item.expanded .project-details {
                opacity: 1;
                transform: translateY(0);
            }
            
            .project-toggle svg {
                transition: transform 0.3s ease;
            }
            
            .project-item.expanded .project-toggle svg {
                transform: rotate(180deg);
            }
            
            /* Project Modal Styles */
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 1001;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .project-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .project-modal-content {
                background: white;
                border-radius: 12px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .project-modal.active .project-modal-content {
                transform: scale(1);
            }
            
            .project-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px 30px 0;
                border-bottom: 1px solid #eee;
                margin-bottom: 30px;
            }
            
            .project-modal-header h3 {
                font-size: 24px;
                font-weight: 600;
                color: var(--primary-black);
                margin: 0;
            }
            
            .project-modal-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 5px;
                color: var(--primary-black);
            }
            
            .project-modal-body {
                padding: 0 30px 30px;
            }
            
            .project-modal-body h4 {
                font-size: 20px;
                font-weight: 600;
                color: var(--primary-blue);
                margin-bottom: 15px;
            }
            
            .project-meta {
                display: flex;
                gap: 20px;
                margin-bottom: 20px;
                font-size: 14px;
                color: var(--text-gray);
            }
            
            .project-full-description {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 25px;
                color: var(--primary-black);
            }
            
            .project-results,
            .project-technologies {
                margin-bottom: 25px;
            }
            
            .project-results h5,
            .project-technologies h5 {
                font-size: 18px;
                font-weight: 600;
                color: var(--primary-black);
                margin-bottom: 10px;
            }
            
            .project-results ul {
                list-style: none;
                padding: 0;
            }
            
            .project-results li {
                padding: 8px 0;
                padding-left: 20px;
                position: relative;
                color: var(--primary-black);
            }
            
            .project-results li:before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--primary-blue);
                font-weight: bold;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .tech-tag {
                background: var(--primary-blue-light);
                color: var(--primary-blue);
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
            }
            
            @media (max-width: 768px) {
                .project-modal-content {
                    width: 95%;
                    margin: 20px;
                }
                
                .project-modal-header,
                .project-modal-body {
                    padding-left: 20px;
                    padding-right: 20px;
                }
                
                .project-meta {
                    flex-direction: column;
                    gap: 5px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}


// Carousel functionality merging product and news carousels from carousel.js
class Carousel {
    constructor(id, type = 'product') {
        this.type = type;
        this.container = document.getElementById(id);
        this.prevBtn = document.getElementById(type === 'product' ? 'productsPrev' : null);
        this.nextBtn = document.getElementById(type === 'product' ? 'productsNext' : null);
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.totalItems = type === 'product' ? 4 : document.querySelectorAll('.news-item').length; // Adjust for type
        
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.updateCarousel();
        this.updateButtons();
        this.setupEventListeners();
        if (this.type === 'news' && window.innerWidth <= 768) this.setupNewsMobileCarousel();
    }

    setupEventListeners() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

        window.addEventListener('resize', () => {
            const newItemsPerView = this.getItemsPerView();
            if (newItemsPerView !== this.itemsPerView) {
                this.itemsPerView = newItemsPerView;
                this.currentIndex = Math.min(this.currentIndex, this.getMaxIndex());
                this.updateCarousel();
                this.updateButtons();
            }
        });

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
        if (!this.container) return;
        
        const cards = this.container.querySelectorAll(this.type === 'product' ? '.product-card' : '.news-slide');
        const cardWidth = 100 / this.itemsPerView;
        const translateX = -(this.currentIndex * cardWidth);
        
        cards.forEach((card, index) => {
            card.style.transform = `translateX(${translateX}%)`;
            card.style.width = `${cardWidth}%`;
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    updateButtons() {
        if (!this.prevBtn || !this.nextBtn) return;
        
        const maxIndex = this.getMaxIndex();
        
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
        
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
    }

    setupTouchEvents() {
        if (!this.container) return;
        
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        this.container.addEventListener('touchend', (e) => {
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

    // News specific
    setupNewsMobileCarousel() {
        const newsItems = this.container.querySelectorAll('.news-featured, .news-regular');
        
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
        this.container.parentNode.replaceChild(carouselContainer, this.container);
        this.container = carousel;  // Update reference
        
        // Add CSS
        this.addNewsCarouselStyles();
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

    addNewsCarouselStyles() {
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

// Add modal styles from modal.js
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #e74c3c;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
    }
    
    .field-error {
        color: #e74c3c;
        font-size: 14px;
        margin-top: 5px;
    }
    
    .success-message {
        text-align: center;
        padding: 40px 20px;
    }
    
    .success-icon {
        width: 60px;
        height: 60px;
        background: #27ae60;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        margin: 0 auto 20px;
    }
    
    .success-message h3 {
        color: #27ae60;
        margin-bottom: 10px;
    }
    
    .success-message p {
        color: #666;
    }
    
    .error-message {
        background: #fee;
        color: #e74c3c;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
        border: 1px solid #fcc;
    }
    
    .modal-content {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(modalStyles);

// Form handling from product.js
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

// Export all
export { toggleAccordion, updateSchemesDisplay, nextScheme, previousScheme, playVideo, toggleMobileMenu, ModalManager, ProjectsManager, Carousel };