import { CheckoutSystem } from "./checkout-system";
import { FriendshipDayDiscount } from "./pricing-rules/friendship-day-discount";
import { IpadClearanceSaleDiscount } from "./pricing-rules/ipad-clearance-sale-discount";
import { PricingRulesManager } from "./pricing-rules/pricing-rules-manager";
import { ProductCatalogue } from "./product-catalogue";
import { currentProductCatalogue, ProductSKU } from "./static/constants";


export class App {

    constructor(
        private pricingRulesManager: PricingRulesManager,
        private productCatalogue: ProductCatalogue,
        private checkoutSystem: CheckoutSystem
    ) {}

    intializePricingRules(): void {
        this.pricingRulesManager.addPricingRule(ProductSKU.ATV, new FriendshipDayDiscount());
        this.pricingRulesManager.addPricingRule(ProductSKU.IPD, new IpadClearanceSaleDiscount());
    }

    intializeProductCatalogue(): void {
        this.productCatalogue.addProduct(ProductSKU.IPD, currentProductCatalogue[ProductSKU.IPD]);
        this.productCatalogue.addProduct(ProductSKU.MBP, currentProductCatalogue[ProductSKU.MBP]);
        this.productCatalogue.addProduct(ProductSKU.ATV, currentProductCatalogue[ProductSKU.ATV]);
        this.productCatalogue.addProduct(ProductSKU.VGA, currentProductCatalogue[ProductSKU.VGA]);
    }

    executeTestCase1(): void {
        // Testcase 1
        this.checkoutSystem.scan(ProductSKU.ATV);
        this.checkoutSystem.scan(ProductSKU.ATV);
        this.checkoutSystem.scan(ProductSKU.ATV);
        this.checkoutSystem.scan(ProductSKU.VGA);
        this.checkoutSystem.total();
        this.checkoutSystem.clearOrder();
    }
    
    executeTestCase2(): void {
        // Testcase 2
        this.checkoutSystem.scan(ProductSKU.ATV);
        this.checkoutSystem.scan(ProductSKU.IPD);
        this.checkoutSystem.scan(ProductSKU.IPD);
        this.checkoutSystem.scan(ProductSKU.ATV);
        this.checkoutSystem.scan(ProductSKU.IPD);
        this.checkoutSystem.scan(ProductSKU.IPD);
        this.checkoutSystem.scan(ProductSKU.IPD);
        this.checkoutSystem.total();
    }

    runCheckout(): void {
        this.intializePricingRules();
        this.intializeProductCatalogue();
        this.executeTestCase1();
        this.executeTestCase2();
    }
}

const pricingRulesManager: PricingRulesManager = new PricingRulesManager();
const productCatalogue: ProductCatalogue = new ProductCatalogue();
const checkoutSystem: CheckoutSystem = new CheckoutSystem(pricingRulesManager, productCatalogue);

const app = new App(pricingRulesManager, productCatalogue, checkoutSystem);
app.runCheckout();
