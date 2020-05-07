const handleAsJson = (resp) => resp.json();
const map = (f) => (xs) => xs.map(f);
const all = Promise.all.bind(Promise);
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

const createListItem = ({ title }) =>
  fetch(
    `https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${title}`
  )
    .then(handleAsJson)
    .then(function (data) {
      console.log({ title, data });
      let li = createNode("li"),
        img = createNode("img"),
        span = createNode("span");
      span.innerHTML = `<a href=https://en.wikipedia.org/wiki/${title}>${title}</a>`;
      img.src = data[0];
      append(li, span);
      append(li, img);
      append(ul, li);
    });
// let wikiUrl =
//   "https://tools.wmflabs.org/massviews/api.php?project=en.wikipedia.org&category=Wikipedia%20requested%20logos&limit=20000";

// fetch(`https://cors-anywhere.herokuapp.com/${wikiUrl}`)
// .then((response) => response.json())
// .then(function (data) {
//   let pages = data;
//   return pages.map(function (page) {
//     let li = createNode("li"),
//       img = createNode("img"),
//       span = createNode("span");
//     img.innerHTML = fetch(
//       `https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${page.title}`
//     )
//       .then((response) => response.json())
//       .then(function (imgData) {
//         imgData;
//       });
//     span.innerHTML = `<a href=https://en.wikipedia.org/wiki/${page.title}>${page.title}</a>`;
//     append(li, span);
//     append(li, img);
//     append(ul, li);
//   });
// })

fetch(`https://cors-anywhere.herokuapp.com/${wikiUrl}`)
  .then(handleAsJson)
  .then(map(createListItem))
  .catch(function (error) {
    console.log(error);
  });
