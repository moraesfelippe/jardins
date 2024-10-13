$(document).ready(function() {
    // Manipulação do botão mobile
    $('#mobile-btn').on('click', function () {
        $('#mobile-menu').toggleClass('active');
        $('#mobile-btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();
        let activeSectionIndex = 0; // Variável corrigida

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)'); // Parêntese adicionado
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false; // Sai do loop each
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    // ScrollReveal Configurações
    ScrollReveal().reveal('#cta', {
        origin: 'right',
        duration: 3000,
        distance: '60%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '40%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 2000,
        distance: '20%'
    });

    // Manipulação do Modal
    var modal = $('#modalFormulario');
    var abrirBtn = $('#abrirFormulario');
    var abrirBtnMobile = $('#abrirFormularioMobile');
    var fecharBtn = $('.close');

    // Quando o usuário clicar no botão "Peça Aqui" (desktop)
    abrirBtn.on('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
        modal.fadeIn();
    });

    // Quando o usuário clicar no botão "Peça Aqui" (mobile)
    abrirBtnMobile.on('click', function(event) {
        event.preventDefault();
        console.log('Botão mobile clicado'); // Para depuração
        modal.fadeIn();
    });

    // Quando o usuário clicar no <span> (x), fecha o modal
    fecharBtn.on('click', function() {
        modal.fadeOut();
    });

    // Quando o usuário clicar fora do conteúdo do modal, fecha o modal
    $(window).on('click', function(event) {
        if ($(event.target).is(modal)) {
            modal.fadeOut();
        }
    });

    // Manipulação do envio do formulário
    $('#contatoForm').on('submit', function(event) {
        event.preventDefault();
        alert('Formulário enviado com sucesso!');
        modal.fadeOut();
        $(this).trigger('reset');
    });

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('contatoForm');
    
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário
    
            // Captura os dados do formulário
            const formData = new FormData(form);
    
            // Cria um objeto com os dados do formulário
            const dados = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                mensagem: formData.get('mensagem')
            };
    
            try {
                // Envia os dados para o backend usando fetch
                const response = await fetch('/api/formulario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dados),
                });
    
                if (response.ok) {
                    alert('Formulário enviado com sucesso!');
                    form.reset(); // Limpa o formulário após o envio
                } else {
                    alert('Erro ao enviar formulário.');
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Erro ao enviar formulário.');
            }
        });
    });
    
});
