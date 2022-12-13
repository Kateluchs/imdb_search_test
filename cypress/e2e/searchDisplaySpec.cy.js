//npx cypress open

const testDataDisplay = {
  allResultsQuery: 'holly',
  noResultsQuery: 'syshdghsnd',
  countSearchItems: document.getElementsByClassName('ipc-metadata-list-summary-item__tc').length
};
const displaySelectors = {
  // blocks main selectors
  result_People_Selector: 'section[data-testid="find-results-section-name"] ',
  result_Company_Selector: 'section[data-testid="find-results-section-company"] ',
  result_Keyword_Selector: 'section[data-testid="find-results-section-keyword"] ',
  result_Other_Selector: 'section[data-testid="find-results-section-title"] ',

  emptyResultSelector: 'div[data-testid="results-section-empty-results-msg"] ',

  // pre-footer blocks selectors
  moreResultsBlockSelector: 'section[data-testid="more-results-section"] ',
  advancedSearchBlockSelector: 'section[data-testid="advanced-search-section"] ',

  // other selectors
  resultItemSelector: 'li.find-result-item ',
  h1TitleSelector: '.ipc-page-section > h1 '

}

let h1TitleResults = 'Search "' + testDataDisplay.allResultsQuery + '"'
let h1TitleNoResults = 'Search "' + testDataDisplay.noResultsQuery + '"'



