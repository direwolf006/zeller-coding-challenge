import { PricingRuleIdMapping } from "../src/interfaces/models";
import { FriendshipDayDiscount } from "../src/pricing-rules/friendship-day-discount";
import { PricingRulesManager } from "../src/pricing-rules/pricing-rules-manager";
import { ProductSKU } from "../src/static/constants";


describe('testing Pricing Rules class', () => {
  const pricingRules = new PricingRulesManager();
  test('Unknown pricing rule should be undefined', () => {
    const unknownPricingRule = pricingRules.getPricingRule(ProductSKU.ATV);
    expect((unknownPricingRule)).toBe(undefined);
    
  });

  test('Added pricing rule fetched', () => {
    pricingRules.addPricingRule(ProductSKU.ATV, new FriendshipDayDiscount());
    
    const addedAtvPricingRule: PricingRuleIdMapping = pricingRules.getPricingRule(ProductSKU.ATV);
    expect((addedAtvPricingRule)).toBeDefined();
  });
  
  test('Deleted pricing rule fetched as undefined', () => {
    pricingRules.deletePricingRule(ProductSKU.ATV)
    const deletedAtvPricingRule = pricingRules.getPricingRule(ProductSKU.ATV);
    expect((deletedAtvPricingRule)).toBeUndefined();
  });
});
