// import React from 'react';
// import {Formik, Form, Field, ErrorMessage} from "formik";
// import * as Yup from 'yup';
// import axios from 'axios';
//
// function Registration() {
//     const initiValues= {
//         email:"",
//         password:"",
//         firstName:"",
//         lastName:"",
//         phoneNumber:""
//       };
//       const validationSchema = Yup.object().shape({
//         password:Yup.string().min(4).max(20).required()
//       });
//     const onSubmit = (data) => {
//         console.log("Submitting form data:", data); // Check the data before sending it
//         axios.post("http://localhost:3001/auth/register", data)
//             .then((response) => {
//                 console.log("Response:", response.data);
//             })
//             .catch((error) => {
//                 console.error("Error:", error.response ? error.response.data : error.message);
//             });
//     };
//
//     return (
//     <div>
//       <Formik initialValues={initiValues} onSubmit={onSubmit} validationSchema={validationSchema}>
//         <Form className="formContainer">
//             <label>Email: </label>
//             <ErrorMessage name="email" component="span"/>
//             <Field id="inputCreatePost" name="email" placeholder="(Ex, John123...)"/>
//             <label>Password: </label>
//             <ErrorMessage name="password" component="span"/>
//             <Field id="inputCreatePost" type="password" name="password" placeholder="Your Password..."/>
//             <label>First Name: </label>
//             <ErrorMessage name="firstName" component="span"/>
//             <Field id="inputCreatePost" name
//             ="firstName" placeholder="(Ex, John...)"/>
//             <label>Last Name: </label>
//             <ErrorMessage name="lastName" component="span"/>
//             <Field id="inputCreatePost" name="lastName" placeholder="(Ex, Doe...)"/>
//             <label>Phone Number: </label>
//             <ErrorMessage
//             name="phoneNumber" component="span"/>
//             <Field id="inputCreatePost" name="phoneNumber" placeholder="(Ex, 1234567890...)"/>
//             <button type="submit"> Register</button>
//         </Form>
//       </Formik>
//     </div>
//   )
// }
//
// export default Registration
