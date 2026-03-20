const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories",
  );
  const data = await response.json();
  showCategory(data.categories);
};

// onclick = "loadPets("go")"
const showCategory = (categories) => {
  categories.forEach((element) => {
    // console.log(element);
    const categoryContainer = document.getElementById("category-container");

    const div = document.createElement("div");
    div.innerHTML = `
      <button onclick = "loadPets('${element.category}')" class = "btn"{
        constructor(parameters) {
          
        }
      }>${element.category} 
      <img class = "w-8" src="${element.category_icon}" alt="">
      </button>
    `;
    categoryContainer.appendChild(div);
  });
};

const loadPets = async (categoryName) => {

  document.getElementById("no-data").style.display = "none"
  petsContainer = document.getElementById("pets-container").style.display = "block";

  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`,
  );
  const data = await response.json();
  displayPets(data.data);
};


const displayPets = (pets) => {

  if(pets.length < 1){
      petsContainer = document.getElementById("pets-container").style.display = "none";
      document.getElementById("no-data").style.display = "block"
  }
  pets.forEach((pet) => {
    // console.log(pet);
    const petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("mt-5")
    div.innerHTML = `
      <div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="${pet.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${pet.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary select">Select</button>
    </div>
  </div>
</div>
    `

    petsContainer.appendChild(div);
  })


  const allSelectButton = document.getElementsByClassName("select");
  for (const button of allSelectButton){
    button.addEventListener("click", (event) => {
      console.log(event.target)
    })
  }
}

loadPets("cat");

loadCategory();
