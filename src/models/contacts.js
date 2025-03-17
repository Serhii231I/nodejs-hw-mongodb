import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        rquired: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        reuired: true,
        default: 'personal',
    }
},
);
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;