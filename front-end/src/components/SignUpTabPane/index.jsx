import React from 'react';
import { useFormik } from "formik";
import { object, string, ref } from "yup";

import AuthService from "../../services/auth.service";
import { useNavigate, useLocation } from 'react-router-dom';



function SignUpTabPane() {

    const navigate = useNavigate();
    const location = useLocation();

    const [avatarPreview, setAvatarPreview] = React.useState('icons/default-avatar.png');
  
    const handleFileOnChange = (event) => {
        
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
           setAvatarPreview(reader.result)   
        };
        formik.setFieldValue("fileimg", file);
    };

    const formik = useFormik({
        initialValues: {
            file: null,
            lastname: '',
            firstname: '',
            department: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: object().shape({
            /*file: mixed().test("fileType", "*fichiers acceptés: jpg, jpeg et png",
                    (file) => {
                        file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                    }
                ),*/
            lastname: string().min(2, "Minimum 2 caractères").required("Requis"),
            firstname: string().min(2, "Minimum 2 caractères").required("Requis"),
            department: string().required("Requis"),
            email: string()/*.email("Veuillez entrer un email valide")*/.required( "email requis")
                            .matches( /@groupomania\.fr$/, "Renseignez ici votre email Groupomania, ex: mon.email@groupomania.fr"),
            password: string().required("Requis")
                        .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                            "Votre mot de passe doit contenir 8 caractères minimum, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
            passwordConfirm: string().required("Confirmez votre mot de passe").oneOf([ref("password")], "veuillez saisir à nouveau votre mot de passe"),
          }),
        onSubmit: (values) => {
            AuthService.signup(values.fileimg, values.lastname, values.firstname, values.department, values.email, values.password, values.passwordConfirm) 
                .then( () => {
                    const origin = location.state?.from?.pathname || 'app/upstreamflow';
                    navigate(origin, {replace: true});
                })
                .catch((err) => { console.log(err); })
        },
        
    })

    return (
    <>
    <div className="tab-pane fade show border border-secondary border-2 rounded-3 color-4"
         id="signup-box" role="tabpanel" aria-labelledby="signup-tab">
        <form className="px-3" onSubmit={formik.handleSubmit}>
            <fieldset>
                <div className="form-group">
                    <div className="input-group">
                        <div className="mx-auto py-1 avatar-signup-container">
                            <img className="rounded-circle thumbnail w-100 h-100 img-fit" id="defaultphoto"
                                alt="user account icon" title="Preview profile photo" 
                                src={avatarPreview} /> 
                        </div>
                        <div className="input-group-btn mx-auto pt-1 pb-2">
                           <div className="fileUpload bg-secondary fake-shadow rounded">
                                <p className='font-title text-light text-center'>J'insère ma photo</p>
                                <input id="filecontrol" name="fileinput" type="file" onChange={handleFileOnChange} 
                                    className="w-100 rounded"/>
                                <p className="text-light font-title text-center">*fichiers acceptés: jpg, jpeg et png</p>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <input id="lastnameinput" name="lastname" type="text" placeholder="nom" 
                            onChange={formik.handleChange} value={formik.values.lastname} className="form-control w-100"/>
                         {formik.errors.lastname && formik.touched.lastname && (
                        <p className="text-danger font-title">{formik.errors.lastname}</p> )}
                    </div>
                </div>
                <div className="form-group"> 
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <input id="firstnameinput" name="firstname" type="text" placeholder="prénom"
                             onChange={formik.handleChange} value={formik.values.firstname} className="form-control w-100"/>
                         {formik.errors.firstname && formik.touched.firstname && (
                            <p className="text-danger font-title">{formik.errors.firstname}</p> )}
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-8 col-md-5 mx-auto mt-2">
                        <select  id="departmentinput" name="department" 
                            onChange={formik.handleChange} value={formik.values.department} className="bg-secondary font-title text-light rounded">
                            <option value='' label="- département -" className="text-center">- département -</option>
                            <option value='1' label="Administration">Administration</option>
                            <option value='2' label="Finances">Finances</option>
                            <option value='3' label="Comptabilité">Comptabilité</option>
                            <option value='4' label="SSI">SSI</option>
                            <option value='5' label="Marketing">Marketing</option>
                            <option value='6' label="Logistique">Logistique</option>
                        </select>
                        {formik.errors.department && formik.touched.department && (
                            <p className='text-danger font-title'>{formik.errors.department}</p> )}
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm bg-secondary w-100 d-flex flex-column px-2">
                        <input id="emailinput" name="email" type="email" placeholder="email"
                             onChange={formik.handleChange} value={formik.values.email} className="form-control my-2 w-100"/>
                        {formik.errors.email && formik.touched.email && (
                            <p className="text-danger font-title">{formik.errors.email}</p> )}
                        <span className='font-title text-light px-2'>Utilisez ici votre email Groupomania <br/>
                                                                ex: mon.nom@groupomania.fr
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <input id="passwordinput" name="password" type="password"  autoComplete="on" placeholder="mot de passe"
                            onChange={formik.handleChange} value={formik.values.password} className="form-control w-100"/>
                        {formik.errors.password && formik.touched.password && (
                            <p className="text-danger font-title">{formik.errors.password}</p> )}
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <input id="passwordinput2" name="passwordConfirm" type="password"  autoComplete="on" placeholder="mot de passe"
                            onChange={formik.handleChange} value={formik.values.passwordConfirm} className="form-control w-100"/>
                        {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                            <p className="text-danger font-title">{formik.errors.passwordConfirm}</p> )}
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-5 col-md-4 my-3 mx-auto">
                        <input id="submitbutton" name="submitbutton" type="submit" className="bg-secondary font-title text-light rounded" value="Soumettre" />
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
    </>
    );
                };

export default SignUpTabPane