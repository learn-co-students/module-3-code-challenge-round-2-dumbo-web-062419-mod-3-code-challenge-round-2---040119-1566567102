const URL= "http://localhost:3000/beers"

const ulTag= document.getElementById("list-group")
const divTag= document.getElementById("beer-detail")

///fetches///
fetch(URL)
.then(resp => resp.json())
.then(renderAllBeers)

///functions /////
function renderAllBeers(beers){
    beers.forEach(listABeer)
}

function listABeer(beer){
    ulTag.innerHTML += `<li class="list-group-item" id= "beerli" data-id=${beer.id}>${beer.name}</li>`
}

////// details about single beer ////
const liTag= document.getElementById("beerli")

function moreBeerInfo(e){
    //console.log("I am inside of the ulTag")
    if(e.target.className === "list-group-item"){
        const beerId= e.target.dataset.id
        //console.log(e.target.dataset.id)
        fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp=>resp.json())
        .then(singleBeerDetail)
    }
}

function singleBeerDetail(beer){
    divTag.innerHTML = `
        <h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea id="details" class="details">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id=${beer.id}>Save</button>`

    divTag.addEventListener("click",editBeerDetails)
}


////////Edit Beer Details////

function editBeerDetails(e){
    if(e.target.className=== "btn btn-info"){
        // console.log(e.target.dataset.id)
        const beerId= e.target.dataset.id
        const beerInfo= document.getElementById("details").value
        //console.log(beerInfo)
        
        fetch(`http://localhost:3000/beers/${beerId}`,{
            method : "PATCH",
            headers :{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify ({
                
                description: beerInfo
            })
        })
        .then(resp =>resp.json())
        .then(beer =>{
            const textArea= document.getElementById("details")
            textArea.innerHTML = `${beerInfo}`
        })
    }
}



///EventListners////
ulTag.addEventListener("click",moreBeerInfo)
//divTag.addEventListener("click",editBeerDetails)



