// Vehicles page functionality
class VehiclesPage {
  constructor() {
    this.cars = [];
    this.selectedCar = null;
    this.init();
  }

  async init() {
    this.createModal();
    await this.loadCars();
    this.renderCars();
    this.attachButtonHandlers();
  }

  async loadCars() {
    try {
      const response = await fetch('/api/cars');
      const data = await response.json();

      if (data.success) {
        this.cars = data.data;
        console.log(`Loaded ${this.cars.length} cars`);
      } else {
        this.showError('Failed to load vehicles');
      }
    } catch (error) {
      console.error('Error loading cars:', error);
      this.showError('Unable to connect to server');
    }
  }

  renderCars() {
    const container = document.getElementById('vehicles-grid');
    
    if (!container) {
      console.error('Vehicles grid container not found');
      return;
    }

    if (this.cars.length === 0) {
      container.innerHTML = `
        <div class="no-vehicles">
          <p>No vehicles available at the moment. Please check back later.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.cars.map(car => `
      <div class="vehicle-card" data-id="${car._id}">
        <div class="vehicle-image-container">
          <img src="/images/${car.imageFilename}" alt="${car.make} ${car.model}" class="vehicle-image" loading="lazy">
          <div class="vehicle-badge">${car.year}</div>
        </div>
        <div class="vehicle-content">
          <h3 class="vehicle-title">${car.make} ${car.model}</h3>
          <p class="vehicle-price">₹${car.price.toLocaleString('en-IN')}</p>
          <div class="vehicle-specs">
            <span class="spec-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z"/>
              </svg>
              ${car.mileage}
            </span>
            <span class="spec-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z"/>
              </svg>
              ${car.fuelType}
            </span>
            <span class="spec-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2 2V4z"/>
              </svg>
              ${car.transmission}
            </span>
          </div>
          <button class="show-details-btn">
            Show Details
          </button>
        </div>
      </div>
    `).join('');
  }

  attachButtonHandlers() {
    const buttons = document.querySelectorAll('.show-details-btn');
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.vehicle-card');
        const carId = card.getAttribute('data-id');
        this.showDetails(carId);
      });
    });
  }

  async showDetails(carId) {
    try {
      const response = await fetch(`/api/cars/${carId}`);
      const data = await response.json();

      if (data.success) {
        this.selectedCar = data.data;
        this.displayModal();
      } else {
        this.showError('Failed to load car details');
      }
    } catch (error) {
      console.error('Error loading car details:', error);
      this.showError('Unable to load details');
    }
  }

  createModal() {
    const modalHTML = `
      <div id="car-modal" class="modal">
        <div class="modal-content">
          <span class="modal-close">&times;</span>
          <div id="modal-body"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Close modal on outside click
    const modal = document.getElementById('car-modal');
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Close modal on close button click
    const closeBtn = document.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      this.closeModal();
    });
  }

  displayModal() {
    if (!this.selectedCar) return;

    const car = this.selectedCar;
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
      <div class="modal-car-details">
        <img src="/images/${car.imageFilename}" alt="${car.make} ${car.model}" class="modal-car-image">
        <h2>${car.make} ${car.model}</h2>
        <p class="modal-car-price">₹${car.price.toLocaleString('en-IN')}</p>
        
        <div class="modal-specs-grid">
          <div class="modal-spec">
            <strong>Year:</strong>
            <span>${car.year}</span>
          </div>
          <div class="modal-spec">
            <strong>Mileage:</strong>
            <span>${car.mileage}</span>
          </div>
          <div class="modal-spec">
            <strong>Fuel Type:</strong>
            <span>${car.fuelType}</span>
          </div>
          <div class="modal-spec">
            <strong>Transmission:</strong>
            <span>${car.transmission}</span>
          </div>
          <div class="modal-spec">
            <strong>Color:</strong>
            <span>${car.color}</span>
          </div>
          <div class="modal-spec">
            <strong>Owners:</strong>
            <span>${car.owners}</span>
          </div>
        </div>

        <div class="modal-description">
          <h3>Description</h3>
          <p>${car.description}</p>
        </div>

        ${car.features && car.features.length > 0 ? `
          <div class="modal-features">
            <h3>Features</h3>
            <ul>
              ${car.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="modal-actions">
          <button class="contact-dealer-btn">
            Contact Dealer
          </button>
          <button class="book-test-drive-btn">
            Book Test Drive
          </button>
        </div>
      </div>
    `;

    // Attach event listeners to buttons
    const contactBtn = modalBody.querySelector('.contact-dealer-btn');
    const testDriveBtn = modalBody.querySelector('.book-test-drive-btn');

    contactBtn.addEventListener('click', () => {
      window.location.href = '/#contact';
    });

    testDriveBtn.addEventListener('click', () => {
      alert('Test drive booking feature coming soon!');
    });

    document.getElementById('car-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.getElementById('car-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      this.selectedCar = null;
    }
  }

  showError(message) {
    const container = document.getElementById('vehicles-grid');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <p>${message}</p>
          <button onclick="location.reload()">Retry</button>
        </div>
      `;
    }
  }
}

// Global instance
let vehiclesPage;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  vehiclesPage = new VehiclesPage();
});
