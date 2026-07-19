/**
 * Módulo de Componentes UI
 * @version 1.0.0
 */

(function() {
    'use strict';

    const UI = {
        /**
         * Criar um card
         */
        createCard(title, content, options = {}) {
            const card = document.createElement('div');
            card.className = 'card';
            if (options.className) card.classList.add(options.className);

            let html = `
                <div class="card-header">
                    <h3 class="card-title">${title}</h3>
                    ${options.subtitle ? `<p class="card-subtitle">${options.subtitle}</p>` : ''}
                </div>
                <div class="card-body">${content}</div>
            `;

            if (options.footer) {
                html += `<div class="card-footer">${options.footer}</div>`;
            }

            card.innerHTML = html;
            return card;
        },

        /**
         * Criar um badge
         */
        createBadge(text, type = 'default') {
            const badge = document.createElement('span');
            badge.className = `badge badge-${type}`;
            badge.textContent = text;
            return badge;
        },

        /**
         * Criar um alert
         */
        createAlert(title, message, type = 'info', icon = '📢') {
            const alert = document.createElement('div');
            alert.className = `alert alert-${type}`;
            alert.innerHTML = `
                <span class="alert-icon">${icon}</span>
                <div class="alert-content">
                    <h4>${title}</h4>
                    <p>${message}</p>
                </div>
            `;
            return alert;
        },

        /**
         * Mostrar toast (notificação)
         */
        showToast(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--color-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'});
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: var(--shadow-lg);
                z-index: 9999;
                animation: slideInRight 300ms ease-out;
            `;

            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'slideOutRight 300ms ease-out';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        },

        /**
         * Criar progress bar
         */
        createProgressBar(percentage, label = '') {
            const container = document.createElement('div');
            container.className = 'progress-container';
            container.innerHTML = `
                ${label ? `<div class="progress-label"><span>${label}</span><span>${percentage}%</span></div>` : ''}
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            `;
            return container;
        },

        /**
         * Criar spinner
         */
        createSpinner(size = 'normal') {
            const spinner = document.createElement('div');
            spinner.className = `spinner ${size === 'large' ? 'spinner-large' : ''}`;
            return spinner;
        },

        /**
         * Empty state
         */
        createEmptyState(icon, title, description, action = null) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.innerHTML = `
                <div class="empty-state-icon">${icon}</div>
                <h3 class="empty-state-title">${title}</h3>
                <p class="empty-state-description">${description}</p>
                ${action ? `<div class="empty-state-action">${action}</div>` : ''}
            `;
            return empty;
        }
    };

    window.UIBuilder = UI;
})();
