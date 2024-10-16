class DateRangePickerSelectors {
  get dateRangeSelect() {
    return cy.get('.DateRangeSelect');
  }
  get startDateInputField() {
    return cy.get('#mui-4');
  }

  get endDateInputField() {
    return cy.get('#mui-5');
  }

  get datePickerModal() {
    return cy.get('body > div:nth-of-type(2)');
  }

  get nextMonthBtn() {
    return cy.get(':nth-child(2) > .css-f7iyql > .MuiIconButton-edgeStart');
  }

  get previousMonthBtn() {
    return cy.get(':nth-child(1) > .css-f7iyql > .MuiIconButton-edgeEnd');
  }

  get monthSpan() {
    return cy.get('span');
  }
}

export default new DateRangePickerSelectors();
