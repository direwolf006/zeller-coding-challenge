import { ProductRules } from "./models";


export class PricingRules {
    // helper class that holds the product pricing rules and being managed here
    private productRules: ProductRules = {};

    private modifyPricingRule(productSku: string, pricingRule: Function): void {
        // generic function for both add and update rule based on sku
        this.productRules[productSku] = pricingRule;
    }

    getPricingRule(productSku: string): Function | undefined {
        return this.productRules[productSku];
    }
    
    addPricingRule(productSku: string, pricingRule: Function): void {
        this.modifyPricingRule(productSku, pricingRule);
    }

    updatePricingRule(productSku: string, pricingRule: Function): void {
        this.modifyPricingRule(productSku, pricingRule);
    }
    
    deletePricingRule(productSku: string): void {
        delete this.productRules[productSku];
    }   
}
