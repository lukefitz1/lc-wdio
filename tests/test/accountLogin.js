describe("Open account login page", function () {
    this.timeout(25000);
    
    it("should login to customer account successfully", function () {
        browser.url("/customer/account/login");

        //wait for login form is visible
        account.loginForm.waitForVisible();

        //assert that the login form is displayed on page load
        expect(account.loginForm.isVisible()).to.be.true;
        expect(account.loginBtn.isVisible()).to.be.true;

        //login
        account.login('luke.fitzgerald@blueacorn.com', 'pass4luke');

        //assert that you made it to the dashboard page
        expect(account.dashboard.isVisible()).to.be.true;
        expect(account.dashboard.isVisible()).to.be.true;
    });
});