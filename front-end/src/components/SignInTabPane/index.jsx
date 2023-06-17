import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AuthService from "../../services/auth.service";

import {Formik, Field, Form } from 'formik'

import * as Yup from 'yup';

function SignInTabPane() {

    const navigate = useNavigate();
    const location = useLocation();

    const [message, setMessage] = useState("");

    const yupSchema = Yup.object({
        email: Yup.string()
            .email('email invalide')
            .required('Votre email professionnel requis'),
        password: Yup.string()
            .required('Mot de passe requis')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Votre mot de passe doit contenir 8 caractères minimum, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial")
    });

    const loginApp =  (values, { setSubmitting }) => {

        AuthService.login(values.email, values.password)
            .then( () => {
               
                const origin = location.state?.from?.pathname || 'app/upstreamflow';
                navigate(origin, {replace: true});
            },
            (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setMessage(resMessage);
              }
            )
            
    }
    

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={loginApp}
            validationSchema={yupSchema} >
                {(formik, isSubmitting) => (
                     <div className="tab-content" id="login-form-content">
                     <div className="tab-pane fade show active border border-secondary border-2 rounded-3 color-4" id="login-box" role="tabpanel" 
                             aria-labelledby="login-tab">
     
                         <Form className="form-horizontal">
                        
                         
                             <fieldset className="p-4">
                                 <div className="form-group d-flex flex-column align-items-center">  
                                     <div className="col-8 col-md-4 w-100 input-group input-group-sm">
                                         <Field name="email"
                                            className={(formik.touched.email && formik.errors.email) ? 'form-control is-invalid font-text' : 'form-control font-text'}
                                            placeholder="Email" type="email" />
                                             {formik.touched.email && formik.errors.email ? (
                                                <div className="invalid-feedback">{formik.errors.email}</div>) : null}
                                    </div>
                                </div>
                                 <div className="form-group d-flex flex-column align-items-center mt-3">
                                     <div className="col-8 col-md-4 w-100 input-group input-group-sm">
                                         <Field name="password" type="password"  autoComplete="on"
                                            className={(formik.touched.password && formik.errors.password) ? 'form-control is-invalid font-text' : 'form-control font-text'} 
                                                placeholder="Password" />
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className="invalid-feedback">{formik.errors.password}</div> ) : null}
                                     </div>
                                 </div>
                                 <div className="form-group d-flex flex-column align-items-center mt-4">
                                     <div className="">
                                        <button type="submit" className="btn btn-sm color-3 font-title text-light" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Login"}</button>
                                        {message && ( <div className="form-group">
                                                        <div className="alert alert-danger" role="alert">
                                                            {message}</div>
                                                        </div>
                                                    )}
                                     </div>
                                 </div>
                             </fieldset>
                             </Form>
                         </div>
                     </div>
                )
                }
            </Formik>
    )

}

export default SignInTabPane;