const body = document.body;
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

  const apiKey = 'd8bb97db2cb048894c29e6e3f1b3fd8b';
  const hash = '4784b167cdbefd67007a0404b54f8896';  
  const ts = 'hero';
  const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
  
document.getElementById('nav-heroes').addEventListener('click', fetchHeroes);
document.getElementById('nav-comics').addEventListener('click', fetchComics);

async function fetchHeroes() {
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`We could not reach the heroes: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      displayItems(data.data.results, 'Heroes');
    } catch (error) {
      console.error('Error fetching heroes:', error);
    }
  };

  async function fetchComics() {
    const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
  
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

  function displayItems(items, type) {
    const container = document.getElementById('characters');
    const title = document.getElementById('main-title');
    container.innerHTML = ''; // Clear any existing content
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
      container.appendChild(itemElement);
    });
  }



