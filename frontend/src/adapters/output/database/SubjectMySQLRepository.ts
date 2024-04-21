import { Subject } from '../../../domain/models/Subject.js';
import { SubjectRepository } from '../../../domain/repositories/SubjectRepository.js';
import { pool } from '../../../infraestructure/config/MySQLConfig.js';

export class SubjectMySQLRepository implements SubjectRepository {
  async getAllSubjects(): Promise<Subject[]> {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM subjects');
      return rows as Subject[];
    } finally {
      connection.release();
    }
  }
}
