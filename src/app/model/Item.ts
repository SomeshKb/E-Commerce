
enum size {
    S,
    M,
    L,
    XL,
    XXL
}

export class Item {
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
    size: size;
}

export class Order {
    userName: string;
    date: string;
    quantity: number;
    userID: string;
    totalCost: number;
}


