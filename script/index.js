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
      <img class = "w-6 lg:w-8 animate-pulse" src="${cat.category_icon}" alt=""></button>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};

// displayCategory section

const loadPets = async (categoryName) => {
  spinnerShow("loading-data");
  foundNoteHide("no-data");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`,
  );
  const data = await response.json();
  if (data.data) {
    displayPets(data.data);
    spinnerHide("loading-data");
  }
};

const displayPets = (pets) => {
  if (pets.length <= 0) {
    foundNoteShow("no-data");
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
    <div class=" flex justify-around gap-8">
    <h2 class="card-title font-medium">Name : ${pet.pet_name}</h2>
    <h2 class="card-gender font-medium">Gender : ${pet.gender ? pet.gender : " "}</h2>
    </div>
    <p class = "line-clamp-2 font-normal">${pet.pet_details}</p>
    <div class="card-actions justify-start">
      <button onclick="my_modal_1.showModal()" class="btn btn-primary text-white font-medium select w-full">Select</button>
      <button class="btn btn-primary text-white font-medium w-full">Details</button>
    </div>
  </div>
</div>
    `;
    petsContainer.appendChild(petsDiv);
  });

  const allSelectButton = document.getElementsByClassName("select");
  for (const button of allSelectButton) {
    button.addEventListener("click", (event) => {
      const cardBody = event.target.closest(".card-body");
      // const petImage = cardBody.querySelector(".image").innerText;
      const petTitle = cardBody.querySelector(".card-title").innerText;
      const gender = cardBody.querySelector(".card-gender").innerText;
      openModel(petTitle, gender);
      console.log(cardBody);
    });
  }
};

const openModel = (title, gen) => {
  const modelSubContainer = document.getElementById("model-sub-container");
  const modelDiv = document.createElement("div");
  modelDiv.classList.add("border", "border-[#FFF0F5]", "p-5", "shadow-sm", "rounded-lg", "mb-5")
  modelDiv.innerHTML = `
      <h2 class="card-title font-medium">Name : ${title? title : " "}</h2>
      <h2 class="card-gender font-medium">Gender : ${gen}</h2>
      
    `;
  modelSubContainer.appendChild(modelDiv);
};

const foundNoteHide = (id) => {
  document.getElementById(id).style.display = "none";
};

const foundNoteShow = (id) => {
  document.getElementById(id).style.display = "block";
};

const spinnerShow = (id) => {
  document.getElementById(id).style.display = "block";
};

const spinnerHide = (id) => {
  document.getElementById(id).style.display = "none";
};

loadCategory();
loadPets("cat");
