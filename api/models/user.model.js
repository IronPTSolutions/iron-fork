const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const admins = (process.env.ADMIN_EMAILS || '').split(',')
  .map((email) => email.trim());

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    role: {
      type: String,
      enum: ["admin", "guess"],
      default: "guess"
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

schema.pre("save", function (next) {
  if (admins.includes(this.email)) {
    this.role = "admin";
  }

  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

schema.method("checkPassword", function (password) {
  return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", schema);
module.exports = User;
