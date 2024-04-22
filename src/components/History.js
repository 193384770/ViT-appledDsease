import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Card, Row, Col, Image, Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaTrash } from 'react-icons/fa';
import './Dashboard.css';

function History() {
    const [historyRecords, setHistoryRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(3);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await fetch(`http://huiyishunjian.natapp1.cc/history/${userEmail}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const sortedData = data.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));
                setHistoryRecords(sortedData);
            } catch (error) {
                console.error('Fetch error:', error);
                navigate('/login');
            }
        };
        fetchHistory();
    }, [userEmail, navigate]);

    const handleDeleteRecord = async (uploadDate) => {
        if (window.confirm('确定删除这条记录吗？')) {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://huiyishunjian.natapp1.cc/history/delete`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, upload_date: uploadDate }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete the history record');
            }

            setHistoryRecords(historyRecords.filter(record => new Date(record.upload_date).toISOString() !== new Date(uploadDate).toISOString()));
        }
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = historyRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(historyRecords.length / recordsPerPage);

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }
	return (
		<>
			<Navbar expand="lg" className="shadow-sm">
				<Container>
					<Navbar.Brand href="#home">苹果病害检测系统</Navbar.Brand>
					<Nav className="ms-auto">
						<NavDropdown title={<FaUserCircle size={30} />} id="basic-nav-dropdown" align="end">
							<NavDropdown.Item onClick={() => navigate('/login')}>退出</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Container>
			</Navbar>
			<div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
				<div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-dark-pink">
					<Nav className="flex-column w-100">
						<Nav.Link as={Link} to="/dashboard">主页</Nav.Link>
						<hr />
						<Nav.Link as={Link} to="/upload">上传图片</Nav.Link>
						<hr />
						<Nav.Link as={Link} to="/history" className="active">历史记录</Nav.Link>
					</Nav>
				</div>
				<Container className="page-content">
					<Row>
						<Col>
							<h3 style={{ textAlign: 'center' }}>历史记录</h3>
							{currentRecords.length > 0 ? (
								currentRecords.map((record, index) => (
									<Card key={index} className="mb-3 custom-card-background">
										<Row>
											<Col md={8}>
												<Card.Body>
													<Card.Title>
														{new Date(record.upload_date).toLocaleString()}
														<FaTrash
															style={{ cursor: 'pointer', float: 'right', color: 'red' }}
															onClick={() => handleDeleteRecord(record.upload_date)}
														/>
													</Card.Title>
													<Card.Text>结果: {record.results}</Card.Text>
													<Card.Text>建议: {record.suggestions}</Card.Text>
												</Card.Body>
											</Col>
											<Col md={4}>
												{record.image_path && (
													<Image src={record.image_path} alt="Uploaded" style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '180px' }} />
												)}
											</Col>
										</Row>
									</Card>
								))
							) : (
								<p style={{ textAlign: 'center' }}>没有历史记录</p>
							)}
							<Pagination className="justify-content-center">
								{totalPages > 1 && items}
							</Pagination>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}

export default History;
