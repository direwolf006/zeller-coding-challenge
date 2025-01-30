import { generateUUID } from "../helper/uuid-gen";
import { PricingRule, PricingRuleIdMapping, ProductRules } from "../interfaces/models";
import { errorMessages } from "../static/error-messages";


export class PricingRulesManager {
    private productRules: ProductRules = {};

    getPricingRule(productSku: string): PricingRuleIdMapping {
        return this.productRules[productSku];
    }

    private modifyRule(productSku: string, pricingRule: PricingRule, ruleId?: string): void {
        const PricingRuleId: string = ruleId ?? generateUUID();

        if (this.productRules[productSku]) {
            this.productRules[productSku][PricingRuleId] = pricingRule;
        } else {
            this.productRules[productSku] = { [PricingRuleId]: pricingRule }
        }
    }
    
    addPricingRule(productSku: string, pricingRule: PricingRule): void {
        this.modifyRule(productSku, pricingRule)
    }

    updatePricingRule(productSku: string, pricingRule: PricingRule, ruleId: string): void {
        this.modifyRule(productSku, pricingRule, ruleId)
    }

    updateRuleActivation(productSku: string, ruleId: string, activationStatus: boolean): void {
        const productPricingRules: PricingRuleIdMapping = this.productRules[productSku];
        if (productPricingRules) {
            const pricingRule = productPricingRules[ruleId];
            if (pricingRule) {
                pricingRule.changeActivationStatus(activationStatus);
            } else {
                console.error(errorMessages.DEACTIVATION_101)
            }
        } else {
            console.error(errorMessages.DEACTIVATION_102)
        }
    }
    
    deletePricingRule(productSku: string): void {
        if (!this.productRules[productSku]) {
            console.log(errorMessages.DELETE_RULE_101);
            return;
        }

        delete this.productRules[productSku];
    }
}
