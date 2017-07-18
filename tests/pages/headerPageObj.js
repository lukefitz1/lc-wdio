class Header {
	get header() { return $('#header'); }
	get logo() { return $('#header > div.page-header-container > div.logo-container.table-cell > h1 > a.logo.svgicon.svgicon-logo.x'); }
	get search() { return $('#search'); }
	get miniCartIcon() { return $('#header > div.page-header-container > div.right.table-cell > div > a > span.icon-cart'); }
	get miniCartDropdown() { return $('#header-cart'); }
	get miniCartCheckoutBtn() { return $('#header-cart > div > div > div.minicart-wrapper > div > div.minicart-actions.bottom > div > a.checkout-button'); }
	get modal() { return $('#ltkmodal-container'); }
	get modalCloseBtn() { return $('#close-button'); }
}

module.exports = new Header();