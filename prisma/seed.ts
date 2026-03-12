import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categories
  const bouquets = await prisma.category.create({
    data: {
      name: "Bouquets",
      slug: "bouquets",
      description: "Hand-tied bouquets perfect for every occasion",
      imageUrl: "https://images.unsplash.com/photo-1487530811015-780780434b54?w=800",
    },
  });

  const plants = await prisma.category.create({
    data: {
      name: "Plants",
      slug: "plants",
      description: "Lush indoor plants and succulents that last",
      imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    },
  });

  const giftSets = await prisma.category.create({
    data: {
      name: "Gift Sets",
      slug: "gift-sets",
      description: "Flowers paired with chocolates, candles, and more",
      imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
    },
  });

  // Products
  await prisma.product.createMany({
    data: [
      // Bouquets
      {
        name: "Classic Red Roses",
        slug: "classic-red-roses",
        description:
          "A timeless bouquet of 12 long-stemmed red roses. The ultimate symbol of love and passion, hand-tied with elegant satin ribbon. Perfect for anniversaries, Valentine's Day, or simply to say 'I love you'.",
        price: 54.99,
        minQuantity: 1,
        categoryId: bouquets.id,
        imageUrl: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800",
        images: [
          "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800",
          "https://images.unsplash.com/photo-1487530811015-780780434b54?w=800",
        ],
        materials: [
          "Keep in a cool spot away from direct sunlight",
          "Trim stems at an angle and change water daily",
          "Remove any leaves below the waterline",
          "Lasts 7–10 days with proper care",
        ],
        sizes: ["6 Stems", "12 Stems", "24 Stems"],
        colors: ["Red", "Deep Crimson", "Blush Pink", "White", "Peach"],
        featured: true,
        inStock: true,
      },
      {
        name: "Wildflower Meadow",
        slug: "wildflower-meadow",
        description:
          "A cheerful mix of seasonal wildflowers in a relaxed, garden-gathered style. Includes sunflowers, chamomile, lavender, and whatever is blooming beautifully that day. No two bouquets are exactly alike — that's the magic.",
        price: 38.99,
        minQuantity: 1,
        categoryId: bouquets.id,
        imageUrl: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800",
        images: ["https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800"],
        materials: [
          "Keep in fresh water and re-cut stems every 2 days",
          "Display in indirect light for best longevity",
          "Lasts 5–8 days",
        ],
        sizes: ["Small", "Medium", "Large"],
        colors: ["Yellow", "Purple", "White", "Orange", "Pink"],
        featured: true,
        inStock: true,
      },
      {
        name: "Blush Peonies",
        slug: "blush-peonies",
        description:
          "Luxurious blush and cream peonies, lush and full. A favourite for weddings and romantic occasions. These generous blooms are wrapped in tissue paper and tied with a velvet ribbon. Available seasonally — treat yourself while they last.",
        price: 64.99,
        minQuantity: 1,
        categoryId: bouquets.id,
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"],
        materials: [
          "Peonies open over 2–3 days — buy them slightly closed",
          "Keep in cool water, away from fruit bowls",
          "Lasts 5–7 days once fully open",
        ],
        sizes: ["5 Stems", "10 Stems", "15 Stems"],
        colors: ["Blush Pink", "Cream", "Deep Rose", "Coral"],
        featured: true,
        inStock: true,
      },
      {
        name: "Autumn Palette",
        slug: "autumn-palette",
        description:
          "A warm, earthy bouquet inspired by the colours of autumn. Rich terracotta roses, burnt orange dahlias, and deep burgundy chrysanthemums gathered together with dried wheat and eucalyptus. A stunning seasonal arrangement that brings the warmth of fall indoors.",
        price: 49.99,
        minQuantity: 1,
        categoryId: bouquets.id,
        imageUrl: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800",
        images: ["https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800"],
        materials: [
          "Trim stems diagonally and place in fresh water immediately",
          "Keep in a cool room away from direct sunlight",
          "Lasts 6–9 days with daily water changes",
        ],
        sizes: ["Small", "Medium", "Large"],
        colors: ["Terracotta", "Burnt Orange", "Burgundy", "Deep Red"],
        featured: false,
        inStock: true,
      },
      {
        name: "Purple Tulips",
        slug: "purple-tulips",
        description:
          "A striking bunch of deep violet and purple tulips — elegant, bold, and effortlessly beautiful. Wrapped in craft paper with a satin ribbon. Tulips continue to grow after cutting, giving your arrangement a natural, living feel.",
        price: 34.99,
        minQuantity: 1,
        categoryId: bouquets.id,
        imageUrl: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800",
        images: ["https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800"],
        materials: [
          "Tulips are thirsty — keep the vase well topped up",
          "They will keep growing toward the light, rotate the vase daily",
          "Lasts 5–7 days",
        ],
        sizes: ["10 Stems", "20 Stems", "30 Stems"],
        colors: ["Deep Purple", "Violet", "Lavender", "Mixed Purple"],
        featured: false,
        inStock: true,
      },
      {
        name: "Summer Sun",
        slug: "summer-sun",
        description:
          "Bright, cheerful, and impossible to ignore. A golden bouquet of sunflowers, yellow freesia, and lemon solidago that radiates pure happiness. Perfect for birthdays, thank-yous, or just brightening up a room on a grey day.",
        price: 39.99,
        minQuantity: 1,
        categoryId: bouquets.id,
        imageUrl: "https://images.unsplash.com/photo-1530092376999-2431865aa8df?w=800",
        images: ["https://images.unsplash.com/photo-1530092376999-2431865aa8df?w=800"],
        materials: [
          "Sunflowers love fresh water — change it every day",
          "Recut stems every 2 days for maximum vase life",
          "Lasts 7–10 days",
        ],
        sizes: ["Small", "Medium", "Large"],
        colors: ["Bright Yellow", "Golden", "Orange", "Warm Mixed"],
        featured: false,
        inStock: true,
      },
      {
        name: "Lemon Sorbet",
        slug: "lemon-sorbet",
        description:
          "Fresh, light, and delicately fragrant. Soft yellow ranunculus, white lisianthus, and pale green hellebores come together in a bouquet that feels like a cool summer breeze. Wrapped in pastel tissue and twine.",
        price: 44.99,
        minQuantity: 1,
        categoryId: bouquets.id,
        imageUrl: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800",
        images: ["https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800"],
        materials: [
          "Keep in cool water in a bright spot",
          "Avoid placing near ripening fruit",
          "Lasts 6–8 days",
        ],
        sizes: ["Small", "Medium", "Large"],
        colors: ["Pale Yellow", "White", "Soft Green", "Cream"],
        featured: false,
        inStock: true,
      },
      {
        name: "Mixed Roses",
        slug: "mixed-roses",
        description:
          "A generous, full bouquet of garden roses in a carefully chosen mix of colours — blush, ivory, peach, and soft coral. Lush and romantic, this is the bouquet that says everything without a single word. A perennial favourite for all occasions.",
        price: 59.99,
        minQuantity: 1,
        categoryId: bouquets.id,
        imageUrl: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=800",
        images: ["https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=800"],
        materials: [
          "Remove all leaves below the waterline",
          "Cut stems at a 45° angle before placing in water",
          "Lasts 7–12 days with proper care",
        ],
        sizes: ["12 Stems", "18 Stems", "24 Stems"],
        colors: ["Blush", "Ivory", "Peach", "Coral", "Soft Pink"],
        featured: true,
        inStock: true,
      },
      {
        name: "Passion",
        slug: "passion",
        description:
          "Dark, dramatic, and deeply romantic. Deep red roses, black-purple calla lilies, and rich burgundy dahlias wrapped in dark kraft paper. This is a bouquet that makes a statement — bold, intense, and unforgettable.",
        price: 64.99,
        minQuantity: 1,
        categoryId: bouquets.id,
        imageUrl: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800",
        images: ["https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800"],
        materials: [
          "Keep away from direct sunlight to preserve deep colours",
          "Change water every 2 days",
          "Lasts 7–10 days",
        ],
        sizes: ["Small", "Medium", "Large"],
        colors: ["Deep Red", "Burgundy", "Black-Purple", "Crimson"],
        featured: false,
        inStock: true,
      },
      // Plants
      {
        name: "Monstera Deliciosa",
        slug: "monstera-deliciosa",
        description:
          "The iconic Swiss cheese plant, beloved for its dramatic split leaves and easy-going nature. Comes potted in a terracotta pot with a care card. A statement piece that thrives in most indoor environments and makes a gift that keeps on growing.",
        price: 44.99,
        minQuantity: 1,
        categoryId: plants.id,
        imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800",
        images: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800"],
        materials: [
          "Water every 1–2 weeks, allow soil to dry between waterings",
          "Thrives in bright, indirect light",
          "Wipe leaves occasionally to remove dust",
          "Feed monthly in spring and summer",
        ],
        sizes: ["Small (20cm)", "Medium (40cm)", "Large (60cm+)"],
        colors: ["Deep Green"],
        featured: false,
        inStock: true,
      },
      {
        name: "Succulent Collection",
        slug: "succulent-collection",
        description:
          "A curated set of 5 assorted succulents in a hand-crafted wooden tray. Low maintenance, high style. Each plant is unique and chosen for its shape and texture. Perfect for desks, windowsills, or as a long-lasting gift.",
        price: 34.99,
        minQuantity: 1,
        categoryId: plants.id,
        imageUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800",
        images: ["https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800"],
        materials: [
          "Water sparingly — every 2–3 weeks",
          "Needs bright light, ideally a sunny windowsill",
          "Well-draining soil is key",
        ],
        sizes: ["Set of 3", "Set of 5", "Set of 8"],
        colors: ["Green", "Purple", "Blue-Green", "Red-tipped"],
        featured: false,
        inStock: true,
      },
      // Gift Sets
      {
        name: "Roses & Chocolate Box",
        slug: "roses-chocolate-box",
        description:
          "The classic combination — a dozen red roses paired with a luxury 200g dark chocolate assortment. Beautifully packaged in a keepsake box with a handwritten message card. Everything you need to make someone feel truly special.",
        price: 79.99,
        minQuantity: 1,
        categoryId: giftSets.id,
        imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
        images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800"],
        materials: [
          "Flowers: trim stems and keep in fresh water",
          "Chocolates best stored at room temperature",
          "Message card included — add your personal note at checkout",
        ],
        sizes: ["Standard", "Deluxe"],
        colors: ["Red Roses", "Pink Roses", "Mixed"],
        featured: true,
        inStock: true,
      },
    ],
  });

  console.log("✅ Flower shop seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
