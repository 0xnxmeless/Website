import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Dominic Hoe</title>
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
                <meta property="og:title" content="Dominic Hoe" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className={styles.navRoot}>
                <nav className={styles.navContainer}>
                    <div className={styles.navTitle}>
                        <h1>Dominic Hoe</h1>
                    </div>
                    <div className={styles.navLinks}>
                        <Link href="/">Home</Link>
                        <Link href="#about">About</Link>
                    </div>
                </nav>
            </nav>
            <main className={styles.main}>
                <h1>Hello! 👋</h1>
                <p>Welcome to my corner of the internet.</p>
                <div className={styles.buttons}></div>
            </main>
        </div>
    );
};

export default Home;
