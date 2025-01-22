interface ProductMetaData {
    name: string;
    price: number;
};

export interface ProductCatalogue {
    [sku: string] : ProductMetaData
};

export enum ProductSKU {
    IPD = "ipd",
    MBP = "mbp",
    ATV = "atv",
    VGA = "vga"
}; 

export const productCatalogue: ProductCatalogue = {
    [ProductSKU.IPD]: {
        name: "Super iPad",
        price: 549.99
    },
    [ProductSKU.MBP]: {
        name: "MacBook Pro",
        price: 1399.99
    },
    [ProductSKU.ATV]: {
        name: "Apple TV",
        price: 109.50
    },
    [ProductSKU.VGA]: {
        name: "VGA adapter",
        price: 30.00
    }
};

export interface CurrentOrder {
    [sku: string]: number;
};

export interface ProductRules {
    [sku: string]: Function
};
