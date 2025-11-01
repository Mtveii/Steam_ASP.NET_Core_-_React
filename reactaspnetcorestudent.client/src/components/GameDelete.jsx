import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { populateStudentData, deleteStudentData } from './apiFunctions';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';

export function StudentDelete() {
    const { id } = useParams();
    const [student, setStudent] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        populateStudentData(id, setStudent);
    }, [id]);

    async function handleDelete() {
        await deleteStudentData(id);
        navigate('/');
    }

    if (!student) {
        return <p style={{ color: 'white', textAlign: 'center', marginTop: '40px' }}>Загрузка игры...</p>;
    }

    const prevImg = <Image className="prevImg" src={`https://localhost:7129/pics/${student.photo}`} thumbnail style={styles.previewImage} />;

    return (
        <div style={styles.overlayStyle}>
            <div style={styles.modalStyle}>
                <h4 style={styles.title}>Удаление игры</h4>
                <hr style={styles.divider} />
                <Container>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Название</Form.Label>
                                    <Form.Control type="text" value={student.name} readOnly style={styles.formControl} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Издатель</Form.Label>
                                    <Form.Control type="text" value={student.surname} readOnly style={styles.formControl} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Требуется места</Form.Label>
                                    <Form.Control type="text" value={student.age} readOnly style={styles.formControl} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Средний бал</Form.Label>
                                    <Form.Control type="text" value={student.gpa} readOnly style={styles.formControl} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Постер игры</Form.Label>
                                    {prevImg}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={styles.buttonGroup}>
                                    <Button
                                        onClick={handleDelete}
                                        className="btn btn-sm"
                                        style={styles.button.outlineDanger}
                                        onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover.danger)}
                                        onMouseLeave={(e) => Object.assign(e.target.style, styles.button.outlineDanger)}
                                    >
                                        Удалить
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/')}
                                        className="btn btn-sm"
                                        style={styles.button.outlineLight}
                                        onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover.light)}
                                        onMouseLeave={(e) => Object.assign(e.target.style, styles.button.outlineLight)}
                                    >
                                        Отмена
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </div>
    );
}

const styles = {
    overlayStyle: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.25)', 
        backdropFilter: 'blur(6px)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    modalStyle: {
        background: 'rgba(26, 26, 26, 0.10)', 
        borderRadius: '12px',
        boxShadow: '0 4px 25px rgba(0,0,0,0.6)',
        padding: '32px',
        minWidth: '400px',
        maxWidth: '90vw',
        border: '1px solid #444',
        color: 'white',
        backdropFilter: 'blur(4px)',
    },
    divider: {
        borderColor: '#444',
        margin: '1rem 0'
    },
    formLabel: {
        color: '#dee2e6',
        fontWeight: '500'
    },
    formControl: {
        backgroundColor: '#2d2d2d',
        border: '1px solid #444',
        color: 'white'
    },
    previewImage: {
        border: '1px solid #444',
        borderRadius: '4px'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginLeft: '3px'
    },
    button: {
        outlineLight: {
            border: '1px solid #dee2e6',
            color: '#dee2e6',
            backgroundColor: 'transparent',
            width: '100%'
        },
        outlineDanger: {
            border: '1px solid #dc3545',
            color: '#dc3545',
            backgroundColor: 'transparent',
            width: '100%'
        }
    },
    buttonHover: {
        light: {
            backgroundColor: 'rgba(222, 226, 230, 0.1)'
        },
        danger: {
            backgroundColor: 'rgba(220, 53, 69, 0.1)'
        }
    }
};
