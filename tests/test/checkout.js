describe("Checkout steps - ", function () {
    //set custom timeout for these tests, since they have multiple steps
    this.timeout(30000);
    
    describe("Customer checkout - should login, add product to cart, then complete checkout", function() {
        it("login to customer account", function() {
            browser.url("/customer/account/login");

            //assert that the login form is displayed on page load
            expect(account.loginForm.isVisible()).to.be.true;
            expect(account.loginBtn.isVisible()).to.be.true;

            //login
            account.login('luke.fitzgerald@blueacorn.com', 'pass4luke');

            //assert that you made it to the dashboard page
            account.dashboard.waitForVisible();
            expect(account.dashboard.isVisible()).to.be.true;
        });

        it("should add product to cart, click checkout button", function () {
            browser.url("/revolution-locking-tongs");

            //ensure add to cart button is visible, mini cart is not visible
            prod.addToCart.waitForVisible();
            expect(prod.addToCart.isVisible()).to.be.true;
            expect(header.miniCartDropdown.isVisible()).to.be.false;
            
            //add simple product to cart
            prod.addToCart.click();
        });

        it("should click checkout button on cart page", function() {
            //wait for checkout button to display on cart page, click it
            cart.checkoutBtn.waitForVisible();
            cart.checkoutBtn.click();
        });

        it("should submit billing address form with already saved address", function() {
            //submit billing address form
            checkout.billingAddressForm.waitForVisible();
            checkout.billingAddressForm.submitForm();
        });

        it("should submit shipping method form", function() {
            //make sure all shipping method elements are displayed
            checkout.shippingMethodForm.waitForVisible();
            checkout.groundShippingLabel.waitForVisible();
            checkout.shippingMethodContinueBtn.waitForVisible();
            checkout.shippingMethodProgessButton.waitForVisible();  

            //select shipping method, submit form            
            checkout.groundShippingLabel.click();
            checkout.submitShippingMethodForm();
        });

        it("should submit payment method form", function() {
            //select payment method (cc / money order), submit form
            checkout.paymentMethodForm.waitForVisible();
            checkout.moneyOrderLabel.waitForVisible();
            checkout.paymentMethodContinueBtn.waitForVisible();
            checkout.paymentMethodProgressButton.waitForVisible();
            
            if (env === 'stage') {
                checkout.moneyOrderLabel.click();  
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
            checkout.placeOrderButton.click();
        });

        it("should review order success page", function() {
            //order success page
            checkout.orderSuccessPageHeading.waitForVisible(15000);
            console.log(checkout.orderNumText.getText());
        });

        it("should log out of account", function() {
            browser.url("/customer/account/logout");
        });
    });

    describe.only("Guest checkout - should complete guest checkout on B2C site", function() {
        it("should add product to cart, click checkout button", function () {
            browser.url("/revolution-locking-tongs");

            // wait for modal to display, close it
            header.modal.waitForVisible(5000);
            header.modalCloseBtn.waitForVisible(3000);
            header.modalCloseBtn.click();
            header.modal.waitForVisible(3000, true);

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

        /*it("should submit shipping method form", function() {
            //make sure all shipping method elements are displayed
            checkout.shippingMethodForm.waitForVisible();
            checkout.groundShippingLabel.waitForVisible();
            checkout.shippingMethodContinueBtn.waitForVisible();
            checkout.shippingMethodProgessButton.waitForVisible();  

            //select shipping method, submit form            
            checkout.groundShippingLabel.click();
            checkout.submitShippingMethodForm();
        });

        it("should submit payment method form", function() {
            //select payment method (cc / money order), submit form
            checkout.paymentMethodForm.waitForVisible();
            checkout.moneyOrderLabel.waitForVisible();
            checkout.paymentMethodContinueBtn.waitForVisible();
            checkout.paymentMethodProgressButton.waitForVisible();
            
            if (env === 'stage') {
                checkout.moneyOrderLabel.click();    
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
            checkout.placeOrderButton.click();
        });

        it("should review order success page", function() {
            //order success page
            checkout.orderSuccessPageHeading.waitForVisible(15000);
            console.log(checkout.orderNumText.getText());
        });*/
    });

    describe("Register on checkout - should complete register on checkout", function() {
        it("should add product to cart, click checkout button", function () {
            browser.url("/revolution-locking-tongs");

            //ensure add to cart button is visible, mini cart is not visible
            prod.addToCart.waitForVisible();
            expect(prod.addToCart.isVisible()).to.be.true;
            expect(header.miniCartDropdown.isVisible()).to.be.false;
            
            //add simple product to cart
            prod.addToCart.click();
        });

        it("should click checkout button on cart page", function() {
            //wait for checkout button to display on cart page, click it
            cart.checkoutBtn.waitForVisible();
            cart.checkoutBtn.click();
        });
        
        it("should select register on checkout", function() {
            //select register on checkout
            checkout.checkoutTypeForm.waitForVisible();
            checkout.registerBtn.click();
        });

        it("should submit billing address form with pw", function() {
            //generate random string for email
            rand = base.generateRandomString();

            //submit billing address form
            checkout.billingAddressForm.waitForVisible();
            checkout.submitBillingForm('Luke', 'Fitzgerald', 'luke.fitzgerald-' + rand + '@blueacorn.com', 
                '145 Williman St', 'Charleston', 'South Carolina', '29403', '8779442583', 
                'register', 'pass4luke');
        });

        it("should submit shipping method form", function() {
            //make sure all shipping method elements are displayed
            checkout.shippingMethodForm.waitForVisible();
            checkout.groundShippingLabel.waitForVisible();
            checkout.shippingMethodContinueBtn.waitForVisible();
            checkout.shippingMethodProgessButton.waitForVisible();  

            //select shipping method, submit form            
            checkout.groundShippingLabel.click();
            checkout.submitShippingMethodForm();
        });

        it("should submit payment method form", function() {
            //select payment method (cc / money order), submit form
            checkout.paymentMethodForm.waitForVisible();
            checkout.moneyOrderLabel.waitForVisible();
            checkout.paymentMethodContinueBtn.waitForVisible();
            checkout.paymentMethodProgressButton.waitForVisible();
            
            if (env === 'stage') {
                checkout.moneyOrderLabel.click();  
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
            checkout.placeOrderButton.click();
        });

        it("should review order success page", function() {
            //order success page
            checkout.orderSuccessPageHeading.waitForVisible(15000);
            console.log(checkout.orderNumText.getText());
        });

        it("should log out of account", function() {
            browser.url("/customer/account/logout");
        });
    });

    describe("Guest checkout - should login at checkout on B2C site", function() {
        it("should add product to cart, click checkout button", function () {
            browser.url("/revolution-locking-tongs");

            //ensure add to cart button is visible, mini cart is not visible
            prod.addToCart.waitForVisible();
            expect(prod.addToCart.isVisible()).to.be.true;
            expect(header.miniCartDropdown.isVisible()).to.be.false;
            
            //add simple product to cart
            prod.addToCart.click();
        });

        it("should click checkout button on cart page", function() {
            //wait for checkout button to display on cart page, click it
            cart.checkoutBtn.waitForVisible();
            cart.checkoutBtn.click();
        });

        it("should login at checkout", function() {
            //login on checkout
            checkout.checkoutTypeForm.waitForVisible();
            checkout.loginAtCheckout('luke.fitzgerald@blueacorn.com', 'pass4luke');
        });

        it("should submit billing address form with already saved address", function() {
            //submit billing address form
            checkout.billingAddressForm.waitForVisible();
            checkout.billingAddressForm.submitForm();
        });

        it("should submit shipping method form", function() {
            //make sure all shipping method elements are displayed
            checkout.shippingMethodForm.waitForVisible();
            checkout.groundShippingLabel.waitForVisible();
            checkout.shippingMethodContinueBtn.waitForVisible();
            checkout.shippingMethodProgessButton.waitForVisible();  

            //select shipping method, submit form            
            checkout.groundShippingLabel.click();
            checkout.submitShippingMethodForm();
        });

        it("should submit payment method form", function() {
            //select payment method (cc / money order), submit form
            checkout.paymentMethodForm.waitForVisible();
            checkout.moneyOrderLabel.waitForVisible();
            checkout.paymentMethodContinueBtn.waitForVisible();
            checkout.paymentMethodProgressButton.waitForVisible();
            
            if (env === 'stage') {
                checkout.moneyOrderLabel.click();  
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
            checkout.placeOrderButton.click();
        });

        it("should review order success page", function() {
            //order success page
            checkout.orderSuccessPageHeading.waitForVisible(15000);
            console.log(checkout.orderNumText.getText());
        });

        it("should log out of account", function() {
            browser.url("/customer/account/logout");
        });
    });
});