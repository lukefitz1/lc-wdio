/*
	NOT DONE
*/

class Checkout {
	get checkoutTypeForm() { return $('#login-form'); }
	get checkoutAsGuestBtn() { return $('#onepage-guest-register-button'); }

	get registerBtn() { return $('#checkout-step-login > div > div.col-1 > ul > li:nth-child(3) > label'); }
	get loginForm() { return $('#login-form'); }
	get email() { return $('#login-email'); }
	get pw() { return $('#login-password'); }
	get loginButton() { return $('#checkout-step-login > div > div.col-2 > div > button'); }
	get billingAddressForm() { return $('#co-billing-form'); }
	get billingFName() { return $('//*[@id="billing:firstname"]'); }
	get billingLName() { return $('//*[@id="billing:lastname"]'); }
	get billingEmail() { return $('//*[@id="billing:email"]'); }
	get billingAddress() { return $('//*[@id="billing:street1"]'); }
	get billingCity() { return $('//*[@id="billing:city"]'); }
	get billingState() { return $('//*[@id="billing:region_id"]'); }
	get billingZip() { return $('//*[@id="billing:postcode"]'); }
	get billingTelephone() { return $('//*[@id="billing:telephone"]'); }
	get billingPw() { return $('//*[@id="billing:customer_password"]'); }
	get billingConfirmPw() { return $('//*[@id="billing:confirm_password"]'); }
	get billingContinueBtn() { return $('#billing-buttons-container > button'); }
	get shipToThisAddresslabel() { return $('#co-billing-form > div > ul > li:nth-child(2) > label'); }
	get shippingAddressForm() { return $('#co-shipping-form'); }
	get shippingMethodForm() { return $('#co-shipping-method-form'); }
	get groundShippingLabel() { return $('label*=UPS Standard'); }
	get groundShippingRadioBtn() {return $('#s_method_premiumrate_UPS_Standard'); }
	get shippingMethodContinueBtn() { return $('#shipping-method-buttons-container > button'); }
	get paymentMethodForm() { return $('#co-payment-form'); }
	get bankTransferLabel() { return $('#dt_method_banktransfer > label'); }
	get bankTransferRadioBtn() { return $(''); }
	get paymentMethodContinueBtn() { return $('#payment-buttons-container > button'); }
	get paymentMethodProgressButton() { return $('#checkout-progress-container > div.fourth.prog-step > button.btn-cart'); }
	get ccLabel() { return $('#checkout-payment-method-load > dt:nth-child(1) > label'); }
	get ccType() { return $('#radial_creditcard_cc_type'); }
	get ccNum() { return $('#radial_creditcard_cc_number'); }
	get ccExpMon() { return $('#radial_creditcard_expiration'); }
	get ccExpYr() { return $('#radial_creditcard_expiration_yr'); }
	get ccVerifyNum() { return $('#radial_creditcard_cc_cid'); }
	get orderReview() { return $('#checkout-step-review'); }
	get termsLabel() { return $('#checkout-agreements > ol > li > p > label'); }
	get placeOrderButton() { return $('#review-buttons-container > button'); }

	//order success page elements
	get orderSuccessPageHeading() { return $('h1*=Your order has been received.'); }
	get orderNumText() { return $('p*=Your order # is:'); }

	//logged in customer 
	submitBillingForm(fn, ln, em, add, city, st, zip, phone, type, pw) {
		this.billingFName.setValue(fn);
		this.billingLName.setValue(ln);
		this.billingEmail.setValue(em);
		this.billingAddress.setValue(add);
		this.billingCity.setValue(city);
		this.billingState.selectByVisibleText(st);
		this.billingZip.setValue(zip);
		this.billingTelephone.setValue(phone);

		if (type && pw) {
			this.billingPw.setValue(pw);
			this.billingConfirmPw.setValue(pw);
		}

		this.billingAddressForm.submitForm();
	}

	submitShippingMethodForm() {
		this.shippingMethodForm.submitForm();
	}

	submitPaymentMethodForm() {
		this.paymentMethodForm.submitForm();
	}

	fillCCForm(type, num, expmon, expyr, ccv) {
		this.ccType.selectByVisibleText(type);
		this.ccNum.setValue(num);
		this.ccExpMon.selectByVisibleText(expmon);
		this.ccExpYr.selectByVisibleText(expyr);	
		this.ccVerifyNum.setValue(ccv);	
	}

	loginAtCheckout(un, pw) {
		this.email.setValue(un);
		this.pw.setValue(pw);

		this.loginForm.submitForm();
	}

}

module.exports = new Checkout();