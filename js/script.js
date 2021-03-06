/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//define variables for showPage() function:
const studentList = document.getElementsByClassName('student-item cf');
const numItems = 10;


// function to show just the 10 (or less) names per page
// parameters should be: list, page
function showPage(list, page) {

  let firstIndex = (page * numItems) - numItems;
  let lastIndex  = page * numItems;

  for (let i=0; i<list.length; i+=1) {
      if (i >= firstIndex && i < lastIndex) {
        list[i].style.display = '';
      }
      else {
        //hide these elements with CSS dynamically
        list[i].style.display = 'none';
      }
  }
}; // end of showPage() funct

// define vars needed for creatLinks() function: 
const pageDiv = document.querySelector('.page');
const containerDiv = document.createElement('div');
containerDiv.className = ('pagination');


// create/add <a> tags to names to create pagination section
// use same list parameter as showPage() function
function createLinks(list) {

    
  // create new unordered list to hold links to pages
  let ul = document.createElement('ul');
    
  // using Math.ceil b/c this rounds num up to next int
  let numPages = Math.ceil(list.length/numItems);

  // page div should hold the pagination div which should hold the <ul>
  pageDiv.appendChild(containerDiv);
  containerDiv.appendChild(ul);

  // loop through all pages 
  // added 1 to loop (normally i=0) and because we don't want a "page 0"
  for (let i=1; i <= numPages; i++) {
      
    let li = document.createElement('li');
    let link = document.createElement('a');
    
    // put <li> into <ul>, then <a> into <li>
    ul.appendChild(li);
    li.appendChild(link);
      
    // add attributes for <a> tags (according to /examples/example-meets.html)
    link.href = '#';
    link.textContent = i;

    // need a condition to assign 'active' attribute to the current page
    if (link.textContent == 1) {
      link.className = 'active'
    };

   
      
    link.addEventListener('click', (e) => {
      // when user clicks link, it shows only the names for that page and hides the rest
      showPage(list, i);
    
      const inactiveLinks = document.querySelectorAll('a');
        
      // target and display 'active' page
      const activeLink = e.target.textContent;
      showPage(list, activeLink);
        
      // loop thru the rest of the elements with <a> tags and mark them as inactive
      for (let i = 0; i < inactiveLinks.length; i++) {
        inactiveLinks[i].className = 'inactive';
      }
      // ...except for the one <a> that is active
      e.target.className = 'active';
    }); //end of event listener
      
  } //end for loop thru pages

}; // end of createLinks() funct



// EXCEEDS SECTION

// create search-related elements and assign them classes that match the CSS
const searchDiv = document.createElement('div');
searchDiv.className = ('student-search');

const input = document.createElement('input');
input.placeholder = 'Search for students...';

const button = document.createElement('button');
button.textContent = 'Search';

// reference main header is in html so we can append search bar to it
const header = document.querySelector('.page-header');

// define structure of search section by appending related elements
header.appendChild(searchDiv);
searchDiv.appendChild(input);
searchDiv.appendChild(button);

// handle no results
noResultsFound = document.createElement('h2');
noResultsFound.textContent = 'No results found...try searching again!';
pageDiv.appendChild(noResultsFound); // append to the page where results WOULD be
noResultsFound.style.display = 'none'; // hide no results found message until needed

// reference where student names are being held in html (will need for search function)
const studentName = document.getElementsByTagName('h3');

// define search functionality: this will hides names that were NOT searched for
function search() {
    
      // need here (again) so that it doesn't show up until search is complete
      noResultsFound.style.display = 'none';

      // define a new array that holds the names that match what the user inputs in the search bar
      const searchList = [];
    
      // loop through ALL students while searching
      for (let x=0; x<studentList.length; x+=1) {
        
        // refactoring: define separate user input var to make if/else more readable
        let userInput = studentName[x].innerHTML;
          
        if (userInput.includes(input.value)) {
          // SHOW these names
          studentList[x].style.display = ''
          // push ENTIRE student info (hence calling grandparent of studentName) to searched list array
          searchList.push(studentName[x].parentNode.parentNode);
        }
          else {
            // HIDE names if it's not what the user searched for
            studentList[x].style.display = 'none';
          }
      }

      //show "no results" message if results array remains empty
      if (searchList.length == 0) {
        noResultsFound.style.display = '';
      }

      // AFTER A SEARCH: call previous functions to assemble search from the beginning
      containerDiv.innerHTML = ''; 
      showPage(searchList, 1);
      createLinks(searchList);
    
}; // end of search() function
//search();

// add 'keyup' event listeners, so that code searches in real-time
input.addEventListener('keyup', (e) => {
        e.preventDefault(); // refactoring: add prevent default
        // IF there is something in the search input, search through names
        if (input.value != '') {
           search();
        } else {
           // ELSE: reset to original display
           containerDiv.innerHTML = '';
           showPage(studentList, 1);
           createLinks(studentList)
        }
 });

// add 'click' listener so the user can also click search button when they are done typing
button.addEventListener('click', (e) => {
      e.preventDefault(); // refactoring: add prevent default
      search();
});




// CALL ALL FUNCTIONS
// call showPage() with page=1 so it is the default page
//call createLInks() function to assemble pagination
showPage(studentList, 1); 
createLinks(studentList);


