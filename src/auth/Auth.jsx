import React, { useState } from 'react'
import '@/assets/Auth.css'
import { Field, Input, Button, Card, Stack } from "@chakra-ui/react"
import Homepage from '@/components/Homepage';
import { useNavigate } from 'react-router-dom';

export default function Auth({ updateLocalStorage }) {
  const [login, setLogin] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const toggle = () => {
    setLogin(!login)
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
  }

  const toggleBtn = () => login ? "Register" : "Back to Login"

  const handleSubmit = (e) => {
    e.preventDefault()

    const url = login
      ? "http://127.0.0.1:4000/api/auth/login"
      : "http://127.0.0.1:4000/api/auth/user"

    const body = login
      ? { email, password }
      : { firstName, lastName, email, password }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (data.token) {
          updateLocalStorage(data.token);
          navigate('/events');
        }
      })
      .catch(err => console.error("Login/Register failed:", err))
  }

  return (
    <>
      <Homepage />
      <h1 className="auth-header">{login ? "Login" : "Register"}</h1>

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
              <Card.Title>Register</Card.Title>
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
            {login ? "Login" : "Register"}
          </Button>
          <Button onClick={toggle} variant="ghost">
            {toggleBtn()}
          </Button>
        </Stack>
      </form>
    </>
  )
}
