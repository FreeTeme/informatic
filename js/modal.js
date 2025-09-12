// Modal functionality
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
}

// Add CSS for form validation and messages
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

// Initialize modal manager
document.addEventListener('DOMContentLoaded', () => {
    window.modalManager = new ModalManager();
});