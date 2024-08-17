document.addEventListener('DOMContentLoaded', function() {
    onInit();
});

document.getElementById('fotoPreview').style.display = 'none';
document.getElementById('fotoDefault').style.display = 'block';
let fotoBase64 = '';

function onInit(){
    document.getElementById('fotoPreview').style.display = 'none';
    document.getElementById('fotoDefault').style.display = 'flex';
    verificarLogin();
    if (localStorage.getItem('isLogado') === 'true') {
        const nomeLogado = localStorage.getItem('nome');
        const base64Fto = localStorage.getItem('profilePic');

        if(base64Fto){
            const ftoPerfil = document.getElementById('ftoDePerfil');    
            ftoPerfil.src = base64Fto
        }
        document.getElementById('nomeLogado').innerText = nomeLogado
    }
}

function openFileDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.style.display = 'none';
    
    input.addEventListener('change', handleFileSelect);
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    const fotoPreview = document.getElementById('fotoPreview');
    const fotoDefault = document.getElementById('fotoDefault');
    
    if (file) {
        const reader = new FileReader();
        
        reader.onloadend = function () {
            fotoPreview.src = reader.result; 
            fotoPreview.style.display = 'block';
            fotoDefault.style.display = 'none';
            const imageDataUrl = reader.result;
            localStorage.setItem('profilePic', imageDataUrl);
        };
        
        reader.readAsDataURL(file);
    } else {
        fotoPreview.style.display = 'none';
        fotoDefault.style.display = 'block';
    }
}

function mostrarMsg(message, type) {
    var messageElement = document.getElementById('message');
    messageElement.innerText = message;
    messageElement.className = type;
    messageElement.classList.remove('hidden');
    
    setTimeout(function() {
        messageElement.classList.add('hidden');
    }, 2400);
}

function togglePassword(inputId, eyeClosedId, eyeOpenId) {
    var passwordInput = document.getElementById(inputId);
    var eyeClosedIcon = document.getElementById(eyeClosedId);
    var eyeOpenIcon = document.getElementById(eyeOpenId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeClosedIcon.style.display = 'none';
        eyeOpenIcon.style.display = 'block';
    } else {
        passwordInput.type = 'password';
        eyeClosedIcon.style.display = 'block';
        eyeOpenIcon.style.display = 'none';
    }
}

function verificarLogin() {
    const isLogado = localStorage.getItem('isLogado') === 'true';
    document.querySelector('.cadastro').style.display = isLogado ? 'none' : 'block';
    document.querySelector('.cadastrado').style.display = isLogado ? 'block' : 'none';
}

function deslogar() {
    localStorage.removeItem('nome');
    localStorage.removeItem('isLogado');
    localStorage.removeItem('profilePic');
    mostrarMsg('Sucesso ao deslogar!', 'sucesso');
    verificarLogin();
}

function cadastrar() {
    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var senha1 = document.getElementById('senha1').value.trim();
    var senha2 = document.getElementById('senha2').value.trim();

    if (!nome) {
        mostrarMsg('Digite seu nome', 'erro');
        return;
    } else if (!email) {
        mostrarMsg('Digite seu email', 'erro');
        return;    
    } else if (!senha1) {
        mostrarMsg('Digite sua senha', 'erro');
        return;        
    } else if (!verificarSenha(senha1)) {
        return;
    } else if (senha1 !== senha2) {
        mostrarMsg('As senhas não são iguais!', 'erro');
        return;
    } else {
        mostrarMsg('Sucesso ao cadastrar!', 'sucesso');
        localStorage.setItem('isLogado', 'true');
        localStorage.setItem('nome', nome);
        verificarLogin();
        onInit();
    }
}

function verificarSenha(senha1) {
    if (senha1.length <= 3) {
        mostrarMsg('A senha deve conter mais de 3 caracteres', 'erro');
        return false; 
    }
    return true;
}
