class ProductPage {
	get addToCart() { return $('#product_addtocart_form > div.product-options-bottom > div > div.add-to-cart-buttons > button'); }
}

module.exports = new ProductPage();