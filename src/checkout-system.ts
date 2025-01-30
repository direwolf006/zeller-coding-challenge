
import { CurrentOrder, PricingRule, PricingRuleIdMapping, ProductMetaData } from './interfaces/models';
import { PricingRulesManager } from './pricing-rules/pricing-rules-manager';
import { ProductCatalogue } from './product-catalogue';
import { errorMessages } from './static/error-messages';


export class CheckoutSystem {

    private currentOrder: CurrentOrder = {};
    private totalAmount: number = 0;
    
    constructor(private pricingRuleManager: PricingRulesManager, private productCatalogue: ProductCatalogue) {}

    scan(productSku: string): void {
        // store the product sku value scanned as current order with it's quantity updated which is later retrieved by sku
        if (!this.productCatalogue.getProductBySku(productSku)) {
            console.error(errorMessages.SCANNING_101)
            return;
        }

        if (Object.keys(this.currentOrder).length === 0) {
            console.log('Scanned SKUs:')
        }

        console.log(productSku);

        this.currentOrder[productSku] = {
            quantity: (this.currentOrder[productSku]?.quantity ?? 0) + 1
        };
    }

    getCurrentOrder(): CurrentOrder {
        return this.currentOrder;
    }

    clearOrder(): void {
        // clear current order and reset total amount
        this.currentOrder = {};
        this.totalAmount = 0;
    }

    private applyEligibleDiscounts(productPricingRules: PricingRuleIdMapping, productSku: string,
        productCatalogue: ProductMetaData): PricingRule | undefined {
        // checks for any active and eligible discount deals available and calculate maximum discount
        //   available for the product
        let maxDiscountPrice = -1;
        let availedDiscount: PricingRule | undefined;

        Object.keys(productPricingRules).forEach((ruleId: string) => {
            const discount = productPricingRules[ruleId];
            if (discount.isActive && discount.isEligible(this.currentOrder[productSku].quantity)) {
                const discountPrice = productPricingRules[ruleId].applyDiscount(
                    this.currentOrder[productSku].quantity,
                    productCatalogue
                );

                if (discountPrice > maxDiscountPrice) {
                    availedDiscount = discount;
                    maxDiscountPrice = discountPrice;
                }
            }
        });

        if (availedDiscount) {
            this.currentOrder[productSku].discountCode = availedDiscount.discountCode; 
            this.currentOrder[productSku].discountPrice = maxDiscountPrice; 
            this.currentOrder[productSku].discountDescription = availedDiscount.description; 
            this.totalAmount += maxDiscountPrice;
        }

        return availedDiscount;
    }

    total(): string {
        // calculates the final total of order with special pricing on products based on the pricing rules if applicable
        Object.keys(this.currentOrder).forEach((productSku: string) => {
            const productCatalogue: ProductMetaData = this.productCatalogue.getProductBySku(productSku);
            const productPricingRules: PricingRuleIdMapping = this.pricingRuleManager.getPricingRule(productSku);
            let availedDiscount: PricingRule | undefined;

            if (productPricingRules) {
                availedDiscount = this.applyEligibleDiscounts(productPricingRules, productSku, productCatalogue);
            }
            
            this.currentOrder[productSku].mrpPrice = this.currentOrder[productSku].quantity * productCatalogue.price;

            // discount not availed so use regular pricing for total
            if (!availedDiscount) {
                this.totalAmount += this.currentOrder[productSku].mrpPrice;
            }
        });

        const parsedTotal = '$' + this.totalAmount.toFixed(2)
        console.log('Current order total: ' + parsedTotal + '\n');
        console.table(this.currentOrder);
        return parsedTotal;
    }
}
