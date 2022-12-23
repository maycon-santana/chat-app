import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

import { Link, useNavigate } from 'react-router-dom';

import "./styles.css";
import Logo from "../../assets/logo.png";

import axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";

const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
           if (handleValidation()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");
            }
        }
    };

    const handleValidation = () => {
        const {
            password,
            confirmPassword,
            username,
            email
        }
        = values;

        if (password !== confirmPassword) {
            toast.error
                ("A senha de cadastro e a senha de confirmação devem ser as mesmas", 
                toastOptions
            );
            return false;
        } else if (username.length < 3) {
            toast.error(
                "O nome de usuário deve ser maior que 3 caracteres", 
                toastOptions
            );
            return false;
        } else if (password.length < 8) {
            toast.error(
                "A senha deve ser maior que 8 caracteres", 
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error(
                "O Campo E-mail é requerido.", 
                toastOptions
            );
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

  return (
        <>
            <Formik>
                <form className="form-login" onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1 className="h1">CHAT</h1>
                    </div>
                    <InputText 
                        type="text"
                        placeholder="Usuário"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <InputText 
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <Password
                        type="password"
                        placeholder="Senha"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <Password
                        type="password"
                        placeholder="Confirme a senha"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <Button
                        type="submit">
                        Criar conta
                    </Button>
                    <span className="link">
                        Já possui uma conta ? <Link className="link" to="/login">Login</Link>
                    </span>
                </form>
            </Formik>
            <ToastContainer />
        </>
    );
};
export default Register;