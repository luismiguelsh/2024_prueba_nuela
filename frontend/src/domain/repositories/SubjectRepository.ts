import { Subject } from '../models/Subject';

export interface SubjectRepository {
  getAllSubjects(): Promise<Subject[]>;
}
