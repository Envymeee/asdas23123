require('@cypress/xpath')

describe('DemoBlazeDemo', () => {
  beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.visit("https://www.demoblaze.com/")
      
  })
//Signup
  it('Register Sign Up', () => {
    cy.get('#signin2.nav-link').click() 
    cy.get('#sign-username').should('be.visible').wait(1000).type('BoldrDemo')
    cy.get('#sign-password').type('DemoblazeBoldrDemo123')
    cy.xpath('/html/body/div[2]/div/div/div[3]/button[2]').should('be.visible').click()
    // Listen for the window:alert event
    cy.on('window:alert', (message) => {
    // Get the alert message and assert on it
    expect(message).to.equal('This user already exist.') //Alert on already existing accounts

    })
  })


  
})
