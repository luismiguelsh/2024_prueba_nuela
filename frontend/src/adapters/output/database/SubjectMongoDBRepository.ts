import { Subject } from '../../../domain/models/Subject.js';
import { SubjectRepository } from '../../../domain/repositories/SubjectRepository.js';
import { MongoDBSubjectModel } from '../../../infraestructure/models/MongoDBSubjectModel.js';

export class SubjectMongoDBRepository implements SubjectRepository {
    async getAllSubjects(): Promise<Subject[]> {
      const subjectsFromDB = await MongoDBSubjectModel.find().exec();
      return subjectsFromDB.map(subject => ({
        id: subject._id.toString(), // Convertir ObjectId a string
        name: subject.name,
        hours: subject.hours
      }));
    }
  }