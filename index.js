const all = Promise.all.bind(Promise);
const baseUrl = "https://en.wikipedia.org/wiki/";
const handleAsJson = (resp) => resp.json();
const map = (f) => (xs) => xs.map(f);
const ul = document.getElementById("pages"); // Get the list where we will place our pages
let wikiUrl =
  "https://tools.wmflabs.org/massviews/api.php?project=en.wikipedia.org&category=Wikipedia%20requested%20logos&limit=";

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

function imageUrlBad(image_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);
  http.send();

  return http.status === 404;
}

function getImageUrl(filename) {
  // finds the wiki image url based on filename
  let loc = "commons";
  let urlHash = CryptoJS.MD5(filename).toString();
  let urlSuffix = `${urlHash[0]}/${urlHash.slice(0, 2)}/${filename}`;

  // TODO - The following code takes a really long time to load and is not a
  // universal solution.  Find a better way.
  // // test if file exists at expected url
  // if (
  //   imageUrlBad(`https://upload.wikimedia.org/wikipedia/${loc}/${urlSuffix}`)
  // ) {
  //   loc = "en"; // try another common pattern
  // }

  return `https://upload.wikimedia.org/wikipedia/${loc}/${urlSuffix}`;
}

const createListItem = (title) =>
  fetch(
    `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=images&format=json&origin=*`
  )
    .then(handleAsJson)
    .then(function (data) {
      console.log(title, data.query.pages);
      let card = createNode("div"),
        hr = createNode("hr");
      card_title = createNode("p");
      card_title.innerHTML = `<a href=${baseUrl}${title} target="_blank">${title}</a> `;
      card.setAttribute("class", "p-card");
      hr.setAttribute("class", "u-sv1");
      card_title.setAttribute("class", "p-card__content");
      append(card, card_title);
      append(card, hr);
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
          append(card, newImg);
        });
      } else {
        err = createNode("p");
        err.innerHTML = `<p style="margin-left: 40px">No images found.</p>`;
        append(card, err);
      }
      append(ul, card);
    });

let elem = document.querySelector(".container");
// data-slicing indices
let startIdx = 0;
let endIdx = 100;
let keepScrolling = true;

let infScroll = new InfiniteScroll(elem, {
  // options
  path: function () {
    if (keepScrolling) {
      return `https://cors-anywhere.herokuapp.com/${wikiUrl}${endIdx}`;
    }
    return null;
  },
  // load response as flat text
  responseType: "text",
  scrollThreshold: 500,
  status: ".page-load-status",
  history: false,
  checkLastPage: true,
});

infScroll.on("load", function (response) {
  // parse response into JSON data
  let data = JSON.parse(response);
  let dataSliceArray = []; // array which will only include part of json data
  let arrayIdx = 0;
  let endOfList = Object.keys(data).length - startIdx < 100;
  if (endOfList) {
    endIdx = Object.keys(data).length;
    keepScrolling = false;
  }
  // populate array with next slice of wikidata
  for (let i = startIdx; i < endIdx; i += 1) {
    dataSliceArray[arrayIdx] = data[i].title;
    arrayIdx += 1;
  }
  dataSliceArray.map(createListItem);
  startIdx = endIdx;
  endIdx += 100;
});

// load initial page
infScroll.loadNextPage();
