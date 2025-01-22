
import { CurrentOrder, productCatalogue } from './models';
import { PricingRules } from './pricingRules';


export class CheckoutSystem {

    private productPricingRules: PricingRules;
    private currentOrder: CurrentOrder = {};
    private totalAmount: number = 0;
    
    constructor(productPricingRules: PricingRules) {
        this.productPricingRules = productPricingRules;
    }

    scan(productSku: string): void {
        // store the product sku value scanned which is later retrieved as keys and it's count as values
        if (Object.keys(this.currentOrder).length === 0) {
            console.log('Scanned SKUs:')
        }

        console.log(productSku);
        this.currentOrder[productSku] = (this.currentOrder[productSku] ?? 0) + 1;
    }

    private calculateSpecialDeals(): void {
        // calculate special pricing on products based on the pricing rules 
        Object.keys(this.currentOrder).forEach((productSku: string) => {
            const productPricingRule: Function | undefined = this.productPricingRules.getPricingRule(productSku);

            if (productPricingRule) {
                // any special deals available
                this.totalAmount += productPricingRule(this.currentOrder[productSku]); 
            } else {
                // regular pricing
                this.totalAmount += this.currentOrder[productSku] * productCatalogue[productSku].price;
            }
        });
    }

    clearOrder(): void {
        this.currentOrder = {};
        this.totalAmount = 0;
    }

    total(): string {
        // calculates the final total of order
        this.calculateSpecialDeals();
        const parsedTotal = '$' + this.totalAmount.toFixed(2)
        console.log('Current order total: ' + parsedTotal + '\n');
        return parsedTotal;
    }
}
