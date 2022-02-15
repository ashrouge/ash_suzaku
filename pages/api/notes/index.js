import connectDB from '../../../utils/dbConnect';
import Note from '../../../models/Note';
import cors from '../cors';

connectDB();

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET,DELETE",
    "Access-Control-Max-Age": 2592000,
    "Access-Control-Allow-Headers":
        "Access-Control-Allow-Origin,Origin, X-Requested-With, Content-Type, Accept",
};
export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const notes = await Note.find({});
                cors(res);
                res.status(200).json({ success: true, data: notes })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const data = (req.body)
                const note = await Note.create(data);
                cors(res);
                res.status(201).json({ success: true, data: note })
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
            break;
        case 'OPTIONS':
            try {
                res.writeHead(200, headers);
                res.end();
                return;
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
        default:
            res.status(400).json({ success: false });
            break;
    }
}