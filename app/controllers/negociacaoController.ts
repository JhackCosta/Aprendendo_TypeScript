import { DiasDaSemana } from "../enums/diasDaSemana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemViuew } from "../views/mensagemView.js";
import { NegociacoesView } from "../views/negociacoesView.js";

export class NegociacaoController{
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView("#negociacoesView");
    private mensagemView = new MensagemViuew("#mensagemView");

    
    constructor(){
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
        this.negociacoesView.update(this.negociacoes);  
    }

    public adiciona(): void{
        const negociacao = this.criaNegociacao();
        //Verifia se o dia da semana está entres dias úteis
        if(!this.ehDiaUtil(negociacao.data)){
            this.mensagemView.update("Só pode gerar uma negociação nos dias úteis da semana.");
            return;
        } 
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
        
        
    }

    private ehDiaUtil(data : Date): boolean{
       
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADADO ;
    }

    private criaNegociacao(): Negociacao{
        const exp =/-/g;
        const date = new Date(this.inputData.value.replace(exp,","));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);

        return new Negociacao(date, quantidade, valor);
    }

    private limparFormulario(): void{
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }

    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada!");
    }
}