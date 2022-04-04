const cards = document.getElementById("card-dinamic");
const cardTemplate = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    loadingData(true);

    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    showCards(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingData(false);
  }
};

const showCards = (data) => {
  //console.log(data)
  data.results.forEach((item) => {
    const clone = cardTemplate.cloneNode(true);
    clone.querySelector("h5").textContent = item.name;
    clone.querySelector("p").textContent = `Especie: ${item.species}`;
    clone.querySelector(".card-img-top").setAttribute("src", item.image);
    clone.querySelector("#gender").textContent = `Genero: ${item.gender}`;
    clone.querySelector("#origin").textContent = `Origen: ${item.origin.name}`;

    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

const loadingData = (estado) => {
  const loading = document.getElementById("loading");
  if (estado) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};
