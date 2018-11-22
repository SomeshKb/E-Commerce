export class Product {
    _id: string;
    name: string;
    sellerID: string;
    sellerName: string;
    quantity: number;
    cost: number;
    description: string;
    gender: string;
    sleeveLength: string;
    color: string;
    neck: string;
    size: string;

    toString():string{
        return"{_id:"+this._id,
        "name:"+this.name,
        "sellerID:"+this.sellerID,
        "sellerName:"+this.sellerName,
        "quantity:"+this.quantity,
        "cost:"+this.cost,
        "description:"+this.description,
        "gender:"+this.gender,
        "sleeveLength:"+this.sleeveLength,
        "color:"+this.color,
        "neck:"+this.neck,
        "size:"+this.size +"}"
}


find(product:Product[],id:string){
    product.map(x=>{
        if(x._id==id){
            return x;
        }
    })
    return -1;
}
    
}

export class Order {
    _id: string;
    products: orderProduct[];
    buyerID: string;
    date: string;
    totalCost:number;
    status:string;
}

export class CartProduct {
    productID:string;
}

export class orderProduct{
    productID:string;
    quantity:number;
    cost:number;
}

export class queryProduct{
    sellerName: string;
    quantity: number;
    cost: number;
    description: string;
    gender: string;
    sleeveLength: string;
    color: string;
    neck: string;
    size: string;
}

