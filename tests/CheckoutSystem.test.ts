import { CheckoutSystem } from "../src/checkoutSystem";
import { productCatalogue, ProductSKU } from "../src/models";
import { PricingRules } from "../src/pricingRules";

describe('testing Checkout System class', () => {
  const pricingRules = new PricingRules();

  const atvPricingRule = (productCount: number) => { return productCount * 5.00 };
  const ipdPricingRule = (productCount: number) => { return productCount * 10.00 };
  pricingRules.addPricingRule('atv', atvPricingRule);
  pricingRules.addPricingRule('ipd', ipdPricingRule);

  const checkoutSystem = new CheckoutSystem(pricingRules);

  test('Checkout system scan and total calculation based on pricing rules', () => {
    checkoutSystem.scan('atv');
    checkoutSystem.scan('atv');
    checkoutSystem.scan('atv');
    checkoutSystem.scan('ipd');
    checkoutSystem.scan('ipd');

    const totalAmount = checkoutSystem.total();
    expect((totalAmount)).toBe('$35.00');
    
  });

  test('Clear order test', () => {
    checkoutSystem.clearOrder();
    const totalAmount = checkoutSystem.total();
    expect((totalAmount)).toBe('$0.00');
  });
});
