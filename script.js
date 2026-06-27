// JWT Slide Presentation Controller

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentSlideIndex = 0; // 0-based internal index

  // DOM Elements
  const slideIndicator = document.getElementById('slide-indicator-bottom');
  const menuNav = document.getElementById('menu-nav');

  // Initialize presentation state from URL hash
  function initPresentation() {
    const hash = window.location.hash;
    let targetIndex = 0;
    if (hash && hash.startsWith('#slide-')) {
      const parsed = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= totalSlides) {
        targetIndex = parsed - 1;
      }
    }
    goToSlideIndex(targetIndex);
  }

  // Navigate to a specific slide index (0-based)
  function goToSlideIndex(index) {
    if (index < 0 || index >= totalSlides) return;
    
    currentSlideIndex = index;

    // Update active slide state
    slides.forEach((slide, idx) => {
      slide.classList.remove('past', 'active', 'future');
      if (idx < currentSlideIndex) {
        slide.classList.add('past');
      } else if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.add('future');
      }
    });

    // Update bottom index text: "current/total"
    if (slideIndicator) {
      slideIndicator.textContent = `${currentSlideIndex + 1}/${totalSlides}`;
    }

    // Update URL hash
    history.replaceState(null, null, `#slide-${currentSlideIndex + 1}`);
  }

  // Exposed global controls
  window.nextSlide = function() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlideIndex(currentSlideIndex + 1);
    }
  };

  window.prevSlide = function() {
    if (currentSlideIndex > 0) {
      goToSlideIndex(currentSlideIndex - 1);
    }
  };

  window.goToSlide = function(slideNumber) {
    goToSlideIndex(slideNumber - 1);
  };

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
      case 'PageDown':
        e.preventDefault();
        window.nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        window.prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlideIndex(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlideIndex(totalSlides - 1);
        break;
    }
  });

  // Touch Swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;

  document.addEventListener('touchstart', (e) => {
    if (e.target.closest('.faq-list') || e.target.closest('#menu-nav')) {
      return;
    }
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (e.target.closest('.faq-list') || e.target.closest('#menu-nav')) {
      return;
    }
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0) {
        window.nextSlide();
      } else {
        window.prevSlide();
      }
    }
  }

  // Hamburger Menu Control
  window.toggleMenu = function() {
    if (menuNav) {
      menuNav.classList.toggle('active');
    }
  };

  window.goToSlideAndClose = function(num) {
    window.goToSlide(num);
    if (menuNav) {
      menuNav.classList.remove('active');
    }
  };

  // Close menu if clicking outside
  document.addEventListener('click', (e) => {
    if (menuNav && menuNav.classList.contains('active')) {
      if (!e.target.closest('.menu-btn') && !e.target.closest('#menu-nav')) {
        menuNav.classList.remove('active');
      }
    }
  });

  // FAQ Accordion Logic
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const currentItem = question.closest('.faq-item');
      const isActive = currentItem.classList.contains('active');

      // Close all FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        currentItem.classList.add('active');
        const answer = currentItem.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Handle window resize for FAQ accordion
  window.addEventListener('resize', () => {
    const activeFaq = document.querySelector('.faq-item.active');
    if (activeFaq) {
      const answer = activeFaq.querySelector('.faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });

  // Initialize
  initPresentation();
});
