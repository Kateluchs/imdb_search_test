const selectors = {
    advancedSearchBlockSelector: 'section[data-testid="advanced-search-section"] ',

}

describe('Transitions from search results', () => {

    beforeEach(() => {
        // Go to home page
        cy.visit('/')

        // Enter a search query
        cy.get('input[id="suggestion-search"]').type('Tom Ford')

        // Press the "Search" button
        cy.get('button[id="suggestion-search-button"]').click()

    })
    it('Transition to Movies, TV & more', () => {

        // Go to the advanced title search section
        cy.get(selectors.advancedSearchBlockSelector).contains('Movies, TV & more').click()

        // Checking the url
        cy.url().should('include', '/search/title/?ref_=fn_asr_tt')

        // Checking the display of the title and main block
        cy.get('h1').should('have.text', 'Advanced Title Search')
        cy.get('#main').should('be.visible')
    })

    it('Transition to Movies, People', () => {

        // Go to the advanced people search section
        cy.get(selectors.advancedSearchBlockSelector).contains('People').click()

        // Checking the url
        cy.url().should('include', '/search/name/?ref_=fn_asr_nm')

        // Checking the display of the title and main block
        cy.get('h1').should('have.text', 'Advanced Name Search')
        cy.get('#main').should('be.visible')
    })
    it('Transition to Collaborations', () => {

        // Go to the advanced collaborations search section
        cy.get(selectors.advancedSearchBlockSelector).contains('Collaborations').click()

        // Checking the url
        cy.url().should('include', '/search/common/?ref_=fn_asr_co')

        // Checking the display of the title and main block
        cy.get('h1').should('have.text', 'Collaborations')
        cy.get('#main').should('be.visible')
    })
    it('Transition to Advanced Search (All)', () => {

        // Go to the advanced collaborations search section
        cy.get(selectors.advancedSearchBlockSelector).contains('All').click()

        // Checking the url
        cy.url().should('include', '/search?ref_=fn_asr_to')

        // Checking the display of the title and main block
        cy.get('h1').should('have.text', 'Advanced Search')
        cy.get('#main').should('be.visible')
    })
})

describe.only('Transitions from search results', () => {

    beforeEach(() => {
        // Go to home page
        cy.visit('/')

        //Open menu
        cy.get('.ipc-button--core-base #iconContext-arrow-drop-down').click();

        //Click Keywords
        cy.get('div[data-menu-id="navbar-search-category-select"]').contains('Advanced Search').click();

    })
    it('Transition to Movies, TV & more', () => {

        // Checking the url
        cy.url().should('include', '/search')

        // Checking the display of the title and main block
        cy.get('h1').should('have.text', 'Advanced Search')
        cy.get('#main').should('be.visible')
    })
})