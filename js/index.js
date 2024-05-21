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
  
  fetch("https://gateway.marvel.com/v1/public/comics?ts=hero&apikey=d8bb97db2cb048894c29e6e3f1b3fd8b&hash=4784b167cdbefd67007a0404b54f8896", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));