// Seleciona o elemento 'main' no HTML
const main = document.querySelector('main')

// Seleciona a pseudo-classe ':root' para manipulação de variáveis CSS
const root = document.querySelector(':root')

// Seleciona o elemento de input com id 'input'
const input = document.getElementById('input')

// Seleciona o elemento de input com id 'result'
const resultInput = document.getElementById('result')

// Array contendo as teclas permitidas para entrada
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// Adiciona eventos de clique a todos os botões com a classe 'charKey'
document.querySelectorAll('.charKey').forEach(function(charKeyBtn) {
    charKeyBtn.addEventListener('click', function() {
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

// Adiciona evento de clique ao botão 'clear' para limpar o campo de input
document.getElementById('clear').addEventListener('click', function() {
    input.value = ""
    input.focus()
    resultInput.value = ""
})

// Adiciona evento de tecla pressionada ao campo de input
input.addEventListener('keydown', function (ev) {
    ev.preventDefault()
    if(allowedKeys.includes(ev.key)) {
        input.value += ev.key
        return
    }
    // Remove o último caractere se a tecla pressionada for 'Backspace'
    if (ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1)
    }
    // Calcula o resultado se a tecla pressionada for 'Enter'
    if (ev.key === 'Enter') {
        calculate()
    }
})

// Adiciona evento de clique ao botão 'equal' para calcular o resultado
document.getElementById('equal').addEventListener('click', calculate)

// Função para calcular o resultado
function calculate() {
    resultInput.value = 'ERROR!'
    resultInput.classList.add('error')
    const result = eval(input.value)
    resultInput.value = result
    resultInput.classList.remove('error')
} 

// Adiciona evento de clique ao botão 'copyToClipboard' para copiar o resultado
document.getElementById('copyToClipboard').addEventListener('click', function(ev) {
    const button = ev.currentTarget
    // Alterna entre os textos 'Copy' e 'Copied!' e copia o resultado para a área de transferência
    if (button.innerText === 'Copy') {
        button.innerText = 'Copied!'
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)
    } else {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})

// Adiciona evento de clique ao botão 'themeSwitcher' para alternar entre temas claro e escuro
document.getElementById('themeSwitcher').addEventListener('click',function() {
    // Alterna as propriedades CSS conforme o tema atual
    if (main.dataset.theme === "dark") {
        // Tema claro
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light'
    } else {
        // Tema escuro
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})


