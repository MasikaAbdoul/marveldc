const $search = document.querySelector("#search");
const $box = document.querySelector("#box");
const $boxPop = document.querySelector("#box-pop");
const time = document.querySelector("#time");

const d = new Date();
const year = d.getFullYear();
time.innerText = `${year}`;
time.style.padding = "0 2px";

$search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const apiKey = "6254ab2bbfa341d99a13dea9d9896c48";

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${$search.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        $box.innerHTML = "";
        $boxPop.innerHTML = "";

        if (data.results.length > 0) {
          for (let i = 0; i < data.results.length; i++) {
            const result = data.results[i];

            const $poster = document.createElement("div");
            $poster.classList.add("image-poster");
            $poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${result.poster_path})`;
            if (result.poster_path === null) {
              $poster.innerText = "Image Not Found !";
              $poster.style.height = "200px";
            } else {
              $poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${result.poster_path})`;
            }

            const $title = document.createElement("div");
            $title.classList.add("title");
            $title.innerHTML = `<h3>${result.title}</h3>`;
            $title.style.padding = `5px 0`;

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

            $resultContainer.addEventListener("click", () => {
                const $close = document.createElement('div');
                $close.classList.add('close');
                $close.innerHTML = `<i class="fa-solid fa-square-xmark"></i>`;
                $close.style.zIndex = '1000';

                $close.addEventListener('click', ()=>{
                    $boxPop.removeChild($close);
                    $boxPop.removeChild($popPoster);
                    $boxPop.removeChild($popTitle);
                    $boxPop.removeChild($popLang);
                    $boxPop.removeChild($popPopu);
                    $boxPop.removeChild($popRelease);
                    $boxPop.removeChild($popVoteAv);
                    $boxPop.removeChild($popVoteCo);
                    $boxPop.style.display = 'none';
                })
              const $popPoster = document.createElement("div");
              $popPoster.classList.add("image-poster");
              $popPoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${result.backdrop_path})`;
              $popPoster.style.height = "200px";
              if (result.backdrop_path === null) {
                $popPoster.innerText = "Image Not Found !";
              } else {
                $popPoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${result.backdrop_path})`;
              }

              
              const $popTitle = document.createElement("div");
              $popTitle.classList.add("title");
              $popTitle.innerHTML = `<h4><span style='font-weight:300;'>Title :</span> ${result.original_title}</h4>`;
              $popTitle.style.padding = `5px 0`;

              const $popLang = document.createElement("div");
              $popLang.classList.add("title");
              $popLang.innerHTML = `<h4><span style='font-weight:300;'>Original Language : </span>${result.original_language}</h4>`;
              $popLang.style.padding = `5px 0`;

              const $popPopu = document.createElement("div");
              $popPopu.classList.add("title");
              $popPopu.innerHTML = `<h4><span style='font-weight:300;'>Popularity : </span>${result.popularity}</h4>`;
              $popPopu.style.padding = `5px 0`;

              const $popRelease = document.createElement("div");
              $popRelease.classList.add("title");
              $popRelease.innerHTML = `<h4><span style='font-weight:300;'>Release Date: </span>${result.release_date}</h4>`;
              $popRelease.style.padding = `5px 0`;

              if(result.release_date === ""){
                $popRelease.innerHTML = `<h4><span style='font-weight:300;'>Release Date: </span>Not Yet Announced</h4>`;
              } else {
                $popRelease.innerHTML = `<h4><span style='font-weight:300;'>Release Date: </span>${result.release_date}</h4>`;
              }

              const $popVoteAv = document.createElement("div");
              $popVoteAv.classList.add("title");
              $popVoteAv.innerHTML = `<h4><span style='font-weight:300;'>Vote Average: </span>${result.vote_average}</h4>`;
              $popVoteAv.style.padding = `5px 0`;

              const $popVoteCo = document.createElement("div");
              $popVoteCo.classList.add("title");
              $popVoteCo.innerHTML = `<h4><span style='font-weight:300;'>Vote Count: </span>${result.vote_count}</h4>`;
              $popVoteCo.style.padding = `5px 0`;

              $boxPop.appendChild($close);
              $boxPop.appendChild($popPoster);
              $boxPop.appendChild($popTitle);
              $boxPop.appendChild($popLang);
              $boxPop.appendChild($popPopu);
              $boxPop.appendChild($popRelease);
              $boxPop.appendChild($popVoteAv);
              $boxPop.appendChild($popVoteCo);
              $boxPop.style.display = "block";
            });
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
