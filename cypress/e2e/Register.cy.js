require('@cypress/xpath')

describe('DemoBlazeDemo', () => {
  beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.visit("https://www.demoblaze.com/")
      
  })
//Signup
  it('Register Sign Up', () => {
    cy.get('#signin2.nav-link').click() 
    cy.get('#sign-username').should('be.visible').wait(1000).type('BoldrDemoasd1231232131211322')
    cy.get('#sign-password').type('DemoblazeBoldrDemo123')
    cy.xpath('/html/body/div[2]/div/div/div[3]/button[2]').should('be.visible').click({force : true})
    // Listen for the window:alert event
    cy.on('window:alert', (alertText) => {
    // Get the alert message and assert on it
    //If sign up is succcessful
    if(alertText == 'Sign up successful.')
    {
      expect(alertText).to.equal('Sign up successful.')
    }
    //If user already exists
    if(alertText == 'This user already exist.')
    {
      expect(alertText).to.equal('This user already exist.')
    }
    cy.window().then(win => {
      win.confirm() // simulate clicking "OK"
    })
    })
    
  })


  
})
