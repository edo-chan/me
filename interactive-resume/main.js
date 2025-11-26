// Clock Logic
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); // 24-hour format for status bar usually, or 12 without AM/PM
    let hours12 = now.getHours();
    const ampm = hours12 >= 12 ? 'PM' : 'AM';
    hours12 = hours12 % 12;
    hours12 = hours12 ? hours12 : 12; // the hour '0' should be '12'
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const timeString = `${hours12}:${minutes}`;
    const statusTime = document.getElementById('status-time');
    if (statusTime) statusTime.textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();


// Elements
const sliderContainer = document.getElementById('slider-container');
const sliderThumb = document.getElementById('slider-thumb');
const sliderText = document.getElementById('slider-text');
const lockScreen = document.getElementById('lock-screen');
const mainContainer = document.getElementById('main-container');
const journalView = document.getElementById('journal-view');
const bodyBg = document.getElementById('body-bg');

let isDragging = false;
let startX = 0;
let currentX = 0;

// Touch Events
sliderThumb.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', endDrag);

// Mouse Events
sliderThumb.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    sliderContainer.classList.add('cursor-grabbing');
}

function drag(e) {
    if (!isDragging) return;

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const containerRect = sliderContainer.getBoundingClientRect();
    const maxDrag = containerRect.width - sliderThumb.offsetWidth - 16; // 16px padding (8px each side)

    let moveX = clientX - startX;

    if (moveX < 0) moveX = 0;
    if (moveX > maxDrag) moveX = maxDrag;

    currentX = moveX;
    sliderThumb.style.transform = `translateX(${moveX}px)`;

    // Opacity of text fades as you slide
    const opacity = 1 - (moveX / maxDrag);
    sliderText.style.opacity = opacity;

    // Unlock threshold
    if (moveX >= maxDrag * 0.9) {
        unlockPhone();
        isDragging = false; // Stop dragging
    }
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    sliderContainer.classList.remove('cursor-grabbing');

    // Reset if not unlocked
    if (currentX < (sliderContainer.offsetWidth - sliderThumb.offsetWidth - 16) * 0.9) {
        sliderThumb.style.transition = 'transform 0.3s ease';
        sliderThumb.style.transform = 'translateX(0px)';
        sliderText.style.opacity = 0.9;

        setTimeout(() => {
            sliderThumb.style.transition = 'none';
        }, 300);
    }
}

function unlockPhone() {
    // Morph Animation

    // 1. Expand Container
    mainContainer.classList.remove('md:w-[400px]', 'md:h-[850px]', 'md:rounded-[3.5rem]', 'bg-black/20', 'backdrop-blur-3xl', 'border-white/10');
    mainContainer.classList.add('md:w-[90vw]', 'md:max-w-6xl', 'md:h-[85vh]', 'md:rounded-3xl', 'bg-[#fdfbf7]', 'border-gray-800');

    // 2. Change Body Background (Darker for contrast with journal)
    bodyBg.classList.remove('bg-gradient-to-br', 'from-purple-600', 'via-blue-500', 'to-pink-500');
    bodyBg.classList.add('bg-stone-900');

    // 3. Hide Lock Screen
    lockScreen.style.opacity = '0';
    lockScreen.style.pointerEvents = 'none';

    // 4. Show Journal
    setTimeout(() => {
        journalView.classList.remove('opacity-0');
    }, 400);
}

function lockPhone() {
    // Revert Animation

    // 1. Shrink Container
    mainContainer.classList.remove('md:w-[90vw]', 'md:max-w-6xl', 'md:h-[85vh]', 'md:rounded-3xl', 'bg-[#fdfbf7]', 'border-gray-800');
    mainContainer.classList.add('md:w-[400px]', 'md:h-[850px]', 'md:rounded-[3.5rem]', 'bg-black/20', 'backdrop-blur-3xl', 'border-white/10');

    // 2. Revert Body Background
    bodyBg.classList.remove('bg-stone-900');
    bodyBg.classList.add('bg-gradient-to-br', 'from-purple-600', 'via-blue-500', 'to-pink-500');

    // 3. Hide Journal
    journalView.classList.add('opacity-0');

    // 4. Show Lock Screen
    setTimeout(() => {
        lockScreen.style.opacity = '1';
        lockScreen.style.pointerEvents = 'auto';

        // Reset slider
        sliderThumb.style.transform = 'translateX(0px)';
        sliderText.style.opacity = 0.9;
    }, 400);
}
