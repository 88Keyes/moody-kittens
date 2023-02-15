let kittens = [];
let mood = ""
let affection = 5
let kitten = {}

loadKittens()
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kittenName = form.name.value

  kitten = kittens.find(kitten => kitten.name == kittenName)

  if(kitten){
    alert("Please choose a unique name for your kitten")
  }

  if(!kitten) {
    kitten = {
    name: kittenName,
    mood: "Tolerant",
    affection: 5,
    id: generateId()}

    kittens.push(kitten)
    saveKittens()
    
  }

  form.reset()
  document.getElementById("releaseKittens").style.visibility='visible';
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittensData){
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
    let template = ""

  kittens.forEach(kittens => {
    template += `<div id="kittens" class="d-flex align-items-center flex-wrap">
      <pre class = "card container shadow">
        <img src="cat.png" alt="brown cartoon cat sitting in a box" height = 200px>
        <span>Name: ${kittens.name}</span>
        <span>Mood: ${kittens.mood}</span>
        <span>Affection: ${kittens.affection} </span>
        <button onclick="removeKitten(${kittens.id})">Release this Kitten</button>
      </pre>
    </div>
    `
})

  document.getElementById("kittens").innerHTML = template
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */

function findKittenById(id) {
  return kittens.find(kitten => kitten.id == id);
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
*/
function pet(id) {
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
*/
function catnip(id) {
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
*/
function setKittenMood(kitten) {
  
}

function removeKitten(id){
  //Need to compare kitten id and button id, remove kitten with matching id

  let index = kittens.findIndex(kittens => kittens.id == id)
  if(index == -1){
    throw new Error("Oops")
  }

  //let x = kittens.indexOf(findKittenById(kitten.id))
  kittens.splice(index, 1)
  saveKittens()
  
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
*/
function clearKittens(){
  kittens = [];
  
  document.getElementById("releaseKittens").style.visibility='hidden';
  saveKittens();
  
  let template = ""
  
    template += `<div id="kittens" class="d-flex align-items-center flex-wrap">
      Oh no! You don't have any kittens. Please fill out a name above to adopt one now!
    </div>
    `
  document.getElementById("kittens").innerHTML = template
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('This is your life meow')
  drawKittens()
  document.getElementById("releaseKittens").classList.remove("hidden");

}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
