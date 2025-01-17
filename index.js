// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all slider elements
    const sliderContainer = document.querySelector('.slider-container');
    const sliderImages = document.querySelector('.slider-images');
    const slides = document.querySelectorAll('.slider-img');
    
    // Function to handle slide activation
    function activateSlide(slide) {
        // Remove active class from all slides
        slides.forEach(s => s.classList.remove('active'));
        // Add active class to current slide
        slide.classList.add('active');
    }
    
    // Add click event listeners to each slide
    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            activateSlide(this);
            
            // Scroll the clicked slide into view with smooth behavior
            this.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        });
    });
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    let currentSlideIndex = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchend', () => {
        const touchDiff = touchStartX - touchEndX;
        
        // If swipe distance is significant enough
        if (Math.abs(touchDiff) > 50) {
            if (touchDiff > 0 && currentSlideIndex < slides.length - 1) {
                // Swipe left
                currentSlideIndex++;
            } else if (touchDiff < 0 && currentSlideIndex > 0) {
                // Swipe right
                currentSlideIndex--;
            }
            
            activateSlide(slides[currentSlideIndex]);
            slides[currentSlideIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    });
    
    // Add mouse drag scrolling
    let isDown = false;
    let startX;
    let scrollLeft;
    
    sliderImages.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - sliderImages.offsetLeft;
        scrollLeft = sliderImages.scrollLeft;
    });
    
    sliderImages.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    sliderImages.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    sliderImages.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderImages.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        sliderImages.scrollLeft = scrollLeft - walk;
    });
    
    // Handle window resize for responsiveness
    window.addEventListener('resize', () => {
        // Get the active slide
        const activeSlide = document.querySelector('.slider-img.active');
        if (activeSlide) {
            // Re-center the active slide when window is resized
            activeSlide.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    });
});