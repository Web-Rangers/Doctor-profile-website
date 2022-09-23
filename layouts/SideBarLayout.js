import Navigation from "components/Navigation";
import styles from "styles/layouts/SideBarLayout.module.css";

export default function SideBarLayout({ children }) {
    return (
        <div className={styles.page}>
            <div className={styles.whiteArea}></div>
            <div className={styles.container}>
                <div className={styles.navigationArea}>
                    <Navigation />
                </div>
                <div className={styles.pageArea}>
                    {children}
                </div>
            </div>
        </div>
    )
}