const form = document.getElementById("form");
const searchInput = document.getElementById("search");
const resultDiv = document.getElementById("result");

resultDiv.innerHTML = ""; 

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let query = searchInput.value.trim();

    // Sanitize user input
    query = query.replace(/[<>]/g, "");

    if (query === "") {
        fetch("superheroes.php?query=")
            .then(response => response.json())
            .then(aliases => {
                resultDiv.innerHTML = ""; 

                const ul = document.createElement("ul");
                aliases.forEach(alias => {
                    const li = document.createElement("li");
                    li.textContent = alias; 
                    ul.appendChild(li);
                });

                resultDiv.appendChild(ul);
            });
        return;
    }

    
    fetch("superheroes.php?query=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(hero => {
            resultDiv.innerHTML = ""; 

            if (!hero) {
                resultDiv.textContent = "Hero not found";
                resultDiv.classList.add("not-found");
                resultDiv.classList.remove("fadeIn");
            } else {
                resultDiv.classList.remove("not-found");

                const alias = document.createElement("h3");
                alias.textContent = hero.alias;

                const name = document.createElement("h4");
                name.textContent = "a.k.a. " + hero.name;

                const bio = document.createElement("p");
                bio.textContent = hero.biography;

                resultDiv.append(alias, name, bio);

                resultDiv.classList.remove("fadeIn");
                // Force reflow to allow the animation to be retriggered
                // eslint-disable-next-line no-unused-expressions
                void resultDiv.offsetWidth;
                resultDiv.classList.add("fadeIn");
            }
        })
        .catch(err => {
            console.error(err);
            resultDiv.textContent = "Error fetching data.";
        });
});
