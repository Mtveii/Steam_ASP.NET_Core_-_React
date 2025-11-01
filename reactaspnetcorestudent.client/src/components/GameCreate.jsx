import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { sendStudentData } from './apiFunctions';

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
        width: '800px',
        maxWidth: '90vw',
        border: '1px solid #364663',
        color: 'white',
    },
    divider: {
        borderColor: '#444',
        margin: '1rem 0'
    },
    title: {
        color: '#20c997',
        textAlign: 'center',
        marginBottom: '1.5rem'
    },
    formLabel: {
        color: '#dee2e6',
        fontWeight: '500'
    },
    formControl: {
        backgroundColor: '#2d2d2d',
        border: '1px solid #444',
        color: 'white',
        width: '100%'
    },
    previewImage: {
        border: '1px solid #444',
        borderRadius: '4px',
        maxHeight: '200px',
        objectFit: 'cover',
        width: '100%'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '1rem'
    },
    button: {
        primary: {
            border: '1px solid #198754',
            color: '#198754',
            backgroundColor: 'transparent',
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        secondary: {
            border: '1px solid #6c757d',
            color: '#6c757d',
            backgroundColor: 'transparent',
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s'
        }
    },
    error: {
        color: '#dc3545',
        textAlign: 'center',
        marginBottom: '1rem',
        padding: '10px',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        borderRadius: '4px'
    }
};

export function StudentCreate() {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                setError('Image size should be less than 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setImageFile(file);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const form = e.target;

            const studentData = {
                name: form.elements.name?.value,
                surname: form.elements.surname?.value,
                age: parseInt(form.elements.age?.value),
                gpa: parseFloat(form.elements.gpa?.value),
                photo: imageFile ? imageFile.name : 'default.png'
            };

            if (!studentData.name || !studentData.surname || !studentData.age || !studentData.gpa) {
                setError('Please fill in all required fields');
                setLoading(false);
                return;
            }

            await sendStudentData(studentData);
            navigate('/');
        } catch (err) {
            setError('Failed to create game: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const previewImage = imagePreview ? (
        <img
            src={imagePreview}
            alt="Preview"
            style={styles.previewImage}
        />
    ) : (
        <div style={{
            border: '1px solid #444',
            borderRadius: '4px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6c757d'
        }}>
            No image selected
        </div>
    );

    return (
        <div style={styles.overlayStyle}>
            <div style={styles.modalStyle}>
                <h4 style={styles.title}>Add New Game</h4>

                {error && <div style={styles.error}>{error}</div>}

                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Game Title *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter game title"
                                        style={styles.formControl}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Publisher *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="surname"
                                        placeholder="Enter publisher name"
                                        style={styles.formControl}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Size (GB) *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        placeholder="Enter size in GB"
                                        min="1"
                                        style={styles.formControl}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Rating (0-10) *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="gpa"
                                        placeholder="Enter rating from 0 to 10"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        style={styles.formControl}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Game Cover Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        style={styles.formControl}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>Image Preview</Form.Label>
                                    {previewImage}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={styles.buttonGroup}>
                                    <Button
                                        type="submit"
                                        style={styles.button.primary}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(25, 135, 84, 0.1)'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating...' : 'Create Game'}
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/')}
                                        style={styles.button.secondary}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(108, 117, 125, 0.1)'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                        disabled={loading}
                                    >
                                        Cancel
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