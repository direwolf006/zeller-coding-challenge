import { productCatalogue, ProductSKU } from "../src/models";
import { PricingRules } from "../src/pricingRules";

describe('testing Pricing Rules class', () => {
  const pricingRules = new PricingRules();
  test('Unknown pricing rule should be undefined', () => {
    const unknownPricingRule = pricingRules.getPricingRule('atv');
    expect((unknownPricingRule)).toBe(undefined);
    
  });

  test('Added pricing rule fetched', () => {
    const atvPricingRule = (productCount: number) => { return productCount * productCatalogue[ProductSKU.ATV].price }
    pricingRules.addPricingRule('atv', atvPricingRule)
    const addedAtvPricingRule = pricingRules.getPricingRule('atv');
    expect((addedAtvPricingRule)).toBe(atvPricingRule);
  });
  
  test('Deleted pricing rule fetched as undefined', () => {
    pricingRules.deletePricingRule('atv')
    const deletedAtvPricingRule = pricingRules.getPricingRule('atv');
    expect((deletedAtvPricingRule)).toBe(undefined);
  });
});
