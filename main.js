//DEFINE VARIABLES
let inputField = document.getElementById('item');
let listItems = document.getElementById('items');
let submitBtn = document.querySelector('input[type=submit]');
let searchBar = document.getElementById('filter');

//ADD EVENTS
window.addEventListener('load', displayItems);
submitBtn.addEventListener('click', addItem);
listItems.addEventListener('click', noteButtonsTrigger);
searchBar.addEventListener('keyup', filterItems);

//DEFINE FUNCTIONS

//display items
function displayItems(){
    let storageKeys = Object.keys(localStorage);
    let notesArray = [];
    let titlesArray = [];

    //create arrays of keys that hold notes values and sort
    storageKeys.forEach(item => {
        if (item.includes('note')) {
        notesArray.push(item);    
        }
    }) 
    notesArray.sort();
  
    // create array of keys that hold titles values and sort
    storageKeys.forEach(item => {
        if (item.includes('title')) {
        titlesArray.push(item);    
        }
    }) 
    titlesArray.sort();    

    //create dom elements from titles array and attaching yellow note to the right title by matching index value of both arrays
    // that is notesArray and titlesArray
    let i = 0;
    titlesArray.forEach(item => {
        let divItemWrapper = document.createElement('div');
        divItemWrapper.className = 'item-wrapper';    

        let yellowNote = document.createElement('textarea');
        yellowNote.className = 'note-field';
        yellowNote.placeholder = 'Type your note here...';   
        yellowNote.value = localStorage[notesArray[i]];   //access yellow note text from local storage, by getting key from notes array

        let divGroupItem = document.createElement('div');
        divGroupItem.className = "list-group-item"; 
        let deleteBtn = document.createElement('button');
        deleteBtn.classList = "btn btn-danger btn-sm float-right delete";
        let deleteIcon = document.createElement('i');
        deleteIcon.classList = "fas fa-trash-alt deleteIcon";
        let expandBtn = document.createElement('button');
        expandBtn.className = 'expand';
        let expandIcon = document.createElement('i');
        expandIcon.classList = "fas fa-plus-circle expandIcon";
        let collapseBtn = document.createElement('button');
        collapseBtn.className = 'collapse';
        let collapseIcon = document.createElement('i');
        collapseIcon.classList = "fas fa-minus-circle collapseIcon";
        let itemText = document.createTextNode(localStorage[titlesArray[i]]); //access corresponding tittle of the yellow note by getting key from titles array
                                                                              // coresponding title and note text have the same numbers in local storage 
                                                                              //for example note001 and title001, both correspond to the same element 
        divGroupItem.appendChild(itemText);
        divGroupItem.appendChild(expandBtn);
        expandBtn.appendChild(expandIcon);
        divGroupItem.appendChild(collapseBtn);
        collapseBtn.appendChild(collapseIcon);
        divGroupItem.appendChild(deleteBtn);
        deleteBtn.appendChild(deleteIcon);

        divItemWrapper.appendChild(divGroupItem);
        divItemWrapper.appendChild(yellowNote);
        
        listItems.appendChild(divItemWrapper);
        
        i++;
    });
}   

//add item
function addItem(event){
    //prevent default behaviour
    event.preventDefault();
    //prevent adding empty item
    if (inputField.value !=="") {
    // create DOM elements
    let divItemWrapper = document.createElement('div');
    divItemWrapper.className = 'item-wrapper';    

    let yellowNote = document.createElement('textarea');
    yellowNote.className = 'note-field';
    yellowNote.placeholder = 'Type your note here...';      

    let divGroupItem = document.createElement('div');
    divGroupItem.className = "list-group-item"; 
    let deleteBtn = document.createElement('button');
    deleteBtn.classList = "btn btn-danger btn-sm float-right delete";
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt deleteIcon"></i>';
    let expandBtn = document.createElement('button');
    expandBtn.className = 'expand';
    expandBtn.innerHTML = '<i class="fas fa-plus-circle expandIcon"></i>';
    let collapseBtn = document.createElement('button');
    collapseBtn.className = 'collapse';
    collapseBtn.innerHTML = '<i class="fas fa-minus-circle collapseIcon"></i>';
    let itemText = document.createTextNode(inputField.value);

    
    divGroupItem.appendChild(itemText);
    divGroupItem.appendChild(expandBtn);
    divGroupItem.appendChild(collapseBtn);
    divGroupItem.appendChild(deleteBtn);

    divItemWrapper.appendChild(divGroupItem);
    divItemWrapper.appendChild(yellowNote);
    
    listItems.appendChild(divItemWrapper);
    
    //reset input text and save to local storage
    inputField.value = "";
    saveLocalStorage();
    }
}


//note buttons trigger function - trigger either delete, expand or collapse button
//depending what class event target has (deleteIcon, expandIcon or collapseIcon class)
function noteButtonsTrigger(event){
    //delete note if delete button clicked
    if (event.target.className.indexOf('deleteIcon') !== -1) {
        if (confirm("Do you want to delete this note?")){
        let wrapper = event.target.parentElement.parentElement.parentElement;
        wrapper.remove();
        saveLocalStorage();
        }
    } 
    //show yellow textarea, collapse Icon and hide expand icon
    else if (event.target.className.indexOf('expandIcon') !== -1) {
        console.log('works');
        event.target.parentElement.nextElementSibling.style.display = 'block';
        event.target.parentElement.style.display = 'none';
        event.target.parentElement.parentElement.nextElementSibling.style.display = 'block';
        
    } 
    //hide yellow textarea, collapse icon and show expand icon then save to local storage
    else if (event.target.className.indexOf('collapseIcon') !== -1) {
         console.log('works');
        event.target.parentElement.previousElementSibling.style.display = 'block';
        event.target.parentElement.style.display = 'none';
        event.target.parentElement.parentElement.nextElementSibling.style.display = 'none';
        saveLocalStorage();
}
}

//filter items - dispaly or hide elements depending on string matching title of the note
function filterItems(event){
    let searchedItem = event.target.value;
    let allItems = document.getElementsByClassName('item-wrapper');
    console.log(Array.from(allItems));   

        Array.from(allItems).forEach(item => {
            if (!item.firstElementChild.firstChild.textContent.toLowerCase().includes(searchedItem.toLowerCase())){
                item.style.display = 'none';
            } else {
                item.style.display = 'flex';
            }
        })
}

function saveLocalStorage(){
    //clear local storage
    window.localStorage.clear();
    //save all items from list
    let i = 0;
    Array.from(listItems.children).forEach(item => {
    window.localStorage.setItem(`000${i}title`,item.firstElementChild.firstChild.textContent);
    window.localStorage.setItem(`000${i}note`,item.children[1].value);
    i++;
    });
}
