export class Product{
 
    constructor(public _id:string,public name:string,
        public price:number,public description:string,public url:string){
        
    }
}
export class ProductU{
 
    constructor(public name:string,
        public price:number,public description:string,public image:File){
        
    }
}