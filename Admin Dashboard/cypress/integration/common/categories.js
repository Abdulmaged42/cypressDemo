import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import 'cypress-if'

When(/^click on create category$/, () => {
    cy.xpath(`//button[contains(text(),'Create Category')]`).click()
})