/* If we enter a query for which there are many results in all blocks,
they will be displayed in all blocks in the right way.
*/
describe('Results In 1 Type Blocks', () => {

  beforeEach(() => {
    // Go to home page
    cy.visit('/')

    // Enter a search query
    cy.get('input[id="suggestion-search"]').type(testDataDisplay.allResultsQuery)

    // Press the "Search" button
    cy.get('button[id="suggestion-search-button"]').click()
  })
  it('Results in Main block (Titles and People)', () => {

    // Checking the url
    cy.url().should('include', '/find?q=holly&ref_=nv_sr_sm')
    
    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // ---- Interaction with the titles block

    // Checking that the title of the block with search results by title contains the title
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Titles')
      .should('be.visible')

    // Checking that the title of the block with search results by title contains the "Exact matches" button
    cy.get(displaySelectors.result_Other_Selector)
      .contains('Exact matches')
      .should('be.visible')

    // Checking that the block with search results by titles contains 5 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 5)

    // Press More popular matches button
    cy.get(displaySelectors.result_Other_Selector + 'button').click()

    // Checking that the block with search results by titles contains 30 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 30)

    // ---- Interaction with the people block

    // Checking that the title of the block with search results by people contains the title
    cy.get(displaySelectors.result_People_Selector + ' > div')
      .contains('People')
      .should('be.visible')

    // Checking that the title of the block with search results by title contains the "Exact matches" button
    cy.get(displaySelectors.result_People_Selector)
      .contains('Exact matches')
      .should('be.visible')

    // Checking that the block with search results by people contains 5 elements
    cy.get(displaySelectors.result_People_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 5)

    // Press More popular matches button
    cy.get(displaySelectors.result_People_Selector + 'button').click()

    // Checking that the block with search results by titles contains 30 elements
    cy.get(displaySelectors.result_People_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 30)

    //----Checking the display of the blocks "More results" and "Advanced search"----

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
  it('Results in Movies', () => {

    // Go to movies
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Movies').click()

    // Checking the url
    cy.url().should('include', '/find/?q=holly&s=tt&ttype=ft&ref_=fn_ft')
    
    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Movie')
      .should('be.visible')

    // Checking that the title of the block with search results contains the "Exact matches" button
    cy.get(displaySelectors.result_Other_Selector)
      .contains('Exact matches')
      .should('be.visible')

    // Checking that the block with search results contains 25 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 25)

    // Press More popular matches button
    cy.get(displaySelectors.result_Other_Selector + 'button').click()

    // Checking that the block with search results by people contains 50 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 50)
  })
  it('Results in TV', () => {

    // Go to TV
    cy.get(displaySelectors.moreResultsBlockSelector).contains(new RegExp('^TV$')).click()

    // Checking that the page title contains a search query
    cy.url().should('include', '/find/?q=holly&s=tt&ttype=tv&ref_=fn_tv')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('TV')
      .should('be.visible')

    // Checking that the title of the block with search results contains the "Exact matches" button
    cy.get(displaySelectors.result_Other_Selector)
      .contains('Exact matches')
      .should('be.visible')

    // Checking that the block with search results contains 25 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 25)

    // Press More popular matches button
    cy.get(displaySelectors.result_Other_Selector + 'button').click()

    // Checking that the block with search results by people contains 50 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 50)
  })
  it('Results in TV Episodes', () => {
    
    // Go to TV Episodes
    cy.get(displaySelectors.moreResultsBlockSelector).contains('TV Episodes').click()

    //Checking the url
    cy.url().should('include', '/find/?q=holly&s=tt&ttype=ep&ref_=fn_ep')
    
    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('TV Episodes')
      .should('be.visible')

    // Checking that the title of the block with search results contains the "Exact matches" button
    cy.get(displaySelectors.result_Other_Selector)
      .contains('Exact matches')
      .should('be.visible')

    // Checking that the block with search results contains 25 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 25)

    // Press More popular matches button
    cy.get(displaySelectors.result_Other_Selector + 'button').click()

    // Checking that the block with search results by people contains 50 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 50)
  })
  it('Results in Music Videos', () => {

    // Go to Music Videos
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Music Videos').click()

    // Checking the url
    cy.url().should('include', '/find/?q=holly&s=tt&ttype=mu&ref_=fn_mu')
    
    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Music Videos')
      .should('be.visible')

    // Checking that the block with search results contains 25 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 25)

    // Press More popular matches button
    cy.get(displaySelectors.result_Other_Selector + 'button').click()

    // Checking that the block with search results by people contains 50 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 50)
  })
  it('Results in Podcasts', () => {

    // Go to Podcasts
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Podcasts').click()

    // Checking the url
    cy.url().should('include', '/find/?q=holly&s=tt&ttype=ps&ref_=fn_ps')
    
    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Podcasts')
      .should('be.visible')

    // Checking that the block with search results contains 25 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 25)

    // Press More popular matches button
    cy.get(displaySelectors.result_Other_Selector + 'button').click()

    // Checking that the block with search results by people contains 50 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 50)
  })
  it('Results in TV Podcast Episodes', () => {

    // Go to Podcast Episodes
    cy.get(displaySelectors.moreResultsBlockSelector).contains(new RegExp('Podcast Episodes')).click()

    // Checking the url
    cy.url().should('include', '/find/?q=holly&s=tt&ttype=pe&ref_=fn_pe')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Podcast Episodes')
      .should('be.visible')

    // Checking that the title of the block with search results contains the "Exact matches" button
    cy.get(displaySelectors.result_Other_Selector)
      .contains('Exact matches')
      .should('be.visible')

    // Checking that the block with search results contains 25 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 25)

    // Press More popular matches button
    cy.get(displaySelectors.result_Other_Selector + 'button').click()

    // Checking that the block with search results by people contains 50 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 50)
  })
  it('Results in Video Games', () => {

    // Go to Video Games
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Video Games').click()

    // Checking the url
    cy.url().should('include', '/find/?q=holly&s=tt&ttype=vg&ref_=fn_vg')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Video Games')
      .should('be.visible')

    // Checking that the block with search results contains 25 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 25)

    // Press More popular matches button
    cy.get(displaySelectors.result_Other_Selector + 'button').click()

    // Checking that the block with search results by people contains 41 elements
    cy.get(displaySelectors.result_Other_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 41)
  })
  it('Companies', () => {

    // go to Companies
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Companies').click()

    // Checking the url
    cy.url().should('include', '/find/?q=holly&s=co&ref_=fn_co')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Company_Selector + ' > div')
      .contains('Companies')
      .should('be.visible')

    // Checking that the title of the block with search results contains the "Exact matches" button
    cy.get(displaySelectors.result_Company_Selector)
      .contains('Exact matches')
      .should('be.visible')

    // Checking that the block with search results contains 25 elements
    cy.get(displaySelectors.result_Company_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 25)

    // Press More popular matches button
    cy.get(displaySelectors.result_Company_Selector + 'button').click()

    // Checking that the block with search results by people contains 50 elements
    cy.get(displaySelectors.result_Company_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 50)
  })
  it('Keywords', () => {

    // Go to Keywords
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Keywords').click()

    // Checking the url
    cy.url().should('include', '/find/?q=holly&s=kw&ref_=fn_kw')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Keyword_Selector + ' > div')
      .contains('Keywords')
      .should('be.visible')

    // Checking that the title of the block with search results contains the "Exact matches" button
    cy.get(displaySelectors.result_Keyword_Selector)
      .contains('Exact matches')
      .should('be.visible')

    // Checking that the block with search results contains 25 elements
    cy.get(displaySelectors.result_Keyword_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 25)

    // Press More popular matches button
    cy.get(displaySelectors.result_Keyword_Selector + 'button').click()

    // Checking that the block with search results by people contains 50 elements
    cy.get(displaySelectors.result_Keyword_Selector)
      .find(displaySelectors.resultItemSelector)
      .its('length')
      .should('eq', 50)
  })
})

