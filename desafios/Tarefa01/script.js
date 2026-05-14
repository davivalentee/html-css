// script.js

// Função para validar o CPF
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// Atualiza o estado do botão de envio
function updateSubmitButton() {
    const cpfInput = document.getElementById('cpf');
    const submitButton = document.getElementById('submit-button');
    const isValidCPF = validateCPF(cpfInput.value);
    submitButton.disabled = !isValidCPF;
}

// Função para atualizar o timer
function updateTimer() {
    const endDate = new Date('2024-09-07T00:00:00');
    const now = new Date();
    const timeDiff = endDate - now;

    if (timeDiff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Função para redirecionar após o cadastro
function handleSubmit(event) {
    event.preventDefault();
    // Aqui você pode capturar os dados do formulário e redirecionar
    window.location.href = 'pagina-de-destino.html';
}

// Eventos
document.getElementById('cpf').addEventListener('input', updateSubmitButton);
document.getElementById('registration-form').addEventListener('submit', handleSubmit);

// Atualiza o timer a cada segundo
setInterval(updateTimer, 1000);
