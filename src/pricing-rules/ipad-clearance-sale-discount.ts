import { PricingRule, ProductMetaData } from "../interfaces/models";


export class IpadClearanceSaleDiscount implements PricingRule {
    isActive: boolean = false;
    discountPrice: number;
    minPurchaseQuantity: number;
    description: string;
    discountCode: string;

    constructor() {
        this.isActive = true;
        this.discountPrice = 499.99;
        this.minPurchaseQuantity = 4;
        this.discountCode = 'GET499CLRSL2k25';
        this.description = 'Get each Super Ipad for just $499.99 each when purchasing more than 4.';
    }

    changeActivationStatus(activationStatus: boolean): void {
        this.isActive = activationStatus;
    }

    isEligible(productQuantity: number): boolean {
        return productQuantity >= this.minPurchaseQuantity;
    }

    changeDiscount(discountPrice: number, minPurchaseQuantity: number): void {
        this.discountPrice = discountPrice;
        this.minPurchaseQuantity = minPurchaseQuantity;
    }

    applyDiscount(productQuantity: number, _: ProductMetaData): number { 
        return productQuantity * this.discountPrice;
    }
}
