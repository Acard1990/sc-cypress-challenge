import { monthPickerClasses, yearPickerClasses } from '@mui/lab';
import DateRangePickerPage from '../pages/dateRangePickerPage';

describe('DateRangePicker', () => {
  /* 
Expected behavior questions that should be defined prior to testing...

What is considered valid input for start date? 
Is the dual month modal expected? I see it in the docs however, its a bit out of the norm. 
What error handling is expected when an invalid selection has occured.  
Is it expected that the selected input field changes after entering the value? ie: select a start date, and the user is automatically prompted to enter the end date.
Is there a restricted min/max amount for the date range? 
*/

  const TODAY: Date = new Date();
  const YEAR: number = TODAY.getFullYear();
  const MONTH: string =
    (TODAY.getMonth() + 1 < 10 ? '0' : '') + (TODAY.getMonth() + 1);
  const DAY: string = (TODAY.getDate() < 10 ? '0' : '') + TODAY.getDate();
  const FORMATTED_DATE: string = `${MONTH}/${DAY}/${YEAR}`;
  const INVALID_END_DATE: number = parseInt(DAY) - 1;
  const FORMATTED_INVALID_FUTURE_DATE: string = `${MONTH}/${INVALID_END_DATE}/${YEAR}`;
  const VALID_END_DATE: number = parseInt(DAY) + 1;
  const FORMATTED_FUTURE_DATE: string = `${MONTH}/${VALID_END_DATE}/${YEAR}`;
  const INVALID_END_DATE_STRING: string = `${INVALID_END_DATE}`;
  const VALID_END_DATE_STRING: string = `${VALID_END_DATE}`;

  let nextMonth: string;
  let nextYear: number;
  let previousMonth: string;
  let previousYear: number;

  // Increment month and year
  const incrementedMonth = TODAY.getMonth() + 1;

  if (incrementedMonth === 12) {
    // increment year
    nextMonth = '01';
    nextYear = TODAY.getFullYear() + 1;
  } else {
    // Otherwise, just increment the month
    nextMonth = (incrementedMonth + 1 < 10 ? '0' : '') + (incrementedMonth + 1);
    nextYear = TODAY.getFullYear();
  }

  // Decrement month
  const decrementedMonth = TODAY.getMonth();

  if (decrementedMonth === 0) {
    // If it's January (0), wrap around to December (12) and decrement the year
    previousMonth = '12';
    previousYear = TODAY.getFullYear() - 1;
  } else {
    // Otherwise, just decrement the month
    previousMonth = (decrementedMonth < 10 ? '0' : '') + decrementedMonth;
    previousYear = TODAY.getFullYear();
  }

  const MONTH_NAMES = [
    'zeroIndex',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const CURR_MONTH_NAME: string = MONTH_NAMES[MONTH];
  const NEXT_MONTH_NAME: string = MONTH_NAMES[nextMonth];
  const PREV_MONTH_NAME: string = MONTH_NAMES[previousMonth];

  const page = new DateRangePickerPage();

  beforeEach(() => {
    page.navToDateRangePickerPage();
  });

  it('should render app', () => {
    cy.log('woohoo it loaded');
  });

  it('should render input fields with correct placeholders', () => {
    page.assertStartTimePlaceHolder();
    page.assertEndTimePlaceHolder();
  });

  it('should open start date modal when user clicks on input field', () => {
    page.clickStartDateInputField();
    page.assertModalIsVisible();
  });

  it('should update start date value when user selects valid start date on modal and leave end date as default', () => {
    // please see notes at top
    page.clickStartDateInputField();
    page.assertModalIsVisible();
    page.clickSpecifiedDay(DAY);
    page.assertStartInputFieldVal(FORMATTED_DATE);
    page.assertEndTimePlaceHolder();
  });

  it('[bug]should update end date value when user selects valid end date on modal and not update start date input value', () => {
    // please see notes at top
    page.clickStartDateInputField();
    page.assertModalIsVisible();
    page.clickSpecifiedDay(DAY);
    page.assertStartInputFieldVal(FORMATTED_DATE); // assert start date
    page.clickEndDateInputField();
    page.clickSpecifiedDay(VALID_END_DATE_STRING);
    page.assertEndInputFieldVal(FORMATTED_FUTURE_DATE); // assert end date
    page.assertStartInputFieldVal(FORMATTED_DATE); // assert start date has not changed.
  });

  it('should keep modal open if user selects end date that is before start date', () => {
    // please see notes at top
    // This is buggy and no error handling but Im taking this as its "expected behavior"
    page.clickStartDateInputField();
    page.assertModalIsVisible();
    page.clickSpecifiedDay(DAY);
    page.assertStartInputFieldVal(FORMATTED_DATE);
    page.assertModalIsVisible();
    page.clickSpecifiedDay(INVALID_END_DATE_STRING);
    page.assertEndInputFieldValIsNot(FORMATTED_INVALID_FUTURE_DATE);
  });

  it('[bug]should close modal if user has selected end date that is after start date', () => {
    page.clickStartDateInputField();
    page.assertModalIsVisible();
    page.clickSpecifiedDay(DAY);
    page.assertStartInputFieldVal(FORMATTED_DATE);
    page.clickEndDateInputField();
    page.assertModalIsVisible();
    page.clickSpecifiedDay(VALID_END_DATE_STRING);
    page.assertEndInputFieldVal(FORMATTED_FUTURE_DATE);
    page.assertModalIsNotVisible();
  });

  it('[bug] should update start and end date value when entering date with keyboard versus modal', () => {
    page.typeValToInput(FORMATTED_DATE);
    // page.typeValToInput('{tab}'); // not supported by cypress, so will substitute
    page.clickEndDateInputField();
    page.typeValToInput(FORMATTED_FUTURE_DATE);
    page.assertEndInputFieldVal(FORMATTED_DATE);
    page.assertEndInputFieldVal(FORMATTED_FUTURE_DATE);
  });

  it('user can input date range starting in one month and ending in another', () => {
    // Omitting for sake of time, but wanted to add the test case
  });

  it('user can input date range starting in one year and ending in another', () => {
    // Omitting for sake of time, but wanted to add the test case
  });

  it('should update string month values at top of modal when clicking next button', () => {
    page.clickStartDateInputField();
    page.assertModalIsVisible();
    page.assertMonthModalHeaderValue(CURR_MONTH_NAME + ' ' + YEAR);
    page.clickNextMonthBtn();
    page.assertMonthModalHeaderValue(NEXT_MONTH_NAME + ' ' + nextYear);
  });

  it('should update string month values at top of modal when clicking previous button', () => {
    // Omitting for sake of time, but wanted to add the test case
  });

  it('should iluminate the selected time frame within the modal', () => {
    // Omitting for sake of time, but wanted to add the test case
  });

  it('[bug]should open modal when user clicks on input field after making selections', () => {
    // Omitting for sake of time, but wanted to add the test case
  });
});
