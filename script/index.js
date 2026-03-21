const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories",
  );
  const data = await response.json();
  displayCategory(data.categories);
};

const displayCategory = (categories) => {
  categories.forEach((cat) => {
    // console.log(cat);
    const categoryContainer = document.getElementById("category-container");
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button onclick = loadPets('${cat.category}') class = "btn bg-[#FFF0F5] hover:bg-white font-medium text-xl">${cat.category} 
      <img class = "w-6 lg:w-8" src="${cat.category_icon}" alt=""></button>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};

// displayCategory section

const loadPets = async (categoryName) => {
  document.getElementById("no-data").style.display = "none";

  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`,
  );
  const data = await response.json();
  displayPets(data.data);
};

const displayPets = (pets) => {
  if (pets.length <= 0) {
    document.getElementById("no-data").style.display = "block";
  }
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  pets.forEach((pet) => {
    const petsDiv = document.createElement("div");
    petsDiv.innerHTML = `
      <div class="card bg-base-100 lg:w-96 shadow-sm">
  <figure>
    <img class = "w-full object-cover"
      src="${pet.image}"
      alt="Pet's" />
  </figure>
  <div class="card-body">
    <div class=" flex justify-around gap-8 mb-2">
    <h2 class="card-title font-medium">Name : ${pet.pet_name}</h2>
    <h2 class="card-title font-medium">Gender : ${pet.gender}</h2>
    </div>
    <p class = "line-clamp-2 font-normal">${pet.pet_details}</p>
    <div class="card-actions justify-start">
      <button class="btn btn-primary text-white font-medium">Select</button>
      <button class="btn btn-primary text-white font-medium">Details</button>
    </div>
  </div>
</div>
    `;
    petsContainer.appendChild(petsDiv);
  });
};

loadCategory();
loadPets("cat");
