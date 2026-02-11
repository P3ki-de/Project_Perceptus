import React, { act, useState } from 'react'
import './Login.css'


export const Login = ({ visible = true, onLoginSuccess }) => {
    const [action, setAction] = useState("Sign Up")
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});




    const handleValidation = () => {
        const formFields = { ...fields };
        const formErrors = {};
        let formIsValid = true;

        if (action === "Sign Up") {
            //Name
            if (!formFields["nazwa"]) {
                formIsValid = false;
                formErrors["nazwa"] = "Cannot be empty";
            }

            if (typeof formFields["nazwa"] !== "undefined") {
                if (!formFields["nazwa"].match(/^[a-zA-Z]+$/)) {
                    formIsValid = false;
                    formErrors["nazwa"] = " Only letters";
                }
                if (formFields["nazwa"].length < 4) {
                    formIsValid = false;
                    formErrors["nazwa"] = " Musi być więcej niż trzy litery"
                }
            }


            //Password
            if (!formFields["haslo"]) {
                formIsValid = false;
                formErrors["haslo"] = "Cannot be empty";
            }

            if (typeof formFields["haslo"] !== "undefined") {
                if (formFields["haslo"].length < 6) {
                    formIsValid = false;
                    formErrors["haslo"] = " Wiecej niż sześć liter lub liczb";
                }
                if (formFields["haslo"] === formFields["nazwa"]) {
                    formIsValid = false;
                    formErrors["haslo"] = " Te pole musi być różne od pola loginu";
                }
            }


            setErrors(formErrors)
            return formIsValid;
        }

        if (action === "Login") {

            if (!formFields["nazwa"]) {
                formIsValid = false;
                formErrors["nazwa"] = "Cannot be empty";
            }
        }
        if (!formFields["haslo"]) {
            formIsValid = false;
            formErrors["haslo"] = "Cannot be empty";
        }

        setErrors(formErrors);
        return formIsValid;

    }

    const handleChange = (field, value) => {
        setFields({
            ...fields,
            [field]: value
        })
    }

    const contactSubmit = async (e) => {
        e.preventDefault();

        // Always validate first
        if (!handleValidation()) {
            return;
        }

        // 3. Trigger the correct backend call based on action
        if (action === "Sign Up") {
            await handleRegister();
        } else if (action === "Login") {
            await handleLogin(); // <--- This starts the login process
        }
    };
    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    login: fields["nazwa"], // Mapping 'nazwa' to 'login' for backend
                    password: fields["haslo"]
                })
            });

            if (response.ok) {
                const userId = await response.json();
                console.log("Logged in! User ID is:", userId);
                alert("Login udany :)");
                if (onLoginSuccess) onLoginSuccess(userId);
            } else {
                alert("Błąd logowania: Niepoprawne dane");
            }
        } catch (error) {
            console.error("Connection error:", error);
            alert("Błąd połączenia z serwerem");
        }
    };
    const handleRegister = async () => {
        const response = await fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                login: fields["nazwa"],
                password: fields["haslo"]
            })
        });
        if (response.ok) alert("Rejestracja udana!");
    };


    return (
        <div className={visible ? 'visibility visible' : 'visibility'}>
            <div className='Login' >
                <div className='naglowek'>
                    {action}
                </div>
                <form onSubmit={e => contactSubmit(e)}>
                    <div className='nazwa'>
                        <input type='text' placeholder='Login' onChange={(e) => handleChange("nazwa", e.target.value)}></input>
                        <span className="error">{errors["nazwa"]}</span>
                    </div>

                    <div className='haslo'>
                        <input type='password' placeholder='hasło' onChange={(e) => handleChange("haslo", e.target.value)} ></input>
                        <span className="error">{errors["haslo"]}</span>
                    </div>

                    <div className='przyciski'>
                        <div className={action === "Login" ? "submit " : "submit gray"} onClick={() => { setAction("Sign Up"); setErrors({}) }}>
                            Sign up
                        </div>

                        <div className={action === "Sign Up" ? "submit " : "submit gray"} onClick={() => { setAction("Login"); setErrors({}) }}>
                            Login
                        </div>
                        <button type="submit" id="submit" className="zatwierdz">
                            Zatwierdz
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}


