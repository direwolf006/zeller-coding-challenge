import { ProductMetaData } from "../src/interfaces/models";
import { ProductCatalogue } from "../src/product-catalogue";
import { currentProductCatalogue, ProductSKU } from "../src/static/constants";


describe('Testing Product Catalogue class', () => {
  const productCatalogue = new ProductCatalogue();
  test('Unknown sku fetching should return undefined', () => {
    const unknownProductSku = productCatalogue.getProductBySku(ProductSKU.ATV);
    expect((unknownProductSku)).toBe(undefined);
  });

  test('Added product fetched', () => {
    productCatalogue.addProduct(ProductSKU.ATV, currentProductCatalogue[ProductSKU.ATV]);
    const addedAtvProduct: ProductMetaData = productCatalogue.getProductBySku(ProductSKU.ATV);

    expect((addedAtvProduct)).toBeTruthy();
  });
  
  test('Deleted product fetched as undefined', () => {
    productCatalogue.deleteProduct(ProductSKU.ATV)
    const deletedAtvProduct = productCatalogue.getProductBySku(ProductSKU.ATV);
    expect((deletedAtvProduct)).toBeUndefined();
  });
});
