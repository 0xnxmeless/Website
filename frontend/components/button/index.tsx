import { ReactNode } from "react";
import styles from "./Button.module.scss";

export type WithChildren<T = Record<string, unknown>> = T &
    Record<"children", ReactNode>;

type ButtonProps = {
    icon?: any;
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
