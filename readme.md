# Imdb Search Testing: Home Task

## Requirements
* Node.js 14.x / Node.js 16.x / Node.js 18.x and above
* Cypress

## Getting started
1. Clone repository https://github.com/Kateluchs/imdb_search_test.git

```
git clone https://github.com/Kateluchs/imdb_search_test.git
```
2. Run Cypress

```
npx cypress open
```
3. Choose E2E Testing
4. Press "Start E2E Testing in Chrome"
5. Run tests by clicking on files one by one in the "E2E specs" block

## Approach
Testing is based on the assumption that we have a test database that no one can make changes to without notifying the QA team.

To begin with, I decided to check the correctness of the display of search results in each block (searchDisplaySpec), to be sure that in whatever block we search, we will see results or a message that there are none.
I plan to expand this block by checking the display of a drop-down list of offers that appear before the user clicks the "search" button.

Next, I decided to test various use cases (searchResultsSpec) to make sure that the user gets the results they expect.
I plan to expand this block by checking the search results in the "suggestions window", as well as the relevance of the search results in general (after clarifying the search results logic with the analysts). In addition, this block should be expanded by checking the search results in different languages: switching the language, both before sending the request, and after. (For example, I ran into a localization error: despite the fact that my default language was English, the search results were also in Russian. Because of this, I had to add a "crutch" that switches the language before checking the search results to French, and then back to English, which ensures that all results are in English.)

After that, I proceeded to test various inputs in the search field (searchInputSpec) to make sure that the user would not be able to disable the search and that the system would respond correctly.
I plan to expand this block by checking user interactions with the search string using the keyboard, as well as a more detailed check of script, styles and database queries escaping.

Next, I started testing advanced search. In this case, it is necessary to clarify whether the refactoring of this section was also carried out or not. Since the url is different from the classic search, there is an assumption that these are different modules.
In case this module was also affected,this section requires checking both the field validation and the correctness of the search results on different test data and their combinations, using various test design techniques.
If necessary, in the future, I plan to develop additional test cases for a deep test of this section.

All tests are divided into logical sections:
- Display of search results by search blocks (excluding content and transition to the advanced search section);
- Usage scenarios (excluding advanced search);
- Interaction with the search string (validation and keyboard);
- Advanced search (including display and content).

At the beginning, I wanted to include all the tests in one file, because it is one functionality, but this would make the structure not so obvious, which would later affect the maintenance of the tests and their execution.

How could it have been done differently:
It was possible to write tests in POM and take out the most repetitive actions.

This was my first experience with this framework, so I read the documentation, googled a lot, watched videos and asked for advice from a person with experience in test automation.
