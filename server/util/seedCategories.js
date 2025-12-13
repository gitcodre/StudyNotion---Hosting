// server/scripts/seedCategories.js

// 1. Import the Category model
const Category = require('../models/Category'); 

// 2. Define the initial data
const defaultCategories = [
    { 
        name: 'Cutlers', 
        description: 'Advanced computer science courses and algorithms.' 
    },
    { 
        name: 'Python', 
        description: 'Comprehensive courses on Python programming language.' 
    },
    { 
        name: 'WebDev', 
        description: 'Learn front-end and back-end web development.' 
    },
    { 
        name: 'Machines', 
        description: 'Machines are just up and down.' 
    },
];

// 3. The seeding function
async function seedCategories() {
    try {
        console.log("Checking for default categories...");
        
        // Count existing categories
        const existingCategoriesCount = await Category.countDocuments();
        
        if (existingCategoriesCount === 0) {
            // Insert the default data if none exist
            await Category.insertMany(defaultCategories);
            console.log("✅ Default categories seeded successfully!");
        } else {
            console.log(`Default categories already exist (${existingCategoriesCount} found). Skipping seed.`);
        }
    } catch (error) {
        console.error("❌ Error seeding categories:", error);
    }
}

// 4. Export the function so server.js can call it
module.exports = seedCategories;