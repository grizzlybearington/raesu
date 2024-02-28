import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String },
    userID: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true });

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
