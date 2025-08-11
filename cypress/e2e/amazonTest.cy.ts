// cypress/e2e/sample_test.cy.js
// const mainMenuOpt = [`Free Shipping Zone`,`Today's Deals`,`Buy Again`,`accounts Amazon.com`,`Browsing History`,`Gift Cards`,`Customer Service`,`Sell`]
const mainMenuOpt = [`Today's Deals`,`Prime Video`,`Registry`,`Customer Service`, `Gift Cards`,`Sell`]
const dismissPopUpSelct = `[data-action-type="DISMISS"]`


function clickIfExist(element) {
  cy.get(`body`).then((body) => {
      cy.wait(2000).then(() => {
        if (body.find(element).length > 0) {
          cy.log(`Element-${element} found, clicking it`)
          cy.get(element).click()
        } else {
          cy.log(`Element-${element} not found and so will not be clicked`)
        }
      })
  })
}

function validatesContainsArray(element,array) {
  for (const text of array){
    element.should(`contain`, text)
  }
}

describe('Amazon Product-Cart Test', () => {
  beforeEach(() => {
    // cy.viewport(1280,720)
    // cy.viewport(1980,1080)
    // cy.viewport(800,360)
    Cypress.config('scrollBehavior', false)
    cy.visit('https://www.amazon.com/') // Open the site
    cy.reload(true)
    const langugeSelection = cy.get(`#icp-nav-flyout`)
    langugeSelection.trigger(`mouseover`)
    cy.get(`span`).contains(`English`).click()
    cy.get('#nav-logo-sprites').trigger(`mouseover`)
    
  })
  it('Task 2 - validates navigation menu and goes to "where is my stuff page"', () => {
    // cy.visit('https://www.amazon.com/') // Open the site
    cy.get('#nav-main', { timeout: 15000 }).should('be.visible');
    // cy.get(`[data-action-type="DISMISS"]`).then($btn => {
    //   if ($btn.length){
    //     cy.wrap($btn).click({force:true})
    //   }
    //   else {
    //     cy.log(`no Shipping popup`)
    //   }
    // })
    clickIfExist(dismissPopUpSelct)
    const mainMenuElm = cy.get(`#nav-xshop`)
    // mainMenuElm.click()
    validatesContainsArray(mainMenuElm,mainMenuOpt)
    // mainMenuElm.should(`contain`,mainMenuElm[0])
    // mainMenuElm.shouldContainAll()
    // cy.contains('Kitchen Sink')            // Look for text
    // cy.url().should('include', 'cypress')  // Verify URL contains "cypress"
    const customerServiceBtn = mainMenuElm.contains(mainMenuOpt[3])
    customerServiceBtn.click()
    const csSearchBar = cy.get(`#hubHelpSearchInput`)
    csSearchBar.scrollIntoView()
    csSearchBar.type(`where is my stuff`).type(`{enter}`)
    cy.get(`h1`).contains(`Where's My Stuff?`).should(`be.visible`)
    cy.log(`finished test`)
  })

})
