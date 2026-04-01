const mongoose = require('mongoose');
const Car = require('../models/Car');
require('dotenv').config();

// Car data with existing images
const carsData = [
  {
    make: 'Maruti Suzuki',
    model: 'Swift',
    year: 2020,
    price: 550000,
    mileage: '45,000 km',
    fuelType: 'Petrol',
    transmission: 'Manual',
    description: 'Well-maintained Maruti Swift in excellent condition. Single owner, all service records available. Perfect city car with great fuel efficiency.',
    imageFilename: 'Maruti Suzuki Swift.avif',
    features: ['Power Windows', 'AC', 'Music System', 'Central Locking'],
    color: 'Red',
    owners: 1
  },
  {
    make: 'Hyundai',
    model: 'Creta',
    year: 2021,
    price: 1280000,
    mileage: '32,000 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    description: 'Premium Hyundai Creta with all features. Diesel automatic variant with excellent performance and comfort. Like new condition.',
    imageFilename: 'Hyundai Creta.webp',
    features: ['Sunroof', 'Leather Seats', 'Touch Screen', 'Reverse Camera', 'Cruise Control'],
    color: 'White',
    owners: 1
  },
  {
    make: 'Honda',
    model: 'City',
    year: 2019,
    price: 925000,
    mileage: '55,000 km',
    fuelType: 'Petrol',
    transmission: 'Manual',
    description: 'Honda City VX variant with top features. Reliable sedan with comfortable ride and spacious interiors. Well maintained.',
    imageFilename: 'Honda City.jpg',
    features: ['Alloy Wheels', 'Airbags', 'ABS', 'Keyless Entry'],
    color: 'Silver',
    owners: 1
  },
  {
    make: 'Tata',
    model: 'Nexon',
    year: 2021,
    price: 875000,
    mileage: '28,000 km',
    fuelType: 'Diesel',
    transmission: 'Manual',
    description: 'Tata Nexon XZ+ variant with 5-star safety rating. Powerful diesel engine with smooth performance. Excellent build quality.',
    imageFilename: 'Tata Nexon.webp',
    features: ['Connected Car Tech', 'Projector Headlamps', 'Digital Cluster', '5-Star Safety'],
    color: 'Blue',
    owners: 1
  },
  {
    make: 'Mahindra',
    model: 'XUV700',
    year: 2022,
    price: 1850000,
    mileage: '15,000 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    description: 'Premium Mahindra XUV700 AX7 variant. Loaded with features, powerful engine, and luxurious interiors. Almost brand new.',
    imageFilename: 'Mahindra XUV700.avif',
    features: ['ADAS', 'Panoramic Sunroof', 'Sony Sound System', 'Wireless Charging', '360 Camera'],
    color: 'Black',
    owners: 1
  },
  {
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2022,
    price: 4550000,
    mileage: '12,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    description: 'Luxury Mercedes-Benz C-Class with premium features. Elegant design, powerful performance, and cutting-edge technology.',
    imageFilename: 'Mercedes-Benz C-Class.avif',
    features: ['AMG Line', 'Burmester Sound', 'Digital Cockpit', 'Ambient Lighting', 'Wireless CarPlay'],
    color: 'Black',
    owners: 1
  },
  {
    make: 'BMW',
    model: '3 Series',
    year: 2021,
    price: 4280000,
    mileage: '18,500 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    description: 'BMW 3 Series 320d M Sport. Perfect blend of luxury and performance. Well maintained with complete service history.',
    imageFilename: 'BMW 3 Series.jpg',
    features: ['M Sport Package', 'iDrive', 'Harman Kardon', 'Adaptive Suspension'],
    color: 'White',
    owners: 1
  },
  {
    make: 'Audi',
    model: 'A4',
    year: 2022,
    price: 3890000,
    mileage: '9,200 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    description: 'Audi A4 Premium Plus with sophisticated design and advanced technology. Nearly new with minimal usage.',
    imageFilename: 'Audi A4.webp',
    features: ['Virtual Cockpit', 'MMI Touch', 'Bang & Olufsen', 'Matrix LED'],
    color: 'Grey',
    owners: 1
  },
  {
    make: 'Jaguar',
    model: 'XE',
    year: 2021,
    price: 4150000,
    mileage: '15,800 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    description: 'Jaguar XE with British elegance and performance. Diesel automatic with excellent road presence and comfort.',
    imageFilename: 'Jaguar XE.webp',
    features: ['InControl Touch Pro', 'Meridian Sound', 'Adaptive Dynamics', 'LED Headlights'],
    color: 'Red',
    owners: 1
  },
  {
    make: 'Volvo',
    model: 'S90',
    year: 2022,
    price: 5275000,
    mileage: '8,500 km',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    description: 'Volvo S90 T8 Hybrid - Ultimate luxury sedan with Swedish craftsmanship. Eco-friendly hybrid technology with premium comfort.',
    imageFilename: 'Volvo S90.avif',
    features: ['Bowers & Wilkins', 'Air Suspension', 'Pilot Assist', 'Nappa Leather', 'Crystal Gear Shifter'],
    color: 'Silver',
    owners: 1
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ Connected to MongoDB');

    // Check if cars already exist
    const existingCars = await Car.countDocuments();
    
    if (existingCars > 0) {
      console.log(`ℹ️  Database already has ${existingCars} cars.`);
      console.log('Do you want to clear and re-seed? This will delete all existing cars.');
      console.log('To clear and re-seed, run: Car.deleteMany({}) first');
      process.exit(0);
    }

    // Insert cars
    const cars = await Car.insertMany(carsData);
    console.log(`✅ Successfully seeded ${cars.length} cars to the database!`);

    // Display seeded cars
    console.log('\n📋 Seeded Cars:');
    cars.forEach((car, index) => {
      console.log(`${index + 1}. ${car.make} ${car.model} (${car.year}) - ₹${car.price.toLocaleString('en-IN')}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
