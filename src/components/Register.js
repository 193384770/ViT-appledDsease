import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const response = await fetch('http://huiyishunjian.natapp1.cc/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            alert('Registration successful');
            // 可以在这里添加跳转到登录页面或其他页面的逻辑
            window.location.href = '/login';
        } else {
            alert('Registration failed: ' + data.message);
        }
    };
    

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <h2 className="text-center mb-4">Sign Up</h2>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>邮箱</Form.Label>
                                    <Form.Control type="email" placeholder="请输入邮箱" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>密码</Form.Label>
                                    <Form.Control type="password" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label>确认密码</Form.Label>
                                    <Form.Control type="password" placeholder="请确认密码" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">点击注册</Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <a href="/">已经拥有账户？点击登陆</a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
