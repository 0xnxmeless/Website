import { ReactNode } from "react";
import styles from "./Button.module.css";

export type WithChildren<T = Record<string, unknown>> = T &
    Record<"children", ReactNode>;

type ButtonProps = {
    icon?: string;
    onClick?: any;
};

export default function Button({
    children,
    icon,
    onClick,
}: WithChildren<ButtonProps>) {
    return (
        <div className={styles.button} onClick={onClick}>
            {icon && <div className={styles.buttonIcon}>{icon}</div>}
            {children}
        </div>
    );
}
