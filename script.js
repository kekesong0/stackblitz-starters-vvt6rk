const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cards = document.querySelectorAll('.product-card') || {};
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
if (cards.length > 0) {
    const cardWidth = cards[0].getBoundingClientRect().width; // 获取单个卡片宽度

// Initialize the carousel and position each card horizontally
cards.forEach((card, index) => {
    card.style.left = `${index * cardWidth}px`; // 设置每个卡片的初始位置
});

// Set current index of the visible card and number of cards visible in one frame
let currentIndex = 0; 
const visibleCards = 4;

// Event for the "Previous" button
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--; // Move to the previous card index
        const amountToMove = -currentIndex * cardWidth; // Calculate movement distance
        track.style.transform = `translateX(${amountToMove}px)`; // Move the carousel
    }
});

// Event for the "Next" button
nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - visibleCards) {
        currentIndex++;
        const amountToMove = -currentIndex * cardWidth;
        track.style.transform = `translateX(${amountToMove}px)`;
    }
});

// Ensure the carousel starts with "Cakes" in view
track.style.transform = `translateX(0px)`;
}
// Rating system
const ratingContainers = document.querySelectorAll('.rating-container');

ratingContainers.forEach(container => {
    const stars = container.querySelectorAll('.star');
    const ratingResult = container.querySelector('.rating-result');
    let selectedRating = 0; // 默认评分为0

    stars.forEach((star, index) => {
        // Mouseover event: Highlights all stars up to the hovered star
        star.addEventListener('mouseover', () => {
            // When the user hovers over a star, all stars up to (and including) the hovered star are highlighted.
            // This gives users immediate visual feedback about the rating they are about to select.
            stars.forEach((s, i) => {
                s.style.color = i <= index ? '#FFD700' : '#ddd';
            });
        });

        // Mouseout event: Resets the stars' appearance to match the selected rating
        star.addEventListener('mouseout', () => {
            // When the mouse leaves a star, the stars reset to reflect the current selected rating (or none, if no rating is selected).
            // This ensures the stars' appearance always matches the user's confirmed selection.
            stars.forEach((s, i) => {
                s.style.color = i < selectedRating ? '#FFD700' : '#ddd';
            });
        });

        // Click event: Saves the selected rating and updates the display
        star.addEventListener('click', () => {
            selectedRating = index + 1; 
            stars.forEach((s, i) => {
                s.style.color = i < selectedRating ? '#FFD700' : '#ddd';
            });
            ratingResult.textContent = `Rating: ${selectedRating}`; 
        });
    });
});

// Theme toggle functionality
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.classList.add(savedTheme);
}

// Event listener for the theme toggle button
themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        // If the current theme is dark, switch to light
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', '');  // Save the light theme state to localStorage
    } else {
         // If the current theme is light, switch to dark
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme'); // Save the dark theme state to localStorage
    }
});

