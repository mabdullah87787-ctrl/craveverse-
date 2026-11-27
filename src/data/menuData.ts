import { CustomerReview, MenuCategory, MenuItem, SpecialOffer } from '../types';

export const IMAGES = {
  heroBurger: '/src/assets/images/hero_smash_burger_1795709171463.jpg',
  familyFeast: '/src/assets/images/offer_family_feast_1795709176783.jpg',
  openKitchen: '/src/assets/images/about_open_kitchen_1795709177467.jpg',

  // 5 Burgers
  infernoBurger: '/src/assets/images/cat_inferno_burger_1795709172479.jpg',
  doubleSmash: '/src/assets/images/product_double_smash_1795709173007.jpg',
  crispyChickenSupreme: '/src/assets/images/cat_crispy_chicken_1795709173727.jpg',
  bbqMonster: '/src/assets/images/burger_bbq_monster_1795756098965.jpg',
  spicyJalapeno: '/src/assets/images/burger_spicy_jalapeno_1795756099096.jpg',

  // 5 Pizzas
  volcanoPizza: '/src/assets/images/cat_volcano_pizza_1795709174610.jpg',
  cheesyPepperoni: '/src/assets/images/pizza_cheesy_pepperoni_1795756099252.jpg',
  fourCheese: '/src/assets/images/pizza_four_cheese_1795756099662.jpg',
  chickenTikka: '/src/assets/images/pizza_chicken_tikka_1795756100011.jpg',
  gardenFresh: '/src/assets/images/pizza_garden_fresh_1795756100438.jpg',

  // 4 Fried Chicken
  crispyCrunch: '/src/assets/images/chicken_crispy_crunch_1795756101497.jpg',
  fireWings: '/src/assets/images/chicken_fire_wings_1795756101573.jpg',
  goldenTenders: '/src/assets/images/chicken_golden_tenders_1795756101793.jpg',
  popcornBucket: '/src/assets/images/chicken_popcorn_bucket_1795756102559.jpg',

  // 4 Fries & Sides
  loadedFries: '/src/assets/images/cat_loaded_fries_1795709174230.jpg',
  curlyFries: '/src/assets/images/sides_curly_fries_1795756103083.jpg',
  mozzarellaSticks: '/src/assets/images/sides_mozzarella_sticks_1795756103023.jpg',
  onionRings: '/src/assets/images/sides_onion_rings_1795756224204.jpg',

  // 4 Sandwiches
  grilledChickenSandwich: '/src/assets/images/sandwich_grilled_chicken_1795756104458.jpg',
  classicClub: '/src/assets/images/cat_artisan_sandwich_1795709175960.jpg',
  crispyChickenSub: '/src/assets/images/sandwich_crispy_sub_1795756147850.jpg',
  phillyCheese: '/src/assets/images/sandwich_philly_cheese_1795756206406.jpg',

  // 4 Drinks
  chocolateShake: '/src/assets/images/cat_chocolate_shake_1795709176404.jpg',
  strawberryShake: '/src/assets/images/drink_strawberry_shake_1795756224909.jpg',
  mintLemonade: '/src/assets/images/drink_mint_lemonade_1795756224975.jpg',
  icedPeachTea: '/src/assets/images/drink_iced_peach_tea_1795756225601.jpg',

  // 4 Desserts
  lavaCake: '/src/assets/images/cat_desserts_lava_1795709176479.jpg',
  fudgeBrownie: '/src/assets/images/dessert_fudge_brownie_1795756225483.jpg',
  strawberryCheesecake: '/src/assets/images/dessert_strawberry_cheesecake_1795756225662.jpg',
  chocoDonut: '/src/assets/images/dessert_choco_donut_1795756225797.jpg',
} as const;

