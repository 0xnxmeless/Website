import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../components/user";
import styles from "../styles/Login.module.css";
import Head from "next/head";
import Navbar from "../components/navbar";

const Admin: NextPage = () => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push("/login");
    });
    return !user ? (
        <></>
    ) : (
        <div className={styles.container}>
            <Head>
                <title>Dominic Hoe - Admin Panel</title>
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
                <meta property="og:title" content="Dominic Hoe - Admin Panel" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <h1>Admin Panel</h1>
        </div>
    );
};

export default Admin;
