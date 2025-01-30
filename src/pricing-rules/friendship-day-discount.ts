import { PricingRule, ProductMetaData } from "../interfaces/models";


export class FriendshipDayDiscount implements PricingRule {
    isActive: boolean = false;
    minPurchaseQuantity: number;
    discountedQuantity: number;
    description: string;
    discountCode: string;

    constructor() {
        this.isActive = true;
        this.minPurchaseQuantity = 3;
        this.discountedQuantity = 2;
        this.discountCode = 'BUY3FOR2ATVFRD2k25';
        this.description = 'Buy 3 Apple TVs for the price of 2 only';
    }

    changeActivationStatus(activationStatus: boolean): void {
        this.isActive = activationStatus;
    }

    isEligible(productQuantity: number): boolean {
        return productQuantity >= this.minPurchaseQuantity;
    }

    changeDiscount(minPurchaseQuantity: number, discountedQuantity: number): void {
        this.minPurchaseQuantity = minPurchaseQuantity;
        this.discountedQuantity = discountedQuantity;
    }

    applyDiscount(productQuantity: number, productDetails: ProductMetaData): number {
        // possible discount quantities + remaining non-discount quantities
        const discountedQuantity = (Math.floor(this.minPurchaseQuantity / 3) * this.discountedQuantity) +
            (productQuantity % this.minPurchaseQuantity);
        return discountedQuantity * productDetails.price; 
    }
}
