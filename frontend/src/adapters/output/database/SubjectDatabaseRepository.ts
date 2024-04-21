import { Subject } from '../../../domain/models/Subject';
import { SubjectRepository } from '../../../domain/repositories/SubjectRepository';

let subjects: Subject[] = [];

export class SubjectDatabaseRepository implements SubjectRepository {
  async getAllSubjects(): Promise<Subject[]> {
    return subjects;
  }
}
