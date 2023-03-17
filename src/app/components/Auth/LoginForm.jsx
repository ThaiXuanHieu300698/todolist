import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/userAction";
import { Link } from "react-router-dom";
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

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(email, password))
      .then(() => {
        props.history.push("/task");
      })
      .catch(() => {
        console.log("System error");
      });
  }

  return (
    <div className="container">
      <h1 className="text-center mb-5">Đăng nhập</h1>
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
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
              onChange={(e) => setPassword(e.target.value)}
              validations={[required]}
            />
          </div>
          <div className="form-group form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" /> Nhớ mật
              khẩu
            </label>
          </div>
          <Button className="btn btn-primary w-100" onClick={handleSubmit}>
            Đăng nhập
          </Button>
          <div className="mt-3">
            <Link to={"/register"}>Đăng ký ngay</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
