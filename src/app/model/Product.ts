export class Product {
    _id: string;
    name: string;
    sellerID: string;
    sellerName: string;
    quantity: number;
    cost: number;
    description: string;
    genderSpecific: string;
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
        "genderSpecific:"+this.genderSpecific,
        "sleeveLength:"+this.sleeveLength,
        "color:"+this.color,
        "neck:"+this.neck,
        "size:"+this.size +"}"
}
    
}

export class Order {
    _id: string;
    products: orderProduct[];
    buyerID: string;
    date: string;
    totalCost:number;
    isCancelled:boolean;
}

export class orderProduct{
    productID:string;
    quantity:number;
    cost:number;
}

export class CartProduct {
    buyerID: string;
    productID: string;
    quantity: number;
    date: string;

}