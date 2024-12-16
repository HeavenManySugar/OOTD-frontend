import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { LoginProps } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';

const Login: React.FC<LoginProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { refetch } = useQuery({
        queryKey: [`UserInfo`],
        queryFn: () => {
            if (!localStorage.getItem('token')) return null;
            return fetch('/api/User/Get', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }).then((res) => {
                if (!res.ok) {
                    setIsModalOpen(true);
                    return null;
                }
                setIsModalOpen(false);
                setIsLoading(false);
                return res.json();
            })
        },
    });

    const mutation = useMutation({
        mutationFn: () => fetch('/api/User/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: email, Password: password }),
        }).then((res) => {
            if (!res.ok) {
                setError('登入失敗');
                return null;
            }
            return res.json();
        }),
        onSuccess: (data) => {
            if (data) {
                console.log('Login successful:', data);
                localStorage.setItem('token', data);
                refetch();
            }
        },
        onError: () => {
            setError('登入失敗');
        }
    });

    const handleLogin = () => {
        setError(null);
        setIsLoading(true);
        mutation.mutate();
    };

    return (
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
            <Modal.Header closeButton>
                <Modal.Title>登入</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>電子郵件:</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>密碼:</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button className='mb-3' variant="success" type="submit" disabled={isLoading}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : '登入'}
                    </Button>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="me-auto btn-lg w-25" variant="danger" onClick={() => setIsModalOpen(false)}>返回</Button>
                <div className="ms-auto text-end">
                    <p>還不是會員? <a href="#">註冊</a></p>
                    <p>忘記 <a href="#">密碼?</a></p>
                </div>
            </Modal.Footer>
        </Modal >
    );
};

export default Login;