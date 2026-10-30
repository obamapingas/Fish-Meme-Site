
'use strict';

// ========================================
// FISH! - CONFIGURATION
// ========================================

const fishImages = [
  './assets/images/fish1.png',
  './assets/images/fish2.png',
  './assets/images/fish3.png',
  './assets/images/fish4.png',
  './assets/images/fish5.png',
  './assets/images/fish6.png',
  './assets/images/fish7.png',
  './assets/images/fish8.png'
];

const FISH_DISPLAY_DURATION = 7000;

// ========================================
// ELEMENT REFERENCES
// ========================================

const FISHAudio = document.getElementById('FISHAudio');
const fishImage = document.getElementById('fish-image');

// Keep track of the current hide timer.
let fishHideTimer = null;

// ========================================
// PLAY FISH!
// ========================================

function playFISHAudio() {

  // Play a new independent audio instance.
  // Audio overlap is intentional.
  const newInstance = FISHAudio.cloneNode(true);

  newInstance.play().catch(error => {
    console.warn('FISH audio could not be played:', error);
  });

  // Select a random fish.
  const randomIndex = Math.floor(Math.random() * fishImages.length);
  const randomFishImage = fishImages[randomIndex];

  // Reset the previous hide timer.
  clearTimeout(fishHideTimer);

  // Remove previous animation classes.
  fishImage.classList.remove(
    'fish-appearing',
    'fish-disappearing'
  );

  // Display the selected fish.
  fishImage.src = randomFishImage;
  fishImage.style.display = 'block';

  // Trigger the appearing animation.
  // Force a reflow so the animation restarts correctly.
  void fishImage.offsetWidth;

  fishImage.classList.add('fish-appearing');

  // Hide the fish after 7 seconds.
  fishHideTimer = setTimeout(() => {

    // Remove the appearing animation.
    fishImage.classList.remove('fish-appearing');

    // Trigger the disappearing animation.
    fishImage.classList.add('fish-disappearing');

    // Wait until the disappearing animation finishes.
    fishImage.addEventListener('animationend', function hideFish(event) {

      // Ignore animations from other elements.
      if (event.target !== fishImage) return;

      // Ignore the appearing animation.
      if (event.animationName !== 'fish-exit') return;

      // Remove the animation class.
      fishImage.classList.remove('fish-disappearing');

      // Finally hide the fish.
      fishImage.style.display = 'none';

      // Remove the event listener.
      fishImage.removeEventListener('animationend', hideFish);

    });

  }, FISH_DISPLAY_DURATION);
}
