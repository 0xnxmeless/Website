import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../components/button";
import Svg404 from "../components/undraw/404";
import styles from "../styles/Error404.module.css";
import Head from "next/head";

const Error404: NextPage = () => {
    const router = useRouter();
    return (
        <div className={styles.root}>
            <Head>
                <title>Dominic Hoe - Error 404</title>
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
                    property="description"
                    content="Dominic Hoe: developer, enthusiast and creator"
                />
                <meta
                    property="twitter:description"
                    content="Dominic Hoe: developer, enthusiast and creator"
                />
                <meta property="og:title" content="Dominic Hoe - Error 404" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Svg404 />
            <h1>Page not found</h1>
            <p>This page doesn't exist. Return to the home page?</p>
            <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
    );
};

export default Error404;
