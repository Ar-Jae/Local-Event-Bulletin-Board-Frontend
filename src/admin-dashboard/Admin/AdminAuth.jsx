import React, { useState } from 'react'
import '../../assets/AdminAuth.css'
import { Field, Input, Button, Card, Stack } from "@chakra-ui/react"
import Homepage from '../../components/Homepage.jsx';
import { useNavigate } from 'react-router-dom';

export default function AdminAuth({ updateLocalStorage }) {

  const [login, setLogin] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)

  const navigate = useNavigate();

  const toggle = () => {
    setLogin(!login)
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
  }

  const toggleBtn = () => login ? "Request Admin" : "Back to Login"

  const handleSubmit = (e) => {
    e.preventDefault()

    const url = login
      ? "http://127.0.0.1:4000/api/adminUser/login"
      : "http://127.0.0.1:4000/api/adminUser/admin"

    const body = login
      ? { email, password }
      : { firstName, lastName, email, password }

    if (login) {
      handleAuth(url, body);
    } else {
      handleAdminRequest(url, body);
    }
  }

  const handleAdminRequest = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setPending(true);
    } catch (err) {
      console.error("Admin request failed:", err);
    }
  }

  const handleAuth = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateLocalStorage(data.token, data.isAdmin);
      navigate('/admin/dashboard');
    } 
    
    catch (err) {
      console.error("Login/Register failed:", err);
    }
  }

  return (
    <>
      <Homepage />
      <h1 className='auth-header'>{login ? "Admin Login" : "Admin Register"}</h1>

      {pending ? (
        <div className="pending-message">
          <Card.Root maxW="sm">
            <Card.Header>
              <Card.Title>Request Submitted</Card.Title>
              <Card.Description>
                Your request for an admin account has been submitted and is pending approval.<br />
                You will be notified once your account is approved.
              </Card.Description>
            </Card.Header>
          </Card.Root>
          <Button mt={4} onClick={() => { setPending(false); setLogin(true); }}>Back to Login</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-wrapper">
          {login ? (
            // ----------------- LOGIN FORM -----------------
            <Card.Root maxW="sm">
              <Card.Header>
                <Card.Title></Card.Title>
                <Card.Description>
                  Enter your email and password
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <Stack gap="4" w="full">
                  <Field.Root required>
                    <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
                    <Input
                      type="email"
                      value={email}
                      placeholder="Enter email"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Password <Field.RequiredIndicator /></Field.Label>
                    <Input
                      type="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Field.Root>
                </Stack>
              </Card.Body>
            </Card.Root>
          ) : (
            // ----------------- REGISTER FORM -----------------
            <Card.Root maxW="sm">
              <Card.Header>
                <Card.Title>Register For Admin</Card.Title>
                <Card.Description>
                  Fill in your details to create an account
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <Stack gap="4" w="full">
                  <Field.Root required>
                    <Field.Label>First Name <Field.RequiredIndicator /></Field.Label>
                    <Input
                      type="text"
                      value={firstName}
                      placeholder="Enter first name"
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Last Name <Field.RequiredIndicator /></Field.Label>
                    <Input
                      type="text"
                      value={lastName}
                      placeholder="Enter last name"
                      onChange={e => setLastName(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
                    <Input
                      type="email"
                      value={email}
                      placeholder="Enter email"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Password <Field.RequiredIndicator /></Field.Label>
                    <Input
                      type="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Field.Root>
                </Stack>
              </Card.Body>
            </Card.Root>
          )}

          {/* -------- BUTTONS -------- */}
          <Stack mt={4} gap={3}>
            <Button type="submit" colorScheme="teal">
              {login ? "Login" : "Submit Request"}
            </Button>
            <Button onClick={toggle} variant="ghost">
              {toggleBtn()}
            </Button>
          </Stack>
        </form>
      )}
    </>
  )
}
