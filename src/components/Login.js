import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 引入 useAuth 钩子

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // 从 AuthContext 中获取 login 函数

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://huiyishunjian.natapp1.cc/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
        
            const data = await response.json();
            if (response.ok) {
                console.log('登录成功:', data);
                login(data.access_token, email); // 使用 AuthContext 的 login 方法
                navigate('/dashboard'); // 跳转到 Dashboard
            } else {
                console.error('登录失败:', data);
                alert(data.message || '登录失败');
            }
        } catch (error) {
            console.error('网络错误:', error);
            alert('登录请求失败');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <h2 className="text-center mb-4">苹果病害检测系统</h2>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>账号邮箱</Form.Label>
                                    <Form.Control type="email" placeholder="请输入你的邮箱" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>密码</Form.Label>
                                    <Form.Control type="password" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">点击登陆</Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <a href="/register">还没有账号？点击注册</a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
