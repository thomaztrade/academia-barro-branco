/**
 * Academia Barro Branco - Aplicação Principal
 * @version 1.0.0
 */

(function() {
    'use strict';

    const App = {
        /**
         * Inicializa a aplicação
         */
        init() {
            console.log('[APP] Inicializando...');
            this.setupTheme();
            this.setupEventListeners();
            this.loadUserData();
            console.log('[APP] Inicialização completa');
        },

        /**
         * Configura o sistema de temas (claro/escuro)
         */
        setupTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            const theme = savedTheme || (prefersDark ? 'dark' : 'light');
            this.setTheme(theme);

            // Listener para mudanças de tema do sistema
            window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        },

        /**
         * Define o tema
         * @param {string} theme - 'light' ou 'dark'
         */
        setTheme(theme) {
            const isDark = theme === 'dark';
            document.body.classList.toggle('dark-mode', isDark);
            localStorage.setItem('theme', theme);
            console.log(`[APP] Tema alterado para: ${theme}`);
        },

        /**
         * Configura listeners de eventos
         */
        setupEventListeners() {
            // Toggle de tema
            document.getElementById('themeToggle').addEventListener('click', () => {
                const currentTheme = localStorage.getItem('theme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            });

            // Toggle do menu móvel
            document.getElementById('menuToggle').addEventListener('click', () => {
                document.getElementById('mobileMenu').classList.toggle('active');
            });

            // Fechar menu ao clicar em um link
            document.querySelectorAll('.nav-mobile-link').forEach(link => {
                link.addEventListener('click', () => {
                    document.getElementById('mobileMenu').classList.remove('active');
                });
            });
        },

        /**
         * Carrega dados do usuário do localStorage
         */
        loadUserData() {
            const userData = localStorage.getItem('userData');
            if (!userData) {
                this.initializeUserData();
            }
        },

        /**
         * Inicializa dados do usuário
         */
        initializeUserData() {
            const defaultData = {
                id: this.generateId(),
                createdAt: new Date().toISOString(),
                progress: 0,
                streak: 0,
                lastAccess: new Date().toISOString()
            };
            localStorage.setItem('userData', JSON.stringify(defaultData));
            console.log('[APP] Dados do usuário inicializados');
        },

        /**
         * Gera um ID único
         * @returns {string}
         */
        generateId() {
            return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
    };

    // Inicializar quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });

    // Exportar App para uso global
    window.App = App;
})();
