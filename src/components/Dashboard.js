import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Dashboard.css'; // 引入自定义样式文件

function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    // Function to check if the path is active to highlight the nav item
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Function to handle user logout
    const handleLogout = () => {
        // Here you should include your logout logic like clearing tokens
        // After logout logic, navigate to the login page
        navigate('/login');
    };

    return (
        <>
            <Navbar  expand="lg" className="shadow-sm">
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
                <div className="page-content p-4">
                    <h2>欢迎使用~</h2>
                </div>

            </div>
        </>
    );
}

export default Dashboard;
