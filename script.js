document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Dropdown Menus
  document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const dropdown = this.parentElement;
        dropdown.classList.toggle('active');
      }
    });
  });

  // Initialize Masonry
  const grid = document.querySelector('.masonry-grid-custom');
  if (grid && typeof Masonry !== 'undefined') {
    const imgLoad = imagesLoaded(grid);
    imgLoad.on('done', function() {
      new Masonry(grid, {
        itemSelector: '.portfolio-item-custom',
        columnWidth: '.portfolio-item-custom',
        percentPosition: true,
        gutter: 20
      });
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileBtn.classList.remove('active');
        }
      }
    });
  });

  // Hero Height Adjustment
  function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.minHeight = window.innerHeight + 'px';
    }
  }
  adjustHeroHeight();
  window.addEventListener('resize', adjustHeroHeight);

  // Testimonial Slider with Buttons + Dots
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    const dots = testimonialSlider.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-controls #prev');
    const nextBtn = document.querySelector('.testimonial-controls #next');
    let currentIndex = 0;

    function showTestimonial(index) {
      testimonials.forEach(t => t.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showTestimonial(index));
    });

    // Button navigation
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(newIndex);
      });
      nextBtn.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(newIndex);
      });
    }

    // Auto-rotate
    if (testimonials.length > 1) {
      setInterval(() => {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
      }, 5000);
    }

    // Show first testimonial initially
    showTestimonial(currentIndex);
  }

  // Animation on Scroll
  const animateOnScroll = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };
  
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });
  
  document.querySelectorAll('.industry-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Window resize handler
  function handleResize() {
    adjustHeroHeight();
    if (window.innerWidth > 992) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
      if (mainNav) mainNav.classList.remove('active');
      if (mobileBtn) mobileBtn.classList.remove('active');
    }
  }
  window.addEventListener('resize', handleResize);

  // Phone button click handler
  const phoneBtn = document.querySelector('.btn-outline[href^="tel:"]');
  if (phoneBtn) {
    phoneBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const phoneNumber = this.getAttribute('href').replace('tel:', '');
      if (confirm(`Call ${phoneNumber}?`)) {
        window.location.href = `tel:${phoneNumber}`;
      }
    });
  }
});
