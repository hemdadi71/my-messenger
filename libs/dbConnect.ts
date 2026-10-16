import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

const globalWithMongo = global as typeof globalThis & {
  mongoose: {
    conn: null | typeof mongoose
    promise: null | Promise<typeof mongoose>
  }
}

let cached = globalWithMongo.mongoose

if (!cached) {
  cached = globalWithMongo.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // روی سرورلس هر instance پیش‌فرض تا ۱۰۰ اتصال باز می‌کند و سقف M0 زود پر می‌شود
      maxPoolSize: 10,
      // به‌جای ۳۰ ثانیه «pending» ماندن، سریع خطا بده
      serverSelectionTimeoutMS: 8000,
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then(mongoose => {
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }
  return cached.conn
}

export default dbConnect
