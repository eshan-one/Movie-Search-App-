const searchField = document.getElementById('search-input')
const searchBtn =  document.getElementById('search-button')
const movieContainer = document.getElementById('movie-container')
const apiKey =  `dac3b8e3`
const apiURL =  `https://www.omdbapi.com/?apikey=${apiKey}&type=movie`
let imdbId 

const  moviesArr = []

searchBtn.addEventListener('click', getMoviesID)

async function getMovieData(id){

    const response  = await fetch(`${apiURL}&i=${id}`)
    const movieData =  await  response.json()
    const {Title, Plot, Poster} =  movieData
    
    if(Poster !== 'N/A' && Plot !== 'N/A'){
     
    movieContainer.innerHTML += `<div class="movie">
            <div class="movie-img" id="">
                <img id="movie-img" src="${Poster}" alt="Movie poster">
            </div>
            <div class="movie-data" id="movie-data">
                <h4 class="movie-title" id="movie-title">${Title}</h4>
                <p class="movie-plot" id="movie-plot">${Plot}</p>
            </div>
        </div>
        <hr>`
    
}


    }
    

    
async function getMoviesID(){
    try{
        movieContainer.innerHTML = ""
        const apiRes =  await(await fetch(`${apiURL}&s=${searchField.value}`)).json()
        const results =  apiRes.Search
        if(!results){
            console.log('none-found')
        }
        else{
            results.forEach(result =>{
                imdbId =  result.imdbID
                getMovieData(imdbId)
            })
            
            
            
        }
    }
    
    catch(e){
        console.log('handle network errors', e)
    }
    
}
// javascript