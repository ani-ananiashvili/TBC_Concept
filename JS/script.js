"use strict";

// body

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  setTimeout(() => {
    body.classList.add('visible');
  }, 100); 
});


// message button section

document.getElementById("chatButton").addEventListener("click", function () {
  this.classList.toggle("active");
  document.getElementById("hiddenButtons").classList.toggle("active");
});


// slider section

let currentSlide = 0;
let isDragging = false;
let startX = 0;
let initialOffsetX = 0;

const slidesContainer = document.querySelector('.slides');
const progressLine = document.querySelector('.progress-line');
const lineContainer = document.querySelector('.line-container');

const showSlide = (index) => {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = Math.ceil(slides.length / 3);

  currentSlide = index >= totalSlides ? 0 : index < 0 ? totalSlides - 1 : index;

  const offset = (-currentSlide * 100) / 3;
  slidesContainer.style.transform = `translateX(${offset}%)`;

  const lineOffset = currentSlide * (100 / totalSlides);
  progressLine.style.transform = `translateX(${lineOffset}%)`;
};

const moveSlide = (n) => {
  showSlide(currentSlide + n);
};

const onMouseDown = (e) => {
  isDragging = true;
  startX = e.clientX || e.touches[0].clientX;
  initialOffsetX = progressLine.getBoundingClientRect().left - lineContainer.getBoundingClientRect().left;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('touchmove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('touchend', onMouseUp);
};

const onMouseMove = (e) => {
  if (!isDragging) return;
  requestAnimationFrame(() => {
    const x = e.clientX || e.touches[0].clientX;
    const dx = x - startX;
    const maxOffset = lineContainer.clientWidth - progressLine.clientWidth;
    let newOffsetX = initialOffsetX + dx;

    newOffsetX = Math.max(0, Math.min(newOffsetX, maxOffset));
    progressLine.style.transform = `translateX(${newOffsetX}px)`;

    const newSlide = Math.round((newOffsetX / maxOffset) * (Math.ceil(document.querySelectorAll('.slide').length / 3) - 1));
    showSlide(newSlide);
  });
};

const onMouseUp = () => {
  isDragging = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('touchmove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  document.removeEventListener('touchend', onMouseUp);
};

// initial display

showSlide(currentSlide);

progressLine.addEventListener('mousedown', onMouseDown);
progressLine.addEventListener('touchstart', onMouseDown);


