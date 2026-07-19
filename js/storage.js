/**
 * Gerenciador de Storage
 * LocalStorage com Fallback
 * @version 1.0.0
 */

(function() {
    'use strict';

    const Storage = {
        /**
         * Verificar disponibilidade de localStorage
         */
        isAvailable() {
            try {
                const test = '__test__';
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        },

        /**
         * Obter dado do storage
         * @param {string} key
         * @param {*} defaultValue
         * @returns {*}
         */
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                if (item === null) return defaultValue;
                return JSON.parse(item);
            } catch (e) {
                console.error(`[STORAGE] Erro ao obter ${key}:`, e);
                return defaultValue;
            }
        },

        /**
         * Salvar dado no storage
         * @param {string} key
         * @param {*} value
         * @returns {boolean}
         */
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error(`[STORAGE] Erro ao salvar ${key}:`, e);
                return false;
            }
        },

        /**
         * Remover dado do storage
         * @param {string} key
         * @returns {boolean}
         */
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error(`[STORAGE] Erro ao remover ${key}:`, e);
                return false;
            }
        },

        /**
         * Limpar todo o storage
         * @returns {boolean}
         */
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('[STORAGE] Erro ao limpar storage:', e);
                return false;
            }
        },

        /**
         * Obter tamanho do storage
         * @returns {number}
         */
        getSize() {
            let size = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    size += localStorage[key].length + key.length;
                }
            }
            return Math.round(size / 1024);
        },

        /**
         * Listar todas as chaves
         * @returns {array}
         */
        keys() {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                keys.push(localStorage.key(i));
            }
            return keys;
        }
    };

    window.StorageManager = Storage;
})();
