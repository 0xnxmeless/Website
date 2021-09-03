import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Ribbon from "../components/ribbon";

export default function Home() {
    return (
        <div>
			<Ribbon>
				<a href="https://github.com/Dominic-Hoe/Website">
					<FaGithub size={16} />
					Fork me on GitHub!
				</a>
			</Ribbon>
			<Head>
				<title>Dominic Hoe | Developer</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta
					property="og:description"
					content="I'm an experienced full stack web developer. I have experience with building a various array of apps. Check my website to learn more!"
				/>
				<meta
					property="twitter:description"
					content="I'm an experienced full stack web developer. I have experience with building a various array of apps. Check my website to learn more!"
				/>
				<meta property="theme-color" content="#FF6600" />
				<meta
					property="og:title"
					content="Dominic Hoe | Developer"
				/>
				<meta property="og:type" content="website" />
			</Head>
			{/* Navbar here */}

			<header className={styles.header}>
				<div className={styles.headerContent}>
					<img src="profile.jpg" />
					<h1>👋 Welcome to my website!</h1>
					<p>I&apos;m an experienced & passionate full stack web developer, and I have made a variety of different web apps in my past, ranging from React to Vue and even Angular.</p>
				</div>
				<div className={styles.socials}>
					<a href="https://github.com/Dominic-Hoe">
						<FaGithub size={32} />
					</a>
					<a href="https://instagram.com/domhoe__dev_">
						<FaInstagram size={32} />
					</a>
					<a href="https://twitter.com/DominicHoe1">
						<FaTwitter size={32} />
					</a>
				</div>
			</header>
		</div>
    );
}
