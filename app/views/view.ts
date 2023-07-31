export abstract class View<T>{
    protected elemento: HTMLElement;
    private escapar: boolean = false;

    constructor(selector: string, escapar?: boolean){
        this.elemento = document.querySelector(selector);

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