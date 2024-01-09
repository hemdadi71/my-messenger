import mongoose, { Schema } from 'mongoose'

const MessageSchema = new Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  id: { type: String, require: false },
  text: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, require: false },
  seen: { type: Boolean, default: false },
  // seenIds: [{ type: String }],
  // seen: [{ type: String, ref: 'User' }],

  conversationId: { type: String, ref: 'Conversation' },
  senderId: { type: String, ref: 'User' },
  image: String,
})

const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema)
export default Message
