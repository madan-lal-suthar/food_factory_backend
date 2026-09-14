const { Chef } = require('../../database/models');

const seedChefs = async () => {
  const chefRows = [
    {
      name: 'Chef Asha Menon',
      restaurant: 'Spice Avenue',
      specialty: 'Indian Bistro',
      description: 'Modern Indian cooking with regional seasonal ingredients.',
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=80',
      rating: 5,
    },
    {
      name: 'Chef Marco Silva',
      restaurant: 'Green Bowl',
      specialty: 'Healthy Cafe',
      description: 'Creative farm-to-table bowls and organic wellness plates.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
      rating: 4,
    },
    {
      name: 'Chef Sienna Rao',
      restaurant: 'Cedar Kitchen',
      specialty: 'Farm Table',
      description: 'Seasonal menus built around wood-fired vegetables and herbs.',
      image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80',
      rating: 4,
    },
    {
      name: 'Chef Priya Raman',
      restaurant: 'Royal Table',
      specialty: 'Fine Dining',
      description: 'Elegant vegetarian and coastal Indian tasting plates.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
      rating: 5,
    },
    {
      name: 'Chef Mateo Rivera',
      restaurant: 'La Casa Kitchen',
      specialty: 'Latin Grill',
      description: 'Open-fire grill classics with colorful regional sides.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
      rating: 4,
    },
  ];

  for (const chef of chefRows) {
    await Chef.findOrCreate({
      where: {
        name: chef.name,
        restaurant: chef.restaurant,
      },
      defaults: chef,
    });
  }
};

module.exports = seedChefs;
