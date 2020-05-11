const handleAsJson = (resp) => resp.json();
const map = (f) => (xs) => xs.map(f);
const all = Promise.all.bind(Promise);
const baseUrl = "https://en.wikipedia.org/wiki/";
let wikiUrl =
  "https://tools.wmflabs.org/massviews/api.php?project=en.wikipedia.org&category=Wikipedia%20requested%20logos&limit=200";
const getImageList = ({ title }) =>
  `https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${title}`;

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

const ul = document.getElementById("pages"); // Get the list where we will place our pages

function getImageUrl(filename) {
  // finds the url of one image
  let urlHash = CryptoJS.MD5(filename).toString();
  return `https://upload.wikimedia.org/wikipedia/commons/${
    urlHash[0]
  }/${urlHash.slice(0, 2)}/${filename}`;
}

const createListItem = ({ title }) =>
  fetch(
    `https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=images&format=json`
  )
    .then(handleAsJson)
    .then(function (data) {
      console.log(title, data.query.pages);
      let li = createNode("li"),
        span = createNode("span");
      span.innerHTML = `<a href=${baseUrl}${title}>${title}</a> `;
      append(li, span);
      let img_key = Object.keys(data.query.pages)[0];
      let images = data["query"]["pages"][img_key]["images"];
      if (images) {
        Object.keys(images).forEach(function eachImg(img) {
          let newImg = createNode("img");
          let filename = images[img]["title"]
            .replace("File:", "")
            .replace(/ /g, "_");
          let imgUrl = getImageUrl(filename);
          newImg.src = imgUrl;
          newImg.loading = "lazy";
          newImg.alt = `Image: ${filename} `;
          newImg.height, (newImg.width = 42);
          append(li, newImg);
        });
      } else {
        err = createNode("span");
        err.innerHTML = `<p style="margin-left: 40px">No images found.</p>`;
        append(li, err);
      }
      append(ul, li);
    });

fetch(`https://cors-anywhere.herokuapp.com/${wikiUrl}`) // getting list of logos requested pages
  .then(handleAsJson)
  .then(map(createListItem))
  .catch(function (error) {
    console.log(error);
  });
