import React, { useState } from 'react';
import './Modal.css'; // Importa el archivo CSS con los estilos del modal

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void; // Tipo de la función onSubmit
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {

    const handleCloseModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            setFormData({
                email:'profesora123@colegio.com',
                subject: '',
                type: '',
                course: '',
                group: '',
                lectureHours: '',
                complementaryHours: '',
                regularSpace: ''
            })
            onClose();
        }
    };

    const [formData, setFormData] = useState({
        email:'profesora123@colegio.com',
        subject: '',
        type: '',
        course: '',
        group: '',
        lectureHours: '',
        complementaryHours: '',
        regularSpace: ''
    });

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const closeModal = () => {
        setFormData({
            email:'profesora123@colegio.com',
            subject: '',
            type: '',
            course: '',
            group: '',
            lectureHours: '',
            complementaryHours: '',
            regularSpace: ''
        })
        onClose();
    }

    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isOpen ? 'block' : 'none' }} onClick={handleCloseModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Añadir Asignatura</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => { closeModal() }}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {/* Aquí van los campos del formulario */}
                            <div className="mb-3">
                                <label className="form-label">Selecciona la asignatura</label>
                                <select className="form-select" name="subject" onChange={handleInputChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="Matemáticas">Matemáticas</option>
                                    <option value="Lengua">Lengua</option>
                                    <option value="Historia">Historia</option>
                                    <option value="Inglés">Inglés</option>
                                    <option value="Francés">Francés</option>
                                    <option value="Biología">Biología</option>
                                    <option value="Física y Química">Física y Química</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tipo de asignatura</label>
                                <select className="form-select" name="type" onChange={handleInputChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="Obligatoria">Obligatoria</option>
                                    <option value="Optativa">Optativa</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Curso</label>
                                <select className="form-select" name="course" onChange={handleInputChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="3º de ESO">3º de ESO</option>
                                    <option value="4º de ESO">4º de ESO</option>
                                    <option value="1º de Bachillerato">1º de Bachillerato</option>
                                    <option value="2º de Bachillerato">2º de Bachillerato</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Grupo</label>
                                <select className="form-select" name="group" onChange={handleInputChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="A">A</option>
                                    <option value="A">A*</option>
                                    <option value="B">B</option>
                                    <option value="B">B*</option>
                                    <option value="C">C</option>
                                    <option value="C">C*</option>
                                    <option value="D">D</option>
                                    <option value="D">D*</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Horas lectivas</label>
                                <select className="form-select" name="lectureHours" onChange={handleInputChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="0.5">0.5</option>
                                    <option value="1">1</option>
                                    <option value="1.5">1.5</option>
                                    <option value="2">2</option>
                                    <option value="2.5">2.5</option>
                                    <option value="3">3</option>
                                    <option value="3.5">3.5</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Horas complementarias</label>
                                <select className="form-select" name="complementaryHours" onChange={handleInputChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="0.25">0.25</option>
                                    <option value="0.5">0.5</option>
                                    <option value="0.75">0.75</option>
                                    <option value="1">1</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Espacio</label>
                                <select className="form-select" name="regularSpace" onChange={handleInputChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="3º ESO - Grupo A">3º ESO - Grupo A</option>
                                    <option value="3º ESO - Grupo B">3º ESO - Grupo B </option>
                                    <option value="3º ESO - Grupo C">3º ESO - Grupo C</option>
                                    <option value="3º ESO - Grupo D">3º ESO - Grupo D</option>
                                    <option value="4º ESO - Grupo A">4º ESO - Grupo A</option>
                                    <option value="4º ESO - Grupo B">4º ESO - Grupo B </option>
                                    <option value="4º ESO - Grupo C">4º ESO - Grupo C</option>
                                    <option value="4º ESO - Grupo D">4º ESO - Grupo D</option>
                                    <option value="1º Bach - Grupo A">1º Bach - Grupo A</option>
                                    <option value="1º Bach - Grupo B">1º Bach - Grupo B </option>
                                    <option value="1º Bach - Grupo C">1º Bach - Grupo C</option>
                                    <option value="1º Bach - Grupo D">1º Bach - Grupo D</option>
                                    <option value="2º Bach - Grupo A">2º Bach - Grupo A</option>
                                    <option value="2º Bach - Grupo B">2º Bach - Grupo B </option>
                                    <option value="2º Bach - Grupo C">2º Bach - Grupo C</option>
                                    <option value="2º Bach - Grupo D">2º Bach - Grupo D</option>
                                    <option value="Laboratorio">Laboratorio</option>
                                    {/* Agrega más opciones según sea necesario */}
                                </select>
                            </div>
                            {/* Agrega más campos del formulario aquí */}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary p-3" style={{ backgroundColor: 'var(--main-color)' }}>Añadir asignatura</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
