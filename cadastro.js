document.addEventListener('DOMContentLoaded', function() {
    onInit();
});

document.getElementById('fotoPreview').style.display = 'none';
document.getElementById('fotoDefault').style.display = 'block';
let fotoBase64 = '';

function onInit(){
    document.getElementById('fotoPreview').style.display = 'none';
    document.getElementById('fotoDefault').style.display = 'flex';
    document.getElementById('saldoModal').style.display = 'none' 
    verificarLogin();
    verificarSaldo();
    if (localStorage.getItem('isLogado') === 'true') {
        const nomeLogado = localStorage.getItem('nome');
        const base64Fto = localStorage.getItem('profilePic');

        if(base64Fto){
            document.getElementById('ftoDePerfil').style.display = 'block' 
            document.getElementById('ftoDePerfilSem').style.display = 'none' 
            const ftoPerfil = document.getElementById('ftoDePerfil');    
            ftoPerfil.src = base64Fto
            document.getElementById('alterarFTOp').innerText = 'Alterar foto'
            document.getElementById('hasFto').innerText = 'Sua foto!'
        }else{
            document.getElementById('ftoDePerfil').style.display = 'none' 
            document.getElementById('ftoDePerfilSem').style.display = 'block'
            document.getElementById('alterarFTOp').innerText = 'Adicionar foto' 
            document.getElementById('hasFto').innerText = 'Coloque uma foto!'
        }
        document.getElementById('nomeLogado').innerText = nomeLogado + '!'
    }
}

function openFileDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.style.display = 'none';

    const isLogado = localStorage.getItem('isLogado') === 'true';
    input.addEventListener('change', isLogado ? handleFileSelectLogado : handleFileSelectNaoLogado);
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
}

function compressImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(function (blob) {
                callback(blob);
            }, 'image/jpeg', 0.7);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function handleFileSelectNaoLogado(event) {
    const file = event.target.files[0];
    const fotoPreview = document.getElementById('fotoPreview');
    const fotoDefault = document.getElementById('fotoDefault');
    
    if (file) {
        compressImage(file, function (compressedBlob) {
            const reader = new FileReader();
            reader.onloadend = function () {
                const imageDataUrl = reader.result;
                localStorage.setItem('profilePic', imageDataUrl);
                fotoPreview.src = imageDataUrl;
                fotoPreview.style.display = 'block';
                fotoDefault.style.display = 'none';
            };
            reader.readAsDataURL(compressedBlob);
        });
    } else {
        fotoPreview.style.display = 'none';
        fotoDefault.style.display = 'block';
    }
}

function handleFileSelectLogado(event) {
    const file = event.target.files[0];
    const ftoDePerfil = document.getElementById('ftoDePerfil');
    const ftoDePerfilSem = document.getElementById('ftoDePerfilSem');
    
    if (file) {
        compressImage(file, function (compressedBlob) {
            const reader = new FileReader();
            reader.onloadend = function () {
                const imageDataUrl = reader.result;
                localStorage.setItem('profilePic', imageDataUrl);
                ftoDePerfil.src = imageDataUrl;
                ftoDePerfil.style.display = 'block';
                ftoDePerfilSem.style.display = 'none';
                document.getElementById('hasFto').innerText = 'Sua foto!'
            };
            reader.readAsDataURL(compressedBlob);
        });
    } else {
        ftoDePerfil.style.display = 'none';
        ftoDePerfilSem.style.display = 'block';
        document.getElementById('hasFto').innerText = 'Coloque uma foto!'

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
    localStorage.removeItem('saldo');
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

function openModalSaldo() {
    document.getElementById('saldoModal').style.display = 'block';
    document.getElementById('amountContainer').style.display  = 'none';
}

function closeModal() {
    var modal = document.getElementById('saldoModal');
    var dinheiro = document.getElementById('dinheiro');
    var paymentMethod = document.getElementById('paymentMethod');

    modal.style.display = 'none';
    dinheiro.value = ''; 
    paymentMethod.value = '';  
    verificarSaldo()
}

document.getElementById('paymentMethod').addEventListener('change', function() {
    var amountContainer = document.getElementById('amountContainer');
    let adicionarSaldoBtn = document.getElementById('adicionarSaldoBtn');
    if (this.value) {
        amountContainer.style.display = 'flex';
        adicionarSaldoBtn.style.display = 'block';
    } else {
        amountContainer.style.display = 'none';
        adicionarSaldoBtn.style.display = 'none';
    }
});

function addSaldo() {
    var dinheiro = document.getElementById('dinheiro');
    var dinheiroValue = parseFloat(dinheiro.value);
    var saldoLocal = parseFloat(localStorage.getItem('saldo')) || 0;
    var saldoFinal = saldoLocal + dinheiroValue;

    localStorage.setItem('saldo', saldoFinal);
    mostrarMsg('Saldo adicionado com sucesso!', 'sucesso');

    closeModal();
}

document.getElementById('dinheiro').addEventListener('input', function() {
    var value = this.value;
    this.value = value.replace(/[^0-9]/g, '').slice(0, 4);
});

window.addEventListener('click', function(event) {
    var modal = document.getElementById('saldoModal');
    if (event.target === modal) {
        closeModal();
    }
});

function verificarSaldo() {
    const saldo = localStorage.getItem('saldo');
    let saldoFormatado = '00,00'; 
    if (saldo) {
        const saldoNumero = parseFloat(saldo);
        saldoFormatado = saldoNumero.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    document.getElementById('saldo').innerText = saldoFormatado;
}
