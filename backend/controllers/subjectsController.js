const Subject = require('../models/Subject');

const subjectsController = {
  getAllSubjects: async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createSubject: async (req, res) => {
    try {
      const subject = new Subject(req.body);
      await subject.save();
      res.status(201).json(subject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getSubjectById: async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.id);
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.json(subject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateSubject: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedSubject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.json(updatedSubject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteSubject: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSubject = await Subject.findByIdAndDelete(id);
      if (!deletedSubject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = subjectsController;
