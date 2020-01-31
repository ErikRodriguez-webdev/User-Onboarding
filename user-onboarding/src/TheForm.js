import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const TheForm = ({ values, errors, touched, status }) => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    status && setUserInfo((userInfo) => [...userInfo, status]);
  }, [status]);

  return (
    <div>
      <Form>
        <label htmlFor="name">Name: </label>

        <Field id="name" name="name" placeholder="John Smith" />
        <br />
        {touched.name && errors.name && <p>{errors.name}</p>}

        <label htmlFor="email">Email: </label>

        <Field id="email" name="email" placeholder="js12345@email.com" />
        <br />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <label htmlFor="password">Password: </label>

        <Field id="password" name="password" placeholder="123ABC!@#/" />
        <br />
        {touched.password && errors.password && <p>{errors.password}</p>}

        <label htmlFor="tos">T.O.S.: </label>

        <Field type="checkbox" name="tos" checked={values.termsofservice} />
        <br />

        <button type="submit">Submit Form</button>
      </Form>
      {userInfo.map((userInfo) => {
        return (
          <ul key={userInfo.id}>
            <li>name: {userInfo.name}</li>
            <li>email: {userInfo.email}</li>
            <li>password {userInfo.password}</li>
          </ul>
        );
      })}
    </div>
  );
};

const SubRender = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      termsofservice: props.termsofservice || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(`Need name`),
    email: Yup.string().required("Need email"),
    password: Yup.string().required("Need password")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then((res) => {
        //console.log(res);
        setStatus(res.data);
        resetForm();
      })
      .catch((err) => {
        //console.log(err);
      });
  }
})(TheForm);
export default SubRender;
