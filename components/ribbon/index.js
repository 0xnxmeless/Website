import styles from "./Ribbon.module.css";

const Ribbon = (props) => (
    <div className={styles.ribbon}>
        {props.children}
    </div>
);

export default Ribbon;