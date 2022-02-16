import { Schema, models, model } from 'mongoose';

const NoteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    quantity: {
        type: Number,
        required: true,
        maxlength: [10, 'Quantity cannot be more than 10 digit']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    tanggal: {
        type: String,
        required: true,
    }
})

export default models.Note || model('Note', NoteSchema);