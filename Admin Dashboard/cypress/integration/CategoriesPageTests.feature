Feature: Categories Page


    Background:open accounts page
        Given navigate to "https://qc.waslabrowser.com/admin-dashboard/admin/dashboard"
        And  set username "testingcs@mailinator.com"
        And set password "Wasla.2000"
        When click on "kc-login" by "id" locator
        Then I verify the appearance of the text "Dashboard"

    Scenario: create New category
        Given click on "Deals & Merchant"
        And  I verify the appearance of the text "Deals & Merchant"
        And open "Categories"
        And click on "Create Category"
        When I fill the form with the following:
            | field   | type | value        |
            | name-en | text | random       |
            | name-ar | text | randomArName |
        And click on create category
