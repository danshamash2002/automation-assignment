const sharpnerFullName = `Bostitch Office Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, HighCapacity Shavings Tray, Gray (EPS4-KTGRAY)`
const scissorsPartialName = `Scissors, iBayam 8" All Purpose Scissors`
const sharpnerPartialName = `Bostitch Office Personal Electric Pencil Sharpener`

describe('Task 2 - Amazon Automation', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    Cypress.on('uncaught:exception', (err, runnable) => {
      // This function prevents Cypress from failing the test based on a bad http recivement that doesn't affect the test or the websites functionality
  if (err.message.includes('cardModuleFactory is not a function')) {
    return false // Prevent Cypress from failing the test
    }
  })

    Cypress.config('scrollBehavior', false)
    cy.visit('https://www.amazon.com/') // Opens the site
    cy.reload(true)
    const langugeSelection = cy.get(`#icp-nav-flyout`)
    langugeSelection.trigger(`mouseover`)
    cy.get(`span`).contains(`English`).click()
    cy.url().should(`include`, `?language=en_US`)

    const shipmentSelection = cy.get(`#nav-global-location-popover-link`)
    shipmentSelection.click()
    cy.wait(1000)
    const countryListDropDown = cy.get(`#GLUXCountryListDropdown`)
    countryListDropDown.click()
    const hongKongSelection = cy.get(`.a-dropdown-link`).contains(`Hong Kong`)
    hongKongSelection.scrollIntoView().click()
    cy.get(`button`).contains(`Done`).click()

    cy.wait(3000)// Note: There has to be a wait after choosing shipment country because that causes a delayed reload of the page without any changes to the website itself
    // (the name of the country displayed in the navbar changes before the reload)
    const searchBar = cy.get(`#twotabsearchtextbox`)
    searchBar.click().type(sharpnerFullName).type(`{enter}`)
    //despite the number in the value, this attribute identifies the first result of the previous search  as the selector: `[data-cel-widget="search_result_1"]` has proven unstable
    cy.get(`[data-cel-widget="MAIN-SEARCH_RESULTS-2"]`).click()

    cy.get(`#add-to-cart-button`).scrollIntoView().click()
    cy.get(`#attach-added-to-cart-message`).contains('Added to cart', { timeout: 40000 }).should('be.visible');

    cy.visit(`https://www.amazon.com/Scissors-iBayam-Crafting-Scrapbooking-Knitting/dp/B07H3QKN2Z`)
    const redBlackBlueBtn = cy.get(`#color_name_5`)
    redBlackBlueBtn.scrollIntoView().click()
    cy.get(`#inline-twister-dim-title-color_name`).should(`contain.text`,`Red, Black, Blue`)
    //this function makes sure the add to cart button loaded and is clickable after the change of the products color set
    cy.get(`#addToCart_feature_div`,{timeout: 5000}).should(`not.have.attr`,`style`,`opacity: 0.5;`)
    cy.get(`#add-to-cart-button`,{timeout: 10000}).scrollIntoView().should(`be.enabled`).click()
    cy.contains('Added to cart', { timeout: 40000 }).should('be.visible');

  })
  it('Validates Products In Cart And When Free Shipping Is Active', () => {
    const orderCartIcon = cy.get(`#nav-cart`)
    orderCartIcon.click()

    const activeCart = cy.get(`[data-name="Active Cart"]`)
    activeCart.should(`contain.text`, scissorsPartialName)
    activeCart.should(`contain.text`, sharpnerPartialName)

    cy.get(`.a-alert-content [role="status"]`).as(`shippingStatus`)
    cy.get(`@shippingStatus`).should(`not.contain.text`,`Your order qualifies for FREE Shipping`)

    cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes(sharpnerPartialName)).as(`pencilSharpnerContainer`)
    cy.get(`@pencilSharpnerContainer`).find(`[aria-label="Increase quantity by one"]`,{timeout: 5000}).as(`sharpnerPlusBtn`)
    for (let index = 1; index < 4; index++) {
      cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes(sharpnerPartialName)).find(`[data-a-selector="value"]`).as(`sharpnerAmount`)
      cy.get(`@sharpnerPlusBtn`,{timeout: 5000}).click({force: true})
      cy.get(`@sharpnerAmount`,{timeout: 5000}).should(`have.text`,`${index}`,)
    }
    cy.get(`@shippingStatus`,{timeout: 5000}).should(`contain.text`,`Your order qualifies for FREE Shipping`)
    cy.log(`finished test`)
  })

  afterEach(() => {
    cy.get(`.sc-list-item-content`).filter((index, el) => el.textContent.includes(scissorsPartialName)).as(`scissorsContainer`)
    cy.get(`@pencilSharpnerContainer`).find(`[data-feature-id="item-delete-button"]`).as(`pencilSharpnerDeleteBtn`)
    cy.get(`@scissorsContainer`).find(`[data-feature-id="item-delete-button"]`).as(`scissorsDeleteBtn`)
    cy.get(`@pencilSharpnerDeleteBtn`,{timeout: 3000}).click()
    cy.get(`@scissorsDeleteBtn`,{timeout: 3000}).click()

  })

})
