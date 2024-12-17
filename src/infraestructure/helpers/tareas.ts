
export class ColaDeTareas< T > {

    private cola !: (()=> T )[];

    constructor(){this.cola = [];}

    public push( tarea : ()=>T ) {
        this.cola.push(tarea);
    }

    public pop (  ) {
        if(this.cola.length > 0){
            return this.cola.shift();
        }
        return undefined;
    }

    public async resolverConDelay( ms : number) : Promise< null > {
  
        if(this.cola.length > 1) return null ;

        const front = this.cola.pop();

        if(!front) return null;

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

    public async resolverSinDelay() : Promise<null> {
        if(this.cola.length < 1) return null ;

        const front = this.cola.pop();
        
        if(!front) return null;

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