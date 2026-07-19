/**
 * Sistema de Navegação
 * @version 1.0.0
 */

(function() {
    'use strict';

    const Navigation = {
        /**
         * Página atual
         */
        currentPage: 'home',

        /**
         * Inicializa o sistema de navegação
         */
        init() {
            console.log('[NAVIGATION] Inicializando...');
            this.setupEventListeners();
            this.handleHashChange();
        },

        /**
         * Configura os listeners de eventos
         */
        setupEventListeners() {
            // Listener para mudanças de hash
            window.addEventListener('hashchange', () => this.handleHashChange());

            // Listeners para todos os links de navegação
            document.querySelectorAll('[data-page]').forEach(element => {
                element.addEventListener('click', (e) => {
                    const page = element.getAttribute('data-page');
                    if (page) {
                        e.preventDefault();
                        this.navigateTo(page);
                    }
                });
            });

            // Botão "Começar Agora" na home
            const startBtn = document.querySelector('button[data-page="dashboard"]');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    this.navigateTo('dashboard');
                });
            }
        },

        /**
         * Navega para uma página
         * @param {string} page - Nome da página
         */
        navigateTo(page) {
            console.log(`[NAVIGATION] Navegando para: ${page}`);
            
            // Verificar se a página existe
            const pageElement = document.getElementById(page);
            if (!pageElement) {
                console.error(`[NAVIGATION] Página não encontrada: ${page}`);
                return;
            }

            // Remover classe 'active' de todas as páginas
            document.querySelectorAll('.page').forEach(p => {
                p.classList.remove('active');
            });

            // Adicionar classe 'active' à página atual
            pageElement.classList.add('active');

            // Atualizar links de navegação
            document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
                if (link.getAttribute('data-page') === page) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Atualizar URL
            window.location.hash = `#${page}`;
            this.currentPage = page;

            // Scroll para o topo
            window.scrollTo(0, 0);
        },

        /**
         * Trata mudanças de hash
         */
        handleHashChange() {
            const hash = window.location.hash.substr(1) || 'home';
            if (hash !== this.currentPage) {
                this.navigateTo(hash);
            }
        }
    };

    // Inicializar quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', () => {
        Navigation.init();
    });

    // Exportar para uso global
    window.Navigation = Navigation;
})();
