
// import { expect } from 'chai';
import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
// export { get_value_by_key };
global.expectedDate = ''
global.ExpetedText = ''
var faker = require('faker');
// global.randomText1 = faker.name.firstName()
global.randomText = faker.name.firstName()
global.randomText2 = faker.name.lastName()
global.randomText1 = faker.random.word()
global.mail = faker.internet.email()
global.suffix = faker.company.bsBuzz();
global.portalName = faker.company.companyName();
global.randomNumber = faker.random.number(10, 1000);
global.randomNumber2 = faker.random.number(100, 1000);
global.currentUrl = ''
global.phoneNum = faker.phone.phoneNumber('010 ### ## ##')
// global.current_local = Cypress.env("local")
// global.resource_file = read_localization_file(current_local);
Given(/^navigate to "([^"]*)"$/, (url) => {
    cy.visit(url)
})
Given(/^navigate to accounts website$/, () => {
    cy.visit(Cypress.config().accountsDemo)
})
And(/^set username "([^"]*)"$/, (userName) => {
    Cypress.Cookies.preserveOnce()
    cy.get("#username").type(userName)
    cy.wait(1000)


})
And(/^set password "([^"]*)"$/, (password) => {
    Cypress.Cookies.preserveOnce()
    cy.get("#password").type(password)
    // cy.get("#signin").click()

})
And(/^I fill the form with the following:$/, dataTable => {
    let data = dataTable.rawTable
    let i;
    for (i of data) {
        fill_field_with(i)

    }
})
/** create more than one application */
// And(/^I fill the form with the following:$/, dataTable => {
//     let data = dataTable.rawTable
//     let i;
//     for (let j = 1; j < 50; j++) {
//         cy.visit(`https://beta-admissions.nagwa.com/458148969823/zacharyvdvmi`)
//         cy.get(`:nth-child(2) > .vertically > legend > .checkbox > label > span`).click()
//         cy.get(`.checkboxes-inline > :nth-child(2)`).click()
//         for (i of data) {
//             fill_field_with(i)

//         }
//         cy.get('.section-content > .checkbox > label > span').click()
//         cy.get(`#startsubmit`).click()
//         cy.wait(1000)
//     }

// })


When(/^[I ]*wait [for "]*(\d+)[ "]*[second]{3,7}$/, (seconds) => {

    cy.wait(seconds * 1000)

})
And(/^get current url$/, () => {
    cy.url().then(element => {
        currentUrl = element
        cy.log("currentUrl ", currentUrl)
    })
})
Given(/^open accounts to login$/, () => {
    cy.log("currentUrl ", currentUrl)
    cy.visit(currentUrl)
})
When(/^click on "([^"]*)"$/, (textValue) => {


    cy.contains(`${textValue}`).click({ force: true });


})

function fill_field_with(row) {
    const field = row[0]
    const type = row[1]
    const value = row[2]
    switch (type) {
        case 'code':
            if (value === 'randomCode') {
                var Code = faker.random.alphaNumeric(5);
                cy.get(`#${field}`).type(Code)
            } else {
                cy.get(`#${field}`).type(value)
            }
            break;
        case 'text':
            cy.get(`#${field}`).clear()
            if (value === 'random') {

                cy.get(`#${field}`).type(randomText)
            }
            else if (value === 'randomFirstName') {

                cy.get(`#${field}`).type(randomText1)
            }
            else if (value === 'randomLastName') {

                cy.get(`#${field}`).type(randomText2)
            }
            else if (value === 'randomMail') {
                cy.log("mail ", mail)
                cy.get(`#${field}`).type(mail)

            }
            else if (value === 'randomName') {
                cy.log("portalName ", portalName)
                cy.get(`#${field}`).type(portalName)
            }
            else if (value === 'suffix') {
                cy.log("suffix ", suffix)
                cy.get(`#${field}`).type(suffix + randomNumber)
            }
            else {
                cy.get(`#${field}`).type(value)
            }
            break;
            ExpetedText = value
        case 'date':
            cy.get(`#${field}`).clear({ force: true })
            cy.get(`#${field}`).type(value, { force: true })
            expectedDate = value

            break;
        case 'dropdown':

            cy.get(`#${field}`).select(value)
            // cy.get(`#${field}`).select(Number(value))
            break;
        case 'search_dropdown':
            cy.get("[type='search']").click();
            cy.wait(2000)
            cy.xpath(`//li[contains(text(),'${value}')]`).click()
            break;
        case 'checkBox':
            cy.xpath(`//span[contains(text(),'${value}')]`).click()
            break;
        case 'img':
            cy.get(`#${field}`).attachFile(`${value}`);
            cy.wait(2000)
            break;
        case 'radio':
            cy.get(`#${field}`).first().check({ force: true })
            break;

        case 'birthDate':
            cy.xpath(`//*[@class='${field}']`).select(Number(value))
            break;


    }
}


When(/^click on "([^"]*)" by "([^"]*)" locator$/, (locator_value, locator_type) => {

    switch (locator_type) {
        case 'xpath':
            cy.xpath(`${locator_value}`).click();
            break;
        case 'className':
            cy.get(`.${locator_value}`).click()
            break;
        case 'id':
            cy.get(`#${locator_value}`).click()
            break;
        case 'href':
            cy.xpath(`//a[contains(@href,'${locator_value}')]`).click()
            break;
        case 'contains':
            cy.xpath(`(//*[contains(text(),'${locator_value}')])[1]`).click()
            ExpetedText = locator_value
            break;
        default:
            cy.get(locator_value).click()

    }
})
Then(/^the error message should appear$/, () => {
    cy.get('.field-validation-error').each(element => {
        var text = element.text()

        expect(text).contains('required.')

    })
})
And(/^open new window "([^"]*)"$/, (url) => {
    cy.visit(url, {
        onBeforeLoad(win) {
            cy.stub(win, 'open')
        }
    })

    cy.window().its('open').should('be.called')


})

When(/^scroll down$/, () => {
    cy.scrollTo('bottom')
})

And(/^reload the page$/, () => {
    cy.reload()
    cy.wait(1000)
})
Given(/^I (verify|falsify) the appearance of the text "([^"]*)"$/, (vision, text) => {

    cy.wait(3000)
    cy.get('span').then(($title) => {
        cy.log("text", $title.text())
        if (vision === 'verify') expect($title.text()).to.contains(text)

        if (vision === 'falsify') expect(text).to.not.equal($title.text())

    })

})
// function read_localization_file(local) {
//     var file = ''
//     switch (local) {
//         case 'ar-EG':
//             file = require('./resource_files/SharedResource_ar_EG.json')
//             break;
//         // case 'en-GB':
//         //     file = require('./resource_files/SharedResource_en_GB.json')
//         //     break;
//         case 'en-US':
//             file = require('./resource_files/SharedResource_en_EG.json')
//             break;
//         // case 'fr-FR':
//         //     file = require('./Resources')
//         //     break;
//     }
//     return file
// }
// function get_value_by_key(text_key) {
//     var value = ''
//     try {
//         value = resource_file.data.find(e => e.key === text_key).value

//     }
//     catch (err) {
//         value = text_key

//     }
//     return value
// }
Then(/^the success message should be visible and contain "([^"]*)"$/, (message) => {

    cy.get(`.alert-success`).should('be.visible').and().invoke('text').should('contains', message)
    // cy.xpath(`//div[@id='alert-success']`).invoke('text').should('contains', message)

})