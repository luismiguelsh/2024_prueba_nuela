import mongoose, { Schema, Document } from 'mongoose';

export interface MongoDBSubject extends Document {
  name: string;
  hours: number;
}

const subjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  hours: { type: Number, required: true }
});

export const MongoDBSubjectModel = mongoose.model<MongoDBSubject>('Subject', subjectSchema);
