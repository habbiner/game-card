const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100, recuVida: 100, pot: 5 },
            vilao: { vida: 100, recuVida: 100 },
            log_acao: '',
            logs: []
        };
    },
    methods: {
        atacar(isHeroi) {
            if (isHeroi) {
                if (this.vilao.recuVida > 0) {
                    this.vilao.vida -= 10;
                    this.log_acao = "Héroi atacou!";
                    this.logs.push(this.log_acao);
                    setTimeout(this.acaoVilao, 500);
                } else {
                    this.vilao.vida -= 25;
                }
            } else {
                if (this.heroi.recuVida > 0) {
                    this.heroi.vida -= 15;
                    this.logs.push('Vilão atacou');
                } else {
                    this.heroi.vida -= 35;
                    this.logs.push('Vilão atacou!');
                }
            }

            if (this.vilao.vida <= 0 && this.heroi.vida > 0) {
                alert("PARABÉNS, VOCÊ MATOU O VILÃO!");
            } else if (this.heroi.vida <= 0 && this.vilao.vida > 0) {
                alert("GAME OVER, VOCÊ MORREU!");
            } else if (this.heroi.vida <= 0 && this.vilao.vida <= 0) {
                alert("GAME OVER, AMBOS MORRERAM!");
            }
        },

        defender(isHeroi) {
            if (isHeroi) {
                if (this.heroi.recuVida > 0) {
                    this.heroi.recuVida -= 20;
                    setTimeout(this.acaoVilaoSemAtk, 500);
                } else {
                    setTimeout(this.acaoVilao, 500);
                }
            } else {
                this.vilao.recuVida -= 20;
            }
        },

        usarPocao(isHeroi) {
            if (isHeroi) {
                if (this.heroi.pot > 0 && this.heroi.vida < 100 && this.heroi.recuVida < 100) {
                    this.heroi.vida += 5;
                    this.heroi.pot -= 1;
                    this.logs.push('Poção do heroi');
                    setTimeout(this.acaoVilao, 500);
                } else if (this.heroi.pot > 0 && this.heroi.vida < 100 && this.heroi.recuVida === 100) {
                    this.heroi.vida += 5;
                    this.heroi.pot -= 1;
                    this.logs.push('Poção do heroi');
                    setTimeout(this.acaoVilao, 500);
                } else if (this.heroi.pot > 0 && this.heroi.vida === 100 && this.heroi.recuVida < 100) {
                    this.heroi.recuVida += 5;
                    this.heroi.pot -= 1;
                    this.logs.push('Poção do heroi');
                    setTimeout(this.acaoVilao, 500);
                } else {
                    setTimeout(this.acaoVilao, 500);
                }
            } else {
                if (this.vilao.vida < 100 && this.vilao.recuVida < 100) {
                    this.vilao.vida += 5;
                    this.vilao.recuVida += 5;
                    this.logs.push('Poção do vilão');
                } else if (this.vilao.vida < 100 && this.vilao.recuVida === 100) {
                    this.vilao.vida += 10;
                    this.logs.push('Poção do vilão');
                } else if (this.vilao.vida === 100 && this.vilao.recuVida < 100) {
                    this.vilao.recuVida += 5;
                    this.logs.push('Poção do vilão');
                }
            }
        },

        correr(isHeroi) {
            if (isHeroi) {
                this.logs.push('Você Correu!');
                alert("Você Correu!");
            } else {
                this.logs.push('O vilão correu');
                alert("O vilão correu");
            }
        },

        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        },

        acaoVilaoSemAtk() {
            const acoes = ['defender', 'usarPocao'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        },

        barraVidaColor(vida) {
            if (vida >= 70) {
                return 'green';
            } else if (vida >= 30 && vida < 70) {
                return 'yellow';
            } else {
                return 'red';
            }
        },

    }
}).mount("#app");
