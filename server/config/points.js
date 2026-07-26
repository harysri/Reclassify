// Points awarded per unit of each waste type.
// Keep in sync with the frontend WasteClassification pointsConfig.
const POINTS_CONFIG = {
  glass: 100,
  plastic: 5,
  cardboard: 7,
  paper: 3,
  metal: 20,
  mixed: 10,
};

// Calculate total points for an array of items: [{ wasteType, quantity }]
const calculatePoints = (items) =>
  items.reduce((total, item) => {
    const pts = POINTS_CONFIG[item.wasteType] ?? 0;
    return total + pts * item.quantity;
  }, 0);

module.exports = { POINTS_CONFIG, calculatePoints };
