document.addEventListener('DOMContentLoaded', function () {
  const menuSections = [
    { id: 'apps', title: 'Appetizers' },
    { id: 'pizzas', title: 'Pizzas' },
    { id: 'hot-sandwiches', title: 'Hot Sandwiches' },
    { id: 'cold-sandwiches', title: 'Cold Sandwiches' },
    { id: 'grill', title: 'From The Grill' },
    { id: 'wings', title: 'Wings' },
    { id: 'wraps', title: 'Wraps' },
    { id: 'pastas', title: 'Pastas' },
    { id: 'salads', title: 'Salads' },
  ];

  const menuContent = document.getElementById('menu-content');

  menuSections.forEach((section) => {
    const sectionElement = document.createElement('section');
    sectionElement.id = section.id;

    let titleContent;
    titleContent = `
        <div class="title-wrapper one-word">
          <div class="top" id="title-${section.id}">${section.title}</div>
          <div class="bottom" aria-hidden="true">${section.title}</div>
        </div>`;

    sectionElement.innerHTML = `
      <h2>${titleContent}</h2>
      <div class="row"></div>
    `;
    menuContent.appendChild(sectionElement);

    // Load the menu items for the current section
    loadMenu(section.id);
  });
});

function loadMenu(menu) {
  fetch(`items/${menu}.json`)
    .then((response) => response.json())
    .then((data) => renderMenu(menu, data))
    .catch((error) => console.error('Error loading menu:', error));
}

function renderMenu(menu, items) {
  const section = document.querySelector(`#${menu} .row`);
  section.innerHTML = ''; // Clear previous items

  // Create one card for the entire section
  const card = document.createElement('div');
  card.className = 'card';

  // Add extra toppings section for 'pizzas'
  if (menu === 'pizzas') {
    const extraToppingsSection = `
      <div class="extra-toppings">
        <div class="extra-topping-info">
          <span class="extra-topping">Extra Topping: $3</span>
          <span class="half-topping">1/2 Topping: $2</span>
        </div>
        <div class="toppings-list">
          Pepperoni ~ Peppers ~ Sausage ~ Mushrooms ~ Onions
        </div>
      </div>
    `;
    section.innerHTML += extraToppingsSection; // Add extra toppings section above the card
  }

  // Add extra toppings section for 'salads'
  if (menu === 'salads') {
    const extraToppingsSection = `
      <div class="extra-toppings">
        <div class="extra-topping-info">
          <span class="extra-topping">Chicken: $2</span>
          <span class="half-topping">Baby Shrimp: $4</span>
        </div>
        <div class="toppings-list">
          Oil & Vinegar ~ Balsamic Vinegar ~ French Dressing ~ Ranch ~ Creamy Italian ~ Honey Mustard ~ Blue Cheese ~ Caesar
        </div>
      </div>
    `;
    section.innerHTML += extraToppingsSection; // Add extra toppings section above the card
  }

  // Add note for 'wings'
  if (menu === 'wings') {
    const noteSection = `
      <div class="note-section">
        <span>Boneless Wings Available</span>
      </div>
    `;
    section.innerHTML += noteSection; // Add note above the card
  }

  // Add note for 'cold-sandwiches'
  if (menu === 'cold-sandwiches') {
    const noteSection = `
    <div class="note-section">
      <span>Lettuce, Tomato, and Balsamic Vinaigrette unless otherwise specified on all sandwiches</span>
    </div>
  `;
    section.innerHTML += noteSection; // Add note above the card
  }

  // Add note for 'pastas'
  if (menu === 'pastas') {
    const noteSection = `
    <div class="note-section">
      <div class="note">
        Chicken:$3 ~ Baby Shrimp:$4 ~ Meat Sauce:$3
      </div>
      <div class="additional-info">
        Whole Wheat Pasta and Gluten Free Pasta Available: $2 Extra
      </div>
    </div>
  `;
    section.innerHTML += noteSection; // Add note above the card
  }

  let cardContent = '';

  items.forEach((item) => {
    // Check if sizes property exists and is an object
    const sizes =
      item.sizes && typeof item.sizes === 'object' ? item.sizes : {};

    // Handle items with only a price
    if (sizes['Price']) {
      const price = sizes['Price'];
      cardContent += `
        <div class="menu-item">
          <div class="item-details">
            <div class="item-name">${item.name}</div>
          </div>
          <div class="item-price">${price}</div> <!-- Display price next to item -->
        </div>
      `;
    } else {
      // Handle items with size options (e.g., pizzas)
      const priceMed = sizes['Medium']
        ? `<div class="price-med">${sizes['Medium']}</div>`
        : ''; // Show empty string if Medium size does not exist
      const priceLg = sizes['Large']
        ? `<div class="price-lg">${sizes['Large']}</div>`
        : ''; // Show empty string if Large size does not exist

      cardContent += `
        <div class="menu-item">
          <div class="item-details">
            <div class="item-name">${item.name}</div>
            ${
              item.ingredients
                ? `<div class="item-ingredients">${item.ingredients}</div>`
                : ''
            }
          </div>
          <div class="sizes-container">
            <div class="size-options">
              ${priceMed ? '<div class="size-label">Med. 16"</div>' : ''}
              ${priceLg ? '<div class="size-label">Lg. 18"</div>' : ''}
            </div>
            <div class="prices">
              ${priceMed}
              ${priceLg}
            </div>
          </div>
        </div>
      `;
    }
  });

  card.innerHTML = `
    <div class="card-content">
      ${cardContent}
    </div>
  `;

  section.appendChild(card);
}
