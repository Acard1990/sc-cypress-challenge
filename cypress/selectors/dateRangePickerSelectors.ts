class DateRangePickerSelectors {
    
    get dateRangeSelect() {
        return cy.get('.DateRangeSelect')
    }
    get startDateInputField() {
        return cy.get('#mui-4')
    }

    get endDateInputField() {
        return cy.get('#mui-5')
    }

    get datePickerModal() {
        return cy.get('body > div:nth-of-type(2)')
    }

}

export default new DateRangePickerSelectors()