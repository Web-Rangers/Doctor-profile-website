import {useState} from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {  Card, Input, Button, Table, CheckBox  } from 'components';
import styles from 'styles/pages/analysis.module.scss';
import { ReactSVG } from "react-svg";

export default function Analysis() {
    const offerColumns = [
        {
            key: 'analysis_id',
            title: 'Analysis Id',
            dataIndex: 'analysis_id',
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'popular',
            title: 'Popular',
            dataIndex: 'popular',
            render: (record, key) => {
                const id = Math.random(100);
                return (
                  <div className={styles.tableCheckbox}>
                    <CheckBox id={id} className={styles.checkbox} defaultChecked={record} />
                  </div>
                );
              },
        },
        {
            key: 'price',
            title: 'Price',
            dataIndex: 'price',
        },
        {
            key: "actions",
            title: "",
            dataIndex: "actions",
            render: (record, key) => {
              return (
                    <div className={styles.tableActons}>
                        <ReactSVG src={"/images/icons/table/edit.svg"} className={styles.iconContainer}/>
                        <ReactSVG src={"/images/icons/table/eye.svg"} className={styles.iconContainer}/>
                    </div>
                );
            },
        },
    ];

    const analysisData = [
        {
            analysis_id: '758597122',
            name:'Anti-smooth muscle antibodies (ASMA)',
            popular: true,
            price:'1000',
        },
        {
            analysis_id: '758597122',
            name:'Anti-Factor X | Activity',
            popular: false,
            price:'1000',
        },
        {
            analysis_id:'758597122',
            name:'Group B streptococcal screening',
            popular: false,
            price:'1000',
        },
        {
            analysis_id: '758597122',
            name:'Adenovirus | Antibodies',
            popular: true,
            price:'1000',
        },
        {
            analysis_id: '758597122',
            name:'Aluminum | Al (blood)',
            popular: false,
            price:'1000',
        },
        {
            analysis_id: '758597122',
            name:'Anti-U1RNP antibodies',
            popular: false,
            price:'1000',
        }
    ];

    return <>
        <div className={styles.analysisContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <h3>Analysis</h3>
                </div>
                <div className={styles.headerRight}>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
            </div>

            <Card className={styles.addAnalysis}>
                <div className={styles.header}>
                    <h2>Add an analysis</h2>
                </div>
                <div className={styles.addAnalysisform}>
                    <Input
                        name="name"
                        id="name"
                        label="Name" 
                        className={styles.defaultInput}
                        placeholder="Enter name..."
                    />
                    <Button label="Add an analysis" size="large" variant="fill" />
                </div>
            </Card>
            
            <Card styles={styles.analysisTableCard}>
                <div className={styles.table}>
                    <Table
                        className={styles.table}
                        columns={offerColumns}
                        data={analysisData}
                        rowClassName={styles.tableRow}
                        cellClassName={styles.tableCell}
                        headerClassName={styles.tableHeader}
                        bodyClassName={styles.tableBody}
                        pagination={{ pageSize: 8, initialPage: 1 }}
                        detailedUrl={'/analysis/analysis_detailed'}
                    />
                </div>
            </Card>
        </div>
    </>
}

Analysis.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>
}