describe('Results In 2 Type Blocks', () => {
  beforeEach(() => {

    // Go to homepage
    cy.visit('/')

    // Enter a search query
    cy.get('input[id="suggestion-search"]').type(testDataDisplay.allResultsQuery)

    // Press the "Search" button
    cy.get('button[id="suggestion-search-button"]').click()
  })
  it('Results in Quotes block ', () => {

    // Go to quotes
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Quotes').click()

    // Checking the url
    cy.url().should('include', '/search/title-text/?quotes=holly&ref_=fn_qu')

    // Checking the content of the page title
    cy.get('div[class="article"]')
      .contains('Titles with Quotes Matching "' + testDataDisplay.allResultsQuery + '" (Sorted by Match Descending)')
      .should('be.visible')

    // Checking that the block with search results contains 50 elements
    cy.get('div[class="lister-list"]')
      .find('div[class="lister-item mode-detail"]')
      .its('length')
      .should('eq', 50)
  })
  it('Results in Plot Summaries block ', () => {

    // Go to plot summaries
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Plot Summaries').click()

    // Checking the url
    cy.url().should('include', '/search/title-text/?plot=holly&ref_=fn_pl')

    // Checking the content of the page title
    cy.get('div[class="article"]')
      .contains('Titles with Plot Matching "' + testDataDisplay.allResultsQuery + '" (Sorted by Match Descending)')
      .should('be.visible')

    // Checking that the block with search results contains 50 elements
    cy.get('div[class="lister-list"]')
      .find('div[class="lister-item mode-detail"]')
      .its('length')
      .should('eq', 50)
  })
  it('Results in Biographies block ', () => {
    // Go to biographies
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Biographies').click()

    // Checking the url
    cy.url().should('include', '/search/name-text/?bio=holly&ref_=fn_bi')

    // Checking the content of the page title
    cy.get('div[class="article"]')
      .contains('People with Biographies Matching "' + testDataDisplay.allResultsQuery + '" (Sorted by Match Descending)')
      .should('be.visible')

    // Checking that the block with search results contains 50 elements
    cy.get('div[class="lister-list"]')
      .find('div[class="lister-item mode-detail"]')
      .its('length')
      .should('eq', 50)
  })
})

