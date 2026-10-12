// Shared product catalog and cart helpers used by both pages.

const PRODUCTS = [
  { id: 0, name: "Cactus", category: "pointy", price: 1299, description: "A desert plant that's hard to kill.", image: "annie-spratt-fbAnIjhrOL4-unsplash.jpg", alt: "Green oblong cactus with yellow spines in an orange pot", credit: "Annie Spratt" },
  { id: 1, name: "Pretty Cactus", category: "pointy", price: 1299, description: "A beautiful cactus with pink blooms.", image: "stephanie-harvey-f7pfm2nklz4-unsplash.jpg", alt: "Short green cactus with two pink flowers in a white coffee cup", credit: "Stephanie Harvey" },
  { id: 2, name: "Peony", category: "flower", price: 899, description: "A bundle of peonies to spice up a room.", image: "evie-s-NUX8vT_lkWI-unsplash.jpg", alt: "Three white peony heads on a white background", credit: "Evie S." },
  { id: 3, name: "Aloe", category: "pointy", price: 1099, description: "Has medicinal properties and is good for burns.", image: "stephanie-harvey-t0inbt7nrme-unsplash.jpg", alt: "Small green aloe plant in a white pot", credit: "Stephanie Harvey" },
  { id: 4, name: "Magic Wand Flower", category: "flower", price: 1199, description: "Feel like a beautiful witch or wizard.", image: "laura-chouette-Kx8YFZhbqds-unsplash.jpg", alt: "Pink and purple unopened flower bulb on a long leafy stem", credit: "Laura Chouette" },
  { id: 5, name: "Chuckie", category: "pointy", price: 999, description: "Feel like a Rugrat.", image: "feey-rL5Jz2e9Rao-unsplash.jpg", alt: "Perky green plant with soft jagged leaves in an orange pot", credit: "Feey" },
  { id: 6, name: "Bonsai Tree", category: "tree", price: 1199, description: "A mini tree for your desk.", image: "devin-h-PAEwrnasOvY-unsplash.jpg", alt: "Small bonsai tree in a yellow planter on a ceramic tile", credit: "Devin H" },
  { id: 7, name: "Venus Fly Trap", category: "pointy", price: 799, description: "Is a hungry boi.", image: "gabriel-4Q30Sxcbu94-unsplash.jpg", alt: "Small venus fly trap with many mouths in a black pot", credit: "Gabriel" },
  { id: 8, name: "Orange Tree", category: "tree", price: 400000, description: "Get some vitamin C. Good for breakfast.", image: "arun-clarke-rg0w6Z5eP3c-unsplash.jpg", alt: "Tall orange tree against a cloudy blue sky", credit: "Arun Clarke" },
  { id: 9, name: "Apple Tree", category: "tree", price: 400000, description: "Like apple pie? Get this.", image: "emmalee-couturier-l1yibiwwuhe-unsplash.jpg", alt: "Apple tree with vibrant red apples", credit: "Emmalee Couturier" },
  { id: 10, name: "Rose", category: "flower", price: 399, description: "Smells good. Looks good. Always a good choice.", image: "corey-oconnell-RW7nLtLRHro-unsplash.jpg", alt: "Single soft pink rose on a green stem", credit: "Corey O'Connell" },
  { id: 11, name: "Orchid", category: "flower", price: 1099, description: "Very pretty. Can be finicky, but worth it!", image: "the-new-york-public-library-Uyu_PNJ6Q6w-unsplash.jpg", alt: "Three small pink flowers, one darker than the others", credit: "The New York Public Library" },
];

const CATEGORY_LABELS = { tree: "Tree", flower: "Flower", pointy: "Pointy/Ouchie" };

const TAX_RATE = 0.06; // Michigan sales tax

const CART_KEY = "bestPlantStoreCart";

// Prices are stored in cents to avoid floating point rounding errors.
function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

// Cart shape: { [productId]: quantity }
function loadCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY));
    return cart && typeof cart === "object" ? cart : {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // Storage unavailable (e.g. private mode); cart just won't persist.
  }
}

function cartCount(cart) {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function cartLines(cart) {
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: getProduct(id), qty }))
    .filter((line) => line.product && line.qty > 0);
}

function cartTotals(cart) {
  const subtotal = cartLines(cart).reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, tax, total: subtotal + tax };
}
