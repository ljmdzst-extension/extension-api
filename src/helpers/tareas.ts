
export class ColaDeTareas {

    private cola !: (Function)[];

    constructor(){this.cola = [];}

    public push( tarea : Function ) {
        this.cola.push(tarea);
    }

    public pop (  ) {
        if(this.cola.length > 0){
            return this.cola.shift();
        }
        return undefined;
    }

    public async resolverConDelay( ms : number) : Promise<any> {
        if(this.cola.length < 1) return;

        const front = this.cola.pop();

        if(front){
            await new Promise(
                (resolve,reject) => {
                    try {
                        setTimeout(()=>resolve(front()),ms)
                    
                    } catch (error : any) {
                        reject(console.log(error))
                    }
                    
                }  );
        
            return this.resolverConDelay(ms);
        }
    } 

    public async resolverSinDelay() : Promise<any> {
        if(this.cola.length < 1) return;

        const front = this.cola.pop();

        if(front){
            await new Promise(
                (resolve,reject) => {
                    try {
                        resolve(front())
                    
                    } catch (error : any) {
                        reject(console.log(error))
                    }
                    
                }  );
        
            return this.resolverSinDelay();
        }
    } 



}