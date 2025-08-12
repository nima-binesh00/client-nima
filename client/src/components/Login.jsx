import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Log_in } from "../API/UserApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Addtoken } from "../stores/state";
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const Dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    Log_in(data)
      .then((res) => {
        console.log(res);

        localStorage.setItem("token", res.token);
        Dispatch(Addtoken({ ...res }));
        alert("Login successful!");
        navigator("/");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        reset();
        setIsLoading(false);
      });
    // console.log("Login Data:", data);
  };

  return (
    <Container fluid className=" p-4 bgdark vh-100">
      <Row className="justify-content-center bgdark">
        <Col xs={12} md={6}>
          <h2 className="mb-4 text-center">Login</h2>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
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

            <Button
              variant="dark"
              type="submit"
              className="w-100 mb-3 borderred"
            >
              {isLoading ? "..." : "Login"}
            </Button>
          </Form>

          <div className="text-center ">
            <Link to={"/Signup"} style={{ textDecoration: "none" }}>
              Create an account
            </Link>
          </div>

          {isSubmitSuccessful && (
            <Alert variant="success" className="mt-3 text-center">
              Login successful!
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
