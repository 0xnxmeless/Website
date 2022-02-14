import styles from "./Navbar.module.css";
import { useUser } from "../user";
import {
    MdHome,
    MdSchool,
    MdWork,
    MdContacts,
    MdLock,
    MdAdminPanelSettings,
} from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import Link from "next/link";
import CustomLink from "../customLink";

export default function Navbar() {
    const { user } = useUser();
    const routes = [
        {
            path: "/",
            text: "Home",
            icon: <MdHome />,
        },
        {
            path: "/blog",
            text: "Blog",
            icon: <FaNewspaper />,
        },
        {
            path: "/skills",
            text: "Skills",
            icon: <MdSchool />,
        },
        {
            path: "/projects",
            text: "Projects",
            icon: <MdWork />,
        },
        {
            path: "/contacts",
            text: "Contacts",
            icon: <MdContacts />,
        },
    ];

    return (
        <>
            <nav className={styles.navRoot}>
                <div className={styles.navContainer}>
                    <div className={styles.navLinks}>
                        {routes.map((route, index) => (
                            <Link href={route.path} key={index}>
                                {route.text}
                            </Link>
                        ))}
                        {user ? (
                            <Link href="/admin">Admin Panel</Link>
                        ) : (
                            <Link href="/login">Login</Link>
                        )}
                    </div>
                </div>
            </nav>
            <nav className={styles.mobileNavContainer}>
                <div className={styles.mobileNavLinks}>
                    {routes.map((route, index) => (
                        <CustomLink
                            href={route.path}
                            icon={route.icon}
                            key={index}
                        >
                            {route.text}
                        </CustomLink>
                    ))}
                    {user ? (
                        <CustomLink
                            href="/admin"
                            icon={<MdAdminPanelSettings />}
                        >
                            Admin Panel
                        </CustomLink>
                    ) : (
                        <CustomLink href="/login" icon={<MdLock />}>
                            Login
                        </CustomLink>
                    )}
                </div>
            </nav>
        </>
    );
}
