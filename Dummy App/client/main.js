import './style.css'
import axios from "axios"
const input = document.getElementById("search_field");
const button = document.querySelector(".search_button")
const searchResults = document.querySelector(".results");
let query = ""
input.value = query;



function renderResults(data) {
  if(data.length === 0) {
    searchResults.innerHTML = "NOT FOUND!"
    return;
  }
  let output = ``;
  data.forEach(d => {
    output += d;
  })
  searchResults.innerHTML = output
  searchResults.style.textAlign = "left";
}

function makeOutput(data) {
  const results = data.map(d => `<li class="note_list_items"><a href="${d._source.body.url}" target="_blank">${d._source.body.url}</a></li>`);
  renderResults(results)
}


async function makeSearch() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL_CLOUD}/search`,{
      params: {
        q: query
      }
    })
    makeOutput(response.data)
  }
  catch(e) {
    console.error("Something got wrong.",e)
  }
}


input.addEventListener("input",(e) => {
  query = e.target.value;
})

button.addEventListener("click",(e) => {
  e.preventDefault()
  if(query === "") {
    alert("Input cannot be empty!")
    return;
  }
  makeSearch();
  input.value = ""
  query = ""
})
