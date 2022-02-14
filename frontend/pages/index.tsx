import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Button from "../components/button";
import { useUser } from "../components/user";

const Home: NextPage = () => {
    const router = useRouter();
    const { user } = useUser();
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
            <Navbar />
            <main className={styles.main}>
                <h1>
                    <code>console.log("Hello World!");</code>
                </h1>
                <p>
                    My name's Dom, I work on backend web APIs and tinker with
                    other web technologies from time to time.
                </p>
                <p>
                    I'm 17 going on 18 and have particular interest in Docker,
                    Kubernetes & ASP.NET.
                </p>
                <p>
                    Find out more about me, my projects and my range of skills
                    below. Enjoy your stay!
                </p>
                <Button>Learn More</Button>
            </main>
        </div>
    );
};

export default Home;
