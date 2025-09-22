const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce"

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Clear existing data
    await db.collection("categories").deleteMany({})
    await db.collection("products").deleteMany({})
    await db.collection("users").deleteMany({})
    await db.collection("orders").deleteMany({})

    console.log("Cleared existing data")

    // Seed Categories
    const categories = [
      {
        name: "Electronics",
        slug: "electronics",
        description: "Electronic devices, gadgets, and accessories",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        sortOrder: 1,
        seoTitle: "Electronics - Latest Gadgets and Devices",
        seoDescription: "Shop the latest electronics including smartphones, laptops, headphones, and more.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clothing",
        slug: "clothing",
        description: "Fashion and apparel for men, women, and children",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        sortOrder: 2,
        seoTitle: "Clothing - Fashion and Apparel",
        seoDescription: "Discover the latest fashion trends and clothing for all occasions.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Home & Garden",
        slug: "home-garden",
        description: "Home improvement, furniture, and garden supplies",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        sortOrder: 3,
        seoTitle: "Home & Garden - Furniture and Decor",
        seoDescription: "Transform your home and garden with our quality furniture and decor items.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sports & Outdoors",
        slug: "sports-outdoors",
        description: "Sports equipment, outdoor gear, and fitness accessories",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        sortOrder: 4,
        seoTitle: "Sports & Outdoors - Equipment and Gear",
        seoDescription: "Get active with our sports equipment and outdoor gear for all activities.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Books & Media",
        slug: "books-media",
        description: "Books, movies, music, and digital media",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        sortOrder: 5,
        seoTitle: "Books & Media - Entertainment Collection",
        seoDescription: "Explore our collection of books, movies, music, and digital entertainment.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const insertedCategories = await db.collection("categories").insertMany(categories)
    console.log("Seeded categories")

    // Get category IDs
    const categoryIds = Object.values(insertedCategories.insertedIds)

    // Seed Products
    const products = [
      {
        name: "Premium Wireless Headphones",
        description:
          "High-quality wireless headphones with active noise cancellation, premium sound quality, and long battery life. Perfect for music lovers and professionals who demand the best audio experience.",
        price: 299.99,
        originalPrice: 399.99,
        category: categoryIds[0],
        images: [
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
        ],
        stock: 50,
        sku: "WH-001",
        status: "active",
        features: [
          "Active Noise Cancellation",
          "30-hour battery life",
          "Bluetooth 5.0 connectivity",
          "Premium leather padding",
          "Quick charge technology",
        ],
        specifications: {
          "Battery Life": "30 hours",
          Connectivity: "Bluetooth 5.0",
          Weight: "250g",
          Warranty: "2 years",
          "Frequency Response": "20Hz - 20kHz",
        },
        rating: 4.5,
        reviewCount: 128,
        tags: ["wireless", "headphones", "audio", "premium", "noise-cancellation"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smart Fitness Watch",
        description:
          "Advanced fitness tracking watch with comprehensive health monitoring, GPS tracking, and smartphone connectivity. Track your workouts, monitor your health, and stay connected.",
        price: 199.99,
        originalPrice: 249.99,
        category: categoryIds[0],
        images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
        stock: 75,
        sku: "SW-002",
        status: "active",
        features: [
          "Heart Rate Monitor",
          "GPS Tracking",
          "Water Resistant IP68",
          "7-day battery life",
          "Sleep tracking",
          "Smartphone notifications",
        ],
        specifications: {
          Display: '1.4" AMOLED',
          Battery: "7 days",
          "Water Rating": "IP68",
          Sensors: "Heart Rate, GPS, Accelerometer, Gyroscope",
          Compatibility: "iOS and Android",
        },
        rating: 4.3,
        reviewCount: 89,
        tags: ["smartwatch", "fitness", "health", "wearable", "gps"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Portable Bluetooth Speaker",
        description:
          "Compact and powerful Bluetooth speaker with 360-degree sound, waterproof design, and long battery life. Perfect for outdoor adventures and home entertainment.",
        price: 79.99,
        category: categoryIds[0],
        images: ["/placeholder.svg?height=400&width=400"],
        stock: 0,
        sku: "BS-003",
        status: "out_of_stock",
        features: [
          "360-degree sound",
          "Waterproof IPX7",
          "12-hour battery life",
          "Voice assistant support",
          "Wireless stereo pairing",
        ],
        specifications: {
          Power: "20W",
          Battery: "12 hours",
          Connectivity: "Bluetooth 5.0",
          "Water Rating": "IPX7",
          Dimensions: "7.9 x 2.9 x 2.9 inches",
        },
        rating: 4.1,
        reviewCount: 45,
        tags: ["speaker", "bluetooth", "portable", "waterproof", "wireless"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Classic Cotton T-Shirt",
        description:
          "Comfortable and stylish 100% cotton t-shirt available in multiple colors and sizes. Perfect for casual wear and everyday comfort.",
        price: 24.99,
        originalPrice: 34.99,
        category: categoryIds[1],
        images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
        stock: 200,
        sku: "TS-004",
        status: "active",
        features: ["100% Cotton", "Pre-shrunk fabric", "Machine washable", "Available in 8 colors", "Reinforced seams"],
        specifications: {
          Material: "100% Cotton",
          Fit: "Regular",
          Care: "Machine wash cold",
          Origin: "Made in USA",
          Sizes: "XS, S, M, L, XL, XXL",
        },
        rating: 4.6,
        reviewCount: 234,
        tags: ["t-shirt", "cotton", "casual", "basic", "comfortable"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ergonomic Office Chair",
        description:
          "Professional ergonomic office chair with lumbar support, adjustable height, and breathable mesh design. Designed for all-day comfort and productivity.",
        price: 349.99,
        category: categoryIds[2],
        images: ["/placeholder.svg?height=400&width=400"],
        stock: 25,
        sku: "OC-005",
        status: "active",
        features: [
          "Lumbar support",
          "Adjustable height",
          "Breathable mesh back",
          "360-degree swivel",
          "5-year warranty",
        ],
        specifications: {
          "Weight Capacity": "300 lbs",
          "Height Range": "17-21 inches",
          Material: "Mesh and fabric",
          Warranty: "5 years",
          Assembly: "Required",
        },
        rating: 4.4,
        reviewCount: 67,
        tags: ["office", "chair", "ergonomic", "furniture", "professional"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Professional Tennis Racket",
        description:
          "High-performance tennis racket designed for intermediate to advanced players. Features graphite construction and professional-grade specifications.",
        price: 159.99,
        originalPrice: 199.99,
        category: categoryIds[3],
        images: ["/placeholder.svg?height=400&width=400"],
        stock: 30,
        sku: "TR-006",
        status: "active",
        features: [
          "Graphite frame construction",
          "Pre-strung with premium strings",
          "Grip size 4 3/8",
          "Professional tournament approved",
          "Lightweight design",
        ],
        specifications: {
          Weight: "300g",
          "Head Size": "100 sq in",
          "String Pattern": "16x19",
          "Grip Size": "4 3/8",
          Length: "27 inches",
        },
        rating: 4.2,
        reviewCount: 23,
        tags: ["tennis", "racket", "sports", "professional", "graphite"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const insertedProducts = await db.collection("products").insertMany(products)
    console.log("Seeded products")

    // Seed Admin User
    const hashedPassword = await bcrypt.hash("admin123", 12)
    const adminUser = {
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection("users").insertOne(adminUser)
    console.log("Seeded admin user")

    // Seed Sample Customer
    const customerPassword = await bcrypt.hash("customer123", 12)
    const customer = {
      name: "John Doe",
      email: "customer@example.com",
      password: customerPassword,
      role: "customer",
      isVerified: true,
      addresses: [
        {
          type: "shipping",
          name: "John Doe",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
          isDefault: true,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const insertedCustomer = await db.collection("users").insertOne(customer)
    console.log("Seeded customer user")

    // Seed Sample Orders
    const productIds = Object.values(insertedProducts.insertedIds)
    const orders = [
      {
        orderNumber: "ORD-001",
        user: insertedCustomer.insertedId,
        items: [
          {
            product: productIds[0],
            name: "Premium Wireless Headphones",
            quantity: 1,
            price: 299.99,
            image: "/placeholder.svg?height=400&width=400",
          },
        ],
        subtotal: 299.99,
        tax: 24.0,
        shipping: 0,
        total: 323.99,
        status: "delivered",
        paymentStatus: "paid",
        paymentMethod: "credit_card",
        shippingAddress: {
          name: "John Doe",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        billingAddress: {
          name: "John Doe",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        trackingNumber: "TRK123456789",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        updatedAt: new Date(),
      },
      {
        orderNumber: "ORD-002",
        user: insertedCustomer.insertedId,
        items: [
          {
            product: productIds[1],
            name: "Smart Fitness Watch",
            quantity: 1,
            price: 199.99,
            image: "/placeholder.svg?height=400&width=400",
          },
          {
            product: productIds[3],
            name: "Classic Cotton T-Shirt",
            quantity: 2,
            price: 24.99,
            image: "/placeholder.svg?height=400&width=400",
          },
        ],
        subtotal: 249.97,
        tax: 20.0,
        shipping: 9.99,
        total: 279.96,
        status: "processing",
        paymentStatus: "paid",
        paymentMethod: "credit_card",
        shippingAddress: {
          name: "John Doe",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        billingAddress: {
          name: "John Doe",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(),
      },
    ]

    await db.collection("orders").insertMany(orders)
    console.log("Seeded orders")

    console.log("\n✅ Database seeding completed successfully!")
    console.log("\n🔐 Login credentials:")
    console.log("Admin: admin@example.com / admin123")
    console.log("Customer: customer@example.com / customer123")
    console.log("\n📊 Seeded data:")
    console.log(`- ${categories.length} categories`)
    console.log(`- ${products.length} products`)
    console.log("- 2 users (1 admin, 1 customer)")
    console.log("- 2 sample orders")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
