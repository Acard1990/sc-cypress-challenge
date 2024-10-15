import DateRangePickerSelectors from '../selectors/dateRangePickerSelectors';

class DateRangePickerPage {

    navToDateRangePickerPage() {
        cy.visit('/');
        DateRangePickerSelectors.dateRangeSelect.should('be.visible');
    }

    assertStartTimePlaceHolder() {
        DateRangePickerSelectors.startDateInputField
        .should('be.visible')
        .and('have.attr', 'placeholder', 'mm/dd/yyyy');  
    }

    assertEndTimePlaceHolder() {
        DateRangePickerSelectors.endDateInputField
        .should('be.visible')
        .and('have.attr', 'placeholder', 'mm/dd/yyyy');  
    }

    clickStartDateInputField() {
        DateRangePickerSelectors.startDateInputField.click()
    }

    clickEndDateInputField() {
        DateRangePickerSelectors.endDateInputField.click()
    }

    assertModalIsVisible() {
        DateRangePickerSelectors.datePickerModal.should('be.visible');
    }

    clickSpecifiedDay(DAY: string) {
        cy.contains(DAY).click()
    }

    assertStartInputFieldVal(expectedVal) {
        DateRangePickerSelectors.startDateInputField.should('have.value', expectedVal)
    }

    assertEndInputFieldVal(expectedVal) {
        DateRangePickerSelectors.endDateInputField.should('have.value', expectedVal)
    }

    assertEndInputFieldValIsNot(expectedVal) {
        DateRangePickerSelectors.endDateInputField.should('not.have.value', expectedVal)
    }
}

export default new DateRangePickerPage()