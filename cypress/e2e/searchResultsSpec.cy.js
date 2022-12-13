const testSearchData = {
  title: 'hugo pool',
  titleResult: new RegExp('Hugo|Pool'),

  name: 'JaMi',
  nameResult: new RegExp('Jamie|Jami'),

  moviePerson: 'STEVEN',
  moviePersonResult: new RegExp('Steve|Stevens|Steven'),

  company: 'Warner',

  keyword: 'tales',
  keywordResult: new RegExp('Tales|Meryem|tales'),

  langTitle: 'broen',
  langEngResult: new RegExp('Bridge|Broen|Brown'),
  langFrenchResult: new RegExp('Broen|pont|Brücke'),
  langGermResult: new RegExp('Broen|Brücke'),
  langSpanResult: new RegExp('Broen|puente|')
};

const selectors = {
  searchInputSelector: 'input[id="suggestion-search"] ',
  searchButtonSelector: 'button[id="suggestion-search-button"] ',
  resultItemSelector: '.ipc-metadata-list-summary-item__tc ',

  result_People_Selector: 'section[data-testid="find-results-section-name"] ',
  result_Company_Selector: 'section[data-testid="find-results-section-company"] ',
  result_Keyword_Selector: 'section[data-testid="find-results-section-keyword"] ',
  result_Other_Selector: 'section[data-testid="find-results-section-title"] ',
  moreResultsBlockSelector: 'section[data-testid="more-results-section"] ',
}

function capitalize(str) {

  return str.replace(/(^|\s)\S/g, function (a) {
    return a.toUpperCase()
  })

}

