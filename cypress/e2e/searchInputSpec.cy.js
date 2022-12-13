const selectors = {
    result_People_Selector: 'section[data-testid="find-results-section-name"] ',
    result_Other_Selector: 'section[data-testid="find-results-section-title"] ',

    emptyResultSelector: 'div[data-testid="results-section-empty-results-msg"] ',

    // pre-footer blocks selectors
    moreResultsBlockSelector: 'section[data-testid="more-results-section"] ',
    advancedSearchBlockSelector: 'section[data-testid="advanced-search-section"] ',

    // other selectors
    resultItemSelector: 'li.find-result-item ',
    h1TitleSelector: '.ipc-page-section > h1 ',
    searchInputSelector: 'input[id="suggestion-search"] ',
    searchButtonSelector: 'button[id="suggestion-search-button"] '
}


const testDataInput = {
    wordOne: 'aword',
    spaceSearch: '     ',
    phrase: 'New but not',
    emoji: '💩💩💩',
    countSearchItems: document.getElementsByClassName('ipc-metadata-list-summary-item__tc').length,
    specialSymbols: '!@#$%^&*()-=+_',
    numbers: '1234567890',
    upperCase: 'UPEERCASEQ',
    scriptInp: '<script> alert("Hallo!");<script/>'
};


// Creating long string
function createLongString(stringLength) {
    let lString = 't'
    for (let i = 0; i < stringLength; i++) {
        lString += 't'
    }
    return (lString)
}
const lString = createLongString(1000)

// Check input values
describe('Search Input', () => {

    beforeEach(() => {
        cy.visit('/')
    })
    it('Accepts input', () => {
        cy.get(selectors.searchInputSelector)
            .type(testDataInput.phrase)
            .should('have.value', testDataInput.phrase)
    })
    it('Empty query', () => {
        cy.get(selectors.searchButtonSelector)
            .click()
        cy.get(selectors.h1TitleSelector)
            .should('have.text', 'Search IMDb')
        cy.contains('Search IMDb by typing a word or phrase in the search box at the top of this page.')
    })
    it('Emoji query', () => {
        cy.get(selectors.searchInputSelector).type(testDataInput.emoji)
        cy.get(selectors.searchButtonSelector).click()
        cy.get(selectors.searchInputSelector)
            .should('not.have.value')
        cy.get(selectors.result_Other_Selector)
            .should('be.visible')
        cy.get(selectors.result_People_Selector)
            .should('be.visible')
    })
    it('Long query', () => {
        cy.get(selectors.searchInputSelector).type(lString)
        cy.get(selectors.searchButtonSelector).click()
        cy.contains('Something went wrong. Please reload the page and try again. Go to the homepage')
    })
    it('Special symbols', () => {
        cy.get(selectors.searchInputSelector).type(testDataInput.specialSymbols)
        cy.get(selectors.searchButtonSelector).click()
        cy.get(selectors.searchInputSelector)
            .should('not.have.value')

        // check blocks of search results
        cy.get(selectors.result_Other_Selector)
            .should('be.visible')

        cy.get(selectors.result_People_Selector)
            .should('be.visible')
    })
    it('Numbers query', () => {
        cy.get(selectors.searchInputSelector).type(testDataInput.numbers)
        cy.get(selectors.searchButtonSelector).click()
        cy.get(selectors.searchInputSelector)
            .should('not.have.value')

        // check blocks of search results
        cy.get(selectors.result_Other_Selector)
            .should('be.visible')

        cy.get(selectors.result_People_Selector)
            .should('be.visible')
    })
    it('Upper case query', () => {
        cy.get(selectors.searchInputSelector).type(testDataInput.upperCase)
        cy.get(selectors.searchButtonSelector).click()
        cy.get(selectors.searchInputSelector)
            .should('not.have.value')

        // check blocks of search results
        cy.get(selectors.result_Other_Selector)
            .should('be.visible')

        cy.get(selectors.result_People_Selector)
            .should('be.visible')
    })
    it('Space query', () => {
        cy.get(selectors.searchInputSelector).type(testDataInput.spaceSearch)
        cy.get(selectors.searchButtonSelector).click()
        cy.get(selectors.searchInputSelector)
            .should('not.have.value')
        cy.get(selectors.h1TitleSelector)
            .should('have.text', 'Search IMDb')
        cy.contains('Search IMDb by typing a word or phrase in the search box at the top of this page.')
    })
    it('Script query (shielding)', () => {
        cy.get(selectors.searchInputSelector).type(testDataInput.scriptInp)
        cy.get(selectors.searchButtonSelector).click()
        cy.get(selectors.searchInputSelector)
            .should('not.have.value')

        // check blocks of search results
        cy.get(selectors.result_Other_Selector)
            .should('be.visible')

        cy.get(selectors.result_People_Selector)
            .should('be.visible')
    })
})