const produtos = {
    hamburgers: [
        { id: 1, nome: 'Cheeseburger', imagem: 'produtosImagens/Cheeseburger.png', preco: 12.00, desconto: 0.10 },
        { id: 2, nome: 'Bacon Burger', imagem: 'produtosImagens/162275067751557.png', preco: 15.00, desconto: 0.20 },
        { id: 3, nome: 'Double Bacon Burger', imagem: 'produtosImagens/DLV_67474_3.png', preco: 18.00, desconto: 0.15 },
        { id: 4, nome: 'Chicken Burger', imagem: 'produtosImagens/Stacker_Duplo_Bacon-thumb-cupom-m-d.png', preco: 14.00, desconto: 0.05 },
        { id: 5, nome: 'Veggie Burger', imagem: 'produtosImagens/tasty-mushroom-burger-on-transparent-background-png.png', preco: 13.00, desconto: 0.10 },
        { id: 6, nome: 'BBQ Burger', imagem: 'produtosImagens/veggie-burger.png', preco: 16.00, desconto: 0.20 },
        { id: 7, nome: 'Spicy Burger', imagem: 'produtosImagens/Crispy20Chicken20BBQ-01_1.png', preco: 17.00, desconto: 0.10 },
        { id: 8, nome: 'Mushroom Burger', imagem: 'produtosImagens/mushrum.png', preco: 15.00, desconto: 0.25 }
    ],
    milkshakes: [
        { id: 9, nome: 'Chocolate Milkshake', imagem: 'produtosImagens/milkshakChoc.png', preco: 8.00, desconto: 0.10 },
        { id: 10, nome: 'Bunilia Milkshake', imagem: 'produtosImagens/vanilla.jpg', preco: 7.00, desconto: 0.15 },
        { id: 11, nome: 'Morango Milkshake', imagem: 'produtosImagens/morango.png', preco: 8.50, desconto: 0.05 },
        { id: 12, nome: 'Caramelo Milkshake', imagem: 'produtosImagens/caramelo.png', preco: 9.00, desconto: 0.20 },
        { id: 13, nome: 'Oreo Milkshake', imagem: 'produtosImagens/oreo.png', preco: 8.50, desconto: 0.10 },
        { id: 14, nome: 'Menta Milkshake', imagem: 'produtosImagens/mint.png', preco: 8.00, desconto: 0.15 },
        { id: 15, nome: 'Doce de leite Milkshake', imagem: 'produtosImagens/doce.jpg', preco: 9.00, desconto: 0.20 },
        { id: 16, nome: 'Manga Milkshake', imagem: 'produtosImagens/manga.png', preco: 7.50, desconto: 0.05 }
    ],
    salgados: [
        { id: 17, nome: 'Coxinha', imagem: 'produtosImagens/coxinha.png', preco: 4.00, desconto: 0.10 },
        { id: 18, nome: 'Pastel', imagem: 'produtosImagens/pastel.png', preco: 5.00, desconto: 0.20 },
        { id: 19, nome: 'Empada', imagem: 'produtosImagens/torta.png', preco: 6.00, desconto: 0.15 },
        { id: 20, nome: 'Quibe', imagem: 'produtosImagens/quibe.png', preco: 4.50, desconto: 0.05 },
        { id: 21, nome: 'Enroladinho', imagem: 'produtosImagens/enrolado.png', preco: 5.50, desconto: 0.10 },
        { id: 22, nome: 'Mini Pizza', imagem: 'produtosImagens/minipizza.png', preco: 6.50, desconto: 0.15 }
    ],
    legumes: [
        { id: 23, nome: 'Brócolis', imagem: 'produtosImagens/brocolis.png', preco: 3.00, desconto: 0.10 },
        { id: 24, nome: 'Cenoura', imagem: 'produtosImagens/cenoura.png', preco: 2.50, desconto: 0.15 }
    ],
    biscoitos: [
        { id: 25, nome: 'Cookies', imagem: 'produtosImagens/cookie.png', preco: 5.00, desconto: 0.10 },
        { id: 26, nome: 'Biscoito de Chocolate', imagem: 'produtosImagens/buscChoco.png', preco: 6.00, desconto: 0.15 },
        { id: 27, nome: 'Biscoito de Morango', imagem: 'produtosImagens/morangoBisc.png', preco: 6.00, desconto: 0.15 },
        { id: 28, nome: 'Biscoito de Limão', imagem: 'produtosImagens/limao.png', preco: 5.00, desconto: 0.25 }
    ]
};

