export abstract class View<T>{
    protected elemento: HTMLElement;
    private escapar: boolean = false;

    constructor(selector: string, escapar?: boolean){


        const elemento = document.querySelector(selector);

        if(elemento){
            this.elemento = elemento as HTMLElement;
        }else{
            throw Error("Verifique se o seletor existe.");
        }
        if(escapar){
            this.escapar = escapar;
        }
    }

    protected abstract template(model : T):string

    public update(model : T){
        let template: string = this.template(model);
        if(this.escapar){
            template = template.replace(/<script>[\s\S]*?<\/script>/, "");
        }
        this.elemento.innerHTML = template;
    }
}