function mascaraCpf(value) {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
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

function mandarCurriculo() {    
    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var idd = document.getElementById('idd').value.trim();
    var cpf = document.getElementById('cpf').value.trim();
    var endereco = document.getElementById('endereco').value.trim();
    var uf = document.getElementById('uf').value.trim();
    
    if (!nome) {
        mostrarMsg('Digite seu nome', 'erro');
        return;
    } else if (!email) {
        mostrarMsg('Digite seu email', 'erro');
        return;
    } else if (!idd) {
        mostrarMsg('Digite sua idade', 'erro');
        return;
    } else if (!cpf) {
        mostrarMsg('Digite seu CPF', 'erro');
        return;
    } else if (!endereco) {
        mostrarMsg('Digite seu endereço', 'erro');
        return;
    } else if (!uf) {
        mostrarMsg('Digite seu estado (UF)', 'erro');
        return;
    }
    
    document.getElementById('cpf').value = mascaraCpf(cpf);
    mostrarMsg('Informações enviadas com sucesso!', 'sucesso');
    
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('idd').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('uf').value = '';
}

document.getElementById('cpf').addEventListener('input', function() {
    this.value = mascaraCpf(this.value);
});

// Limitar o valor máximo para o campo de idade
document.getElementById('idd').addEventListener('input', function() {
    var input = this;
    var max = parseInt(input.getAttribute('max'), 10);
    if (input.value > max) {
        input.value = max;
    }
});

// Estrelas
var stars = document.querySelectorAll('.star-icon');

document.addEventListener('click', function(e){
  var classStar = e.target.classList;
  if (!classStar.contains('ativo')) {
    stars.forEach(star => {
      star.classList.remove('ativo');
    });
    classStar.add('ativo');
  }
});

// Mandar sugestão
function mandarSugestao() {
    var nome = document.getElementById('nomeContato').value.trim();
    var email = document.getElementById('emailContato').value.trim();
    var sugestao = document.getElementById('suguestao').value.trim();

    if (!nome) {
        mostrarMsg('Digite seu nome', 'erro');
        return;
    } else if (!email) {
        mostrarMsg('Digite seu email', 'erro');
        return;
    } else if (!sugestao) {
        mostrarMsg('Digite a sugestão/reclamação', 'erro');
        return;
    }

    mostrarMsg('Sugestão enviada com sucesso!', 'sucesso');

    document.getElementById('nomeContato').value = "";
    document.getElementById('emailContato').value = "";
    document.getElementById('suguestao').value = ""; 
}
