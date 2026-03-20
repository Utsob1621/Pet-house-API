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
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`,
  );
  const data = await response.json();
  console.log(data);
};

loadPets();

loadCategory();
