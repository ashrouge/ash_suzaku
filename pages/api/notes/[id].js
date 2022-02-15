import connectDB from '../../../utils/dbConnect';
import Note from '../../../models/Note';
import cors from '../cors';


connectDB();

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Access-Control-Max-Age": 2592000,
    "Access-Control-Allow-Headers":
        "Access-Control-Allow-Origin,Origin, X-Requested-With, Content-Type, Accept",
};

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const note = await Note.findById(id);
                if (!note) {
                    return res.status(400).json({ success: false });
                }
                cors(res);
                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const data = (req.body);
                const note = await Note.findByIdAndUpdate(id, data, {
                    new: true,
                    runValidators: true
                });

                if (!note) {
                    return res.status(400).json({ success: false });
                }
                cors(res);
                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedNote = await Note.deleteOne({ _id: id });

                if (!deletedNote) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
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
            res.status(400).json({ success: false })
            break;
    }
}