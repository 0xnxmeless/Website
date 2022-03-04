import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import Navbar from "../components/navbar";
import Input from "../components/input";
import { FaLock, FaLockOpen, FaUser } from "react-icons/fa";
import { useState } from "react";
import Button from "../components/button";

const Login: NextPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
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
                    <h1>Login</h1>
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
                    <Button icon={<FaLockOpen />}>Login</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