export const CATEGORIES: {
  name: MenuCategory;
  tagline: string;
  itemCount: number;
  image: string;
}[] = [
  {
    name: 'Burgers',
    tagline: '260°C seared prime beef & brioche',
    itemCount: 5,
    image: IMAGES.doubleSmash,
  },
  {
    name: 'Pizzas',
    tagline: 'Blistered 48-hour sourdough pies',
    itemCount: 5,
    image: IMAGES.volcanoPizza,
  },
  {
    name: 'Fried Chicken',
    tagline: '24-hour buttermilk crunch & wings',
    itemCount: 4,
    image: IMAGES.fireWings,
  },
  {
    name: 'Fries & Sides',
    tagline: 'Loaded cuts, mozzarella & rings',
    itemCount: 4,
    image: IMAGES.loadedFries,
  },
  {
    name: 'Sandwiches',
    tagline: 'Pressed sourdough, subs & Philly steak',
    itemCount: 4,
    image: IMAGES.phillyCheese,
  },
  {
    name: 'Drinks',
    tagline: 'Belgian shakes & frosty coolers',
    itemCount: 4,
    image: IMAGES.chocolateShake,
  },
  {
    name: 'Desserts',
    tagline: 'Molten lava cake, cheesecake & donuts',
    itemCount: 4,
    image: IMAGES.lavaCake,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // CATEGORY 1 — BURGERS (5 ITEMS)
  {
    id: 'inferno-beef-burger',
    name: 'Inferno Beef Burger',
    category: 'Burgers',
    description:
      'Double flame-seared prime beef patties, charred jalapenos, aged cheddar, crispy onion rings, and smoky chipotle glaze on toasted brioche.',
    price: 899,
    rating: 4.9,
    reviewsCount: 418,
    image: IMAGES.infernoBurger,
    badge: 'Bestseller',
    prepTime: '14 min',
    calories: '780 kcal',
  },
  {
    id: 'double-smash-burger',
    name: 'Double Smash Burger',
    category: 'Burgers',
    description:
      'Two lacy-edge smashed beef patties layered with melted American cheese, crisp dill pickles, and tangy Crave sauce on buttered potato bun.',
    price: 1099,
    rating: 5.0,
    reviewsCount: 612,
    image: IMAGES.doubleSmash,
    badge: 'Bestseller',
    prepTime: '12 min',
    calories: '840 kcal',
  },
  {
    id: 'crispy-chicken-supreme',
    name: 'Crispy Chicken Supreme',
    category: 'Burgers',
    description:
      '24-hour buttermilk-brined thigh fried to a shattering golden crunch, layered with crisp slaw, pickles, and spicy herb mayo.',
    price: 749,
    rating: 4.9,
    reviewsCount: 509,
    image: IMAGES.crispyChickenSupreme,
    badge: 'Bestseller',
    prepTime: '12 min',
    calories: '690 kcal',
  },
  {
    id: 'bbq-monster-burger',
    name: 'BBQ Monster Burger',
    category: 'Burgers',
    description:
      'Towering char-grilled beef patty stacked with crispy onion rings, smoky beef strips, melted cheddar, and glossy hickory BBQ glaze.',
    price: 999,
    rating: 4.8,
    reviewsCount: 274,
    image: IMAGES.bbqMonster,
    badge: 'New',
    prepTime: '15 min',
    calories: '910 kcal',
  },
  {
    id: 'spicy-jalapeno-burger',
    name: 'Spicy Jalapeño Burger',
    category: 'Burgers',
    description:
      'Seared chuck-brisket patty topped with melted pepper jack cheese, fresh green jalapenos, pickled red onions, and fiery herb aioli.',
    price: 849,
    rating: 4.7,
    reviewsCount: 196,
    image: IMAGES.spicyJalapeno,
    prepTime: '13 min',
    calories: '740 kcal',
  },

  // CATEGORY 2 — PIZZAS (5 ITEMS)
  {
    id: 'bbq-volcano-pizza',
    name: 'BBQ Volcano Pizza',
    category: 'Pizzas',
    description:
      'Wood-fired 12-inch sourdough crust topped with smoky pulled chicken, bubbling mozzarella, roasted jalapenos, red onions, and tangy BBQ swirl.',
    price: 1499,
    rating: 4.9,
    reviewsCount: 376,
    image: IMAGES.volcanoPizza,
    badge: 'Bestseller',
    prepTime: '18 min',
    calories: '1120 kcal',
  },
  {
    id: 'cheesy-pepperoni-pizza',
    name: 'Cheesy Pepperoni Pizza',
    category: 'Pizzas',
    description:
      'Crispy charred beef pepperoni cups, fresh San Marzano tomato passata, golden bubbling mozzarella, and wild basil on blistered crust.',
    price: 1599,
    rating: 4.9,
    reviewsCount: 318,
    image: IMAGES.cheesyPepperoni,
    badge: 'Bestseller',
    prepTime: '18 min',
    calories: '1190 kcal',
  },
  {
    id: 'four-cheese-pizza',
    name: 'Four Cheese Pizza',
    category: 'Pizzas',
    description:
      'Velvety mozzarella, aged cheddar, creamy ricotta dollops, and shaved 24-month parmesan finished with cracked black pepper.',
    price: 1399,
    rating: 4.8,
    reviewsCount: 189,
    image: IMAGES.fourCheese,
    prepTime: '17 min',
    calories: '1060 kcal',
  },
  {
    id: 'chicken-tikka-pizza',
    name: 'Chicken Tikka Pizza',
    category: 'Pizzas',
    description:
      'Smoky tandoori-spiced grilled chicken chunks, crisp bell peppers, red onions, melted mozzarella, and mint-garlic drizzle.',
    price: 1299,
    rating: 4.8,
    reviewsCount: 294,
    image: IMAGES.chickenTikka,
    badge: 'New',
    prepTime: '18 min',
    calories: '1080 kcal',
  },
  {
    id: 'garden-fresh-pizza',
    name: 'Garden Fresh Pizza',
    category: 'Pizzas',
    description:
      'Roasted cherry tomatoes, Kalamata black olives, sweet golden corn, crisp bell peppers, baby spinach, and mushrooms on sourdough.',
    price: 1099,
    rating: 4.7,
    reviewsCount: 142,
    image: IMAGES.gardenFresh,
    prepTime: '16 min',
    calories: '920 kcal',
  },

  // CATEGORY 3 — FRIED CHICKEN (4 ITEMS)
  {
    id: 'crispy-crunch-chicken',
    name: 'Crispy Crunch Chicken',
    category: 'Fried Chicken',
    description:
      'Golden extra-crispy bone-in drumsticks and thighs marinated 24 hours in spiced buttermilk, served with roasted garlic dip.',
    price: 699,
    rating: 4.9,
    reviewsCount: 342,
    image: IMAGES.crispyCrunch,
    badge: 'Bestseller',
    prepTime: '14 min',
    calories: '760 kcal',
  },
  {
    id: 'fire-wings',
    name: 'Fire Wings',
    category: 'Fried Chicken',
    description:
      'Eight double-crunch chicken wings glazed in fiery cayenne-honey chili oil with toasted sesame seeds and cool ranch dip.',
    price: 599,
    rating: 4.8,
    reviewsCount: 289,
    image: IMAGES.fireWings,
    badge: 'New',
    prepTime: '12 min',
    calories: '680 kcal',
  },
  {
    id: 'golden-chicken-tenders',
    name: 'Golden Chicken Tenders',
    category: 'Fried Chicken',
    description:
      'Hand-breaded tenderloin fillets fried to a crisp golden crust, paired with smoky BBQ and honey mustard dipping bowls.',
    price: 549,
    rating: 4.8,
    reviewsCount: 234,
    image: IMAGES.goldenTenders,
    prepTime: '11 min',
    calories: '610 kcal',
  },
  {
    id: 'chicken-popcorn-bucket',
    name: 'Chicken Popcorn Bucket',
    category: 'Fried Chicken',
    description:
      'Bite-sized crispy chicken morsels dusted with smoky paprika and herbs, served hot with creamy garlic mayo.',
    price: 499,
    rating: 4.7,
    reviewsCount: 205,
    image: IMAGES.popcornBucket,
    prepTime: '10 min',
    calories: '560 kcal',
  },

  // CATEGORY 4 — FRIES & SIDES (4 ITEMS)
  {
    id: 'loaded-cheese-fries',
    name: 'Loaded Cheese Fries',
    category: 'Fries & Sides',
    description:
      'Crispy skin-on shoestring fries drenched in warm aged cheddar fondue, smoky beef bits, jalapenos, and roasted garlic aioli.',
    price: 499,
    rating: 4.9,
    reviewsCount: 540,
    image: IMAGES.loadedFries,
    badge: 'Bestseller',
    prepTime: '9 min',
    calories: '610 kcal',
  },
  {
    id: 'golden-curly-fries',
    name: 'Golden Curly Fries',
    category: 'Fries & Sides',
    description:
      'Spiral-cut seasoned potatoes fried extra crisp with smoky paprika dust, served alongside cheddar dip and tangy ketchup.',
    price: 349,
    rating: 4.8,
    reviewsCount: 187,
    image: IMAGES.curlyFries,
    prepTime: '8 min',
    calories: '470 kcal',
  },
  {
    id: 'mozzarella-sticks',
    name: 'Mozzarella Sticks',
    category: 'Fries & Sides',
    description:
      'Herb-crusted golden mozzarella sticks with a hot stretchy cheese pull, served with slow-simmered marinara sauce.',
    price: 449,
    rating: 4.8,
    reviewsCount: 221,
    image: IMAGES.mozzarellaSticks,
    badge: 'New',
    prepTime: '9 min',
    calories: '510 kcal',
  },
  {
    id: 'crispy-onion-rings',
    name: 'Crispy Onion Rings',
    category: 'Fries & Sides',
    description:
      'Thick-cut sweet onion rings dipped in seasoned buttermilk batter and fried golden, paired with smoky chipotle mayo.',
    price: 299,
    rating: 4.6,
    reviewsCount: 148,
    image: IMAGES.onionRings,
    prepTime: '8 min',
    calories: '420 kcal',
  },

  // CATEGORY 5 — SANDWICHES (4 ITEMS)
  {
    id: 'grilled-chicken-sandwich',
    name: 'Grilled Chicken Sandwich',
    category: 'Sandwiches',
    description:
      'Char-grilled herb chicken breast on toasted ciabatta with melted Swiss cheese, vine tomatoes, crisp greens, and garlic aioli.',
    price: 599,
    rating: 4.8,
    reviewsCount: 194,
    image: IMAGES.grilledChickenSandwich,
    prepTime: '12 min',
    calories: '580 kcal',
  },
  {
    id: 'classic-club-sandwich',
    name: 'Classic Club Sandwich',
    category: 'Sandwiches',
    description:
      'Toasted artisan sourdough stacked with roasted chicken, melted Gruyere, crispy beef strips, lettuce, tomato, and honey mustard.',
    price: 549,
    rating: 4.8,
    reviewsCount: 224,
    image: IMAGES.classicClub,
    prepTime: '11 min',
    calories: '630 kcal',
  },
  {
    id: 'crispy-chicken-sub',
    name: 'Crispy Chicken Sub',
    category: 'Sandwiches',
    description:
      'Toasted garlic-butter baguette loaded with crunchy fried chicken strips, shredded cheddar, dill pickles, and fiery orange drizzle.',
    price: 649,
    rating: 4.9,
    reviewsCount: 247,
    image: IMAGES.crispyChickenSub,
    badge: 'New',
    prepTime: '12 min',
    calories: '690 kcal',
  },
  {
    id: 'philly-cheese-sandwich',
    name: 'Philly Cheese Sandwich',
    category: 'Sandwiches',
    description:
      'Warm toasted hoagie overflowing with seared sliced beef steak, caramelized onions, sauteed peppers, and melted provolone.',
    price: 799,
    rating: 4.9,
    reviewsCount: 263,
    image: IMAGES.phillyCheese,
    badge: 'Bestseller',
    prepTime: '14 min',
    calories: '750 kcal',
  },

  // CATEGORY 6 — DRINKS (4 ITEMS)
  {
    id: 'chocolate-overload-shake',
    name: 'Chocolate Overload Shake',
    category: 'Drinks',
    description:
      'Velvety Belgian dark chocolate gelato spun thick with chilled cream, fudge ganache drip, whipped peak, and cocoa wafer roll.',
    price: 399,
    rating: 4.9,
    reviewsCount: 465,
    image: IMAGES.chocolateShake,
    badge: 'Bestseller',
    prepTime: '5 min',
    calories: '520 kcal',
  },
  {
    id: 'strawberry-dream-shake',
    name: 'Strawberry Dream Shake',
    category: 'Drinks',
    description:
      'Rich vanilla bean cream blended with fresh crushed strawberry compote, topped with whipped cream and berry crumble.',
    price: 399,
    rating: 4.8,
    reviewsCount: 215,
    image: IMAGES.strawberryShake,
    prepTime: '5 min',
    calories: '480 kcal',
  },
  {
    id: 'fresh-mint-lemonade',
    name: 'Fresh Mint Lemonade',
    category: 'Drinks',
    description:
      'Hand-pressed zesty lime and crushed garden mint shaken hard over crystal ice with sparkling chill.',
    price: 249,
    rating: 4.8,
    reviewsCount: 198,
    image: IMAGES.mintLemonade,
    prepTime: '4 min',
    calories: '120 kcal',
  },
  {
    id: 'iced-peach-tea',
    name: 'Iced Peach Tea',
    category: 'Drinks',
    description:
      'Cold-brewed amber black tea infused with sun-ripened peach nectar, fresh peach slices, and garden mint over ice.',
    price: 299,
    rating: 4.7,
    reviewsCount: 162,
    image: IMAGES.icedPeachTea,
    badge: 'New',
    prepTime: '4 min',
    calories: '140 kcal',
  },

  // CATEGORY 7 — DESSERTS (4 ITEMS)
  {
    id: 'molten-lava-cake',
    name: 'Molten Lava Cake',
    category: 'Desserts',
    description:
      'Warm 70% dark chocolate fondant cake with a flowing ganache center, vanilla bean gelato scoop, and salted caramel drizzle.',
    price: 449,
    rating: 5.0,
    reviewsCount: 312,
    image: IMAGES.lavaCake,
    badge: 'Bestseller',
    prepTime: '10 min',
    calories: '580 kcal',
  },
  {
    id: 'chocolate-fudge-brownie',
    name: 'Chocolate Fudge Brownie',
    category: 'Desserts',
    description:
      'Dense dark cocoa fudge brownie stack drizzled with warm chocolate ganache and toasted walnut crunch.',
    price: 399,
    rating: 4.8,
    reviewsCount: 229,
    image: IMAGES.fudgeBrownie,
    prepTime: '7 min',
    calories: '520 kcal',
  },
  {
    id: 'strawberry-cheesecake',
    name: 'Strawberry Cheesecake',
    category: 'Desserts',
    description:
      'Silky New York-style baked cheesecake on golden graham crust crowned with glossy crimson strawberry compote.',
    price: 499,
    rating: 4.9,
    reviewsCount: 244,
    image: IMAGES.strawberryCheesecake,
    badge: 'New',
    prepTime: '5 min',
    calories: '490 kcal',
  },
  {
    id: 'choco-dream-donut',
    name: 'Choco Dream Donut',
    category: 'Desserts',
    description:
      'Fluffy brioche ring glazed in thick Belgian dark chocolate with roasted hazelnut crunch and chocolate curls.',
    price: 249,
    rating: 4.7,
    reviewsCount: 178,
    image: IMAGES.chocoDonut,
    prepTime: '4 min',
    calories: '360 kcal',
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-bogo',
    tag: 'Buy 1 Get 1 Free',
    title: 'Crispy Chicken BOGO Drop',
    subtitle: 'Two full Crispy Chicken Supreme burgers for the price of one',
    description:
      'Double the crunch with two buttermilk-brined Crispy Chicken Supreme burgers dressed with fresh slaw, pickles, and signature spicy mayo.',
    itemsIncluded: [
      '2x Crispy Chicken Supreme Burgers',
      '2x Signature Comeback Dips',
    ],
    originalPrice: 1498,
    offerPrice: 749,
    savingsPercent: 50,
    image: IMAGES.crispyChickenSupreme,
    validityLabel: 'Promotional BOGO Bundle',
    featured: true,
  },
  {
    id: 'offer-family-feast',
    tag: 'Family Feast Deal',
    title: 'The Grand Craveverse Table',
    subtitle: 'Feeds 4–5 effortlessly with burgers, pizza, wings & fries',
    description:
      'Built for group nights and celebrations: two signature burgers, one 12-inch BBQ Volcano Pizza, Fire Wings, two Loaded Cheese Fries, and four drinks.',
    itemsIncluded: [
      '2x Inferno Beef or Double Smash Burgers',
      '1x BBQ Volcano Pizza (12")',
      '1x Fire Wings + 2x Loaded Cheese Fries',
      '4x Fresh Mint Lemonades',
    ],
    originalPrice: 5490,
    offerPrice: 3999,
    savingsPercent: 27,
    image: IMAGES.familyFeast,
    validityLabel: 'Includes free priority delivery',
    featured: true,
  },
  {
    id: 'offer-student-combo',
    tag: 'Student Combo',
    title: 'Campus Fuel Pack',
    subtitle: 'High-protein crunch crafted for late-night study sessions',
    description:
      'Grab our Crispy Chicken Supreme, Golden Curly Fries, and a Fresh Mint Lemonade at a student-friendly flat rate.',
    itemsIncluded: [
      '1x Crispy Chicken Supreme',
      '1x Golden Curly Fries',
      '1x Fresh Mint Lemonade',
    ],
    originalPrice: 1347,
    offerPrice: 949,
    savingsPercent: 30,
    image: IMAGES.crispyChickenSub,
    validityLabel: 'Student Value Bundle',
  },
  {
    id: 'offer-mega-burger',
    tag: 'Mega Burger Combo',
    title: 'Double Smash Signature Box',
    subtitle: 'Our #1 bestselling smash burger paired with loaded fries & shake',
    description:
      'Enjoy a freshly seared Double Smash Burger, Loaded Cheese Fries, and a chilled Chocolate Overload Shake in one power combo.',
    itemsIncluded: [
      '1x Double Smash Burger',
      '1x Loaded Cheese Fries',
      '1x Chocolate Overload Shake',
    ],
    originalPrice: 1997,
    offerPrice: 1499,
    savingsPercent: 25,
    image: IMAGES.doubleSmash,
    validityLabel: 'Signature Meal Deal',
  },
  {
    id: 'offer-weekend-special',
    tag: 'Weekend Special',
    title: 'Volcano Pizza & Wings Duo',
    subtitle: 'Friday to Sunday crowd-pleaser bundle',
    description:
      'Pair our blistered sourdough BBQ Volcano Pizza with Fire Wings and a warm Molten Lava Cake to finish strong.',
    itemsIncluded: [
      '1x BBQ Volcano Pizza (12")',
      '1x Fire Wings',
      '1x Molten Lava Cake',
    ],
    originalPrice: 2547,
    offerPrice: 1999,
    savingsPercent: 22,
    image: IMAGES.volcanoPizza,
    validityLabel: 'Weekend Celebration Bundle',
  },
  {
    id: 'offer-limited-time',
    tag: 'Limited Time Offers',
    title: 'BBQ Monster & Brownie Set',
    subtitle: 'Smoky monster stack + Mozzarella Sticks + Fudge Brownie',
    description:
      'Go bold with our BBQ Monster Burger, stretchy golden Mozzarella Sticks, and a Chocolate Fudge Brownie.',
    itemsIncluded: [
      '1x BBQ Monster Burger',
      '1x Mozzarella Sticks',
      '1x Chocolate Fudge Brownie',
    ],
    originalPrice: 1847,
    offerPrice: 1399,
    savingsPercent: 24,
    image: IMAGES.bbqMonster,
    validityLabel: 'Featured Seasonal Rotation',
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Zainab Tariq',
    role: 'Product Designer',
    city: 'Lahore',
    rating: 5,
    comment:
      'Switched our studio Friday lunches to CRAVEVERSE two months ago. The Double Smash arrives with crisp lacy edges still intact and the brioche never gets soggy.',
    orderedItem: 'Double Smash Burger',
  },
  {
    id: 'rev-2',
    name: 'Hamza Qureshi',
    role: 'Software Architect',
    city: 'Karachi',
    rating: 5,
    comment:
      'Usually delivery pizzas turn lukewarm in traffic, but the BBQ Volcano sourdough crust came steaming hot in 24 minutes with generous smoked chicken.',
    orderedItem: 'BBQ Volcano Pizza',
  },
  {
    id: 'rev-3',
    name: 'Ayesha Siddiqui',
    role: 'Medical Resident',
    city: 'Islamabad',
    rating: 5,
    comment:
      'After 14-hour shifts, the Campus Fuel Pack and Molten Lava Cake are unbeatable. Consistent seasoning, clean packaging, and zero greasy aftertaste.',
    orderedItem: 'Crispy Chicken Supreme',
  },
];
