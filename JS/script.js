let currentSlide = 0;

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
    document.querySelector('.line').style.transform = `translateX(${lineOffset}%)`;
}

function moveSlide(n) {
    showSlide(currentSlide + n);
}

// Initial display
showSlide(currentSlide);
