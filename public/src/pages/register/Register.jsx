import React, { useState, useEffect } from "react";

import { Formik } from 'formik'; 
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

import { Link } from 'react-router-dom';

import "./styles.css";
import Logo from "../../assets/logo.png"

const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
            alert("form");
    };

    const handleChange = () => {

    }

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
                <InputText 
                    type="password"
                    placeholder="Senha"
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                <InputText 
                    type="password"
                    placeholder="Confirme a senha"
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                <Button type="submit">Criar conta</Button>
                <span className="link">
                    Já possui uma conta ? <Link className="link" to="/login">Login</Link>
                </span>
            </form>
        </Formik>
    </>
  );
}

export default Register;