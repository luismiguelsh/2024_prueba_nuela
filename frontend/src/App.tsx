import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/util/';
import './App.css';
import Modal from './Modal';

interface Subject {
  _id: string;
  email: string;
  subject: string;
  type: string;
  course: string;
  group: string;
  lectureHours: number;
  complementaryHours: number;
  regularSpace: string;
}

interface Professor {
  _id: string;
  dni: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const App: React.FC = () => {
  // const [professors, setProfessors] = useState<Professor[]>([]);
  // const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedInterval, setSelectedInterval] = useState<'semanal' | 'anual'>('semanal');
  const [showingLectureHours, setShowingLectureHours] = useState<boolean>(true);
  // const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedPhone, setEditedPhone] = useState<string>('+34 666 555 444');


  useEffect(() => {
    fetchSubjects(); 
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPhone(editedPhone);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get<Subject[]>('/api/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleAddSubject = async (formData: FormData) => {
    try {
      await axios.post('/api/subjects', formData);
      fetchSubjects();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const handleDeleteSubject = async (id: string) => {
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar esta asignatura?');

    if (!confirmed) {
      return;
    }
    try {
      await axios.delete(`/api/subjects/${id}`);
      setSubjects(subjects.filter(subject => subject._id !== id));
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const getTotalLectureHours = (subject: Subject) => {
    if (selectedInterval === 'anual') {
      return subject.lectureHours * 37;
    } else {
      return subject.lectureHours;
    }
  };

  const getTotalComplementaryHours = (subject: Subject) => {
    if (selectedInterval === 'anual') {
      return subject.complementaryHours * 37;
    } else {
      return subject.complementaryHours;
    }
  };

  const getTotalHours = () => {
    if (selectedInterval === 'anual') {
      return subjects.reduce((acc, subject) => acc + (getTotalLectureHours(subject) + getTotalComplementaryHours(subject)), 0);
    } else {
      return subjects.reduce((acc, subject) => acc + getTotalLectureHours(subject) + getTotalComplementaryHours(subject), 0);
    }
  };

  const handleToggleHours = (lecture: boolean) => {
    setShowingLectureHours(lecture);
  };

  const handleToggleInterval = (interval: 'semanal' | 'anual') => {
    setSelectedInterval(interval);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='container-fluid' style={{ padding: '5rem', height: 'auto', backgroundColor: 'var(--bootstrap-darker-grey)' }}>
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-2 bg-white py-4" style={{ width: '315px', padding: '35px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center mt-4">
                <div style={{ width: '30px', height: '30px', marginRight: '7px', backgroundImage: 'url(../../images/tajamar_logo.png)', backgroundSize: '23px', backgroundPosition: 'center', border: '1px solid grey', borderRadius: '9px' }}></div>
                <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Tajamar</span>
              </div>
              <div className="position-relative mt-4">
                <div className="rounded-circle" style={{ width: '30px', height: '30px', marginLeft:'-10px'}}>
                  <div className="rounded-circle text-center position-absolute" style={{ width: '30px', height: '30px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, backgroundColor: 'var(--bootstrap-darker-grey)', color: 'var(--main-text)', fontWeight: 'bold' }}>J</div>
                  <div className="rounded-circle position-absolute" style={{ width: '14px', height: '14px', bottom: '-3px', right: '-10px', zIndex: 2, border: '3px solid white', background:'#7CC731' }}></div>
                </div>
              </div>
            </div>
            <ul className="list-unstyled left-nav" style={{ marginTop: '70px', fontSize: '1.1rem' }}>
              <li className="d-flex align-items-center mb-3">
                <div style={{ width: '20px', height: '20px', marginRight: '7px', backgroundImage: 'url(../../images/nuela_app_logo.jpeg)', backgroundSize: '20px', backgroundPosition: 'center', border: '1px solid grey', borderRadius: '5px' }}></div>
                <span>Inicio</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-clock me-2" style={{ fontWeight:'bold'}}></i>
                <span>Horarios</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-person me-2"></i>
                <span>Profesores</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-people me-2"></i>
                <span>Familias</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-box me-2"></i>
                <span>Espacios</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-book me-2"></i>
                <span>Asignaturas</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-bell me-2"></i>
                <span>Notificaciones</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-gear me-2"></i>
                <span>Settings</span>
              </li>
            </ul>
          </div>
          <div className="col-10 bg-light" style={{ width: 'auto', padding:'20px 0 0 70px' }}>
            <div className="container">
              <div className="row">
                <div className="col pt-3">
                  <p style={{ fontWeight: '600', fontSize: '1.8rem' }}>Profesores</p>
                  <p className="small" style={{ color: 'var(--main-text)' }}>Crea y gestiona los profesores</p>
                  <hr />
                  <div className="d-flex align-items-center mb-4 p-1" >
                    <div className="text-center p-3 me-3" style={{ fontSize: '50px', borderRadius: '18px', color: 'var(--main-color)', background: 'linear-gradient(to bottom, var(--square-top-background), var(--square-bottom-background)', fontWeight: '600' }}>MM</div>
                    <div>
                      <p className="mb-1 fs-3" style={{ fontWeight: '600' }}>Marta Martínez</p>
                      <p className="mb-1 small" style={{ color: 'var(--main-text)' }}><a href="mailto:profesora123@colegio.com" style={{ textDecoration: 'underline', color: 'var(--main-text)' }}>profesora123@colegio.com</a></p>
                      {isEditing ?
                        (
                          <>
                            <input type="text" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
                          </>
                        ) : (
                          <>
                            <p className="mb-0 small" style={{ color:'var(--main-text)'}}>{editedPhone}</p>
                          </>
                        )
                      }
                    </div>
                    {!isEditing ?
                      (
                        <button className="btn btn-link ms-auto" style={{ textDecoration: 'none', fontFamily: 'inherit', color: 'var(--secondary-color)', fontWeight:'bold' }} onClick={() => handleEdit()}>Editar</button>
                      ) : (
                        <button className="btn btn-link ms-auto" style={{ textDecoration: 'none', fontFamily: 'inherit', color: 'var(--secondary-color)', fontWeight:'bold' }} onClick={handleSave}>Guardar</button>
                      )
                    }
                  </div>
                  <hr />
                  <div className="d-flex flex-column align-items-center mb-4 bg-lightgray p-3">
                    <div className="btn-group p-1 mb-4 " style={{ backgroundColor: 'var(--bootstrap-darker-grey)', gap: '3px', height: '3.5rem', borderRadius:'10px'}}>
                      <button
                        className={`btn ${selectedInterval === 'semanal' ? 'btn-primary active text-dark' : 'btn-secondary text-secondary'} fw-bold`}
                        onClick={() => handleToggleInterval('semanal')}
                        style={{ backgroundColor: ` ${selectedInterval === 'semanal' ? 'white' : 'var(--bootstrap-darker-grey)'}`, border: 'none', width:'8rem', borderRadius:'10px' }}
                      >
                        Semanal
                      </button>
                      <button
                        className={`btn ${selectedInterval === 'anual' ? 'btn-primary active text-dark' : 'btn-secondary text-secondary'} rounded fw-bold`}
                        onClick={() => handleToggleInterval('anual')}
                        style={{ backgroundColor: ` ${selectedInterval === 'anual' ? 'white' : 'var(--bootstrap-darker-grey)'}`, border: 'none', width:'8rem' }}
                      >
                        Anual
                      </button>
                    </div>
                    <div className="d-flex align-items-center justify-content-around" style={{ width: '100%' }}>
                      <div className="me-4 bg-white p-4" style={{ width: '100%', borderRadius: '20px', height:'120px' }}>
                        <h4 className="small">Horas totales</h4>
                        <p className="fs-1 fw-bold">{getTotalHours()} horas</p>
                      </div>
                      <div className="me-4 bg-white p-4" style={{ width: '100%', borderRadius: '20px', height:'120px' }}>
                        <h4 className="small">Horas lectivas</h4>
                        <p className="fs-1 fw-bold">{subjects.reduce((acc, subject) => acc + getTotalLectureHours(subject), 0)} horas</p>
                      </div>
                      <div className="me-4 bg-white p-4" style={{ width: '100%', borderRadius: '20px', height:'120px' }}>
                        <h4 className="small">Horas complementarias</h4>
                        <p className="fs-1 fw-bold">{subjects.reduce((acc, subject) => acc + getTotalComplementaryHours(subject), 0)} horas</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  {/*  */}
                  <div className="btn-group mb-1 gap-3 p-3">
                    <button
                      className='bg-light p-3'
                      style={{ color: `${showingLectureHours ? 'var(--secondary-color)' : 'grey'}`, border: 'none', borderBottom: `2px solid ${showingLectureHours ? 'var(--secondary-color)' : 'grey'}`, fontWeight: 'bold' }}
                      onClick={() => handleToggleHours(true)}
                    >
                      Horas lectivas
                    </button>
                    <button
                      className='bg-light'
                      style={{ color: `${showingLectureHours ? 'grey' : 'var(--secondary-color)'}`, border: 'none', borderBottom: `2px solid ${showingLectureHours ? 'grey' : 'var(--secondary-color)'}`, fontWeight: 'bold' }}
                      onClick={() => handleToggleHours(false)}
                    >
                      Horas Complementarias
                    </button>
                  </div>
                  <div className="col text-end mb-4">
                    <button className="btn" data-toggle="modal" data-target="#addModal" onClick={() => setIsModalOpen(true)} style={{ color: 'var(--bootstrap-darker-grey)', backgroundColor: 'var(--secondary-color)', width: '200px' }}>+ Añadir Asignatura</button>
                  </div>
                  <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddSubject} />
                </div>
                <div className="table-responsive p-0" style={{ padding: '20px', borderRadius: '30px' }}>
                  <table className="table">
                    <thead className='thead-light'>
                      <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Curso</th>
                        <th>Grupo</th>
                        <th>Horas semana</th>
                        <th>Espacio Regular</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => (
                        <tr key={index}>
                          <td>{subject.subject}</td>
                          <td>{subject.type}</td>
                          <td>{subject.course}</td>
                          <td>{subject.group}</td>
                          <td>{showingLectureHours ? subject.lectureHours : subject.complementaryHours} h</td>
                          <td>{subject.regularSpace}</td>
                          <td>
                            <button className="btn btn-link" style={{ textDecoration: 'none', fontWeight: '600', color: 'var(--main-color)' }}>Ver</button>
                            <button className="btn btn-link" style={{ textDecoration: 'none', fontWeight: '600', color: 'var(--main-color)' }}>Editar</button>
                            <button onClick={() => handleDeleteSubject(subject._id)} className="btn btn-link" style={{ textDecoration: 'none', fontWeight: '600', color: 'var(--main-red)' }}>Eliminar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
                <div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="addModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role='document'>
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="addModalLabel">Añadir Asignatura</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div>
                          <p style={{ backgroundColor: 'blue' }}>hola</p>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary">Guardar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
