const body = document.body;

// Set up the footer with the current year
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.createElement('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `<small> Hero Search &copy; ${thisYear}</small>`;

// Append the footer element to the body
footer.appendChild(copyright);
document.body.appendChild(footer);

const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  // Marvel API details
  const apiKey = 'd8bb97db2cb048894c29e6e3f1b3fd8b';
  const hash = '4784b167cdbefd67007a0404b54f8896';  
  const ts = 'hero';
  const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
  
  // Add event listeners to buttons
  document.getElementById('nav-home').addEventListener('click', homeButton);
  document.getElementById('nav-heroes').addEventListener('click', fetchHeroes);
// document.getElementById('nav-comics').addEventListener('click', fetchComics);

let heroSection = document.getElementById('hero-area');
heroSection.hidden = true;
let instructions = document.getElementById('instructions');

// Fetch heroes from Marvel API
async function fetchHeroes() {
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=100`;
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`We could not reach the heroes: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const heroes = data.data.results;
      const randomHeroes = shuffleArray(heroes).slice(0, 20); 
      displayItems(randomHeroes, 'Heroes');
    } catch (error) {
      console.error('Error fetching heroes:', error);
    }
};
// Fetch comics for a specific hero
  async function fetchComics(heroId) {
    const url = `https://gateway.marvel.com/v1/public/characters/${heroId}/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`We could not reach the comics: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      displayItems(data.data.results, 'Comics');
    } catch (error) {
      console.error('Error fetching comics:', error);
    }
  };

// Display comics
  function displayItems(items, type) {
    const container = document.getElementById('characters');
    const title = document.getElementById('main-title');
    container.innerHTML = ''; 
    title.textContent = `Marvel ${type}`;
  
    items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'item';
  
      const itemName = document.createElement('h2');
      itemName.textContent = type === 'Heroes' ? item.name : item.title;
  
      const itemImage = document.createElement('img');
      itemImage.src = `${item.thumbnail.path}.${item.thumbnail.extension}`;
      itemImage.alt = type === 'Heroes' ? item.name : item.title;
  
      itemElement.appendChild(itemName);
      itemElement.appendChild(itemImage);

// If displaying heroes, add click event to fetch comics
      if (type === 'Heroes') {
        itemElement.addEventListener('click', () => {
            fetchComics(item.id);
        });

      };
      container.appendChild(itemElement);
      heroSection.hidden = false;
    });

 // Hide instructions if displaying comics
    if (type === 'Comics') {
        const h3 = instructions.querySelector('h3');
        h3.style.display = 'none';
    }
  };
// Handle home button click
  function homeButton() {
    const container = document.getElementById('characters');
    const title = document.getElementById('main-title');
    const h3 = instructions.querySelector('h3');
    
    // Clear the container and reset to welcome greeting
    container.innerHTML = '';
    title.textContent = 'Welcome to Hero Search 🔎';

    // Hide the hero section and show the instructions again
    heroSection.hidden = true;
    h3.style.display = 'block';
};
// Shuffle the fetched heroes to display random heroes each time
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
