document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('eye-closed').style.display = 'block';
    document.getElementById('eye-open').style.display = 'none';
});

document.getElementById('fotoPreview').style.display = 'none';
document.getElementById('fotoDefault').style.display = 'block';
let fotoBase64 = '';

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
            profilePic.src = imageDataUrl;
            localStorage.setItem('profilePic', imageDataUrl);
        };
        
        reader.readAsDataURL(file);
    } else {

        fotoPreview.style.display = 'none';
        fotoDefault.style.display = 'block';
    }
}


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var nome = document.getElementById('nome').value;
    var fotoInput = document.getElementById('foto');

    function convertImageToBase64(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    if (fotoInput.files.length > 0) {
        var fotoFile = fotoInput.files[0];
        
        convertImageToBase64(fotoFile, function(base64Image) {
            localStorage.setItem('isLogado', true);
            localStorage.setItem('nome', nome);
            localStorage.setItem('fotoPerfil', base64Image);

            alert('Cadastro realizado com sucesso!');
        });
    } else {
        alert('Por favor, selecione uma foto.');
    }
});

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


document.addEventListener('DOMContentLoaded', verificarLogin);

function deslogar() {
    localStorage.removeItem('nome');
    localStorage.removeItem('isLogado');
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
    } else if (senha1 !== senha2) {
        mostrarMsg('As senhas não são iguais!', 'erro');
        return;
    } else {
        mostrarMsg('Sucesso ao cadastrar!', 'sucesso');
        localStorage.setItem('isLogado', 'true');
        localStorage.setItem('nome', nome);
        verificarLogin();
    }

}
