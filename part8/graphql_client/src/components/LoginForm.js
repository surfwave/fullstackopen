import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ setError, setToken }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message);
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem("phonenumbers-user-token", token)
        }
    }, [result.data]) // eslint-disable-line

    const submit = (event) => {
        event.preventDefault();

        login({variables: {username: name, password}});
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name: <input value={name} onChange={({target}) => setName(target.value)} />
                </div>
                <div>
                    password: <input type="password" value={password} onChange={({target}) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm;