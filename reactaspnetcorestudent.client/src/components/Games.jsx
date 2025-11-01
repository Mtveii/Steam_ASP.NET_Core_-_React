import { useEffect, useState } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import { populateStudentsData } from './apiFunctions';
import { useAuth } from './AuthContext';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ProductCard from './poster';
import './components_CSS/Games.css';

export function Students() {
    const { searchTerm, handleSearchChange } = useOutletContext();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            setLoading(true);
            await populateStudentsData(setStudents, searchTerm);
            if (mounted) setLoading(false);
        };
        fetchData();
        return () => { mounted = false; };
    }, [searchTerm]);

    const renderGameImage = (student) => {
        if (!student?.photo || student.photo === 'null' || student.photo === 'undefined') {
            return <div className="placeholder-image">No Image Available</div>;
        }

        let imageUrl = student.photo;
        if (!imageUrl.startsWith('http') && !imageUrl.startsWith('https')) {
            imageUrl = `https://localhost:7129/pics/${imageUrl}`;
        }

        return (
            <Image
                src={imageUrl}
                alt={`${student.name} cover`}
                className="card-image"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                }}
            />
        );
    };

    return (
        <Container fluid className="students-container-fluid">
            <div className="banner-container">
                <ProductCard />
            </div>

            {!loading && <div className="results-count">Found: <strong>{students.length}</strong> games{searchTerm && ` matching "${searchTerm}"`}</div>}

            <div className="below-banner">
                <Row className="justify-content-center students-row">
                    {loading ? (
                        <Col xs={12} className="text-center">
                            <div className="loading-text">Loading games...</div>
                        </Col>
                    ) : students.length === 0 ? (
                        <Col xs={12} className="text-center">
                            <div className="loading-text">{searchTerm ? 'No games found' : 'No games available'}</div>
                        </Col>
                    ) : (
                        students.map((s, idx) => (
                            <Col
                                key={s.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className={`mb-4 ${idx < 4 ? 'offset-top' : ''}`}
                            >
                                <Card className="student-card">
                                    <div className="card-hover-overlay" />

                                    <NavLink to={`/Student/${s.id}`} className="card-image-link">
                                        {renderGameImage(s)}
                                        <div className="placeholder-image-fallback">Image Not Found</div>
                                    </NavLink>

                                    <Card.Body className="card-body">
                                        <Card.Title className="card-title">{s.name}</Card.Title>
                                        
                                        {currentUser?.isAdmin && (
                                            <div className="button-group">
                                                <NavLink to={`/Edit/${s.id}`} className="btn btn-sm edit-button">Edit</NavLink>
                                                <NavLink to={`/Delete/${s.id}`} className="btn btn-sm delete-button">Delete</NavLink>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </Container>
    );
}