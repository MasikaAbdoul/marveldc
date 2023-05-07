const $search = document.querySelector("#search");
const $box = document.querySelector("#box");
const time = document.querySelector('#time');


const d = new Date();
const year = d.getFullYear();
time.innerText = `${year}`;
time.style.padding = '0 2px';

$search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const apiKey = "6254ab2bbfa341d99a13dea9d9896c48";

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${$search.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        $box.innerHTML = "";

        if (data.results.length > 0) {
          for (let i = 0; i < data.results.length; i++) {
            const result = data.results[i];

            const $poster = document.createElement("div");
            $poster.classList.add("image-poster");
            $poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${result.backdrop_path})`;

            const $title = document.createElement("div");
            $title.classList.add("title");
            $title.innerHTML = `<h3>${result.title}</h3>`;

            const $caption = document.createElement("div");
            $caption.classList.add("caption");
            $caption.innerHTML = `<p>${result.overview}</p>`;

            const $resultContainer = document.createElement("div");
            $resultContainer.classList.add("result-container");
            $resultContainer.appendChild($poster);
            $resultContainer.appendChild($title);
            $resultContainer.appendChild($caption);

            $box.appendChild($resultContainer);

            $box.style.display = "grid";
          }
        } else {
          const $noResults = document.createElement("div");
          $noResults.innerHTML = `<h3>Movie Not Found</h3>`;
          $noResults.style.color = "#ffc344";
          $box.appendChild($noResults);
        }
      })
      .catch((error) => {
        console.log(error);
        const $error = document.createElement("div");
        $error.innerHTML =
          "<h3>Sorry, an error occurred while fetching the data</h3>";
        $error.style.color = "#f83a26";
        $box.appendChild($error);
      });
  }
});
