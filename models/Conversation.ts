import mongoose, { Schema, model } from 'mongoose'

const ConversationSchema = new Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  createdAt: { type: Date, default: Date.now },
  lastMessageAt: { type: Date, default: Date.now },
  name: String,
  isGroup: Boolean,

  messagesIds: [{ type: String }],
  users: [{ type: String, ref: 'User' }],
})

const MessageSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    body: String,
    image: String,
    createdAt: { type: Date, default: Date.now },

    seenIds: [{ type: String }],
    seen: [{ type: String, ref: 'User' }],

    conversationId: { type: String, ref: 'Conversation' },
    senderId: { type: String, ref: 'User' },
    lastSeen: [
      {
        userId: { type: String, ref: 'User' },
        timestamp: { type: Date, default: null },
      },
    ],
  },
  { timestamps: true }
)

ConversationSchema.index({ users: 1 })

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model('Conversation', ConversationSchema)
export default Conversation
