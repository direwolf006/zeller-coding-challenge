import { ProductCatalogueBySku, ProductMetaData } from "./interfaces/models";

export class ProductCatalogue {
    private productCatalogue: ProductCatalogueBySku = {};

    private modifyProduct(productSku: string, productDetails: ProductMetaData): void {
        this.productCatalogue[productSku] = productDetails;
    }
    
    addProduct(productSku: string, productDetails: ProductMetaData): void {
        this.modifyProduct(productSku, productDetails);
    }

    updateProduct(productSku: string, productDetails: ProductMetaData): void {
        this.modifyProduct(productSku, productDetails);
    }
    
    getProductBySku(productSku: string): ProductMetaData {
        return this.productCatalogue[productSku];
    }
    
    deleteProduct(productSku: string): void {
        delete this.productCatalogue[productSku];
    }
}
