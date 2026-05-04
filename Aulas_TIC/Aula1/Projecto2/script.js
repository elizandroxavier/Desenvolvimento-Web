const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('formStatus');

const fields = {
  name: {
    input: document.getElementById('name'),
    error: 'Por favor, informe o seu nome completo.'
  },
  email: {
    input: document.getElementById('email'),
    error: 'Informe um endereço de e-mail válido.'
  },
  message: {
    input: document.getElementById('message'),
    error: 'A mensagem não pode estar vazia.'
  }
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateField(fieldKey) {
  const field = fields[fieldKey];
  const value = field.input.value.trim();
  const errorEl = field.input.nextElementSibling;

  let isValid = true;

  if (!value) {
    isValid = false;
  }

  if (fieldKey === 'email' && !validateEmail(value)) {
    isValid = false;
  }

  if (!isValid) {
    field.input.classList.add('error');
    errorEl.textContent = field.error;
  } else {
    field.input.classList.remove('error');
    errorEl.textContent = '';
  }

  return isValid;
}

Object.keys(fields).forEach(key => {
  fields[key].input.addEventListener('input', () => validateField(key));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  statusMessage.textContent = '';
  statusMessage.className = 'form-status';

  const isFormValid = Object.keys(fields)
    .map(validateField)
    .every(Boolean);

  if (!isFormValid) return;

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;

    statusMessage.textContent = 'Mensagem enviada com sucesso. Obrigado pelo contacto.';
    statusMessage.classList.add('success');

    form.reset();
  }, 2000);
});
