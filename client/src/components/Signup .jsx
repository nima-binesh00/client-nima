import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Singupuser } from "../API/UserApi";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    Singupuser(data)
      .then((res) => {
        // console.log(res);
        alert("Registration successful!");
        navigator("/Login");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        reset();
        setIsLoading(false);
      });
    // console.log("Form Data:", data);
  };

  return (
    <Container fluid className=" p-4 bgdark vh-100">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4 text-center">Signup</h2>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                maxLength={30}
                {...register("username", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name must be less than 30 characters",
                  },
                })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name && errors.name.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@mail.com"
                maxLength={50}
                {...register("email", {
                  required: "Email is required",
                  maxLength: {
                    value: 50,
                    message: "Email must be less than 50 characters",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                maxLength={20}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && errors.password.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mb-3">
              {isLoading ? "..." : "Sign Up"}
            </Button>
          </Form>

          <div className="text-center">
            <Link to={"/Login"} style={{ textDecoration: "none" }}>
              Log in account
            </Link>
          </div>

          {isSubmitSuccessful && (
            <Alert variant="success" className="mt-3 text-center">
              form requste is successful!
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
