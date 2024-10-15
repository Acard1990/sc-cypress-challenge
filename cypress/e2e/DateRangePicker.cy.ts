import DateRangePickerPage from "../pages/dateRangePickerPage"; 

describe('DateRangePicker', () => {

  const TODAY: Date = new Date();
  const YEAR: number = TODAY.getFullYear();
  const MONTH: string = (TODAY.getMonth() + 1 < 10 ? '0' : '') + (TODAY.getMonth() + 1);
  const DAY: string = (TODAY.getDate() < 10 ? '0' : '') + TODAY.getDate();
  const FORMATTED_DATE: string = `${MONTH}/${DAY}/${YEAR}`;
  const INVALID_END_DATE: number = parseInt(DAY) - 1;
  const FORMATTED_INVALID_FUTURE_DATE: string = `${MONTH}/${INVALID_END_DATE}/${YEAR}`;
  const VALID_END_DATE: number = parseInt(DAY) + 1;
  const FORMATTED_FUTURE_DATE: string = `${MONTH}/${VALID_END_DATE}/${YEAR}`;
  const INVALID_END_DATE_STRING: string = `${INVALID_END_DATE}`;
  const VALID_END_DATE_STRING: string = `${VALID_END_DATE}`;
  const page = new DateRangePickerPage();

  beforeEach(() => {
    page.navToDateRangePickerPage();
  })

  it('should render app', () => {
    cy.log('woohoo it loaded')  
  });

  it('should render input fields with correct placeholders', () => {
    page.assertStartTimePlaceHolder(); 
    page.assertEndTimePlaceHolder(); 
  });

  it('should open start date modal on click', () => {
    page.clickStartDateInputField(); 
    page.assertModalIsVisible(); 
  });

  it('should select valid input for start date', () => {
    page.clickStartDateInputField(); 
    page.assertModalIsVisible(); 
    page.clickSpecifiedDay(DAY); 
    page.assertStartInputFieldVal(FORMATTED_DATE); 
  });

  it('should keep end date modal open if end date is before start date', () => {
    page.clickStartDateInputField(); 
    page.assertModalIsVisible(); 
    page.clickSpecifiedDay(DAY); 
    page.assertStartInputFieldVal(FORMATTED_DATE); 
    page.assertModalIsVisible(); 
    page.clickSpecifiedDay(INVALID_END_DATE_STRING); 
    page.assertEndInputFieldValIsNot(FORMATTED_INVALID_FUTURE_DATE); 
  });

  it('should close end date modal if end date is after start date', () => {
    page.clickStartDateInputField(); 
    page.assertModalIsVisible(); 
    page.clickSpecifiedDay(DAY); 
    page.assertStartInputFieldVal(FORMATTED_DATE); 
    page.clickEndDateInputField(); 
    page.assertModalIsVisible(); 
    page.clickSpecifiedDay(VALID_END_DATE_STRING); 
    page.assertEndInputFieldVal(FORMATTED_FUTURE_DATE); 
  });

});
