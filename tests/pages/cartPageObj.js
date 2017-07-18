class Cart {
	get checkoutBtn() { return $('#mainContentId > div > div > div > div.page-title.title-buttons > ul > li > button'); }
}

module.exports = new Cart();