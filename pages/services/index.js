import {useState, useEffect} from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {  Card, Input, Select, Tags, Button, Table  } from 'components';
import styles from 'styles/pages/services.module.scss';
import { ReactSVG } from "react-svg";

export default function Services() {
    const [type, setType] = useState();
    const [tags, setTags] = useState([]);
    const [tableSearch, setTableSearch] = useState('');

    const offerColumns = [
        {
            key: 'service_id',
            title: 'Service Id',
            dataIndex: 'service_id',
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'service_type',
            title: 'Service Type',
            dataIndex: 'service_type',
        },
        {
            key: 'duration',
            title: 'Duration',
            dataIndex: 'duration',
        },
        {
            key: "actions",
            title: "",
            dataIndex: "actions",
            render: (record, key) => {
              return (
                    <div className={styles.tableActions}>
                        <ReactSVG src={"/images/icons/table/edit.svg"} className={styles.iconContainer}/>
                        <ReactSVG src={"/images/icons/table/delete.svg"} className={styles.iconContainer}/>
                    </div>
                );
            },
        },
    ];

    const analysisData = [
        {
            service_id: '758597122',
            name:'Anti-smooth muscle antibodies (ASMA)',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            service_id: '758597122',
            name:'Anti-Factor X | Activity',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            service_id:'758597122',
            name:'Group B streptococcal screening',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            service_id: '758597122',
            name:'Adenovirus | Antibodies',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            service_id: '758597122',
            name:'Aluminum | Al (blood)',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            service_id: '758597122',
            name:'Anti-U1RNP antibodies',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            service_id: '758597122',
            name:'Anti-U1RNP antibodies',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            service_id: '758597122',
            name:'Anti-U1RNP antibodies',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            service_id: '758597122',
            name:'Anti-U1RNP antibodies',
            service_type: 'In clinic',
            duration:'1000',
        }
    ];

    return (
        <div className={styles.servicesContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerTitle}
                >
                    <h2>Services</h2>
                </div>
                <div className={styles.headerBreadcrumbs}>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
            </div>

            <Card className={styles.servicesCard}>
                <div className={styles.servicesHeader}>
                    <h2>Add a service</h2>
                </div>
                <div className={styles.serviceInputsForm}>
                    <Input 
                        name="name"
                        id="name"
                        label="Name" 
                        className={styles.servInput}
                    />
                    <Select 
                        label="type"
                        labelStyle="outside"
                        className={styles.servInput}
                        options={[
                            {
                                label: "4140 Parker Rd. Allentown, New Mexico 31134",
                                value: "1",
                            },
                            { label: "Another Branch", value: "2" },
                            ]}
                        onChange={(value) => {
                            setType(value);
                        }}
                        value={type}
                    />
                    <Tags 
                        tags={tags}
                        setTags={setTags}
                        className={styles.servInput}
                        labelLayout='outside'
                        label='Tags'
                    />
                    <Button 
                        label="Add a service"
                        size="large" 
                        variant="fill"
                        className={styles.servInput}
                    />
                </div>
            </Card>

            <Card className={styles.servicesCard}>
                <div className={styles.servicesHeader}>
                    <h2>Services</h2>
                    <Input 
                        className={styles.searchBar}
                        name="search" 
                        id="search" 
                        onChange={(e)=> setTableSearch(e)}
                        value={tableSearch}
                        placeholder='Search'
                    />
                </div>

                <div className={styles.table}>                   
                    <Table
                        className={styles.table}
                        columns={offerColumns}
                        data={analysisData.filter((e)=> e.name.toLocaleLowerCase().includes(
                            tableSearch.toLocaleLowerCase()
                        ))}
                        rowClassName={styles.tableRow}
                        cellClassName={styles.tableCell}
                        headerClassName={styles.tableHeader}
                        bodyClassName={styles.tableBody}
                        pagination={{ pageSize: 8, initialPage: 1 }}
                    />
                </div>
            </Card>
        </div>
    )
}

Services.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>
}