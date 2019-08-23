
document.addEventListener('DOMContentLoaded', function () {
    const ul = document.getElementById("list-group")
    const beerDetail = document.getElementById("beer-detail")
    


//_________------------------____ GET / DISPLAY BEER(S) _______
    fetch("http://localhost:3000/beers")
    .then(res => res.json())
    .then(renderBeers)

    function renderBeers(beers) {
        
        beers.forEach(function(beer) {
            ul.innerHTML += `
            <li id=${beer.id} class="list-group-item">${beer.name}</li>`
        })
    }

//_________------------------____ END OF GET / DISPLAY BEER(S) _______


//_________------------------____ GET / DISPLAY BEER _______   

    ul.addEventListener("click", function(event) {
        // let li = document.getElementsByClassName("list-group-item")

        if (event.target.id) {
            
            fetch(`http://localhost:3000/beers/${event.target.id}`)
            .then(res => res.json())
            .then(renderBeerDetails)

            function renderBeerDetails(beer) {
                beerDetail.className = beer.id

                beerDetail.innerHTML = `
                <h1>${beer.name}</h1>
                <img src="${beer.image_url}">
                <h3>${beer.tagline}</h3><p>First Brewed in ${beer.first_brewed}</p>
                <textarea>${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info">
                Save
                </button>
                `
            }


            
        }
    })
//_________------------------____ END OF GET / DISPLAY BEER _______



//_________------------------____ PATCH / update description _______

        beerDetail.addEventListener("click", function() {
            let editBeerButton = document.getElementById("edit-beer")
            let textArea = beerDetail.querySelector("textarea")

            if (editBeerButton) {
                // console.log(beerDetail.className)
                fetch(`http://localhost:3000/beers/${beerDetail.className}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }, body: JSON.stringify({
                        description: textArea.value
                    })
                })
            }
        })
//_________------------------____ END OF PATCH / update description _______





})