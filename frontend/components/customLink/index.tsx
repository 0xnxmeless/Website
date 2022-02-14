import styles from "./CustomLink.module.css";
import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";

export type WithChildren<T = Record<string, unknown>> = T &
    Record<"children", ReactNode>;

type CustomLinkProps = {
    href?: any /* I didn't want to use this but TypeScript React was being weird. D: */;
    onClick?: MouseEventHandler<HTMLLIElement>;
    icon?: ReactElement;
};

export default function CustomLink({
    children,
    href,
    icon,
    onClick,
}: WithChildren<CustomLinkProps>) {
    const router = useRouter();
    return (
        <li
            className={styles.navLink}
            onClick={onClick ?? (() => router.push(href))}
        >
            {icon}
            {children}
        </li>
    );
}
