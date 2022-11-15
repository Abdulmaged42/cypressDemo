Feature: Deals Page


    Background:open accounts page
        Given navigate to "https://qc.waslabrowser.com/admin-dashboard/admin/dashboard"
        And  set username "testingcs@mailinator.com"
        And set password "Wasla.2000"
        When click on "kc-login" by "id" locator
        Then I verify the appearance of the text "Dashboard"

    Scenario Outline: filter deals by country
        Given click on "Deals & Merchant"
        And  I verify the appearance of the text "Deals & Merchant"
        And open "Deals"
        And click on "country-code-dropdown" by "id" locator
        When select country "<country>"
        Then verify the returned countries
        Examples:
            | country |
            | Egypt   |
            | Nigeria |
