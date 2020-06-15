//DEFINE VARIABLES
let inputField = document.getElementById('item');
let listItems = document.getElementById('items');
let submitBtn = document.querySelector('input[type=submit]');
let searchBar = document.getElementById('filter');
let saveBtn = document.getElementById('saveBtn');

//ADD EVENTS
window.addEventListener('load', displayItems);
submitBtn.addEventListener('click', addItem);
listItems.addEventListener('click', deleteItem);
searchBar.addEventListener('keyup', filterItems);



//DEFINE FUNCTIONS

//display items
function displayItems(){
    let storageKeys = Object.keys(localStorage).reverse();
        storageKeys.forEach(item => {
            let li = document.createElement('li');
            li.className = "list-group-item"; 
            let deleteBtn = document.createElement('button');
            deleteBtn.classList = "btn btn-danger btn-sm float-right delete";
            deleteBtn.innerHTML = 'X';
            let expandBtn = document.createElement('button');
            expandBtn.classList = 'expand'
            expandBtn.innerHTML = 'View'
            let liText = document.createTextNode(localStorage[item]);
            
            li.appendChild(liText);
            li.appendChild(expandBtn);
            li.appendChild(deleteBtn);        
            listItems.appendChild(li);
        })
}   


//add item
function addItem(event){
    //prevent default behaviour
    event.preventDefault();
    //prevent adding empty item
    if (inputField.value !=="") {

    let li = document.createElement('li');
    li.className = "list-group-item"; 
    let deleteBtn = document.createElement('button');
    deleteBtn.classList = "btn btn-danger btn-sm float-right delete";
    deleteBtn.innerHTML = 'X';
    let expandBtn = document.createElement('button');
    expandBtn.classList = 'expand'
    expandBtn.innerHTML = 'View'
    let liText = document.createTextNode(inputField.value);
    
    li.appendChild(liText);
    li.appendChild(expandBtn);
    li.appendChild(deleteBtn);
    listItems.appendChild(li);

    inputField.value = "";
    saveLocalStorage();
    }
}


//delete item
function deleteItem(event){
    //delete only if 'X' btn clicked 
    if (event.target.className.indexOf('delete') !== -1) {
        if (confirm("Are you sure")){
        let li = event.target.parentElement;
        li.remove();
        saveLocalStorage();
        }
    }
}


//filter items
function filterItems(event){
    let searchedItem = event.target.value;
    let allItems = document.getElementsByClassName('list-group-item');
    console.log(Array.from(allItems));   

        Array.from(allItems).forEach(item => {
            if (!item.firstChild.textContent.toLowerCase().includes(searchedItem.toLowerCase())){
                item.style.display = 'none';
            } else {
                item.style.display = 'flex';
            }
        })
}


//save items to local storage
function saveLocalStorage(){
    //clear local storage
    window.localStorage.clear();
    //save all items from list
    let i = 0;
    Array.from(listItems.children).forEach(item => {
    window.localStorage.setItem(i++, item.firstChild.textContent);
    });
}




