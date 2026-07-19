/**
 * Contagem Regressiva para a Prova
 * @version 1.0.0
 */

(function() {
    'use strict';

    const Countdown = {
        /**
         * Data da prova: 16 de agosto
         */
        targetDate: null,

        /**
         * Inicializa o countdown
         */
        init() {
            // Define a data alvo (16 de agosto do ano atual)
            const now = new Date();
            let year = now.getFullYear();
            this.targetDate = new Date(year, 7, 16, 0, 0, 0);

            // Se a data já passou, define para o próximo ano
            if (now > this.targetDate) {
                this.targetDate = new Date(year + 1, 7, 16, 0, 0, 0);
            }

            console.log(`[COUNTDOWN] Data alvo: ${this.targetDate.toLocaleString('pt-BR')}`);
            
            // Atualizar imediatamente
            this.update();
            
            // Atualizar a cada segundo
            setInterval(() => this.update(), 1000);
        },

        /**
         * Atualiza o countdown
         */
        update() {
            const now = new Date();
            const diff = this.targetDate - now;

            if (diff <= 0) {
                this.showFinished();
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            this.updateDisplay(days, hours, minutes, seconds);
        },

        /**
         * Atualiza a exibição do countdown
         */
        updateDisplay(days, hours, minutes, seconds) {
            const pad = (n) => String(n).padStart(2, '0');
            
            const dayElement = document.getElementById('countdown-days');
            const hourElement = document.getElementById('countdown-hours');
            const minuteElement = document.getElementById('countdown-minutes');
            const secondElement = document.getElementById('countdown-seconds');

            if (dayElement) dayElement.textContent = pad(days);
            if (hourElement) hourElement.textContent = pad(hours);
            if (minuteElement) minuteElement.textContent = pad(minutes);
            if (secondElement) secondElement.textContent = pad(seconds);
        },

        /**
         * Exibe mensagem quando a prova chegar
         */
        showFinished() {
            console.log('[COUNTDOWN] A prova chegou!');
            const container = document.querySelector('.countdown-container');
            if (container) {
                container.textContent = '🎯 Dia da Prova! Boa Sorte!';
            }
        }
    };

    // Inicializar quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', () => {
        Countdown.init();
    });

    // Exportar para uso global
    window.Countdown = Countdown;
})();
