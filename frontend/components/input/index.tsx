import styles from "./Input.module.css";

type InputProps = {
    value?: any;
    startIcon?: any;
    placeholder?: any;
    onChange?: any;
    type?: any;
};

const Input = ({
    value,
    startIcon,
    placeholder,
    onChange,
    type,
}: InputProps) => {
    return (
        <div className={styles.container}>
            {startIcon && <div className={styles.startIcon}>{startIcon}</div>}
            <div className={styles.input}>
                <input
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
        </div>
    );
};

export default Input;
