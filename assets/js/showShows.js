const d = document,
$main = d.querySelector(".container"),
$search = d.getElementById("search"),
$template = d.querySelector(".shows-template").content,
$fragment = d.createDocumentFragment();

$template.querySelector(".show .show-info");

const loadShows = async (e)=>{
    if(e.key === "Enter"){
        let q = $search.value.toLowerCase(),
        api = `https://api.tvmaze.com/search/shows?q=${q}`;

        // Seach disabled
        $search.disabled = true;

        // Make fetch to TV MAZE
        try {
            $main.innerHTML = `<section class="modal-section">
            <img class="loading" src="assets/icons/loading.svg" alt="Cargando...">
            </section>
            `;
               let res = await fetch(api),
               json = await res.json();
               console.log(res,json)
               $main.innerHTML = "";

            //    Activate Search
               $search.disabled = false;
               if(!res.ok) throw {status: res.status, statusText: res.statusText};
               if(json.length === 0) $main.innerHTML = `<section class="modal-section"><h2>No se encontraron resultados de "${q}"</h2></section>`;

            //    Create cards for shows
            json.forEach(el=>{
                $template.querySelector(".show .show-image").src = el.show.image ? el.show.image.medium : "https://m.media-amazon.com/images/I/61FQCSP7ZIL._SS500_.jpg";
                $template.querySelector(".show .show-name").textContent = el.show.name;
                $template.querySelector(".show .show-info").innerHTML = `<p>${el.show.language} - ${el.show.premiered ? el.show.premiered.slice(0,4) : "Undefined"}</p>`;

                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);
            });
                $main.appendChild($fragment)
            
           }catch(err) {
               console.log(err)
                let message = err.statusText || "Ocurrió un error";
                $main.innerHTML = `${err.status}: ${message}`;
           } 

    }
}

$search.addEventListener("keypress", loadShows);




