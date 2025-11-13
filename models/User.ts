import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: false,
      unique: false,
    },
    lastName: {
      type: String,
      required: false,
      unique: false,
    },
    contacts: {
      type: Array,
      required: false,
      unique: false,
      default: [],
    },
    image: {
      type: String,
    },

    conversationIds: [{ type: String, required: false }],
    conversations: [{ type: String, ref: 'Conversation', required: false }],

    seenMessageIds: [{ type: String, required: false }],
    seenMessages: [{ type: String, ref: 'Message', required: false }],

    accounts: [{ type: String, ref: 'Account', required: false }],
    messages: [{ type: String, ref: 'Message', required: false }],
    lastSeen: { type: Date, default: null },
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
