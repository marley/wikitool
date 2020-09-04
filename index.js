const all = Promise.all.bind(Promise);
const baseUrl = "https://en.wikipedia.org/wiki/";
const handleAsJson = (resp) => resp.json();
const map = (f) => (xs) => xs.map(f);
const ul = document.getElementById("pages"); // Get the list where we will place our pages
let wikiUrl =
  "https://tools.wmflabs.org/massviews/api.php?project=en.wikipedia.org&category=Wikipedia%20requested%20logos&limit=100";

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

function getImageUrl(filename) {
  // finds the wiki image url of filename
  let urlHash = CryptoJS.MD5(filename).toString();
  return `https://upload.wikimedia.org/wikipedia/commons/${
    urlHash[0]
  }/${urlHash.slice(0, 2)}/${filename}`;
}

const createListItem = ({ title }) =>
  fetch(
    `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=images&format=json&origin=*`
  )
    .then(handleAsJson)
    .then(function (data) {
      console.log(title, data.query.pages);
      let card = createNode("div"),
        hr = createNode("hr");
      card_title = createNode("p");
      card_title.innerHTML = `<a href=${baseUrl}${title}>${title}</a> `;
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
let infScroll = new InfiniteScroll(elem, {
  // options
  path: function () {
    return `https://cors-anywhere.herokuapp.com/${wikiUrl}`;
  },
  // load response as flat text
  responseType: "text",
  status: ".scroll-status",
  history: false,
});

infScroll.on("load", function (response) {
  // parse response into JSON data
  let data = JSON.parse(response);
  console.log(data);
  data.map(createListItem);
  // var items = proxyElem.querySelectorAll(".photo-item");
  // infScroll.appendItems(items);
});

// load initial page
infScroll.loadNextPage();
