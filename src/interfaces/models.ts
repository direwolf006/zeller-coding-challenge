export interface ProductMetaData {
    name: string;
    price: number;
};

export interface ProductCatalogueBySku {
    [sku: string] : ProductMetaData
};

export interface CurrentOrder {
    [sku: string]: {
        quantity: number,
        mrpPrice?: number,
        discountPrice?: number,
        discountCode?: string;
        discountDescription?: string,
    };
};

export interface PricingRule {
    isActive: boolean;
    description: string;
    discountCode: string;
    changeActivationStatus(activationStatus: boolean): void;
    isEligible(productQuantity: number): boolean;
    applyDiscount(productQuantity: number, productDetails?: ProductMetaData): number;
}

export interface PricingRuleIdMapping {
    [ruleId: string]: PricingRule;
}

export interface ProductRules {
    [sku: string]: PricingRuleIdMapping
};
