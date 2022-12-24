import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

import { Link, useNavigate } from 'react-router-dom';

import "./style.css";
import Logo from "../../assets/logo.png";

import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";

const Login = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
    }

    useEffect(() => {
      if(localStorage.getItem('chat-app-user')) {
        navigate('/')
      }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
           if (handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
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
            username,
            confirmPassword
        }
        = values;

        if (password === "") {
            toast.error
                ("A senha e a senha de confirmação devem ser as mesmas", 
                toastOptions
            );
            return false;
        } else if (username.length === "") {
            toast.error(
                "E-mail e senha é requerido.", 
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
                        min="3"
                        onChange={(e) => handleChange(e)}
                    />
                    <Password
                        type="password"
                        placeholder="Senha"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <Button
                        type="submit">
                          Login
                    </Button>
                    <span className="link">
                        Não possui uma conta ? <Link className="link" to="/register">Registro</Link>
                    </span>
                </form>
            </Formik>
            <ToastContainer />
        </>
    );
};
export default Login;