
let backBtn = document.getElementById('back');
let saveBtn = document.getElementById('save');


backBtn.addEventListener('click', () =>  window.location='index.html');
window.addEventListener('load', displayNote);
saveBtn.addEventListener('click',saveNote);






function displayNote(){
console.log('hello');
//display note title in the title
// if 


}


function saveNote(){
console.log('saved');

}

//general idea is to get the key value form local storage of the parent element of expand button
//then create note on te next page that has the same key but value will be the note text


//maybe will be better and easier to do as single page application on one js File
// when click expand it shows the note under and hides other notes changes expand into colapse 
//colapse also saves text in the note
//expand and colappse are on top of eachother and we change z index