import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import 'cypress-if'

When(/^click on create category$/, () => {
    cy.xpath(`//button[contains(text(),'Create Category')]`).click()
})
Then(/^verify the appearnce of the new category at the list$/, () => {
    cy.xpath(`//td[contains(text(),'${randomText}')]`).should('be.exist')
    cy.xpath(`//td[contains(text(),'${'محل' + randomNumber}')]`).should('be.exist')
})