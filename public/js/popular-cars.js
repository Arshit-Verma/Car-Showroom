// Popular Cars functionality for home page
class PopularCars {
  constructor() {
    this.cars = [];
    this.selectedCar = null;
    this.init();
  }

  async init() {
    await this.loadCars();
    this.attachButtonHandlers();
    this.createModal();
  }

  async loadCars() {
    try {
      const response = await fetch('/api/cars');
      const data = await response.json();

      if (data.success) {
        this.cars = data.data;
        console.log(`Loaded ${this.cars.length} cars for popular section`);
      }
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  }

  attachButtonHandlers() {
    const buttons = document.querySelectorAll('.see-details-btn');
    buttons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.vehicle-card');
        const carName = card.querySelector('.vehicle-name').textContent.trim();
        this.showDetailsByName(carName);
      });
    });
  }

  async showDetailsByName(carName) {
    try {
      // Find car by matching make + model with the displayed name
      const car = this.cars.find(c => {
        const fullName = `${c.make} ${c.model}`;
        return fullName === carName;
      });

      if (car) {
        // Fetch full details from API
        const response = await fetch(`/api/cars/${car._id}`);
        const data = await response.json();

        if (data.success) {
          this.selectedCar = data.data;
          this.displayModal();
        }
      } else {
        console.error('Car not found:', carName);
        alert('Car details not available. Please try again later.');
      }
    } catch (error) {
      console.error('Error loading car details:', error);
      alert('Unable to load car details. Please try again later.');
    }
  }

  createModal() {
    const modalHTML = `
      <div id="popular-car-modal" class="modal">
        <div class="modal-content">
          <span class="modal-close" onclick="popularCars.closeModal()">&times;</span>
          <div id="popular-modal-body"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Close modal on outside click
    const modal = document.getElementById('popular-car-modal');
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });
  }

  displayModal() {
    if (!this.selectedCar) return;

    const car = this.selectedCar;
    const modalBody = document.getElementById('popular-modal-body');
    
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
          <button class="contact-dealer-btn" onclick="window.location.href='/#contact'">
            Contact Dealer
          </button>
          <button class="book-test-drive-btn" onclick="alert('Test drive booking feature coming soon!')">
            Book Test Drive
          </button>
        </div>
      </div>
    `;

    document.getElementById('popular-car-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.getElementById('popular-car-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      this.selectedCar = null;
    }
  }
}

// Global instance
let popularCars;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  popularCars = new PopularCars();
});
