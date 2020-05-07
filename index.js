function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

const ul = document.getElementById("pages"); // Get the list where we will place our pages
let wikiUrl =
  "https://tools.wmflabs.org/massviews/api.php?project=en.wikipedia.org&category=Wikipedia%20requested%20logos&limit=20000";

fetch(`https://cors-anywhere.herokuapp.com/${wikiUrl}`)
  .then((response) => response.json())
  .then(function (data) {
    let pages = data;
    return pages.map(function (page) {
      let li = createNode("li"),
        span = createNode("span");
      span.innerHTML = `<a href=https://en.wikipedia.org/wiki/${page.title}>${page.title}</a>`;
      append(li, span);
      append(ul, li);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
