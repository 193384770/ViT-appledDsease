import React, { useState } from 'react';
import { Container, Button, NavDropdown, Form, Image, Navbar, Nav, Row, Col, Card } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCamera, FaUserCircle } from 'react-icons/fa';
import './Dashboard.css'; // 引入自定义样式文件

function Upload() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [results, setResults] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setSelectedImage(img);
            setPreview(URL.createObjectURL(img));
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) {
            alert('Please select an image first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch('http://huiyishunjian.natapp1.cc/upload', {
                method: 'POST',
                headers: {
                    // Ensure that the Authorization header is correctly set with the JWT from localStorage
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                setResults(data.result);
                setSuggestions(data.suggestions);
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleLogout = () => {
        // Clear the JWT stored in localStorage on logout
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    return (
        <>
            <Navbar expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand href="#home">苹果病害检测系统</Navbar.Brand>
                    <Nav className="ms-auto">
                        <NavDropdown title={<FaUserCircle size={30} />} id="basic-nav-dropdown" align="end">
                            <NavDropdown.Item onClick={handleLogout}>退出</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
                <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-dark-pink">
                    <Nav className="flex-column w-100">
                        <Nav.Link as={Link} to="/dashboard" className={isActive('/dashboard') ? 'active' : 'text-black'}>主页</Nav.Link>
                        <hr />
                        <Nav.Link as={Link} to="/upload" className={isActive('/upload') ? 'active' : 'text-black'}>上传图片</Nav.Link>
                        <hr />
                        <Nav.Link as={Link} to="/history" className={isActive('/history') ? 'active' : 'text-black'}>历史记录</Nav.Link>
                    </Nav>
                </div>
                <Container className="page-content">
                    <Row className="justify-content-center">
                        <Col md={6} className="text-center">
                            <h3>图片上传</h3>
                            <NavDropdown title="选择图片" id="nav-dropdown" alignRight className="d-inline-block me-3">
                                <NavDropdown.Item as="label">
                                    上传图片
                                    <Form.Control type="file" hidden onChange={handleImageChange} accept="image/*" />
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {}}>
                                    拍摄 <FaCamera />
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Button onClick={handleUpload} className="d-inline-block">
                                上传图片
                            </Button>
                            {preview && (
                                <div className="preview-container mt-3">
                                    <Image src={preview} alt="Image preview" thumbnail />
                                </div>
                            )}
                            {results && (
                                <Card className="mt-3">
                                    <Card.Body>
                                        <Card.Text>检测结果: {results}</Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                            {suggestions && (
                                <Card className="mt-3">
                                    <Card.Body>
                                        <Card.Text>相关建议: {suggestions}</Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Upload;
