// Get reference to DOM elements
const textBox = document.getElementById('text-box');
const button = document.getElementById('search-button');
const displayDiv = document.getElementById('display-area');

// URL for JSON data 
const jsonUrl = 'data/lookup.json'; 
const dictUrl = 'data/dict.json';
var lookupData = null;
var dictData = null;

// Fetch JSON data


function searchKeys(key) {
    const res = [];
    for (var k in lookupData) {
        if (k.startsWith(key)) {
            res.push(lookupData[k]);
        }
    }
    return res
}

async function fetchData() {
  fetch(jsonUrl).then( u => u.json()).then(data => lookupData = data);

  fetch(dictUrl).then(u => u.json()).then(data => dictData = data);
}
window.addEventListener('load', fetchData);
// Search JSON data
async function searchJson() {  
  let searchTerm = textBox.value;
    searchTerm = searchTerm.replace('A\*', 'æ').replace('T\*', 'þ').replace('D\*', 'ð');
    console.log('looking for ' + searchTerm);
  // Get search term
 
  displayDiv.innerHTML = '';
  lookingFor = document.createElement('p');
  lookingFor.innerHTML = "Searching for: " + searchTerm;
  displayDiv.appendChild(lookingFor);
    console.log(lookingFor);
    displayDiv.appendChild(document.createElement('hr'));

    const res = searchKeys(searchTerm);
  // Search keys in JSON data
  for (var indexes of res) {
      //const indexes = lookupData[searchTerm];
      console.log(indexes.length + ' items found');
      for (var i of indexes) {
        const entry = dictData[i];
        const p = document.createElement('div');
        if ('variants' in entry) {
            const vars = document.createElement('p');
            entry['variants'].forEach(x => {
                const sp = document.createElement('span');
                sp.innerHTML = x + ', ';
                vars.appendChild(sp);});
            p.appendChild(vars);
        }
        const pos = document.createElement('p');
          pos.innerHTML= "POS: " + entry["partOfSpeech"];
          p.appendChild(pos);
        const etext = document.createElement('p');
          etext.innerHTML = entry['entry'];
          p.appendChild(etext);
      displayDiv.appendChild(p);
          displayDiv.appendChild(document.createElement('hr'));
      }
  } 

    // else {
    //const err = document.createElement('p');
     // err.text = searchTerm + ' not found';
     // displayDiv.appendChild(err);
 // }


    /*
  // Display results
  displayDiv.innerHTML = ''; 
  results.forEach(result => {
    const p = document.createElement('p');
    p.textContent = result;
    displayDiv.appendChild(p);
  });
  */
}

// Attach event listener to button
button.addEventListener('click', searchJson);
