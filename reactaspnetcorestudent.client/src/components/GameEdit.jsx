import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { populateStudentData, updateStudentData } from './apiFunctions';

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
    buttonHover: {
        primary: {
            backgroundColor: 'rgba(25, 135, 84, 0.1)'
        },
        secondary: {
            backgroundColor: 'rgba(108, 117, 125, 0.1)'
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

export function StudentEdit() {
    const [form, setForm] = useState({
        id: 0,
        name: '',
        surname: '',
        age: 0,
        gpa: 0,
        photo: '',
    });
    const [imgState, setImgState] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        populateStudentData(id, setForm);
    }, [id]);

    useEffect(() => {
        if (form.photo) {
            setImgState(`https://localhost:7129/pics/${form.photo}`);
        }
    }, [form.photo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({
            ...f,
            [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let photoFileName = form.photo;

            // Upload new photo if one was selected
            if (photoFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', photoFile);

                const uploadRes = await fetch('https://localhost:7129/api/auth/upload-photo', {
                    method: 'POST',
                    body: uploadFormData
                });

                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    photoFileName = uploadData.fileName;
                    console.log('New photo uploaded:', photoFileName);
                } else {
                    throw new Error('Failed to upload photo');
                }
            }

            // Update student with new data
            const formData = new FormData();
            formData.append('Id', id);
            formData.append('Name', form.name);
            formData.append('Surname', form.surname);
            formData.append('Age', parseInt(form.age));
            formData.append('GPA', parseFloat(form.gpa));
            formData.append('Photo', photoFileName);

            console.log('Updating game with data:', {
                Id: id,
                Name: form.name,
                Surname: form.surname,
                Age: form.age,
                GPA: form.gpa,
                Photo: photoFileName,
                HasNewPhoto: !!photoFile
            });

            await updateStudentData(formData);
            navigate('/');
        } catch (err) {
            setError('Failed to update game: ' + err.message);
            console.error('Update error:', err);
        } finally {
            setLoading(false);
        }
    }

    function handlePreview(e) {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImgState(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPhotoFile(null);
            setImgState(form.photo ? `https://localhost:7129/pics/${form.photo}` : '');
        }
    }

    const prevImg = imgState ? (
        <Image
            src={imgState}
            thumbnail
            style={styles.previewImage}
            onError={(e) => {
                e.currentTarget.src = 'https://localhost:7129/pics/placeholder.png';
            }}
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
            No image
        </div>
    );

    return (
        <div style={styles.overlayStyle}>
            <div style={styles.modalStyle}>
                <h4 style={styles.title}>Edit Game</h4>
                <hr style={styles.divider} />

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
                                        value={form.name}
                                        onChange={handleChange}
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
                                        value={form.surname}
                                        onChange={handleChange}
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
                                        value={form.age}
                                        onChange={handleChange}
                                        min="1"
                                        step="0.1"
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
                                        value={form.gpa}
                                        onChange={handleChange}
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
                                        onChange={handlePreview}
                                        name="uploadedFile"
                                        accept="image/*"
                                        style={styles.formControl}
                                    />
                                    <Form.Text style={{ color: '#6c757d' }}>
                                        Leave empty to keep current image
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={styles.formLabel}>
                                        {photoFile ? 'New Image Preview' : 'Current Image'}
                                    </Form.Label>
                                    {prevImg}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={styles.buttonGroup}>
                                    <Button
                                        type="submit"
                                        style={styles.button.primary}
                                        onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover.primary)}
                                        onMouseLeave={(e) => Object.assign(e.target.style, styles.button.primary)}
                                        disabled={loading}
                                    >
                                        {loading ? 'Updating...' : 'Update Game'}
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/')}
                                        style={styles.button.secondary}
                                        onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover.secondary)}
                                        onMouseLeave={(e) => Object.assign(e.target.style, styles.button.secondary)}
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