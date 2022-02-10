import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const router = useRouter();
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
                    <div className={styles.navLinks}>
                        <Link href="/">Home</Link>
                        <Link href="/">Skills</Link>
                        <Link href="/">Projects</Link>
                        <Link href="/">Contacts</Link>
                        <Link href="/">Login</Link>
                    </div>
                </nav>
            </nav>
            <main className={styles.main}>
                <h1>Hello World!</h1>
                <p>My name's Dom, I work on backend web APIs and tinker with other web technologies from time to time.</p>
                <p>I'm 17 going on 18 and have particular interest in Docker, Kubernetes & ASP.NET.</p>
            </main>
        </div>
    );
};

export default Home;
