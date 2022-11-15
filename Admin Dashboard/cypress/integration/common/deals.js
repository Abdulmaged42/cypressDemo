import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import 'cypress-if'
var expectedCountry
var date = new Date();
global.today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
And(/^open "([^"]*)"$/, (page) => {
    switch (page) {
        case 'Merchant':
            cy.get(':nth-child(1) > a > .makeStyles-paper-118').click()
            break;
        case 'Deals':
            cy.get(':nth-child(2) > a > .makeStyles-paper-118').click()
            break;
        case 'Categories':
            cy.get(':nth-child(3) > a > .makeStyles-paper-118').click()
            break;

    }

})
And(/^select country "([^"]*)"$/, (country) => {

    if (country == 'Egypt') {
        cy.xpath(`(//span[contains(text(),'${country}')])[2]`).click({ force: true })
    }
    else {
        cy.xpath(`(//span[contains(text(),'${country}')])[1]`).click()
    }

    expectedCountry = country
})

Then(/^verify the returned countries$/, () => {

    do {
        cy.wait(2000)
        paginate()
    } while (cy.xpath(`//button[contains(text(),'Next')]`)
        .if('enabled'));

})

function paginate() {
    cy.xpath(`//button[contains(text(),'Next')]`)
        .if('enabled')
        .click()
        .else()
        .log("button disabled ", formatDate('31 Jan 2023'))

    cy.xpath(`//tbody/tr/td[15]`).each((element) => {
        if (expectedCountry === "Egypt") {
            expect(element.text()).contains('EG')


        }


        else {
            expect(element.text()).contains('NG')

        }

    })
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
Then(/^validate the expiration date$/, () => {
    cy.get('.css-j6p7hn-MuiStack-root > button').each(element => {
        element.click()

        cy.xpath(`//tbody/tr/td[8]`).each(el => {
            var endDate = el.text()
            cy.log("endDate ", endDate)
            var fulldate = endDate.split('at')
            cy.log("fulldate ", fulldate[0])
            if (fulldate[0] < today) {
                cy.xpath(`//td[contains(text(),'${endDate}')]/following-sibling::td[1]`).invoke('text').should('contains', 'Expired')
            }

        })

    })
})