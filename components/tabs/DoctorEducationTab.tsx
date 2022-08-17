import styles from "styles/components/Tabs/DoctorEducationTab.module.scss";
import { Card, Button, Table } from "components";
import { ReactSVG } from "react-svg";

interface Media {
    src: string;
    alt?: string;
}

interface Certificate {
    name: string;
    issuedBy: string;
    issuedAt: string;
    creditialId: string;
    creditialUri: string;
}

interface Education {
    school: string;
    degree: string;
    fieldsOfStudey: string;
    startDate: string;
    endDate: string;
    media: Media[];
}

interface DoctorEducationTabProps {
    className?: string;
    certificates?: Certificate[];
    education?: Education[];
}

const certificatesColumns = [
    {
        key: "name",
        title: "Name",
        dataIndex: "name",
    },
    {
        key: "issuedBy",
        title: "Issuing organization",
        dataIndex: "issuedBy",
    },
    {
        key: "issuedAt",
        title: "Issued date",
        dataIndex: "issuedAt",
    },
    {
        key: "creditialId",
        title: "Creditial ID",
        dataIndex: "creditialId",
    },
    {
        key: "creditialUri",
        title: "Creditial URL",
        dataIndex: "creditialUri",
    },
];

export default function DoctorEducationTab({
    certificates = [],
    education = [],
}: DoctorEducationTabProps) {
    return (
        <>
            <Card
                cardTitle="Certificates"
                cardActions={
                    <Button
                        label={"Add certificate"}
                        size="large"
                        variant="fill"
                        onClick={() => { }}
                    />
                }
            >
                <Table
                    columns={certificatesColumns}
                    data={certificates}
                    pagination={null}
                    rowClassName={styles.tableRow}
                    cellClassName={styles.tableCell}
                    headerClassName={styles.tableHeader}
                />
            </Card>
            <Card
                cardTitle="Education"
                cardActions={
                    <Button
                        label={"Add certificate"}
                        size="large"
                        variant="fill"
                        onClick={() => { }}
                    />
                }
            >
                <div className={styles.educationContainer}>
                    {education.map((educationItem) => (
                        <Card key={educationItem.school} className={styles.educationCard}>
                            <div className={styles.column}>
                                <div className={styles.title}>School</div>
                                <div className={styles.title}>Degree</div>
                                <div className={styles.title}>Fields of study</div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.value}>{educationItem.school}</div>
                                <div className={styles.value}>{educationItem.degree}</div>
                                <div className={styles.value}>
                                    {educationItem.fieldsOfStudey}
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.title}>Start date</div>
                                <div className={styles.title}>End date</div>
                                <div className={styles.title}>Media</div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.value}>{educationItem.startDate}</div>
                                <div className={styles.value}>{educationItem.endDate}</div>
                                <div className={styles.mediaValue}>
                                    {educationItem.media.map((mediaItem) => (
                                        <div key={mediaItem.alt} className={styles.media}>
                                            <ReactSVG
                                                src={"/images/icons/cards/camera.svg"}
                                                className={styles.icon}
                                            />
                                            <div className={styles.mediaText}>{mediaItem.alt}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </>
    );
}