function criarCard(produto, isRecomendacao = false) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = produto.id;

    const img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = produto.nome;

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = produto.nome;

    const priceContainer = document.createElement('div');
    priceContainer.className = 'price-container';

    if (produto.desconto > 0) {
        const priceWrapper = document.createElement('div');
        priceWrapper.className = 'price-wrapper';

        const discountPercentage = document.createElement('div');
        discountPercentage.className = 'discount-percentage';
        discountPercentage.textContent = `${(produto.desconto * 100).toFixed(0)}% OFF`;

        const originalPrice = document.createElement('div');
        originalPrice.className = 'card-price original';
        originalPrice.textContent = `R$ ${produto.preco.toFixed(2)}`;

        const discountedPrice = document.createElement('div');
        discountedPrice.className = 'card-price discounted';
        discountedPrice.textContent = `R$ ${(produto.preco * (1 - produto.desconto)).toFixed(2)}`;

        priceWrapper.appendChild(discountPercentage);
        priceWrapper.appendChild(originalPrice);

        priceContainer.appendChild(priceWrapper);
        priceContainer.appendChild(discountedPrice);
    } else {
        const normalPrice = document.createElement('div');
        normalPrice.className = 'card-price';
        normalPrice.textContent = `R$ ${produto.preco.toFixed(2)}`;

        priceContainer.appendChild(normalPrice);
    }

    cardContent.appendChild(title);
    cardContent.appendChild(priceContainer);
    card.appendChild(img);
    card.appendChild(cardContent);

    card.addEventListener('click', () => {
        if (isRecomendacao) {
            const produtosRecomendados = JSON.parse(localStorage.getItem('produtosRecomendados')) || [];
            if (!produtosRecomendados.some(p => p.id === produto.id)) {
                produtosRecomendados.push(produto);
                localStorage.setItem('produtosRecomendados', JSON.stringify(produtosRecomendados));
            }
            alert('Produto adicionado às recomendações!');
        } else {
            alert('Produto adicionado ao carrinho!');
        }
    });

    return card;
}

function exibirProdutoSelecionado(id) {
    id = Number(id);
    const categorias = Object.values(produtos).flat();
    const produto = categorias.find(p => p.id === id);

    const produtoSelecionado = document.getElementById('produtoSelecionado');

    if (produto) {
        const card = criarCard(produto);
        produtoSelecionado.innerHTML = ''; // Clear existing content
        produtoSelecionado.appendChild(card);
    } else {
        produtoSelecionado.innerHTML = '<p>Produto não encontrado.</p>';
    }
}

function exibirRecomendacoes() {
    const categorias = Object.values(produtos).flat();
    const recomendacoes = [];
    while (recomendacoes.length < 3) {
        const randomIndex = Math.floor(Math.random() * categorias.length);
        const produto = categorias[randomIndex];
        if (!recomendacoes.includes(produto)) {
            recomendacoes.push(produto);
        }
    }

    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';
    recomendacoes.forEach(produto => {
        const card = criarCard(produto, true); // Set isRecomendacao to true
        cardsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let idProduto = localStorage.getItem('idProduto');
    
    if (idProduto) {
        exibirProdutoSelecionado(idProduto);
    } else {
        document.getElementById('produtoSelecionado').innerHTML = '<p>Carrinho vazio.</p>';
    }

    exibirRecomendacoes();
});
