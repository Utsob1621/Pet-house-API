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
      <button onclick="my_modal_2.showModal(handleDetails(${pet.petId}))"  class="btn btn-primary text-white font-medium w-full">Details</button>
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
      const prevCount = getValueById("cutCount");
      const sum = prevCount + 1;
      document.getElementById("cutCount").innerText = sum;
    });
  }
};

const openModel = (title, gen) => {
  const modelSubContainer = document.getElementById("model-sub-container");
  modelSubContainer.innerHTML = "";
  const modelDiv = document.createElement("div");
  modelDiv.classList.add(
    "border",
    "border-[#FFF0F5]",
    "p-5",
    "shadow-sm",
    "rounded-lg",
    "mb-5",
    "lobster-regular",
  );
  modelDiv.innerHTML = `
      <h2 class="card-title font-medium"> ${title ? title : " "}</h2>
      <h2 class="card-gender font-medium">${gen}</h2>
      
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

const getValueById = (id) => {
  const element = document.getElementById(id).innerText;
  const convertedValue = parseInt(element);
  return convertedValue;
};

const handleDetails = async (petId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`,
  );
  const data = await response.json();
  const modelDetailsContainer = document.getElementById(
    "model-details-container",
  );
  modelDetailsContainer.innerHTML = "";
  const modelDiv2 = document.createElement("div");
  modelDiv2.classList.add(
    "border",
    "border-[#FFF0F5]",
    "p-5",
    "shadow-sm",
    "rounded-lg",
    "mb-5",
    "lobster-regular",
  );
  modelDiv2.innerHTML = `
    <h2 class="card-title font-medium">Category : ${data.petData.category ? data.petData.category : " "}</h2>
    <h2 class="card-title font-medium">Name : ${
      data.petData.pet_name ? data.petData.pet_name : " "
    }</h2>
    <h2 class="card-title font-medium">Breed : ${data.petData.breed ? data.petData.breed : " "}</h2>
    <h2 class="card-title font-medium">Date of Birth : ${data.petData.date_of_birth ? data.petData.date_of_birth : " "}</h2>
    <h2 class="card-title font-medium">Gender : ${
      data.petData.gender ? data.petData.gender : " "
    }</h2>
    <p class="card-title font-medium">Price : ${
      data.petData.price ? data.petData.price : " "
    } $</p>
    <p class = "font-normal">Vaccinated Status : ${
      data.petData.vaccinated_status ? data.petData.vaccinated_status : " "
    }</p>
    <p class = "font-normal">Pet Details : ${
      data.petData.pet_details ? data.petData.pet_details : " "
    }</p>
  `;
  modelDetailsContainer.appendChild(modelDiv2);
  console.log(data.petData);
};

loadCategory();
loadPets("cat");
