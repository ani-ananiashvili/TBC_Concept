let currentSlide = 0;
let isDragging = false;
let startX, initialOffsetX;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length / 3; // Since we show 3 slides at a time
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100 / 3;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;

    const lineOffset = currentSlide * (100 / totalSlides);
    document.querySelector('.progress-line').style.transform = `translateX(${lineOffset}%)`;
}

function moveSlide(n) {
    showSlide(currentSlide + n);
}

function onMouseDown(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    const progressLine = document.querySelector('.progress-line');
    initialOffsetX = progressLine.getBoundingClientRect().left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);
}

function onMouseMove(e) {
    if (!isDragging) return;
    const x = e.clientX || e.touches[0].clientX;
    const dx = x - startX;
    const progressLine = document.querySelector('.progress-line');
    const lineContainer = document.querySelector('.line-container');
    const maxOffset = lineContainer.clientWidth - progressLine.clientWidth;
    let newOffsetX = initialOffsetX + dx - lineContainer.getBoundingClientRect().left;

    newOffsetX = Math.max(0, Math.min(newOffsetX, maxOffset));

    progressLine.style.transform = `translateX(${newOffsetX}px)`;

    const newSlide = Math.round((newOffsetX / maxOffset) * (document.querySelectorAll('.slide').length / 3 - 1));
    showSlide(newSlide);
}

function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchmove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchend', onMouseUp);
}

// Initial display
showSlide(currentSlide);

const progressLine = document.querySelector('.progress-line');
progressLine.addEventListener('mousedown', onMouseDown);
progressLine.addEventListener('touchstart', onMouseDown);
