import { ReactNode } from "react";
import styles from "./Button.module.scss";

export type WithChildren<T = Record<string, unknown>> = T &
    Record<"children", ReactNode>;

type ButtonProps = {
    icon?: any;
    onClick?: any;
    disabled?: boolean;
    type?: "submit";
};

export default function Button({
    children,
    icon,
    disabled,
    onClick,
    type,
}: WithChildren<ButtonProps>) {
    return disabled ? (
        <button className={styles.disabledButton} disabled={true} type={type}>
            {icon && <div className={styles.buttonIcon}>{icon}</div>}
            {children}
        </button>
    ) : (
        <button className={styles.button} onClick={onClick} type={type}>
            {icon && <div className={styles.buttonIcon}>{icon}</div>}
            {children}
        </button>
    );
}
