describe('store-ui-shared', () => {
  const TITLE = 'BoardGameHoard';

  beforeEach(() =>
    cy.visit(`/iframe.html?id=headercomponent--primary&args=title:${TITLE}`)
  );
  it('should render the component', () => {
    cy.get('bg-hoard-header').should('exist');
  });

  it('should show the title', () => {
    cy.get('bg-hoard-header').contains(TITLE);
  });
});
