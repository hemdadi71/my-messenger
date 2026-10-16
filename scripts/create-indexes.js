require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

async function main() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set')
  await mongoose.connect(process.env.MONGODB_URI)
  const db = mongoose.connection.db

  await db.collection('messages').createIndex({ conversationId: 1, _id: 1 })
  await db.collection('messages').createIndex({ id: 1 })
  await db.collection('conversations').createIndex({ users: 1 })
  await db.collection('users').createIndex({ userName: 1 }, { unique: true })

  for (const name of ['messages', 'conversations', 'users']) {
    const idx = await db.collection(name).indexes()
    console.log(name, '=>', idx.map(i => i.name).join(', '))
  }
  await mongoose.disconnect()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
