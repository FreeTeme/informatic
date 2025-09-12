// Projects section functionality
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

// Initialize projects manager
document.addEventListener('DOMContentLoaded', () => {
    window.projectsManager = new ProjectsManager();
});