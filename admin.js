// Sawi's Delight Cakes - Admin Panel Logic

let adminData = JSON.parse(localStorage.getItem('sawiDelightData')) || websiteData;
let currentEditingCake = null;

// Initialize Admin Panel
function initAdmin() {
  loadBusinessInfo();
  loadCakes();
  loadFeatures();
  loadOrderingSteps();
  loadTestimonials();
  loadAbout();
}

// Tab Switching
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(`${tabName}-tab`).classList.add('active');
  
  // Activate button
  event.target.classList.add('active');
}

// Alert System
function showAlert(message, type = 'success') {
  const container = document.getElementById('alertContainer');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
    <span>${message}</span>
  `;
  container.appendChild(alert);
  
  setTimeout(() => {
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

// Save All Changes
function saveAllChanges() {
  // Save business info
  adminData.business.name = document.getElementById('businessName').value;
  adminData.business.phone = document.getElementById('businessPhone').value;
  adminData.business.location = document.getElementById('businessLocation').value;
  adminData.flavors = document.getElementById('flavorOptions').value;
  
  // Save about
  adminData.about = [
    document.getElementById('aboutPara1').value,
    document.getElementById('aboutPara2').value,
    document.getElementById('aboutPara3').value
  ].filter(p => p.trim() !== '');
  
  // Save to localStorage
  localStorage.setItem('sawiDelightData', JSON.stringify(adminData));
  
  showAlert('All changes saved successfully! Click "Export for Vercel" to deploy these changes.', 'success');
}

// Export Data for Vercel Deployment
function exportData() {
  // Create the data.js file content
  const fileContent = `// Sawi's Delight Cakes - Website Data
// This file contains all editable content

const websiteData = ${JSON.stringify(adminData, null, 2)};

// Save to localStorage for persistence
if (typeof localStorage !== 'undefined') {
  const savedData = localStorage.getItem('sawiDelightData');
  if (!savedData) {
    localStorage.setItem('sawiDelightData', JSON.stringify(websiteData));
  }
}
`;

  // Create blob and download
  const blob = new Blob([fileContent], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showAlert('data.js downloaded! Now replace the old data.js file with this one and push to GitHub.', 'success');
  
  // Show instructions modal
  showExportInstructions();
}

// Show export instructions
function showExportInstructions() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 700px;">
      <div class="modal-header">
        <h3>📥 Deploy Your Changes to Vercel</h3>
        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
      </div>
      <div style="line-height: 1.8;">
        <p style="font-weight: 600; margin-bottom: 16px;">Follow these steps to make your changes live:</p>
        
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <p style="margin-bottom: 8px;"><strong>Step 1:</strong> The file <code>data.js</code> has been downloaded to your computer</p>
          <p style="margin-bottom: 8px;"><strong>Step 2:</strong> Go to your <code>sawi-delight-website</code> folder</p>
          <p style="margin-bottom: 8px;"><strong>Step 3:</strong> Replace the old <code>data.js</code> with the new downloaded one</p>
          <p style="margin-bottom: 8px;"><strong>Step 4:</strong> Open Terminal in that folder</p>
          <p style="margin-bottom: 8px;"><strong>Step 5:</strong> Run these commands:</p>
          <pre style="background: #2d2d2d; color: #f8f8f2; padding: 12px; border-radius: 4px; overflow-x: auto; margin-top: 8px;">git add data.js
git commit -m "Updated content via admin panel"
git push</pre>
          <p style="margin-top: 8px;"><strong>Step 6:</strong> Wait 30 seconds for Vercel to deploy</p>
          <p style="margin-bottom: 0;"><strong>Step 7:</strong> Your changes are now LIVE for everyone! ✅</p>
        </div>
        
        <div style="background: #fff3cd; padding: 12px; border-radius: 8px; border: 1px solid #ffc107;">
          <p style="margin: 0;"><strong>💡 Tip:</strong> Bookmark this admin panel URL privately. Use it to make changes, export, and deploy!</p>
        </div>
      </div>
      <div style="margin-top: 24px; text-align: center;">
        <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Got it!</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Import Data
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      let content = e.target.result;
      
      // Extract the websiteData object from the file
      const match = content.match(/const websiteData = ({[\s\S]*?});/);
      if (match) {
        const dataStr = match[1];
        const importedData = JSON.parse(dataStr);
        
        // Update adminData
        adminData = importedData;
        
        // Save to localStorage
        localStorage.setItem('sawiDelightData', JSON.stringify(adminData));
        
        // Reload the admin interface
        initAdmin();
        
        showAlert('Data imported successfully!', 'success');
      } else {
        throw new Error('Invalid file format');
      }
    } catch (error) {
      showAlert('Error importing data: ' + error.message, 'warning');
    }
  };
  reader.readAsText(file);
}

// Business Info
function loadBusinessInfo() {
  document.getElementById('businessName').value = adminData.business.name;
  document.getElementById('businessPhone').value = adminData.business.phone;
  document.getElementById('businessLocation').value = adminData.business.location;
  document.getElementById('flavorOptions').value = adminData.flavors;
}

// Cakes Management
function loadCakes() {
  const container = document.getElementById('cakeList');
  container.innerHTML = adminData.cakes.map((cake, index) => `
    <div class="cake-item">
      <h3>${cake.title}</h3>
      <p style="color: #666; margin-bottom: 12px;">${cake.description}</p>
      <p style="color: var(--primary); font-weight: 600; margin-bottom: 12px;">
        ${cake.startingPrice || cake.details.map(d => d.value).join(' • ')}
      </p>
      <button class="btn btn-primary" onclick="editCake(${index})">✏️ Edit</button>
    </div>
  `).join('');
}

function editCake(index) {
  currentEditingCake = index;
  const cake = adminData.cakes[index];
  
  document.getElementById('cakeTitle').value = cake.title;
  document.getElementById('cakeDescription').value = cake.description;
  document.getElementById('cakePrice').value = cake.startingPrice || '';
  
  // Load images
  const imageContainer = document.getElementById('cakeImageInputs');
  imageContainer.innerHTML = cake.images.map((img, imgIndex) => `
    <div style="margin-bottom: 12px;">
      <input type="text" value="${img.url}" id="cakeImg${imgIndex}" 
             placeholder="Image URL ${imgIndex + 1}" style="width: 100%; margin-bottom: 4px;">
      <input type="text" value="${img.alt}" id="cakeImgAlt${imgIndex}" 
             placeholder="Image description" style="width: 100%;">
    </div>
  `).join('');
  
  // Load details
  const detailContainer = document.getElementById('cakeDetailInputs');
  detailContainer.innerHTML = cake.details.map((detail, detailIndex) => `
    <div style="margin-bottom: 12px; padding: 12px; background: var(--light); border-radius: 8px;">
      <input type="text" value="${detail.label}" id="cakeDetailLabel${detailIndex}" 
             placeholder="Detail label" style="width: 100%; margin-bottom: 8px;">
      <input type="text" value="${detail.value}" id="cakeDetailValue${detailIndex}" 
             placeholder="Detail value" style="width: 100%; margin-bottom: 8px;">
      <button class="btn btn-danger" onclick="removeCakeDetail(${detailIndex})" 
              style="padding: 8px 16px; font-size: 12px;">Remove</button>
    </div>
  `).join('');
  
  document.getElementById('cakeModal').classList.add('active');
}

function addCakeDetail() {
  const container = document.getElementById('cakeDetailInputs');
  const index = container.children.length;
  
  const div = document.createElement('div');
  div.style.cssText = 'margin-bottom: 12px; padding: 12px; background: var(--light); border-radius: 8px;';
  div.innerHTML = `
    <input type="text" id="cakeDetailLabel${index}" placeholder="Detail label" 
           style="width: 100%; margin-bottom: 8px;">
    <input type="text" id="cakeDetailValue${index}" placeholder="Detail value" 
           style="width: 100%; margin-bottom: 8px;">
    <button class="btn btn-danger" onclick="this.parentElement.remove()" 
            style="padding: 8px 16px; font-size: 12px;">Remove</button>
  `;
  container.appendChild(div);
}

function removeCakeDetail(index) {
  const container = document.getElementById('cakeDetailInputs');
  container.children[index].remove();
}

function saveCake() {
  const cake = adminData.cakes[currentEditingCake];
  
  cake.title = document.getElementById('cakeTitle').value;
  cake.description = document.getElementById('cakeDescription').value;
  cake.startingPrice = document.getElementById('cakePrice').value || null;
  
  // Save images
  cake.images = [];
  for (let i = 0; i < 3; i++) {
    const urlInput = document.getElementById(`cakeImg${i}`);
    const altInput = document.getElementById(`cakeImgAlt${i}`);
    if (urlInput && urlInput.value) {
      cake.images.push({
        url: urlInput.value,
        alt: altInput ? altInput.value : ''
      });
    }
  }
  
  // Save details
  cake.details = [];
  const detailContainer = document.getElementById('cakeDetailInputs');
  Array.from(detailContainer.children).forEach((child, i) => {
    const label = document.getElementById(`cakeDetailLabel${i}`);
    const value = document.getElementById(`cakeDetailValue${i}`);
    if (label && value && label.value && value.value) {
      cake.details.push({
        label: label.value,
        value: value.value
      });
    }
  });
  
  closeCakeModal();
  loadCakes();
  showAlert('Cake updated! Remember to Save Changes.', 'info');
}

function closeCakeModal() {
  document.getElementById('cakeModal').classList.remove('active');
  currentEditingCake = null;
}

// Features Management
function loadFeatures() {
  const container = document.getElementById('featureList');
  container.innerHTML = adminData.features.map((feature, index) => `
    <div class="list-item">
      <div class="list-item-content">
        <div style="font-size: 2rem; margin-bottom: 8px;">${feature.icon}</div>
        <strong>${feature.title}</strong><br>
        <span style="color: #666; font-size: 14px;">${feature.description}</span>
      </div>
      <div class="list-item-actions">
        <button class="btn btn-secondary" onclick="editFeature(${index})">✏️</button>
        <button class="btn btn-danger" onclick="removeFeature(${index})">🗑️</button>
      </div>
    </div>
  `).join('');
}

function addFeature() {
  const icon = prompt('Enter emoji icon:', '✨');
  const title = prompt('Enter feature title:', 'New Feature');
  const description = prompt('Enter description:', 'Feature description');
  
  if (icon && title && description) {
    adminData.features.push({ icon, title, description });
    loadFeatures();
    showAlert('Feature added! Remember to Save Changes.', 'info');
  }
}

function editFeature(index) {
  const feature = adminData.features[index];
  const icon = prompt('Enter emoji icon:', feature.icon);
  const title = prompt('Enter feature title:', feature.title);
  const description = prompt('Enter description:', feature.description);
  
  if (icon && title && description) {
    adminData.features[index] = { icon, title, description };
    loadFeatures();
    showAlert('Feature updated! Remember to Save Changes.', 'info');
  }
}

function removeFeature(index) {
  if (confirm('Are you sure you want to remove this feature?')) {
    adminData.features.splice(index, 1);
    loadFeatures();
    showAlert('Feature removed! Remember to Save Changes.', 'warning');
  }
}

// Ordering Steps Management
function loadOrderingSteps() {
  const container = document.getElementById('stepList');
  container.innerHTML = adminData.orderingSteps.map((step, index) => `
    <div class="list-item">
      <div class="list-item-content">
        <strong>Step ${step.number}: ${step.title}</strong><br>
        <span style="color: #666; font-size: 14px;">${step.description}</span>
      </div>
      <div class="list-item-actions">
        <button class="btn btn-secondary" onclick="editStep(${index})">✏️</button>
        <button class="btn btn-danger" onclick="removeStep(${index})">🗑️</button>
      </div>
    </div>
  `).join('');
}

function addStep() {
  const number = adminData.orderingSteps.length + 1;
  const title = prompt('Enter step title:', 'New Step');
  const description = prompt('Enter description:', 'Step description');
  
  if (title && description) {
    adminData.orderingSteps.push({ number, title, description });
    loadOrderingSteps();
    showAlert('Step added! Remember to Save Changes.', 'info');
  }
}

function editStep(index) {
  const step = adminData.orderingSteps[index];
  const title = prompt('Enter step title:', step.title);
  const description = prompt('Enter description:', step.description);
  
  if (title && description) {
    adminData.orderingSteps[index].title = title;
    adminData.orderingSteps[index].description = description;
    loadOrderingSteps();
    showAlert('Step updated! Remember to Save Changes.', 'info');
  }
}

function removeStep(index) {
  if (confirm('Are you sure you want to remove this step?')) {
    adminData.orderingSteps.splice(index, 1);
    // Renumber remaining steps
    adminData.orderingSteps.forEach((step, i) => {
      step.number = i + 1;
    });
    loadOrderingSteps();
    showAlert('Step removed! Remember to Save Changes.', 'warning');
  }
}

// Testimonials Management
function loadTestimonials() {
  const container = document.getElementById('testimonialList');
  container.innerHTML = adminData.testimonials.map((testimonial, index) => `
    <div class="list-item">
      <div class="list-item-content">
        <div style="color: var(--primary); margin-bottom: 8px;">${'⭐'.repeat(testimonial.stars)}</div>
        <p style="font-style: italic; color: #666; margin-bottom: 8px;">"${testimonial.text.substring(0, 100)}..."</p>
        <strong>${testimonial.author}</strong><br>
        <span style="color: var(--primary); font-size: 14px;">${testimonial.event}</span>
      </div>
      <div class="list-item-actions">
        <button class="btn btn-secondary" onclick="editTestimonial(${index})">✏️</button>
        <button class="btn btn-danger" onclick="removeTestimonial(${index})">🗑️</button>
      </div>
    </div>
  `).join('');
}

function addTestimonial() {
  const stars = parseInt(prompt('Enter star rating (1-5):', '5'));
  const text = prompt('Enter testimonial text:', '');
  const author = prompt('Enter author name:', '');
  const event = prompt('Enter event type:', 'Birthday Party, January 2025');
  
  if (text && author && event && stars >= 1 && stars <= 5) {
    adminData.testimonials.push({ stars, text, author, event });
    loadTestimonials();
    showAlert('Testimonial added! Remember to Save Changes.', 'info');
  }
}

function editTestimonial(index) {
  const t = adminData.testimonials[index];
  const stars = parseInt(prompt('Enter star rating (1-5):', t.stars));
  const text = prompt('Enter testimonial text:', t.text);
  const author = prompt('Enter author name:', t.author);
  const event = prompt('Enter event type:', t.event);
  
  if (text && author && event && stars >= 1 && stars <= 5) {
    adminData.testimonials[index] = { stars, text, author, event };
    loadTestimonials();
    showAlert('Testimonial updated! Remember to Save Changes.', 'info');
  }
}

function removeTestimonial(index) {
  if (confirm('Are you sure you want to remove this testimonial?')) {
    adminData.testimonials.splice(index, 1);
    loadTestimonials();
    showAlert('Testimonial removed! Remember to Save Changes.', 'warning');
  }
}

// About Section
function loadAbout() {
  document.getElementById('aboutPara1').value = adminData.about[0] || '';
  document.getElementById('aboutPara2').value = adminData.about[1] || '';
  document.getElementById('aboutPara3').value = adminData.about[2] || '';
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdmin);
} else {
  initAdmin();
}