/* If we enter a query for which there are no results in all blocks,
they will be displayed no results message about.
*/
describe('No Results In 1 Type Blocks', () => {

  beforeEach(() => {
    // Go to home page
    cy.visit('/')

    // Enter a search query
    cy.get('input[id="suggestion-search"]').type(testDataDisplay.noResultsQuery)

    // Press the "Search" button
    cy.get('button[id="suggestion-search-button"]').click()
  })

  it('No Results in Main block (Titles and People)', () => {

    // Checking the url
    cy.url().should('include', '/find?q=syshdghsnd&ref_=nv_sr_sm')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // --Checking that the title of the block with search results by title contains the title
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Titles')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Other_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // --Checking that the title of the block with search results by people contains the title

    cy.get(displaySelectors.result_People_Selector)
      .contains('People')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_People_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
  it('No Results in Movies', () => {

    // Go to movies
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Movies').click()

    // Checking the url
    cy.url().should('include', '/find/?q=syshdghsnd&s=tt&ttype=ft&ref_=fn_ft')

     // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Movie')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Other_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
  it('No Results in TV', () => {

    // Go to TV
    cy.get(displaySelectors.moreResultsBlockSelector).contains(new RegExp('^TV$')).click()

    // Checking the url
    cy.url().should('include', '/find/?q=syshdghsnd&s=tt&ttype=tv&ref_=fn_tv')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('TV')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Other_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
  it('No Results in TV Episodes', () => {

    // Go to TV Episodes
    cy.get(displaySelectors.moreResultsBlockSelector).contains('TV Episodes').click()

    // Checking the url
    cy.url().should('include', '/find/?q=syshdghsnd&s=tt&ttype=ep&ref_=fn_ep')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('TV Episodes')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Other_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')

  })
  it('No Results in Music Videos', () => {

    // Go to Music Videos
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Music Videos').click()

    // Checking the url
    cy.url().should('include', '/find/?q=syshdghsnd&s=tt&ttype=mu&ref_=fn_mu')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Music Videos')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Other_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
  it('No Results in Podcasts', () => {

    // go to Podcasts
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Podcasts').click()

    // Checking the url
    cy.url().should('include', '/?q=syshdghsnd&s=tt&ttype=ps&ref_=fn_ps')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Podcasts')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Other_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
  it('No Results in TV Podcast Episodes', () => {

    // go to Podcast Episodes
    cy.get(displaySelectors.moreResultsBlockSelector).contains(new RegExp('Podcast Episodes')).click()

    // Checking the url
    cy.url().should('include', '/find/?q=syshdghsnd&s=tt&ttype=pe&ref_=fn_pe')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Podcast Episodes')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Other_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking Advanced search block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
  it('No Results in Video Games', () => {

    // Go to Video Games
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Video Games').click()

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // ----check Video Games----
    cy.get(displaySelectors.result_Other_Selector + ' > div')
      .contains('Video Games')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Other_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
  it('No Companies', () => {

    // Go to Companies
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Companies').click()

    // Checking the url
    cy.url().should('include', '/find/?q=syshdghsnd&s=co&ref_=fn_co')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Company_Selector + ' > div')
      .contains('Companies')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Company_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
  it('No Keywords', () => {

    // Go to Keywords
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Keywords').click()

    // Checking the url
    cy.url().should('include', '/find/?q=syshdghsnd&s=kw&ref_=fn_kw')

    // Checking that the page title contains a search query
    cy.get(displaySelectors.h1TitleSelector)
      .should('have.text', h1TitleNoResults)

    // Checking that the title of the block with search results contains the name of the block
    cy.get(displaySelectors.result_Keyword_Selector + ' > div')
      .contains('Keywords')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get(displaySelectors.result_Keyword_Selector + displaySelectors.emptyResultSelector)
      .should('have.text', 'No results found for "' + testDataDisplay.noResultsQuery + '"')

    // Checking More results block
    cy.get(displaySelectors.moreResultsBlockSelector)
      .contains('More results')
      .should('be.visible')

    // Checking Advanced search block
    cy.get(displaySelectors.advancedSearchBlockSelector)
      .contains('Advanced search')
      .should('be.visible')
  })
})

describe('No Results In 2 Type Blocks', () => {
  beforeEach(() => {
    // Go to homepage
    cy.visit('/')

    // Enter a search query
    cy.get('input[id="suggestion-search"]').type(testDataDisplay.noResultsQuery)

    // Press the "Search" button
    cy.get('button[id="suggestion-search-button"]').click()
  })
  it('No Results in Quotes block ', () => {
    // Go to Quotes
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Quotes').click()

    // Checking the url
    cy.url().should('include', '/search/title-text/?quotes=syshdghsnd&ref_=fn_qu')

    // Checking the content of the page title
    cy.get('div[class="article"]')
      .contains('Titles with Quotes Matching "' + testDataDisplay.noResultsQuery + '" (Sorted by Match Descending)')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get('div[class="desc"]')
      .should('have.text', '\n        No results.\n    ')

  })
  it('No Results in Plot Summaries block ', () => {

    // Go to Plot Summaries
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Plot Summaries').click()

    // Checking the url
    cy.url().should('include', '/search/title-text/?plot=syshdghsnd&ref_=fn_pl')

    // Checking the content of the page title
    cy.get('div[class="article"]')
      .contains('Titles with Plot Matching "' + testDataDisplay.noResultsQuery + '" (Sorted by Match Descending)')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get('div[class="desc"]')
      .should('have.text', '\n        No results.\n    ')
  })
  it('No Results in Biographies block ', () => {
    // Go to Biographies
    cy.get(displaySelectors.moreResultsBlockSelector).contains('Biographies').click()

    // Checking the url
    cy.url().should('include', '/search/name-text/?bio=syshdghsnd&ref_=fn_bi')

    // Checking the content of the page title
    cy.get('div[class="article"]')
      .contains('People with Biographies Matching "' + testDataDisplay.noResultsQuery + '" (Sorted by Match Descending)')
      .should('be.visible')

    // Checking the display of a block containing a message about an empty search result
    cy.get('div[class="desc"]')
      .should('have.text', '\n        No results.\n    ')
  })
})