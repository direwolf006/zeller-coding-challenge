import { App } from "../src/app";
import { CheckoutSystem } from "../src/checkout-system";
import { PricingRulesManager } from "../src/pricing-rules/pricing-rules-manager";
import { ProductCatalogue } from "../src/product-catalogue";
import { ProductSKU } from "../src/static/constants";


describe('Testing CheckoutSystem', () => {
  let checkoutSystem: CheckoutSystem;
  let pricingRuleManager: PricingRulesManager;
  let productCatalogue: ProductCatalogue;
  let app: App;

  beforeEach(() => {
    pricingRuleManager = new PricingRulesManager();
    productCatalogue = new ProductCatalogue();
    checkoutSystem = new CheckoutSystem(pricingRuleManager, productCatalogue);
    app = new App(pricingRuleManager, productCatalogue, checkoutSystem);
    app.intializeProductCatalogue();
    app.intializePricingRules();
  });

  describe('scan()', () => {
    it('should add a product to the current order', () => {
      
      checkoutSystem.scan(ProductSKU.ATV);
      const currentOrder = checkoutSystem.getCurrentOrder();

      expect(currentOrder[ProductSKU.ATV]).toBeDefined();
      expect(currentOrder[ProductSKU.ATV].quantity).toBe(1);
    });

    it('should handle invalid product SKU', () => {
      const invalidSku = 'INVALID_SKU';
      checkoutSystem.scan(invalidSku);
      const currentOrder = checkoutSystem.getCurrentOrder();

      expect(currentOrder[invalidSku]).toBeUndefined();
    });
  });

  describe('total()', () => {
    it('should calculate total without discounts', () => {
      checkoutSystem.scan(ProductSKU.ATV);
      checkoutSystem.scan(ProductSKU.ATV);
      const total = checkoutSystem.total();

      expect(total).toBe('$219.00');
    });

    it('should calculate total with applied discounts', () => {
      checkoutSystem.scan(ProductSKU.ATV);
      checkoutSystem.scan(ProductSKU.ATV);
      checkoutSystem.scan(ProductSKU.ATV);
      checkoutSystem.scan(ProductSKU.VGA);

      const total = checkoutSystem.total();
      const currentOrder = checkoutSystem.getCurrentOrder();

      expect(total).toBe('$249.00');
      expect(currentOrder[ProductSKU.ATV].mrpPrice).toBe(328.5);
      expect(currentOrder[ProductSKU.ATV].discountPrice).toBe(219);
      expect(currentOrder[ProductSKU.ATV].discountCode).toBe('BUY3FOR2ATVFRD2k25');
    });
  });

  describe('clearOrder()', () => {
    it('should clear the current order and reset total', () => {
      checkoutSystem.scan(ProductSKU.ATV);
      checkoutSystem.clearOrder();
      const currentOrder = checkoutSystem.getCurrentOrder();
      const total = checkoutSystem.total();

      expect(currentOrder).toEqual({});
      expect(total).toBe('$0.00');
    });
  });
});
