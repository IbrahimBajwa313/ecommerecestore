const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

async function seedUsers() {
  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    const db = client.db()

    // Clear existing users
    await db.collection("users").deleteMany({})

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 12)
    const userPassword = await bcrypt.hash("user123", 12)

    // Create users
    const users = [
      {
        email: "admin@example.com",
        password: adminPassword,
        name: "Admin User",
        role: "admin",
        profile: {
          phone: "+1234567890",
          address: "123 Admin Street",
          city: "Admin City",
          state: "AC",
          zipCode: "12345",
          country: "US",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user@example.com",
        password: userPassword,
        name: "John Doe",
        role: "customer",
        profile: {
          phone: "+1987654321",
          address: "456 Customer Avenue",
          city: "Customer City",
          state: "CC",
          zipCode: "54321",
          country: "US",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("users").insertMany(users)
    console.log("✅ Users seeded successfully")
  } catch (error) {
    console.error("❌ Error seeding users:", error)
  } finally {
    await client.close()
  }
}

seedUsers()
