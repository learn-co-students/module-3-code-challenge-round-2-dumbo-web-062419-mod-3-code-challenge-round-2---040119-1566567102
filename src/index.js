//SORRY FOR ALL THE DELETED CONTENT.
//I WAS PLAYING AROUND WITH THE CODE.

document.addEventListener('DOMContentLoaded', () => {
console.log("READY TO GOOOO");

//Variables

const beersURL = "http://localhost:3000/beers";
const beerUL = document.getElementById('list-group');
const beerDetailDiv = document.getElementById('beer-detail');
const saveButton = document.getElementById("edit-beer")




fetch(beersURL)
.then(res => res.json())
.then(beers => {
  console.log(beers)

  // console.log(beerUL)
  beers.forEach(beer => {
    // console.log(beer)

    // console.log(beerUL)
    beerUL.innerHTML += `
    <li class="list-group-item" data-id = ${beer.id}>${beer.name}</li>
    `
  })
})

//EVENT LISTENERS
beerUL.addEventListener('click',beerDetails)
beerDetailDiv.addEventListener('click',editDetails)




//FUNCTIONS

function beerDetails(event){
if (event.target.classList.contains("list-group-item")){

fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
  .then(res => res.json())
  .then(beer => {
    beerDetailDiv.innerHTML = `
    <h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id= ${beer.id}>
      Save
    </button>
    <button id="delete-beer" class="btn -delete" data-id= ${beer.id}>
      Delete
    </button>
    `
  })

}

}//END OF beerDetails Function

function editDetails(event){
  let id = event.target.dataset.id
  if(event.target.id === "edit-beer"){
    // console.log("??????")
    let newDescription = event.target.previousElementSibling.value

    fetch(`http://localhost:3000/beers/${id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        description:newDescription
      })
    })

  }

  if(event.target.id === 'delete-beer'){

    console.log(event.target.parentElement)
    fetch(`http://localhost:3000/beers/${id}`,{
      method: "DELETE"
    })
  }
}//END of editDetails Function




})//END Of DOMContentLoaded
