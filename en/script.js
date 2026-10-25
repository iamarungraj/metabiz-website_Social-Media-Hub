// Grab the elements from HTML
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Listen for a click on the hamburger button
hamburger.addEventListener('click', () => {
    // Toggle the 'active' class to show/hide the menu
    navMenu.classList.toggle('active');
});

const toggleButton = document.getElementById('menu-toggle');
const socialMenu = document.getElementById('social-menu');
const socialItems = socialMenu.querySelectorAll('li');
const hubContainer = document.getElementById('hub-container');

// --- DYNAMIC RADIUS MATH ---
function calculateLayout() {
  // Check the HTML class to see where you positioned the hub
  const isLeft = hubContainer.classList.contains('pos-bottom-left');
  const isCenterBot = hubContainer.classList.contains('pos-bottom-center');
  const isCenterMid = hubContainer.classList.contains('pos-center');

  let startAngle = 90; 
  let arcSpan = 90;

  if (isLeft) { startAngle = 0; arcSpan = 90; }
  else if (isCenterBot) { startAngle = 0; arcSpan = 180; }
  else if (isCenterMid) { startAngle = 0; arcSpan = 360; }

  const itemCount = socialItems.length;
  const divisor = arcSpan === 360 ? itemCount : (itemCount > 1 ? itemCount - 1 : 1);
  const stepAngle = arcSpan / divisor;
  const stepAngleRadians = stepAngle * (Math.PI / 180);

  // Auto-calculate gap spacing to prevent overlap
  let calculatedRadius = 120;
  if (stepAngleRadians > 0) {
    calculatedRadius = 55 / (2 * Math.sin(stepAngleRadians / 2));
  }
  const activeRadius = Math.max(120, calculatedRadius);

  socialItems.forEach((item, index) => {
    const angle = startAngle + stepAngle * index;
    const radians = angle * (Math.PI / 180);
    const x = Math.cos(radians) * activeRadius;
    const y = -Math.sin(radians) * activeRadius; 
    
    item.style.setProperty('--x', `${x}px`);
    item.style.setProperty('--y', `${y}px`);
  });
}

// Run math on load
calculateLayout();

// --- CLICKS & MENU CONTROLS ---
toggleButton.addEventListener('click', (event) => {
  event.stopPropagation(); 
  toggleButton.classList.toggle('is-active');
  socialMenu.classList.toggle('is-open');
  toggleButton.setAttribute('aria-expanded', toggleButton.classList.contains('is-active'));
});

// Close menu on outside click
document.addEventListener('click', () => {
  if (socialMenu.classList.contains('is-open')) {
    toggleButton.classList.remove('is-active');
    socialMenu.classList.remove('is-open');
    toggleButton.setAttribute('aria-expanded', 'false');
  }
});