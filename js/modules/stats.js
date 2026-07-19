/**
 * Módulo de Estatísticas
 * @version 1.0.0
 */

(function() {
    'use strict';

    const Stats = {
        /**
         * Obter todas as estatísticas do usuário
         */
        getStats() {
            return window.StorageManager.get('userStats', {
                questionsAnswered: 0,
                correctAnswers: 0,
                accuracy: 0,
                studyTime: 0,
                streak: 0,
                lastStudyDate: null,
                subjectProgress: {}
            });
        },

        /**
         * Calcular taxa de acerto
         */
        calculateAccuracy(correct, total) {
            if (total === 0) return 0;
            return Math.round((correct / total) * 100);
        },

        /**
         * Adicionar questão respondida
         */
        addQuestion(correct) {
            const stats = this.getStats();
            stats.questionsAnswered++;
            if (correct) stats.correctAnswers++;
            stats.accuracy = this.calculateAccuracy(
                stats.correctAnswers,
                stats.questionsAnswered
            );
            window.StorageManager.set('userStats', stats);
            return stats;
        },

        /**
         * Adicionar tempo de estudo
         */
        addStudyTime(minutes) {
            const stats = this.getStats();
            stats.studyTime += minutes;
            stats.lastStudyDate = new Date().toISOString();
            window.StorageManager.set('userStats', stats);
            return stats;
        },

        /**
         * Atualizar streak
         */
        updateStreak() {
            const stats = this.getStats();
            const today = new Date().toDateString();
            const lastDate = stats.lastStudyDate ? new Date(stats.lastStudyDate).toDateString() : null;

            if (lastDate === today) {
                // Mesmo dia, sem mudanças
                return stats;
            }

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastDate === yesterday.toDateString()) {
                // Dia anterior, aumentar streak
                stats.streak++;
            } else {
                // Quebrou a sequência
                stats.streak = 1;
            }

            stats.lastStudyDate = new Date().toISOString();
            window.StorageManager.set('userStats', stats);
            return stats;
        }
    };

    window.Stats = Stats;
})();
