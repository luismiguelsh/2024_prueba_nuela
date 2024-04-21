import { SubjectRepository } from '../domain/repositories/SubjectRepository';
import { Subject } from '../domain/models/Subject';

export class SubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectRepository.getAllSubjects();
  }
}
