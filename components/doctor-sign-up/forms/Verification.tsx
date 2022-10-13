import { Button, Input, Select, Card, DatePicker } from 'components';
import { ReactSVG } from 'react-svg';
import styles from 'styles/pages/signup.module.scss';

export default function Verification() {
    return (
        <div className={styles.column}>
            <Card className={styles.card}>
                <div className={styles.verificationRow}>
                    <div className={styles.photoContainer}>
                        <img
                            alt=''
                            className={styles.verificationImage}
                            src="/images/signUp/passport.png"
                        />
                    </div>
                    <div className={styles.uploadBlock}>
                        <div className={styles.uploadText}>
                            Upload photo/scan of passport
                        </div>
                        <div className={styles.file}></div>
                        <Button
                            variant="fill"
                            size="large"
                            label="Downoald document"
                        />
                    </div>
                    <div className={styles.requirements}>
                        <ReactSVG
                            src="/images/signUp/information-circle.svg"
                            className={styles.iconConteiner}
                        />
                        Document requirements
                    </div>
                </div>
            </Card>
            <Card className={styles.card}>
                <div className={styles.verificationRow}>
                    <div className={styles.photoContainer}>
                        <img
                            alt=''
                            className={styles.verificationImage}
                            src="/images/signUp/diploma.png"
                        />
                    </div>
                    <div className={styles.uploadBlock}>
                        <div className={styles.uploadText}>
                            Upload photo/scan of diploma
                        </div>
                        <div className={styles.file}></div>
                        <Button
                            variant="fill"
                            size="large"
                            label="Downoald document"
                        />
                    </div>
                    <div className={styles.requirements}>
                        <ReactSVG
                            src="/images/signUp/information-circle.svg"
                            className={styles.iconConteiner}
                        />
                        Document requirements
                    </div>
                </div>
            </Card>
            <Card className={styles.card}>
                <div className={styles.verificationRow}>
                    <div className={styles.photoContainer}>
                        <img
                            alt=''
                            className={styles.verificationImage}
                            src="/images/signUp/license.png"
                        />
                    </div>
                    <div className={styles.uploadBlock}>
                        <div className={styles.uploadText}>
                            Upload photo/scan of license
                        </div>
                        <div className={styles.file}></div>
                        <Button
                            variant="fill"
                            size="large"
                            label="Downoald document"
                        />
                    </div>
                    <div className={styles.requirements}>
                        <ReactSVG
                            src="/images/signUp/information-circle.svg"
                            className={styles.iconConteiner}
                        />
                        Document requirements
                    </div>
                </div>
            </Card>
            <Card className={styles.card}>
                <div className={styles.verificationRow}>
                    <div className={styles.photoContainer}>
                        <img
                            alt=''
                            className={styles.verificationImage}
                            src="/images/signUp/expandedPhoto.png"
                        />
                    </div>
                    <div className={styles.uploadBlock}>
                        <div className={styles.uploadText}>
                            Upload an expanded passport photo
                        </div>
                        <div className={styles.file}></div>
                        <Button
                            variant="fill"
                            size="large"
                            label="Downoald document"
                        />
                    </div>
                    <div className={styles.requirements}>
                        <ReactSVG
                            src="/images/signUp/information-circle.svg"
                            className={styles.iconConteiner}
                        />
                        Document requirements
                    </div>
                </div>
            </Card>
        </div>
    );
};