describe('DateRangePicker', () => {

  const TODAY: Date = new Date();
  const YEAR: number = TODAY.getFullYear();
  const MONTH: string = (TODAY.getMonth() + 1 < 10 ? '0' : '') + (TODAY.getMonth() + 1); // Pad month manually if needed
  const DAY: string = (TODAY.getDate() < 10 ? '0' : '') + TODAY.getDate(); // Pad day manually if needed
  const FORMATTED_DATE: string = `${MONTH}/${DAY}/${YEAR}`;
  const INVALID_END_DATE: number = parseInt(DAY) - 1;
  const FORMATTED_INVALID_FUTURE_DATE: string = `${MONTH}/${INVALID_END_DATE}/${YEAR}`
  const VALID_END_DATE: number = parseInt(DAY) + 1;
  const FORMATTED_FUTURE_DATE: string = `${MONTH}/${VALID_END_DATE}/${YEAR}`

  it('should render app', () => {
    cy.visit('/');
    cy.get('.DateRangeSelect').should('be.visible');
  });

  it('should render input fields with correct placeholders', () => {
    cy.get('#mui-4')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'mm/dd/yyyy');
      cy.get('#mui-5')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'mm/dd/yyyy');
  });

  it('should open start date modal on click', () => {
    cy.get('#mui-4').click()
    cy.get('body > div:nth-of-type(2)').should('be.visible');   
  });

  it('should select valid input for start date', () => {
    // would like more info on expected behavior towards "valid" start date
    cy.get('#mui-4').click()
    cy.get('body > div:nth-of-type(2)').should('be.visible');
    cy.contains(DAY).click()
    cy.get('#mui-4').should('have.value', FORMATTED_DATE)  
  });

  it('should keep end date modal open if end date is before start date', () => {
    cy.get('#mui-4').click()
    cy.get('body > div:nth-of-type(2)').should('be.visible');
    cy.contains(DAY).click()
    cy.get('#mui-4').should('have.value', FORMATTED_DATE)
    cy.get('body > div:nth-of-type(2)').should('be.visible');
    cy.contains(INVALID_END_DATE).click()
    cy.get('#mui-5').should('not.have.value', FORMATTED_INVALID_FUTURE_DATE);
  });

  it('should close end date modal if end date is after start date', () => {

    cy.get('#mui-4').click()
    cy.get('body > div:nth-of-type(2)').should('be.visible');
    cy.contains(DAY).click()
    cy.get('#mui-4').should('have.value', FORMATTED_DATE)
    cy.get('#mui-5').click()
    cy.get('body > div:nth-of-type(2)').should('be.visible');
    cy.contains(VALID_END_DATE).click()
    cy.get('#mui-5').should('have.value', FORMATTED_FUTURE_DATE);
  });

});

