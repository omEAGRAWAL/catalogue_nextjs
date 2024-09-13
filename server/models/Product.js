const mongoose = require('mongoose');

// Define the product schema
const ProductSchema = new mongoose.Schema({
    catalogue_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Catalogue',  // Assuming Catalogue is another model
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User',  // Assuming User is another model
                required: true
            },
            review: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            }
        }
    ]
});

// Export the Product model
module.exports = mongoose.model("Product", ProductSchema);
