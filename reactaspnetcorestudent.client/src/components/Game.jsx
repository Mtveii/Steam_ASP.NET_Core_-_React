import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { populateStudentData } from './apiFunctions';
import { useAuth } from './AuthContext';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';

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
        color: '#20c997',
        fontWeight: '600'
    },
    formControl: {
        backgroundColor: '#2d2d2d',
        border: '1px solid #444',
        color: 'white'
    },
    previewImage: {
        height: '300px',
        width: '100%',
        objectFit: 'cover'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '1rem'
    },
    button: {
        outlineSuccess: {
            border: '1px solid #198754',
            color: '#198754',
            backgroundColor: 'transparent'
        },
        outlineDanger: {
            border: '1px solid #dc3545',
            color: '#dc3545',
            backgroundColor: 'transparent'
        }
    },
    buttonHover: {
        success: {
            backgroundColor: 'rgba(25,135,84,0.1)'
        },
        danger: {
            backgroundColor: 'rgba(220,53,69,0.1)'
        }
    },
    loadingText: {
        color: 'white',
        textAlign: 'center',
        fontSize: '1.2rem'
    }
};

export function Student() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        populateStudentData(id, setStudent);
    }, [id]);

    if (!student) {
        return <div style={styles.overlayStyle}><div style={styles.loadingText}>Loading game...</div></div>;
    }

    return (
        <div style={styles.overlayStyle}>
            <div style={styles.modalStyle}>
                <h4 style={styles.title}>Game Information</h4>
                <hr style={styles.divider} />
                <Container>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Title</Form.Label>
                                    <Form.Control type="text" readOnly value={student.name} style={styles.formControl} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Publisher</Form.Label>
                                    <Form.Control type="text" readOnly value={student.surname} style={styles.formControl} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Size Required</Form.Label>
                                    <Form.Control type="text" readOnly value={student.age} style={styles.formControl} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Average Rating</Form.Label>
                                    <Form.Control type="text" readOnly value={student.gpa} style={styles.formControl} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Game Poster</Form.Label>
                                    <Image
                                        src={student.photo.startsWith('http') ? student.photo : `https://localhost:7129/pics/${student.photo}`}
                                        thumbnail
                                        style={styles.previewImage}
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/300x400/1a1f2e/20c997?text=${encodeURIComponent(student.name)}`;
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={styles.buttonGroup}>
                                    {currentUser?.isAdmin && (
                                        <Button
                                            onClick={() => navigate(`/Edit/${student.id}`)}
                                            style={styles.button.outlineSuccess}
                                            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover.success)}
                                            onMouseLeave={(e) => Object.assign(e.target.style, styles.button.outlineSuccess)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => navigate('/')}
                                        style={styles.button.outlineDanger}
                                        onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover.danger)}
                                        onMouseLeave={(e) => Object.assign(e.target.style, styles.button.outlineDanger)}
                                    >
                                        Back
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