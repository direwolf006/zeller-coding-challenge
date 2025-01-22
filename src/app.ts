import { CheckoutSystem } from "./checkoutSystem";
import { productCatalogue, ProductSKU } from "./models";
import { PricingRules } from "./pricingRules";


// added special deal rules which are available at present
const atvPricingRule = (productCount: number): number => {
    const offerCountFormula = ((productCount - (productCount % 3)) - (Math.floor(productCount / 3)) + (productCount % 3));
    const atvCount = productCount >= 3 ? offerCountFormula : productCount;
    return atvCount * productCatalogue[ProductSKU.ATV].price;
};

const ipdPricingRule = (productCount: number): number => {
    const ipdPrice = productCount > 4 ? 499.99 : productCatalogue[ProductSKU.IPD].price;
    return productCount * ipdPrice;
};

const productPricingRules = new PricingRules();
productPricingRules.addPricingRule(ProductSKU.ATV, atvPricingRule);
productPricingRules.addPricingRule(ProductSKU.IPD, ipdPricingRule);


const checkoutSystem = new CheckoutSystem(productPricingRules);

// Testcase 1
checkoutSystem.scan(ProductSKU.ATV);
checkoutSystem.scan(ProductSKU.ATV);
checkoutSystem.scan(ProductSKU.ATV);
checkoutSystem.scan(ProductSKU.VGA);
checkoutSystem.total();
checkoutSystem.clearOrder();

// Testcase 2
checkoutSystem.scan(ProductSKU.ATV);
checkoutSystem.scan(ProductSKU.IPD);
checkoutSystem.scan(ProductSKU.IPD);
checkoutSystem.scan(ProductSKU.ATV);
checkoutSystem.scan(ProductSKU.IPD);
checkoutSystem.scan(ProductSKU.IPD);
checkoutSystem.scan(ProductSKU.IPD);
checkoutSystem.total();
