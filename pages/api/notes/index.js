import connectDB from '../../../utils/dbConnect';
import Note from '../../../models/Note';
import cors from '../cors';

connectDB();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const notes = await Note.find({});
                cors(req, res);
                res.status(200).json({ success: true, data: notes })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const data = (req.body)
                const note = await Note.create(data);
                cors(req, res);
                res.status(201).json({ success: true, data: note })
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}