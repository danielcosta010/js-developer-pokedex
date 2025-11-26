const pokemonOl = document.getElementById("pokemonList");

pokemonOl.addEventListener("click", ({ target }) => {
  const li = target.closest(".pokemon");
  if (li) openPokemonModal(li.querySelector(".number").textContent.slice(1));
});

function openPokemonModal(pokemonNumber) {
  pokeApi
    .getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/` })
    .then((pokemon) => {
      const { name, number, photo, type, types, abilities, height, weight } = pokemon;

      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-content ${type}">
          <button class="close-button" aria-label="Fechar">&times;</button>
          <div class="modal-header">
            <span class="pokemon-number">#${number}</span>
            <h2>${name}</h2>
          </div>
          <div class="modal-image">
            <img src="${photo}" alt="${name}">
          </div>
          <div class="modal-info">
            <ol class="types">
              ${types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-value">${(height / 10).toFixed(2)}m</span>
                <span class="stat-label">Altura</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">${(weight / 10).toFixed(2)}kg</span>
                <span class="stat-label">Peso</span>
              </div>
            </div>
            <div class="abilities">
              <h3>Habilidades</h3>
              <div class="abilities-list">
                ${abilities.map((ability) => `<span class="ability-tag">${ability }</span>`).join("")}
              </div>
            </div>
          </div>
        </div>`;

      document.body.appendChild(modal);
      requestAnimationFrame(() => modal.classList.add("active"));

      const closeModal = () => {
        modal.classList.remove("active");
        setTimeout(() => modal.remove(), 300);
      };

      modal.querySelector(".close-button").addEventListener("click", closeModal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          const content = modal.querySelector(".modal-content");
          content.classList.add("shake");
          content.addEventListener("animationend", () => content.classList.remove("shake"), { once: true });
        }
      });
    });
}
