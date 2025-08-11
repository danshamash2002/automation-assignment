const mainMenuOpt = [`Today's Deals`,`Prime Video`,`Registry`,`Customer Service`, `Gift Cards`,`Sell`]
const dismissPopUpSelct = `[data-action-type="DISMISS"]`


function clickIfExist(element) {
  /**
   * Function Description: This function tries checks if the recived element exsits and tries to press it, but if the element does not exsit, the test run will not fail
   * Recieved Parameters: A html element
   * Returned parameters: None
   */
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
    /**
   * Function Description: This function makes sure a recived element contains all of the string within the array
   * Recieved Parameters: A html element and An array of strings
   * Returned parameters: None
   */
  for (const text of array){
    element.should(`contain`, text)
  }
}

describe('Task 2 - Amazon Automation', () => {
  beforeEach(() => {
    Cypress.config('scrollBehavior', false)
    cy.visit('https://www.amazon.com/') // Open the site
    cy.reload(true)
    const langugeSelection = cy.get(`#icp-nav-flyout`)
    langugeSelection.trigger(`mouseover`)
    cy.get(`span`).contains(`English`).click()
    cy.get('#nav-logo-sprites').trigger(`mouseover`)
    
  })
  it('validates navigation menu and goes to "where is my stuff page"', () => {
    cy.get('#nav-main', { timeout: 15000 }).should('be.visible');
    //The function "clickIfExist" is used on the dismiss button of the shipment popup in case it appears and blocks the navbar
    clickIfExist(dismissPopUpSelct)
    const mainMenuElm = cy.get(`#nav-xshop`)
    //The function "" is used to make sure all the desired main menu/navbar options are available within the navbar itself
    validatesContainsArray(mainMenuElm,mainMenuOpt)

    const customerServiceBtn = mainMenuElm.contains(mainMenuOpt[3])
    customerServiceBtn.click()
    const csSearchBar = cy.get(`#hubHelpSearchInput`)
    csSearchBar.scrollIntoView()
    csSearchBar.type(`where is my stuff`).type(`{enter}`)
    cy.get(`h1`).contains(`Where's My Stuff?`).should(`be.visible`)
    cy.log(`finished test`)
  })

})
