import React, { useState } from 'react'
import './Okno.css'
import '../login/Login.css'

export const Okno = ({ onToggleLogin }) => {
    const [action, setAction] = useState("Sign Up")
    const [inputText, setInputText] = useState("");
    const [encodedText, setEncodedText] = useState("");

    // 2. Define your logic functions here
    const handleEncode = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/encode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: inputText,
                    userId: 1  // You must send this number now!
                })
            });

            if (response.ok) {
                const result = await response.text();
                setEncodedText(result);
            }
        } catch (error) {
            console.error("Error connecting to backend:", error);
        }
    };
    
    function wlacz_login() {

        if (onToggleLogin) onToggleLogin();
    }
    return (



        <div className='kontener'>
            <div className='menu-login'>
                <button className='przycisk-login' onClick={wlacz_login}>Login</button>
            </div>

            <div className='inputs'>
                <div className='tekst-normalny'>

                    <textarea
                        rows={5}
                        cols={40}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder='Tekst do szyfrowania'

                    />

                </div>
                <div className='zatwierdz'>
                    <button
                        className='przycisk-zatwierdz'
                        onClick={handleEncode}
                    >
                        zatwierdz
                    </button>
                </div>
                <div className='tekst-szyfr'>
                    <textarea rows={5} cols={40} placeholder='Tekst zaszyfrowany'
                        value={encodedText}

                    />
                </div>

            </div>

            <div className='zatwierdzanie-danych'>
                <div className='lista-zapisanych'>
                    <select className='lista'>
                        <option>---</option>
                    </select>
                </div>
                <div className='zatwierdz-opcje-listy'>
                    <div className='przycisk-wczytaj'>wczytaj</div>
                </div>
            </div>



        </div>


    )
}