describe('Search Results General', () => {
  beforeEach(() => {

    // Go to home page
    cy.visit('/')

  })

  /* - If we enter a search query, the default search results page will display all matches (both partial and full).
    - If after that we go to the "Exact matches" section, then only full matches will be displayed.
  */
  it('Checking partial and full matches in Title block', () => {

    // Enter a search query
    cy.get(selectors.searchInputSelector)
      .type(testSearchData.title)

    // Press the "Search" button
    cy.get(selectors.searchButtonSelector).click()

    // Checking the url
    cy.url().should('include', '/find?q=hugo+pool&ref_=nv_sr_sm')

    /* Sometimes in the search results, due to a localization error, search results are displayed in different languages (By default, I have English, but the search results may contain names in Russian because of my ).
       This block of code switches the interface to French and then back to English so that all search results are in English.
    */
    cy.get('.sc-f2e21260-0 > .ipc-page-section:nth-child(1) > .ipc-title > hgroup > .ipc-title__text').click()
    cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
    cy.get('#nav-language-selector-contents > .ipc-list > #language-option-fr-CA > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
    cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
    cy.get('#nav-language-selector-contents > .ipc-list > #language-option-en-US > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
    /* End of switching languages block */

    // Checking partial matches
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(testSearchData.titleResult).should('be.visible')
    })

    // Go to exact matches
    cy.get(selectors.result_Other_Selector)
      .contains('Exact matches')
      .click()

    // Checking Exact matches
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(capitalize((testSearchData.title).toLowerCase())).should('be.visible')
    })

  })
  it('Checking partial and full matches in People block', () => {
    // Enter a search query
    cy.get(selectors.searchInputSelector)
      .type(testSearchData.name)

    // Press the "Search" button
    cy.get(selectors.searchButtonSelector).click()

    // Checking the url
    cy.url().should('include', '/find?q=JaMi&ref_=nv_sr_sm')

    /* Sometimes in the search results, due to a localization error, search results are displayed in different languages (By default, I have English, but the search results may contain names in Russian because of my ).
       This block of code switches the interface to French and then back to English so that all search results are in English.
      */
    cy.get('.sc-f2e21260-0 > .ipc-page-section:nth-child(1) > .ipc-title > hgroup > .ipc-title__text').click()
    cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
    cy.get('#nav-language-selector-contents > .ipc-list > #language-option-fr-CA > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
    cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
    cy.get('#nav-language-selector-contents > .ipc-list > #language-option-en-US > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
    /* End of switching languages block */

    //Checking partial matches
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(testSearchData.nameResult).should('be.visible')
    })

    // Go to exact matches
    cy.get(selectors.result_Other_Selector)
      .contains('Exact matches')
      .click()

    // Checking Exact matches
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(capitalize((testSearchData.name).toLowerCase())).should('be.visible')
    })

  })
  /* If we enter a search query, but we do not see any matches in a search result, we check that they are in the search result card.
   */
  it('Checking matches in inner content of Movie block', () => {

    // Enter a search query
    cy.get(selectors.searchInputSelector)
      .type(testSearchData.moviePerson)

    // Press the "Search" button
    cy.get(selectors.searchButtonSelector).click()

    // Checking the url
    cy.url().should('include', '/find?q=STEVEN&ref_=nv_sr_sm')

    // Go to movies
    cy.get(selectors.moreResultsBlockSelector).contains('Movies').click()

    // Checking the url
    cy.url().should('include', '/find/?q=steven&s=tt&ttype=ft&ref_=fn_ft')

/* Sometimes in the search results, due to a localization error, search results are displayed in different languages (By default, I have English, but the search results may contain names in Russian because of my ).
       This block of code switches the interface to French and then back to English so that all search results are in English.
      */
       cy.get('.sc-f2e21260-0 > .ipc-page-section:nth-child(1) > .ipc-title > hgroup > .ipc-title__text').click()
       cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
       cy.get('#nav-language-selector-contents > .ipc-list > #language-option-fr-CA > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
       cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
       cy.get('#nav-language-selector-contents > .ipc-list > #language-option-en-US > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
       /* End of switching languages block */

    // Go to the card, in the preview of which there is no search query
    cy.get(selectors.resultItemSelector).contains("Schindler's List").click()

    // Checking the url
    cy.url().should('include', '/title/tt0108052/?ref_=fn_al_tt_4')

    // Checking that there is a search query inside the card
    cy.contains(capitalize((testSearchData.moviePerson).toLowerCase())).should('be.visible')
  })

  /* Checking that if we first searched on the main page and then switched to companies, the search would continue in companies.
   */
  it('Checking matches in Companies after searching in the Main page', () => {

    // Enter a search query
    cy.get(selectors.searchInputSelector)
      .type(testSearchData.moviePerson)

    // Press the "Search" button
    cy.get(selectors.searchButtonSelector).click()

    // Checking the url
    cy.url().should('include', '/find?q=STEVEN&ref_=nv_sr_sm')

    // Go to Companies
    cy.get(selectors.moreResultsBlockSelector).contains('Companies').click()

    // Checking the url
    cy.url().should('include', '/find/?q=steven&s=co&ref_=fn_co')

    // Checking title of the block
    cy.get(selectors.result_Company_Selector + ' > div')
      .contains('Companies')
      .should('be.visible')

    // Enter тew search query
    cy.get(selectors.searchInputSelector)
      .type(testSearchData.company)

    // Press the "Search" button
    cy.get(selectors.searchButtonSelector).click()

    // Checking the url
    cy.url().should('include', '/find?s=co&q=Warner&ref_=nv_sr_sm')

    // Checking title of the block
    cy.get(selectors.result_Company_Selector + ' > div')
      .contains('Companies')
      .should('be.visible')

    // Checking the search block to the left of the search string
    cy.get('#nav-search-form').contains('Companies')
      .should('be.visible')

    // Checking results
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(capitalize(testSearchData.company)).should('be.visible')
    })
  })

  /* Checking that if we first searched on the main page and then switched to Music Videos, the search would continue in Titles.
   */
  it('Checking matches in Titles after searching in the Main page, and switching to Music Videos', () => {

    // Enter a search query
    cy.get(selectors.searchInputSelector)
      .type(testSearchData.moviePerson)

    // Press the "Search" button
    cy.get(selectors.searchButtonSelector).click()

    // Checking the url
    cy.url().should('include', '/find?q=STEVEN&ref_=nv_sr_sm')

    // Go to Music Videos
    cy.get(selectors.moreResultsBlockSelector).contains('Music Videos').click()

    // Checking the url
    cy.url().should('include', '/find/?q=steven&s=tt&ttype=mu&ref_=fn_mu')

    // Checking the title of the block
    cy.get(selectors.result_Other_Selector + ' > div')
      .contains('Music Videos')
      .should('be.visible')

    // Enter тew search query
    cy.get(selectors.searchInputSelector)
      .type(testSearchData.keyword)

    // Press the "Search" button
    cy.get(selectors.searchButtonSelector).click()

    // Checking the url
    cy.url().should('include', '/find?s=tt&q=tales&ref_=nv_sr_sm')

    // Checking the title of the block
    cy.get(selectors.result_Other_Selector + ' > div')
      .contains('Titles')
      .should('be.visible')

    // Checking the search block to the left of the search string
    cy.get('#nav-search-form').contains('Titles')
      .should('be.visible')

    /* Sometimes in the search results, due to a localization error, search results are displayed in different languages (By default, I have English, but the search results may contain names in Russian because of my ).
       This block of code switches the interface to French and then back to English so that all search results are in English.
      */
    cy.get('.sc-f2e21260-0 > .ipc-page-section:nth-child(1) > .ipc-title > hgroup > .ipc-title__text').click()
    cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
    cy.get('#nav-language-selector-contents > .ipc-list > #language-option-fr-CA > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
    cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
    cy.get('#nav-language-selector-contents > .ipc-list > #language-option-en-US > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
    /* End of switching languages block */

    // Checking results
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(testSearchData.keywordResult).should('be.visible')
    })
  })
  /*If we search in English and then switch to other languages, the titles adapt.*/
  it('Checking matches in Keywords after switching to Keywords in the search block', () => {

    // Switching to the Keywords in the search block to the left of the search string
    //Open menu
    cy.get('.ipc-button--core-base #iconContext-arrow-drop-down').click();

    //Click Keywords
    cy.get('div[data-menu-id="navbar-search-category-select"]').contains('Keywords').click();

    // Enter a search query
    cy.get(selectors.searchInputSelector)
      .type(testSearchData.keyword)

    // Press the "Search" button
    cy.get(selectors.searchButtonSelector).click()

    // Checking the url
    cy.url().should('include', '/find?s=kw&q=tales&ref_=nv_sr_sm')

    // Checking the title of the block 
    cy.get(selectors.result_Keyword_Selector + ' > div')
      .contains('Keywords')
      .should('be.visible')

    // Checking the search block to the left of the search string
    cy.get('#nav-search-form').contains('Keywords')
      .should('be.visible')

    // Checking results
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains('tales').should('be.visible')
    })
  })
  // Enter a search query
  it('Checking results in different languages', () => {
    cy.get(selectors.searchInputSelector)
      .type(testSearchData.langTitle)

    // Press the "Search" button
    cy.get(selectors.searchButtonSelector).click()

    // Checking the url
    cy.url().should('include', '/find?q=broen&ref_=nv_sr_sm')

    /* Sometimes in the search results, due to a localization error, search results are displayed in different languages (By default, I have English, but the search results may contain names in Russian because of my ).
           This block of code switches the interface to French and then back to English so that all search results are in English.
        */
    cy.get('.sc-f2e21260-0 > .ipc-page-section:nth-child(1) > .ipc-title > hgroup > .ipc-title__text').click()
    cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
    cy.get('#nav-language-selector-contents > .ipc-list > #language-option-fr-CA > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
    cy.get('#imdbHeader > .ipc-page-content-container > .sc-dQppl > .ipc-button > .ipc-button__text').click()
    cy.get('#nav-language-selector-contents > .ipc-list > #language-option-en-US > .language-menu-item-span > #iconContext-radio-button-unchecked').click()
    /* End of switching languages block */

    // Checking matches in English
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(testSearchData.langEngResult).should('be.visible')
    })

    // Switching to French
    cy.get('label[for="nav-language-selector"]').click()
    cy.get('div[data-menu-id="nav-language-selector"]').contains('Français (Canada)').click()

    // Checking matches in French
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(testSearchData.langFrenchResult).should('be.visible')
    })

    // Switching to German
    cy.get('label[for="nav-language-selector"]').click()
    cy.get('div[data-menu-id="nav-language-selector"]').contains('Deutsch (Deutschland)').click()

    // Checking matches in German
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(testSearchData.langGermResult).should('be.visible')
    })

    // Switching to Spanish
    cy.get('label[for="nav-language-selector"]').click()
    cy.get('div[data-menu-id="nav-language-selector"]').contains('Español (España)').click()

    // Checking matches in Spanish
    cy.get(selectors.resultItemSelector).each(($el) => {
      cy.wrap($el).contains(testSearchData.langSpanResult).should('be.visible')
    })

  })
})