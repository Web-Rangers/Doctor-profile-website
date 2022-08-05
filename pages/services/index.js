import {useState, useEffect} from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {  Card, Input, Select, Tags, Button, TableServices, EditServiceModal, AddSubserviceModal, CheckBox  } from 'components';
import TableStyles from 'styles/components/TableWithDropdown.module.scss';
import styles from 'styles/pages/services.module.scss';
import { ReactSVG } from "react-svg";
import classNames from "classnames";

export default function Services() {
    const [type, setType] = useState();
    const [tags, setTags] = useState([]);
    const [tableSearch, setTableSearch] = useState('');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isSubModalOpen, setSubModalOpen] = useState(false);

    const offerColumns = [
        {
            key: 'check_box',
            title: '',
            dataIndex: 'check_box',
        },
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
            key: 'child_services',
            title: '',
            dataIndex: 'child_services',
            render: ()=> {
                return (
                    <div 
                        className={styles.childServices}
                        onClick={()=>setSubModalOpen(true)}
                    >
                        <ReactSVG
                            className={styles.plusBgn}
                            src='images/icons/inputs/plus.svg'
                        />
                        <span>chid service</span>
                    </div>
                )
            }
        },
        {
            key: "actions",
            title: "",
            dataIndex: "actions",
            render: (record, key) => {
              return (
                    <div className={styles.tableActions}>
                        <ReactSVG 
                            src={"/images/icons/table/edit.svg"} 
                            className={styles.iconContainer}
                            onClick={()=> setEditModalOpen(true)}
                        />
                        <ReactSVG src={"/images/icons/table/delete.svg"} className={styles.iconContainer}/>
                    </div>
                );
            },
        },
        {
            key: 'subServices',
            title:'',
            dataIndex: 'hidden',
        }
    ];

    const analysisData = [
        {
            check_box: '758597122',
            service_id: '758597122',
            name:'ServiceName1',
            service_type: 'In clinic',
            duration:'1000',
            subServices: [
            {
                id: 758597125,
                checkbox: false,
                title: 'SubserviceName3',
                status: 'Online',
                duration: 5781,
            },{
                id: 758597123,
                checkbox: false,
                title: 'SubserviceName2',
                status: 'Online',
                duration: 1281,
            },
        ]
        },
        {
            check_box: '758597232',
            service_id: '758597122',
            name:'ServiceName2',
            service_type: 'In clinic',
            duration:'1000',
            subServices: [
                {
                    id: 758591122,
                    checkbox: false,
                    title: 'SubserviceName3',
                    status: 'Online',
                    duration: 5781,
                }
            ]
        },
        {
            check_box: '758594122',
            service_id:'758597122',
            name:'ServiceName3',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            check_box: '758517122',
            service_id: '758597122',
            name:'ServiceName4',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            check_box: '758591122',
            service_id: '758597122',
            name:'ServiceName5',
            service_type: 'In clinic',
            duration:'1000',
            subServices: [
                {
                    id: 758597121,
                    checkbox: false,
                    title: 'SubserviceName3',
                    status: 'Online',
                    duration: 5781,
                },{
                    id: 758597192,
                    checkbox: false,
                    title: 'SubserviceName2',
                    status: 'Online',
                    duration: 1281,
                },
            ]
        },
        {
            check_box: '708597122',
            service_id: '758597122',
            name:'ServiceName6',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            check_box: '758547122',
            service_id: '758597122',
            name:'ServiceName7',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            check_box: '723597122',
            service_id: '758597122',
            name:'ServiceName8',
            service_type: 'In clinic',
            duration:'1000',
        },
        {
            check_box: '258597122',
            service_id: '758597122',
            name:'ServiceName8',
            service_type: 'In clinic',
            duration:'1000',
        }
    ];

    return (
        <div className={styles.servicesContainer}>
            {isEditModalOpen && 
            <EditServiceModal 
                onClose={()=>setEditModalOpen(false)}
                onCancel={()=>setEditModalOpen(false)}
            />}
            {
                isSubModalOpen &&
                <AddSubserviceModal 
                    onClose={()=> setSubModalOpen(false)}
                    onCancel={()=> setSubModalOpen(false)}
                />
            }
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
                    <div className={styles.inputWithFlags}>
                        <ReactSVG
                            className={styles.flag}
                            src="../images/icons/flags/GB.svg"
                        />
                        <Input 
                            className={styles.flagInput}
                            label='Services name in English'
                            placeholder='Enter name...'
                        />
                    </div>
                    <div className={styles.inputWithFlags}>
                        <ReactSVG
                            className={styles.flag}
                            src="../images/icons/flags/RU.svg"
                        />
                        <Input 
                            className={styles.flagInput}
                            label='Services name in Russian'
                            placeholder='Введите название...'
                        />
                    </div>
                    <div className={styles.inputWithFlags}>
                        <ReactSVG
                            className={styles.flag}
                            src="../images/icons/flags/GE.svg"
                        />
                        <Input 
                            className={styles.flagInput}
                            label='Services name in Georgian'
                            placeholder='შეიყვანეთ სათაური...'
                        />
                    </div>
                    <Select 
                        label="type"
                        labelStyle="outside"
                        className={classNames(styles.servInput, styles.servSelects)}
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
                        className={classNames(styles.servInput, styles.tagInput)}
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
                    <TableServices
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
                        detailedUrl={'/services/services_detailed'}
                    />
                </div>
            </Card>
        </div>
    )
}

Services.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>
}