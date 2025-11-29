import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
    password: {
    type: String,
  },
  mobile: {
    type: String,
  },
  otp: {
    type: String,
  },
      forgotOTP: { type: String, },
  forgotOtpExpires: { type: Date, },
  isForgotPasswordVerified: { type: Boolean, default: false },  // New field
  otpExpires: {
    type: Date,
  },
  myBookings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
 wallet: [
  {
    amount: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['credit', 'debit'],
    },
    message: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: Date.now
    },
    transactionId: {
      type: String, // Razorpay payment ID
    }
  }
],
totalWalletAmount: {
  type: Number,
  default: 0
},
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  points: {
    type: Number,
    default: 0,
  },
  code: {
    type: String,
    default: null,
  },
  deleteToken: { type: String, default: null }, // This will store the deletion token
  deleteTokenExpiration: { type: Date, default: null }, // This will store the expiration time of the token
  profileImage: {
    type: String,
    default: 'default-profile-image.jpg',
  },

  // ✅ Moved location here (root level)
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0],
    },
  },

  notifications: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // automatic ObjectId generation
      message: String,
      type: String,
      date: { type: Date, default: Date.now },
    }
  ],

 documents: {
  aadharCard: {
    type: new mongoose.Schema({
      url: { type: String },
      uploadedAt: { type: Date },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'verified'],
        default: 'pending',
      },
      extractedText: { type: String },
      regexUsed: { type: String },
      message: { type: String }
    }, { _id: false }), // 👈 prevents nested _id
    default: undefined // ✅ Important: allow this to be optional
  },

  drivingLicense: {
    type: new mongoose.Schema({
      url: { type: String },
      uploadedAt: { type: Date },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'verified'],
        default: 'pending',
      },
      extractedText: { type: String },
      regexUsed: { type: String },
      message: { type: String }
    }, { _id: false }), // 👈 prevents nested _id
    default: undefined // ✅ Important: allow this to be optional
  }
},
}, {
  timestamps: true,
});

// ✅ Geo Index for geospatial queries
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

export default User;
