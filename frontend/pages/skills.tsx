import type { NextPage } from "next";
import styles from "../styles/Skills.module.css";
import Head from "next/head";
import Navbar from "../components/navbar";

const Skills: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Dominic Hoe - Skills</title>
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
                <meta property="og:title" content="Dominic Hoe - Skills" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <h1>Skills</h1>
        </div>
    );
};

export default Skills;
