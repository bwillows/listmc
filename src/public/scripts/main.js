function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

fetch("/components/header")
  .then((response) => response.text())
  .then((header) => {
    document.getElementsByTagName("head")[0].innerHTML += header;
  });
fetch("/components/navbar")
  .then((response) => response.text())
  .then((navbar) => {
    document.getElementsByTagName("body")[0].prepend(createElementFromHTML(navbar));
  });
fetch("/components/footer")
  .then((response) => response.text())
  .then((footer) => {
    document.getElementsByTagName("body")[0].append(createElementFromHTML(footer));
  });