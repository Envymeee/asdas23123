require('@cypress/xpath')
let WebWaitDelay = 3000
describe('Register', () => {
  beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.visit("https://www.demoblaze.com/")
      
  })
//Signup
  it('Register Sign Up', () => {
    cy.get('#signin2.nav-link').click({force : true})
    cy.wait(WebWaitDelay)
    cy.get('#sign-username').should('be.visible').wait(WebWaitDelay).type('BoldrDemoasd1231232131211322') //Change if you want a new user or existing user
    cy.get('#sign-password').type('DemoblazeBoldrDemo123')
    cy.xpath('/html/body/div[2]/div/div/div[3]/button[2]').should('be.visible').click({force : true})
    // Listen for the window:alert event
    cy.wait(WebWaitDelay)
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
  
  it('Register Sign Up NO inputs', () => {
    cy.get('#signin2.nav-link').click({force : true})
    cy.wait(WebWaitDelay)
    cy.xpath('/html/body/div[2]/div/div/div[3]/button[2]').should('be.visible').click({force : true})
    // Listen for the window:alert event
    cy.wait(WebWaitDelay)
    cy.on('window:alert', (alertText) => {
    // Get the alert message and assert on it
    //No inputs
    expect(alertText).to.equal('Please fill out Username and Password.')
    
    cy.window().then(win => {
      win.confirm() // simulate clicking "OK"
      })
    })
  })

  it('Test Login Error WRONG PASSWORD', () =>
  {
    cy.get('#login2.nav-link').click() 
    cy.get('#loginusername.form-control').should('be.visible').wait(WebWaitDelay).type('BoldrDemo')
    cy.get('#loginpassword').type('WRONGPASSWORD')
    //cy.xpath("/html/body/div[2]/div/div/div[3]/button[2]").click({force: true})
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force : true})
    cy.wait(WebWaitDelay)//Adjust for server lag

    cy.on('window:alert', (alertText) => {
      // Get the alert message and assert on it
      
      //If sign up is succcessful
      expect(alertText).to.equal('Wrong password.')
      
      cy.window().then(win => {
        win.confirm() // simulate clicking "OK"
      })
    })
    
  })
  //No inputs just clicks sign in
  it('No Inputs Log In', () =>
  {
    cy.get('#login2.nav-link').click() 
    //cy.xpath("/html/body/div[2]/div/div/div[3]/button[2]").click({force: true})
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force : true})
    cy.wait(WebWaitDelay)//Adjust for server lag

    cy.on('window:alert', (alertText) => {
      // Get the alert message and assert on it
      
      //If sign up is succcessful
      expect(alertText).to.equal('Please fill out Username and Password.')
      
      cy.window().then(win => {
        win.confirm() // simulate clicking "OK"
      })
    })
  })
  
})


describe('DemoBlazeDemo', () => {
  beforeEach(() => {
    
      cy.viewport(1920, 1080)
      cy.visit("https://www.demoblaze.com/")
      
    cy.get('#login2.nav-link').click() 
    cy.get('#loginusername.form-control').should('be.visible').wait(1000).type('BoldrDemo')
    cy.get('#loginpassword').type('DemoblazeBoldrDemo123')
    //cy.xpath("/html/body/div[2]/div/div/div[3]/button[2]").click({force: true})
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force : true})
    cy.wait(WebWaitDelay)//Adjust for server lag
  })

//login
  it('Login', () => {
    //Assert if Logged in
    cy.get('#nameofuser').should('have.text', 'Welcome BoldrDemo')
  })

//Adding to cart an item
  it('Adding to cart an item', () => {
    cy.get(':nth-child(1) > .card > :nth-child(1) > .card-img-top').should('be.visible', {timeout: 10000}).click()
    cy.get('.col-sm-12 > .btn').should('be.visible', {timeout: 10000}).click()
    cy.wait(WebWaitDelay)// Adjust for server lag
    // Listen for the window:alert event
    cy.on('window:alert', (message) => {
      // Get the alert message and assert on it
      expect(message).to.equal('Product added.')
    })
    //Click Cart
    cy.get('#cartur').click()
    //Verify if the order was added
    cy.get('#tbodyid > :nth-child(1) > :nth-child(2)').should('have.text', 'Samsung galaxy s6') 
    
  })

  //Checking out the cart
  it('Checking out the cart', () => {
    //Click Cart
    cy.get('#cartur').click()
    //Click Place Order
    cy.get('.col-lg-1 > .btn').click()

    cy.get('#name').wait(1000).should('be.visible').type('Demo Tester')
    cy.get('#country').should('be.visible').type('Demo Country')
    cy.get('#city').should('be.visible').type('City')
    cy.get('#card').should('be.visible').type('0123456789')
    cy.get('#month').should('be.visible').type('March 15')
    cy.get('#year').should('be.visible').type('2023')

    cy.xpath('/html/body/div[3]/div/div/div[3]/button[2]').click()
    cy.get('.sweet-alert > h2').should('have.text', 'Thank you for your purchase!') 
  })

  it('Sign out', () => {
    //Assert if Logged in
    cy.get('#logout2').should('have.text', 'Log out').click({force : true})
    cy.get('#signin2.nav-link')
  })

  
})
