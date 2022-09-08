const qs = e => document.querySelector(e);
const wrapper = qs('.wrapper');
const loader = qs('.loader');
const card = qs('.card');
const userName = qs('.general h1');
const userMail = qs('.mail');
const userGender = qs('.gender');
const userLogin = qs('.user-login');
const userImg = qs('.userImg');
const userInfo = qs('.general p');
const btn = qs('#random');

// Aqui realizamos a consulta da promisse, esperando sua resposta assíncrona
const loadUser = () => {
    card.style.display = 'none';
    btn.style.display = 'none';
    fetch('https://randomuser.me/api/')
        .then(response => {
            return response.json();
        })
        .then(data => {
            renderizarDadosUsuario(data);
        }).catch((err) => {
            console.log(err);
            alert('Erro ao carregar dados!');
            location.reload();
        });
};

function renderizarDadosUsuario(dados) {
    /* -------------------------------- Tarefa 1 -------------------------------- */
    // Aqui devem desenvolver uma função que seja exibida na tela:
    // a foto, o nome completo do usuário e o e-mail.
    // Isto deve ser baseado nas informações que obtemos da API e inseridas no HTML.

    card.style.display = '';
    btn.style.display = '';
    loader.style.display = 'none';
    dados.results.forEach(e => {
        userGender.textContent = e.gender;
        userImg.setAttribute('src', e.picture.large);
        userLogin.textContent = e.login.username;
        userName.textContent = `${e.name.title} ${e.name.first} ${e.name.last}`;
        userInfo.innerHTML = `Endereço:<br/>Rua ${e.location.street.name}, ${e.location.street.number}<br/>${e.location.city} / ${e.location.state} - ${e.location.country}<br/>CEP: ${e.location.postcode}<br/><br/>Telefone:<br/>${e.phone}`;
        userMail.textContent = e.email;
    });
};

loadUser();

/* --------------------------- Tarefa 2 (extra) --------------------------- */
// Aqui você pode ir para o ponto extra de usar o botão que está comentado no HTML.
// Você pode descomentar o código no index.html e usar esse botão para executar uma nova solicitação API, sem recarregar a página.
// Cabe aos desenvolvedores decidirem qual bloco de código deve ser contido dentro de uma função para que ele possa ser executado toda vez que um clique de botão for realizado.

btn.addEventListener('click', (e) => {
    e.preventDefault();
    loader.style.display = '';
    loadUser();
});