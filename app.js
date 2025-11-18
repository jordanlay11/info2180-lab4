const form = document.getElementById("form");
const searchInput = document.getElementById("search");
const resultDiv = document.getElementById("result");

resultDiv.innerHTML = ""; 

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let query = searchInput.value.trim();

    // Sanitize user input
    query = query.replace(/[<>]/g, "");

    // If empty → fetch alias list
    if (query === "") {
        fetch("superheroes.php?query=")
            .then(response => response.json())
            .then(aliases => {
                resultDiv.innerHTML = ""; // Clear

                const ul = document.createElement("ul");
                aliases.forEach(alias => {
                    const li = document.createElement("li");
                    li.textContent = alias; // SAFE — no HTML injection
                    ul.appendChild(li);
                });

                resultDiv.appendChild(ul);
            });
        return;
    }

    // Otherwise → search for the hero
    fetch("superheroes.php?query=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(hero => {
            resultDiv.innerHTML = ""; // Clear old results

            if (!hero) {
                // Not found — show message and ensure any previous animation is removed
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

                // Append content first, then restart the fade animation so it runs every time
                resultDiv.append(alias, name, bio);

                // Restart animation: remove, force reflow, then add
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
