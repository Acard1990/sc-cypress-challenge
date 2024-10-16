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
    DateRangePickerSelectors.startDateInputField.click();
  }

  clickEndDateInputField() {
    DateRangePickerSelectors.endDateInputField.click();
  }

  assertModalIsVisible() {
    DateRangePickerSelectors.datePickerModal.should('be.visible');
  }

  assertModalIsNotVisible() {
    DateRangePickerSelectors.datePickerModal.should('not.be.visible');
  }

  clickSpecifiedDay(DAY: string) {
    cy.contains(DAY).click();
  }

  assertStartInputFieldVal(expectedVal: string) {
    DateRangePickerSelectors.startDateInputField.should(
      'have.value',
      expectedVal
    );
  }

  assertEndInputFieldVal(expectedVal: string) {
    DateRangePickerSelectors.endDateInputField.should(
      'have.value',
      expectedVal
    );
  }

  assertEndInputFieldValIsNot(expectedVal: string) {
    DateRangePickerSelectors.endDateInputField.should(
      'not.have.value',
      expectedVal
    );
  }

  typeValToInput(value) {
    DateRangePickerSelectors.startDateInputField.type(value);
  }

  clickNextMonthBtn() {
    DateRangePickerSelectors.nextMonthBtn.click();
  }

  clickPreviousMonthBtn() {
    DateRangePickerSelectors.previousMonthBtn.click();
  }

  assertMonthModalHeaderValue(expectedVal: string) {
    DateRangePickerSelectors.monthSpan
      .contains(expectedVal)
      .should('be.visible');
  }
}

export default DateRangePickerPage;
