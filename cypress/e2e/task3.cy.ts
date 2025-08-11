// cypress/e2e/sample_test.cy.js
// const mainMenuOpt = [`Free Shipping Zone`,`Today's Deals`,`Buy Again`,`accounts Amazon.com`,`Browsing History`,`Gift Cards`,`Customer Service`,`Sell`]

// function waitForReload() {
//   cy.window().then(win => {
//     cy.get('#nav-logo-sprites').click();
//     cy.wrap(new Promise(resolve => {
//       win.addEventListener('load', resolve, { once: true });
//     },{timeout: 5000}));
//   });
// }

function makeSureAddToCartClickable() {
  cy.get('#addToCart_feature_div [data-feature-details]')
  .invoke('attr', 'data-feature-details')
  .then((details) => {
    const parsed = JSON.parse(details);
    expect(parsed.isInteractive).to.be.true;
  });
}

describe('Task 2 - Amazon Automation', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('cardModuleFactory is not a function')) {
    return false // Prevent Cypress from failing the test
    }
  })
    // cy.viewport(1280,720)
    // cy.viewport(1980,1080)
    // cy.viewport(800,360)
    Cypress.config('scrollBehavior', false)
    cy.visit('https://www.amazon.com/') // Open the site
    cy.reload(true)
    const langugeSelection = cy.get(`#icp-nav-flyout`)
    langugeSelection.trigger(`mouseover`)
    cy.get(`span`).contains(`English`).click()
    // cy.get('#nav-logo-sprites').should(`be.visible`)
    cy.url().should(`include`, `?language=en_US`)
    // cy.wait(3000)
    const shipmentSelection = cy.get(`#nav-global-location-popover-link`)
    shipmentSelection.click()
    cy.wait(1000)
    const countryListDropDown = cy.get(`#GLUXCountryListDropdown`)
    // countryListDropDown.should(`be.visible`).click()
    countryListDropDown.click()
    const hongKongSelection = cy.get(`.a-dropdown-link`).contains(`Hong Kong`)
    hongKongSelection.scrollIntoView().click()
    cy.get(`button`).contains(`Done`).click()
    // cy.get('#nav-logo-sprites').trigger(`mouseover`)
    cy.wait(3000)// Note: There has to be a wait after choosing shipment country because that causes a delayed reload of the page without any changes to the website itself
    // (the name of the country displayed in the navbar changes before the reload)
    // waitForReload()
    const searchBar = cy.get(`#twotabsearchtextbox`)
    searchBar.click().type(`Bostitch Office Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, HighCapacity Shavings Tray, Gray (EPS4-KTGRAY)`).type(`{enter}`)
    // const firstResult = cy.get(`[data-cy="title-recipe"]`).contains(`Office Personal Electric Pencil Sharpener`)
    // firstResult.should(`be.visible`).click()
    // cy.get(`[data-cel-widget="search_result_1"]`).click()
    cy.get(`[data-cel-widget="MAIN-SEARCH_RESULTS-2"]`).click()
    //.eq(0)

    // // const resultImage = cy.get(`[data-component-type="s-product-image"]`).first()
    // // resultImage.click()
    // cy.log(`finished before test`)
    // // const searchIcon = cy.get(`nav-search-submit-button`)
    // // searchIcon.click()
    cy.get(`#add-to-cart-button`).scrollIntoView().click()
    // cy.get(`h4.a-alert-heading`,{timeout: 5000}).contains(`Added to cart`).should(`be.visible`)
    // cy.contains('h4.a-alert-heading', 'Added to cart', { timeout: 40000 }).should('be.visible');
    cy.get(`#attach-added-to-cart-message`).contains('Added to cart', { timeout: 40000 }).should('be.visible');

    cy.visit(`https://www.amazon.com/Scissors-iBayam-Crafting-Scrapbooking-Knitting/dp/B07H3QKN2Z`)
    const redBlackBlueBtn = cy.get(`#color_name_5`)
    redBlackBlueBtn.scrollIntoView().click()
    cy.get(`#inline-twister-dim-title-color_name`).should(`contain.text`,`Red, Black, Blue`)
    // cy.wait(3000)
    cy.get(`#addToCart_feature_div`,{timeout: 5000}).should(`not.have.attr`,`style`,`opacity: 0.5;`)//makes sure the add to cart button loaded and is clickable after the change of
    //color set
    cy.get(`#add-to-cart-button`,{timeout: 10000}).scrollIntoView().should(`be.enabled`).click()
    cy.contains('Added to cart', { timeout: 40000 }).should('be.visible');

    // const orderCartIcon = cy.get(`#nav-cart`)
    // orderCartIcon.click()

    // const activeCart = cy.get(`[data-name="Active Cart"]`)
    // // activeCart.contains(`Scissors, iBayam 8" All Purpose Scissors`).should(`be.visible`)
    // // activeCart.contains(`Bostitch Office Personal Electric Pencil Sharpener`).should(`be.visible`)
    // activeCart.should(`contain.text`,`Scissors, iBayam 8" All Purpose Scissors`)
    // activeCart.should(`contain.text`,`Bostitch Office Personal Electric Pencil Sharpener`)

    // cy.get(`.a-alert-content [role="status"]`).as(`shippingStatus`)
    // cy.get(`@shippingStatus`).should(`not.contain.text`,`Your order qualifies for FREE Shipping`)

    // // const pencilSharpnerPlusBtn = cy.get(`.sc-list-item-content`).contains(`Bostitch Office Personal Electric Pencil Sharpener`).get(`[aria-label="Increase quantity by one"]`)
    // // const pencilSharpnerPlusBtn = cy.get(`.sc-list-item-content`).should(`contain.text`,`Bostitch Office Personal Electric Pencil Sharpener   `).get(`[aria-label="Increase quantity by one"]`)
    // //this function filters between the two general product contaires within the cart and thats why it requires a whole filter function and can't just use contains
    // //(as this will go to the matching child element)
    // cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes('Bostitch Office Personal Electric Pencil Sharpener')).as(`pencilSharpnerContainer`)
    // cy.get(`@pencilSharpnerContainer`).find(`[aria-label="Increase quantity by one"]`,{timeout: 5000}).as(`sharpnerPlusBtn`)
    // // const pencilSharpnerAmountElm = pencilSharpnerContainer.find(`[data-a-selector="value"]`)
    // // const pencilSharpnerAmountElm = cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes('Bostitch Office Personal Electric Pencil Sharpener')).find(`[data-a-selector="value"]`,{timeout: 5000})
    // // const pencilSharpnerAmountElm = pencilSharpnerContainer.find(`legend`)
    // for (let index = 1; index < 4; index++) {
    //   // pencilSharpnerAmountElm.should(`have.text`,`${index}`,)
    //   cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes('Bostitch Office Personal Electric Pencil Sharpener')).find(`[data-a-selector="value"]`).as(`sharpnerAmount`)
    //   cy.get(`@sharpnerPlusBtn`,{timeout: 5000}).click({force: true})
    //   cy.get(`@sharpnerAmount`,{timeout: 5000}).should(`have.text`,`${index}`,)
    // }
    // cy.get(`@shippingStatus`,{timeout: 5000}).should(`contain.text`,`Your order qualifies for FREE Shipping`)
  })
  it('Validates Products In Cart And When Free Shipping Is Active', () => {
    const orderCartIcon = cy.get(`#nav-cart`)
    orderCartIcon.click()

    const activeCart = cy.get(`[data-name="Active Cart"]`)
    // activeCart.contains(`Scissors, iBayam 8" All Purpose Scissors`).should(`be.visible`)
    // activeCart.contains(`Bostitch Office Personal Electric Pencil Sharpener`).should(`be.visible`)
    activeCart.should(`contain.text`,`Scissors, iBayam 8" All Purpose Scissors`)
    activeCart.should(`contain.text`,`Bostitch Office Personal Electric Pencil Sharpener`)

    cy.get(`.a-alert-content [role="status"]`).as(`shippingStatus`)
    cy.get(`@shippingStatus`).should(`not.contain.text`,`Your order qualifies for FREE Shipping`)

    // const pencilSharpnerPlusBtn = cy.get(`.sc-list-item-content`).contains(`Bostitch Office Personal Electric Pencil Sharpener`).get(`[aria-label="Increase quantity by one"]`)
    // const pencilSharpnerPlusBtn = cy.get(`.sc-list-item-content`).should(`contain.text`,`Bostitch Office Personal Electric Pencil Sharpener   `).get(`[aria-label="Increase quantity by one"]`)
    //this function filters between the two general product contaires within the cart and thats why it requires a whole filter function and can't just use contains
    //(as this will go to the matching child element)
    cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes('Bostitch Office Personal Electric Pencil Sharpener')).as(`pencilSharpnerContainer`)
    cy.get(`@pencilSharpnerContainer`).find(`[aria-label="Increase quantity by one"]`,{timeout: 5000}).as(`sharpnerPlusBtn`)
    // const pencilSharpnerAmountElm = pencilSharpnerContainer.find(`[data-a-selector="value"]`)
    // const pencilSharpnerAmountElm = cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes('Bostitch Office Personal Electric Pencil Sharpener')).find(`[data-a-selector="value"]`,{timeout: 5000})
    // const pencilSharpnerAmountElm = pencilSharpnerContainer.find(`legend`)
    for (let index = 1; index < 4; index++) {
      // pencilSharpnerAmountElm.should(`have.text`,`${index}`,)
      cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes('Bostitch Office Personal Electric Pencil Sharpener')).find(`[data-a-selector="value"]`).as(`sharpnerAmount`)
      cy.get(`@sharpnerPlusBtn`,{timeout: 5000}).click({force: true})
      cy.get(`@sharpnerAmount`,{timeout: 5000}).should(`have.text`,`${index}`,)
    }
    cy.get(`@shippingStatus`,{timeout: 5000}).should(`contain.text`,`Your order qualifies for FREE Shipping`)
    cy.log(`finished test`)
  })

  afterEach(() => {
    cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes('Scissors, iBayam 8" All Purpose Scissors')).as(`scissorsContainer`)
    cy.get(`@pencilSharpnerContainer`).find(`[data-feature-id="item-delete-button"]`).as(`pencilSharpnerDeleteBtn`)
    cy.get(`@scissorsContainer`).find(`[data-feature-id="item-delete-button"]`).as(`scissorsDeleteBtn`)
    cy.get(`@pencilSharpnerDeleteBtn`,{timeout: 3000}).click()
    cy.get(`@scissorsDeleteBtn`,{timeout: 3000}).click()

  })

})
