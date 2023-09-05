describe('TodosComponent', () => {
  it('should call getTodos in ngOnInit', () => {
    // Visita la página que contiene el componente TodosComponent
    cy.visit('/todos'); // Ajusta la URL según la configuración de tu enrutamiento

    // Espera a que la función getTodos del servicio se haya llamado al menos una vez
    cy.get('@todosService.getTodos').should('have.been.calledOnce');
  });

});