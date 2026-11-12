
const container = document.getElementById("pokemonContainer");
const message = document.getElementById("message");

document.getElementById("fetchBtn").addEventListener("click", () => getPokemon(""));
document.getElementById("searchBtn").addEventListener("click", () => {
    const name = document.getElementById("searchBox").value.toLowerCase().trim();
    getPokemon(name);
});

async function getPokemon(name) {
    container.innerHTML = "";
    message.textContent = "Loading...";

    try {
        let url = "https://pokeapi.co/api/v2/pokemon/";
        if (name !== "") {
            url += encodeURIComponent(name);
        } else {
            url += "?limit=24";
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Pokemon not found");

        const data = await response.json();
        const pokemonList = name ? [data] : data.results;

        for (const pokemon of pokemonList) {
            const details = name ? pokemon : await (await fetch(pokemon.url)).json();

            const card = document.createElement("div");
            card.className = "pokemonCard";

            const image = document.createElement("img");
            image.src = details.sprites.front_default;

            const info = document.createElement("p");
            info.textContent = details.name + " #" + details.id;

            card.appendChild(image);
            card.appendChild(info);
            container.appendChild(card);
        }

        message.textContent = "";
    } catch (error) {
        message.textContent = "Error: " + error.message;
    }
}