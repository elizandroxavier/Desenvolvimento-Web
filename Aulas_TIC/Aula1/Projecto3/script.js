/* ========================================
   FORMULÁRIO DE CONTACTO PROFISSIONAL
   Validação em tempo real e gestão de estados
   ======================================== */

(function() {
    'use strict';

    // ========================================
    // SELEÇÃO DE ELEMENTOS DO DOM
    // ========================================
    
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const backButton = document.getElementById('backButton');
    
    // Campos do formulário
    const fields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    // ========================================
    // CONFIGURAÇÕES DE VALIDAÇÃO
    // ========================================
    
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s'-]+$/,
            messages: {
                required: 'O primeiro nome é obrigatório.',
                minLength: 'O primeiro nome deve ter pelo menos 2 caracteres.',
                maxLength: 'O primeiro nome não pode exceder 50 caracteres.',
                pattern: 'Por favor, insira um nome válido.'
            }
        },
        lastName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s'-]+$/,
            messages: {
                required: 'O segundo nome é obrigatório.',
                minLength: 'O segundo nome deve ter pelo menos 2 caracteres.',
                maxLength: 'O segundo nome não pode exceder 50 caracteres.',
                pattern: 'Por favor, insira um nome válido.'
            }
        },
        email: {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            maxLength: 254,
            messages: {
                required: 'O e-mail é obrigatório.',
                pattern: 'Por favor, insira um endereço de e-mail válido.',
                maxLength: 'O e-mail não pode exceder 254 caracteres.'
            }
        },
        phone: {
            required: true,
            pattern: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
            minLength: 9,
            maxLength: 20,
            messages: {
                required: 'O número de telefone é obrigatório.',
                pattern: 'Por favor, insira um número de telefone válido.',
                minLength: 'O número deve ter pelo menos 9 dígitos.',
                maxLength: 'O número não pode exceder 20 caracteres.'
            }
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 150,
            messages: {
                required: 'O assunto é obrigatório.',
                minLength: 'O assunto deve ter pelo menos 5 caracteres.',
                maxLength: 'O assunto não pode exceder 150 caracteres.'
            }
        },
        message: {
            required: true,
            minLength: 20,
            maxLength: 1000,
            messages: {
                required: 'A mensagem é obrigatória.',
                minLength: 'A mensagem deve ter pelo menos 20 caracteres.',
                maxLength: 'A mensagem não pode exceder 1000 caracteres.'
            }
        }
    };

    // ========================================
    // FUNÇÕES DE VALIDAÇÃO
    // ========================================

    /**
     * Valida um campo individual com base nas regras definidas
     * @param {string} fieldName - Nome do campo a ser validado
     * @param {string} value - Valor do campo
     * @returns {Object} - Objeto com status de validade e mensagem de erro
     */
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        const trimmedValue = value.trim();

        // Validação: campo obrigatório
        if (rules.required && trimmedValue === '') {
            return {
                isValid: false,
                message: rules.messages.required
            };
        }

        // Validação: comprimento mínimo
        if (rules.minLength && trimmedValue.length > 0 && trimmedValue.length < rules.minLength) {
            return {
                isValid: false,
                message: rules.messages.minLength
            };
        }

        // Validação: comprimento máximo
        if (rules.maxLength && trimmedValue.length > rules.maxLength) {
            return {
                isValid: false,
                message: rules.messages.maxLength
            };
        }

        // Validação: padrão (regex)
        if (rules.pattern && trimmedValue.length > 0 && !rules.pattern.test(trimmedValue)) {
            return {
                isValid: false,
                message: rules.messages.pattern
            };
        }

        return {
            isValid: true,
            message: ''
        };
    }

    /**
     * Exibe ou remove mensagem de erro visual no campo
     * @param {HTMLElement} field - Elemento do campo
     * @param {string} message - Mensagem de erro
     */
    function showError(field, message) {
        const errorElement = document.getElementById(`${field.id}-error`);
        
        field.classList.add('error');
        field.classList.remove('success');
        field.setAttribute('aria-invalid', 'true');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
        }
    }

    /**
     * Remove mensagem de erro e marca campo como válido
     * @param {HTMLElement} field - Elemento do campo
     */
    function clearError(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        
        field.classList.remove('error');
        field.classList.add('success');
        field.setAttribute('aria-invalid', 'false');
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('visible');
        }
    }

    /**
     * Valida campo e atualiza interface
     * @param {HTMLElement} field - Elemento do campo
     * @param {string} fieldName - Nome do campo
     */
    function handleFieldValidation(field, fieldName) {
        const validation = validateField(fieldName, field.value);
        
        if (!validation.isValid) {
            showError(field, validation.message);
        } else {
            clearError(field);
        }
        
        return validation.isValid;
    }

    /**
     * Valida todos os campos do formulário
     * @returns {boolean} - True se todos os campos forem válidos
     */
    function validateAllFields() {
        let isFormValid = true;

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const isFieldValid = handleFieldValidation(field, fieldName);
            
            if (!isFieldValid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    // ========================================
    // EVENT LISTENERS - VALIDAÇÃO EM TEMPO REAL
    // ========================================

    /**
     * Adiciona validação em tempo real a todos os campos
     */
    function initializeFieldListeners() {
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];

            // Validação ao sair do campo (blur)
            field.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    handleFieldValidation(this, fieldName);
                }
            });

            // Validação enquanto digita (input) - apenas se já houver erro
            field.addEventListener('input', function() {
                const errorElement = document.getElementById(`${this.id}-error`);
                if (errorElement && errorElement.classList.contains('visible')) {
                    handleFieldValidation(this, fieldName);
                }
            });

            // Remove estado de sucesso ao focar novamente
            field.addEventListener('focus', function() {
                this.classList.remove('success');
            });
        });
    }

    // ========================================
    // SIMULAÇÃO DE ENVIO DO FORMULÁRIO
    // ========================================

    /**
     * Simula o envio do formulário para API
     * @param {Object} formData - Dados do formulário
     * @returns {Promise} - Promise que simula chamada API
     */
    function submitFormData(formData) {
        return new Promise((resolve, reject) => {
            // Simula delay de rede (1.5 segundos)
            setTimeout(() => {
                // Simula sucesso em 95% dos casos
                const isSuccess = Math.random() > 0.05;
                
                if (isSuccess) {
                    resolve({
                        success: true,
                        message: 'Mensagem enviada com sucesso'
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Erro ao enviar mensagem. Por favor, tente novamente.'
                    });
                }
            }, 1500);
        });

        // Em produção, substituir por:
        /*
        return fetch('https://api.seusite.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json());
        */
    }

    /**
     * Altera estado visual do botão durante o envio
     * @param {boolean} isLoading - Se está em estado de carregamento
     */
    function setButtonLoadingState(isLoading) {
        if (isLoading) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            submitButton.setAttribute('aria-busy', 'true');
        } else {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.setAttribute('aria-busy', 'false');
        }
    }

    /**
     * Exibe mensagem de sucesso
     */
    function showSuccessMessage() {
        successMessage.classList.add('visible');
        successMessage.setAttribute('aria-hidden', 'false');
        form.setAttribute('aria-hidden', 'true');
        
        // Foca no elemento de sucesso para leitores de tela
        successMessage.focus();
    }

    /**
     * Esconde mensagem de sucesso e reseta formulário
     */
    function hideSuccessMessage() {
        successMessage.classList.remove('visible');
        successMessage.setAttribute('aria-hidden', 'true');
        form.setAttribute('aria-hidden', 'false');
        
        // Reseta o formulário
        resetForm();
        
        // Foca no primeiro campo
        fields.firstName.focus();
    }

    /**
     * Reseta todos os campos do formulário
     */
    function resetForm() {
        form.reset();
        
        // Remove todos os estados visuais
        Object.values(fields).forEach(field => {
            field.classList.remove('error', 'success');
            field.setAttribute('aria-invalid', 'false');
            
            const errorElement = document.getElementById(`${field.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('visible');
            }
        });
    }

    /**
     * Coleta dados do formulário
     * @returns {Object} - Objeto com dados do formulário
     */
    function getFormData() {
        return {
            firstName: fields.firstName.value.trim(),
            lastName: fields.lastName.value.trim(),
            email: fields.email.value.trim(),
            phone: fields.phone.value.trim(),
            subject: fields.subject.value.trim(),
            message: fields.message.value.trim(),
            timestamp: new Date().toISOString()
        };
    }

    // ========================================
    // MANIPULADOR DE SUBMISSÃO DO FORMULÁRIO
    // ========================================

    /**
     * Processa o envio do formulário
     * @param {Event} event - Evento de submissão
     */
    async function handleFormSubmit(event) {
        event.preventDefault();

        // Valida todos os campos
        const isValid = validateAllFields();

        if (!isValid) {
            // Foca no primeiro campo com erro
            const firstErrorField = form.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.focus();
            }
            return;
        }

        // Coleta dados do formulário
        const formData = getFormData();

        // Ativa estado de carregamento
        setButtonLoadingState(true);

        try {
            // Envia dados (simulado)
            const response = await submitFormData(formData);

            // Se sucesso, mostra mensagem
            if (response.success) {
                showSuccessMessage();
                
                // Log dos dados (remover em produção)
                console.log('Formulário enviado com sucesso:', formData);
            }

        } catch (error) {
            // Tratamento de erro
            console.error('Erro ao enviar formulário:', error);
            
            // Mostra alerta de erro
            alert('Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente ou contacte-nos através de outro canal.');
            
        } finally {
            // Desativa estado de carregamento
            setButtonLoadingState(false);
        }
    }

    // ========================================
    // INICIALIZAÇÃO
    // ========================================

    /**
     * Inicializa o formulário e seus event listeners
     */
    function initialize() {
        // Adiciona validação em tempo real aos campos
        initializeFieldListeners();

        // Event listener para submissão do formulário
        form.addEventListener('submit', handleFormSubmit);

        // Event listener para botão "voltar"
        backButton.addEventListener('click', hideSuccessMessage);

        // Define estado inicial da mensagem de sucesso
        successMessage.setAttribute('aria-hidden', 'true');

        // Foca no primeiro campo ao carregar
        fields.firstName.focus();

        console.log('Formulário de contacto inicializado com sucesso');
    }

    // ========================================
    // EXECUTAR QUANDO DOM ESTIVER PRONTO
    // ========================================

    // Se DOM já carregou, inicializa imediatamente
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();
