import type { NextPage } from "next";
import type { CredentialProps } from "../api";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import Navbar from "../components/navbar";
import Input from "../components/input";
import { FaLock, FaLockOpen, FaUser } from "react-icons/fa";
import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";
import { useUser } from "../components/user";
import { useRouter } from "next/router";
import * as api from "../api";

const Login: NextPage = () => {
    const { user, setUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) router.push("/");
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Array<string>>([]);

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        login({ username, password });
    }

    const login = async ({ username, password }: CredentialProps) => {
        const data = await api.login({ username, password }).catch((err) => {
            if (err.response && err.response.data && err.response.data.errors)
                err.response.data.errors.map((error: string) =>
                    setErrors([...errors, error])
                );

            setTimeout(() => setErrors([]), 5000);
        });

        if (data.code == "LoginSuccess") {
            setUser(data.data);
            router.push("/admin");
        }
    };
    return user ? (
        <></>
    ) : (
        <div className={styles.container}>
            <Head>
                <title>Dominic Hoe - Login</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    property="og:description"
                    content="Dominic Hoe: developer, enthusiast and creator"
                />
                <meta
                    name="description"
                    content="Dominic Hoe: developer, enthusiast and creator"
                />
                <meta
                    property="twitter:description"
                    content="Dominic Hoe: developer, enthusiast and creator"
                />
                <meta property="theme-color" content="#14bee0" />
                <meta property="og:title" content="Dominic Hoe - Login" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    {errors.length > 0 ? (
                        <ul className={styles.errors}>
                            <p>The following errors occurred:</p>
                            {errors.map((error: string, index: number) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    ) : (
                        <></>
                    )}
                    <h1>Login</h1>
                    <form onSubmit={handleFormSubmit}>
                        <Input
                            value={username}
                            placeholder="Username"
                            startIcon={<FaUser />}
                            onChange={setUsername}
                            type="text"
                        />
                        <Input
                            value={password}
                            onChange={setPassword}
                            startIcon={<FaLock />}
                            placeholder="Password"
                            type="password"
                        />
                        <Button
                            icon={<FaLockOpen />}
                            disabled={!username || !password}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
