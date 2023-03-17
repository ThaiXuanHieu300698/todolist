import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions/userAction";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import validator from "validator";

// validator
const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="text-danger">This field is required</span>;
  }
};

const mail = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="text-danger">Email invalid</span>;
  }
};

const pw = (value, props, components) => {
  if (
    components["password"][0].value !== components["confirmPassword"][0].value
  ) {
    return <span className="text-danger">Passwords are not equal.</span>;
  }
};

const RegisterForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
    };

    dispatch(register(newUser))
      .then(() => {
        props.history.push("/task");
      })
      .catch(() => {
        console.log("System error");
      });
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center mb-5">Đăng ký</h1>
        <div className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ:</label>
              <Input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label>Tên:</label>
              <Input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label>Tên đăng nhập:</label>
              <Input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <Input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validations={[mail, required]}
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu:</label>
              <Input
                type="password"
                className="form-control"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label>Xác nhận mật khẩu:</label>
              <Input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                validations={[pw, required]}
              />
            </div>

            <Button className="btn btn-primary w-100" onClick={handleSubmit}>
              Đăng ký
            </Button>
            <div className="mt-3">
              <Link to="/">&#10094; Quay lại</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
