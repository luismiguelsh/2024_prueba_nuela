import { Request, Response } from 'express';
import { SubjectUseCase } from '../../../application/SubjectUseCase';

export class SubjectController {
  constructor(private subjectUseCase: SubjectUseCase) {}

  async getAllSubjects(req: Request, res: Response): Promise<void> {
    try {
      const subjects = await this.subjectUseCase.getAllSubjects();
      res.json(subjects);
    } catch (error) {
      console.error('Error getting subjects:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
