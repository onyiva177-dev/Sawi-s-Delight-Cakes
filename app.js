// Sawi's Delight Cakes - Main Application Logic

// Load data from localStorage or use default
function loadData() {
  const savedData = localStorage.getItem('sawiDelightData');
  return savedData ? JSON.parse(savedData) : websiteData;
}

const data = loadData();

// Initialize the website
function initWebsite() {
  renderHeroSlideshow();
  renderCakes();
  renderFeatures();
  renderOrderingSteps();
  renderTestimonials();
  renderAbout();
  renderContactInfo();
  initSmoothScroll();
  initScrollAnimations();
}

// Hero Slideshow
function renderHeroSlideshow() {
  const container = document.getElementById('heroSlideshow');
  if (!container) return;
  
  container.innerHTML = data.heroSlides.map((slide, index) => `
    <div class="hero-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.image}')">
    </div>
  `).join('');
  
  let currentSlide = 0;
  const slides = container.querySelectorAll('.hero-slide');
  
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// Render Cake Categories with Slideshows
function renderCakes() {
  const container = document.getElementById('cakeCategories');
  if (!container) return;
  
  container.innerHTML = data.cakes.map((cake, cakeIndex) => {
    const detailsHTML = cake.details.map(detail => `
      <div class="detail-item">
        <span class="detail-label">${detail.label}</span>
        <span class="detail-value">${detail.value}</span>
      </div>
    `).join('');
    
    const slidesHTML = cake.images.map((img, imgIndex) => `
      <div class="cake-image-slide ${imgIndex === 0 ? 'active' : ''}">
        <img src="${img.url}" alt="${img.alt}" loading="lazy">
      </div>
    `).join('');
    
    const dotsHTML = cake.images.length > 1 ? `
      <div class="slide-nav">
        ${cake.images.map((_, idx) => `
          <span class="slide-dot ${idx === 0 ? 'active' : ''}" data-cake="${cakeIndex}" data-slide="${idx}"></span>
        `).join('')}
      </div>
    ` : '';
    
    const priceHTML = cake.startingPrice ? `<p class="price">${cake.startingPrice}</p>` : '';
    
    return `
      <div class="cake-card" data-cake-index="${cakeIndex}">
        <div class="cake-image-container">
          ${slidesHTML}
          ${dotsHTML}
        </div>
        <div class="cake-content">
          <h3 class="cake-title">${cake.title}</h3>
          <p class="cake-description">${cake.description}</p>
          <div class="cake-details">
            ${detailsHTML}
          </div>
          ${priceHTML}
          <div class="cake-cta">
            <a href="https://wa.me/${data.business.phone.replace(/[^0-9]/g, '')}?text=I'm%20interested%20in%20${encodeURIComponent(cake.title)}" 
               class="btn btn-primary btn-small" target="_blank">Order Now</a>
            <a href="tel:${data.business.phone}" class="btn btn-secondary btn-small">Call Us</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Initialize cake slideshows
  initCakeSlideshows();
  
  // Add click handlers for slide dots
  document.querySelectorAll('.slide-dot').forEach(dot => {
    dot.addEventListener('click', function() {
      const cakeIndex = parseInt(this.dataset.cake);
      const slideIndex = parseInt(this.dataset.slide);
      goToCakeSlide(cakeIndex, slideIndex);
    });
  });
}

// Initialize automatic slideshows for cake images
function initCakeSlideshows() {
  data.cakes.forEach((cake, cakeIndex) => {
    if (cake.images.length > 1) {
      let currentSlide = 0;
      
      setInterval(() => {
        currentSlide = (currentSlide + 1) % cake.images.length;
        goToCakeSlide(cakeIndex, currentSlide);
      }, 4000 + (cakeIndex * 500)); // Stagger the slideshows
    }
  });
}

// Go to specific cake slide
function goToCakeSlide(cakeIndex, slideIndex) {
  const card = document.querySelector(`[data-cake-index="${cakeIndex}"]`);
  if (!card) return;
  
  const slides = card.querySelectorAll('.cake-image-slide');
  const dots = card.querySelectorAll('.slide-dot');
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

// Render Features
function renderFeatures() {
  const container = document.getElementById('featuresGrid');
  if (!container) return;
  
  container.innerHTML = data.features.map(feature => `
    <div class="feature-item">
      <div class="feature-icon">${feature.icon}</div>
      <h4 class="feature-title">${feature.title}</h4>
      <p class="feature-desc">${feature.description}</p>
    </div>
  `).join('');
}

// Render Flavor Options
document.addEventListener('DOMContentLoaded', () => {
  const flavorElement = document.getElementById('flavorOptions');
  if (flavorElement) {
    flavorElement.textContent = data.flavors;
  }
});

// Render Ordering Steps
function renderOrderingSteps() {
  const container = document.getElementById('processSteps');
  if (!container) return;
  
  container.innerHTML = data.orderingSteps.map(step => `
    <div class="process-step">
      <div class="step-number">${step.number}</div>
      <h4 class="step-title">${step.title}</h4>
      <p class="step-desc">${step.description}</p>
    </div>
  `).join('');
}

// Render Testimonials
function renderTestimonials() {
  const container = document.getElementById('testimonialGrid');
  if (!container) return;
  
  container.innerHTML = data.testimonials.map(testimonial => {
    const starsHTML = '⭐'.repeat(testimonial.stars);
    
    return `
      <div class="testimonial-card">
        <div class="quote-icon">"</div>
        <div class="stars">${starsHTML}</div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <p class="testimonial-author">- ${testimonial.author}</p>
        <p class="testimonial-event">${testimonial.event}</p>
      </div>
    `;
  }).join('');
}

// Render About Section
function renderAbout() {
  const container = document.getElementById('aboutContent');
  if (!container) return;
  
  container.innerHTML = data.about.map(paragraph => `
    <p>${paragraph}</p>
  `).join('');
}

// Render Contact Info
function renderContactInfo() {
  const phoneFormatted = data.business.phone;
  const phoneNumbers = data.business.phone.replace(/[^0-9]/g, '');
  
  // Location info
  const locationAddress = document.getElementById('locationAddress');
  if (locationAddress) {
    locationAddress.innerHTML = data.business.location.replace(/,/g, '<br>');
  }
  
  // WhatsApp links
  const whatsappLink = document.getElementById('whatsappLink');
  if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${phoneNumbers}`;
    whatsappLink.textContent = phoneFormatted;
  }
  
  // Phone links
  const phoneLink = document.getElementById('phoneLink');
  if (phoneLink) {
    phoneLink.href = `tel:${phoneFormatted}`;
    phoneLink.textContent = phoneFormatted;
  }
  
  // Footer
  const footerLocation = document.getElementById('footerLocation');
  if (footerLocation) {
    footerLocation.textContent = data.business.location;
  }
  
  const footerWhatsapp = document.getElementById('footerWhatsapp');
  if (footerWhatsapp) {
    footerWhatsapp.href = `https://wa.me/${phoneNumbers}`;
    footerWhatsapp.textContent = phoneFormatted;
  }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  document.querySelectorAll('.cake-card, .feature-item, .testimonial-card, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWebsite);
} else {
  initWebsite();
}
