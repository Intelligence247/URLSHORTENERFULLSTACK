import mongoose from 'mongoose';
import validator from 'validator';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Invalid URL format'
    }
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  urlCode: {
    type: String,
    required: true,
    unique: true
  },
  qrCode: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    required: false
  },
  userAgent: {
    type: String,
    required: false
  }
});

// Index for faster queries
urlSchema.index({ urlCode: 1 });
urlSchema.index({ createdAt: -1 });

// Pre-save middleware to update lastAccessed
urlSchema.pre('save', function(next) {
  this.lastAccessed = new Date();
  next();
});

export default mongoose.model('Url', urlSchema);