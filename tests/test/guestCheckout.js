describe.only("Guest checkout - should complete guest checkout on B2C site", function() {
    this.timeout(30000);

    it("should add product to cart, click checkout button", function () {
        browser.url("/");

        // wait for modal to display, close it
        header.modal.waitForVisible(5000);
        header.modalCloseBtn.waitForVisible(3000);
        header.modalCloseBtn.click();
        header.modal.waitForVisible(3000, true);
    });

    it("should go to product page, add product to cart", function() {
        browser.url("/revolution-locking-tongs");

        //ensure add to cart button is visible, mini cart is not visible
        prod.addToCart.waitForVisible();
        expect(prod.addToCart.isVisible()).to.be.true;
        expect(header.miniCartDropdown.isVisible()).to.be.false;
        
        //add simple product to cart
        prod.addToCart.click();

        //click mini cart checkout button
        header.miniCartDropdown.waitForVisible();
        header.miniCartCheckoutBtn.click();
    });

    it("should click checkout button on cart page", function() {
        //wait for checkout button to display on cart page, click it
        cart.checkoutBtn.waitForVisible();
        cart.checkoutBtn.click();
    });

    it("should select checkout as guest", function() {
        //select checkout as guest
        checkout.checkoutTypeForm.waitForVisible();
        checkout.checkoutAsGuestBtn.click();
    });

    it("should submit billing address form", function() {
        //generate random string for email
        rand = base.generateRandomString();
        
        //submit billing address form
        checkout.billingAddressForm.waitForVisible();
        checkout.submitBillingForm('Luke', 'Fitzgerald', 'luke.fitzgerald-' + rand + '@blueacorn.com', 
            '145 Williman St', 'Charleston', 'South Carolina', '29403', '442583', 
            'guest');
    });

    it("should submit shipping method form", function() {
        //make sure all shipping method elements are displayed
        checkout.shippingMethodForm.waitForVisible();
        checkout.groundShippingLabel.waitForVisible();
        checkout.shippingMethodContinueBtn.waitForVisible();

        //submit shipping form            
        checkout.submitShippingMethodForm();
    });

    it("should submit payment method form", function() {
        //select payment method (cc / money order), submit form
        checkout.paymentMethodForm.waitForVisible();
        checkout.bankTransferLabel.waitForVisible();
        checkout.paymentMethodContinueBtn.waitForVisible();
        
        if (env === 'stage') {
            checkout.bankTransferLabel.click();    
        } else if (env === 'prod') {
            checkout.ccLabel.click();
            checkout.fillCCForm('Visa', '4111111111111111', '04 - April', '2023', '123');
        }

        checkout.paymentMethodContinueBtn.click();
    });

    it("should submit order", function() {
        //place order
        checkout.orderReview.waitForVisible();
        checkout.placeOrderButton.waitForVisible();

        checkout.termsLabel.leftClick(0,0);
        checkout.placeOrderButton.click();
    });

    it("should review order success page", function() {
        //order success page
        checkout.orderSuccessPageHeading.waitForVisible(15000);
        console.log(checkout.orderNumText.getText());
    });
});