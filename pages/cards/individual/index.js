import {useState} from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {Card, TableWithDropdowns, Button, DatePicker, Select, Input } from 'components';
import { ReactSVG } from "react-svg";
import TableStyles from 'styles/components/TableWithDropdown.module.scss';
import styles from 'styles/pages/individualCard.module.scss';
import classNames from "classnames";

export default function CorporateCards() {
    const [filterIsOpen, setFilterOpen] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [cardType, setCardType] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const columns = [
        {
            key: "order_id",
            title: "Order Id",
            dataIndex: "order_id",
            render: (record, key) => {
                return (
                      <div className={styles.group}>
                        <ReactSVG
                            className={classNames(styles.arrow, TableStyles.arrow)}
                            src={"/images/icons/table/arrow.svg"}
                        />
                        <div>
                            <span>{record.id}</span>
                            <span>{record.name}</span>
                        </div>
                      </div>
                  );
            },
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (record, key) => {
                return (
                    
                    <div>
                        <span 
                            className={classNames(styles.statusBtn, {
                                [styles.inprogress]: (record == 'In progress'),
                                [styles.done]: (record == 'Done'),
                                [styles.waiting]: (record == 'Waiting for approval'),
                                [styles.canceled]: (record == 'Canceled'),
                              })}
                        >
                            {record}
                        </span>
                    </div>
                )
            }
        },
        {
            key: "doctor_id",
            title: "Doctor id",
            dataIndex: "doctor_id",
            render: (record, key) => {
                return (
                      <div className={styles.tableGroup}>
                          <span>{record.id}</span>
                          <span>{record.name}</span>
                      </div>
                  );
            },
        },
        {
            key: "service",
            title: "Service",
            dataIndex: "service",
        },
        {
            key: "clinic",
            title: "Clinic",
            dataIndex: "clinic",
        },
        {
            key: "create_date",
            title: "Create date",
            dataIndex: "create_date",
        },
        {
            key: "schedule_date",
            title: "Schedule date",
            dataIndex: "schedule_date",
        },
        {
            key: "price",
            title: "Price",
            dataIndex: "price",
        },
        {
            key: "actions",
            title: "",
            dataIndex: "actions",
            render: (record, key) => {
              return (
                    <div className={styles.tableActons}>
                        <ReactSVG 
                            onClick={()=>setModalOpen(!isModalOpen)}
                            src={"/images/icons/table/edit.svg"} 
                            className={styles.iconContainer}
                        />
                        <ReactSVG src={"/images/icons/table/eye.svg"} className={styles.iconContainer}/>
                    </div>
                );
            },
        },
        {
            key: "patient_name",
            title: "Patient name",
            dataIndex: "hidden",
        },
        {
            key: "doctor_name",
            title: "Doctor name",
            dataIndex: "hidden",
        },
        {
            key: "labels",
            title: "Labels",
            dataIndex: "hidden",
            form: 'array_boxes'
        },
        {
            key: "patient_id",
            title: "Patient Id",
            dataIndex: "hidden",
        },
        {
            key: "doctor_service_id",
            title: "Doctor Service id",
            dataIndex: "hidden",
        },
        {
            key: "platform_commission",
            title: "Platform Commission",
            dataIndex: "hidden",
        },
        {
            key: "patient_phone_number",
            title: "Patient phone number",
            dataIndex: "hidden",
        },
        {
            key: "doctors_commission",
            title: "Doctor's Commission",
            dataIndex: "hidden",
        },
        {
            key: "review",
            title: "Review",
            dataIndex: "hidden",
            form: 'review'
        },
        {
            key: "card_type",
            title: "Card type",
            dataIndex: "hidden",
        }
    ];
    const data = [
        {
            order_id: {
                id: 2141345566,
                name: 'Cody Fisher'
            },
            status: 'In progress',
            doctor_id: {
                id: 2141345566,
                name: 'Robert Fox'
            },
            service: 'Online',
            clinic: 'Medical house',
            create_date: '19.09.2022',
            schedule_date: '14.04.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            doctor_name: 'Brooklyn Simmons',
            labels: ['Medicine', 'Dentist'],
            patient_id: 2141345566,
            doctor_service_id: 547865895,
            platform_commission: 156,
            patient_phone_number: `(+33)7 35 55 31 15`,
            doctors_commission: 100,
            review: 4.7,
            card_type: 'Gold'
        },
        {
            order_id: {
                id: 2141345566,
                name: 'Cody Fisher'
            },
            status: 'In progress',
            doctor_id: {
                id: 2141345566,
                name: 'Robert Fox'
            },
            service: 'Online',
            clinic: 'Medical house',
            create_date: '19.09.2022',
            schedule_date: '14.04.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            doctor_name: 'Brooklyn Simmons',
            labels: ['Medicine', 'Dentist'],
            patient_id: 2141345566,
            doctor_service_id: 547865895,
            platform_commission: 156,
            patient_phone_number: `(+33)7 35 55 31 15`,
            doctors_commission: 100,
            review: 4.7,
            card_type: 'Gold'
        },
        {
            order_id: {
                id: 2141345566,
                name: 'Cody Fisher'
            },
            status: 'In progress',
            doctor_id: {
                id: 2141345566,
                name: 'Robert Fox'
            },
            service: 'Online',
            clinic: 'Medical house',
            create_date: '19.09.2022',
            schedule_date: '14.04.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            doctor_name: 'Brooklyn Simmons',
            labels: ['Medicine', 'Dentist'],
            patient_id: 2141345566,
            doctor_service_id: 547865895,
            platform_commission: 156,
            patient_phone_number: `(+33)7 35 55 31 15`,
            doctors_commission: 100,
            review: 4.7,
            card_type: 'Gold'
        },
        {
            order_id: {
                id: 2141345566,
                name: 'Cody Fisher'
            },
            status: 'In progress',
            doctor_id: {
                id: 2141345566,
                name: 'Robert Fox'
            },
            service: 'Online',
            clinic: 'Medical house',
            create_date: '19.09.2022',
            schedule_date: '14.04.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            doctor_name: 'Brooklyn Simmons',
            labels: ['Medicine', 'Dentist'],
            patient_id: 2141345566,
            doctor_service_id: 547865895,
            platform_commission: 156,
            patient_phone_number: `(+33)7 35 55 31 15`,
            doctors_commission: 100,
            review: 4.7,
            card_type: 'Gold'
        },
        {
            order_id: {
                id: 2141345566,
                name: 'Cody Fisher'
            },
            status: 'In progress',
            doctor_id: {
                id: 2141345566,
                name: 'Robert Fox'
            },
            service: 'Online',
            clinic: 'Medical house',
            create_date: '19.09.2022',
            schedule_date: '14.04.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            doctor_name: 'Brooklyn Simmons',
            labels: ['Medicine', 'Dentist'],
            patient_id: 2141345566,
            doctor_service_id: 547865895,
            platform_commission: 156,
            patient_phone_number: `(+33)7 35 55 31 15`,
            doctors_commission: 100,
            review: 4.7,
            card_type: 'Gold'
        },
        {
            order_id: {
                id: 2141345566,
                name: 'Cody Fisher'
            },
            status: 'In progress',
            doctor_id: {
                id: 2141345566,
                name: 'Robert Fox'
            },
            service: 'Online',
            clinic: 'Medical house',
            create_date: '19.09.2022',
            schedule_date: '14.04.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            doctor_name: 'Brooklyn Simmons',
            labels: ['Medicine', 'Dentist'],
            patient_id: 2141345566,
            doctor_service_id: 547865895,
            platform_commission: 156,
            patient_phone_number: `(+33)7 35 55 31 15`,
            doctors_commission: 100,
            review: 4.7,
            card_type: 'Gold'
        },
    ];
    const familyMembers = [
        {
            name: 'Theresa Webb',
            card: 'Gold card'
        },{
            name: 'Leslie Alexander',
            card: 'Gold card'
        },{
            name: 'Theresa Webb',
            card: 'Gold card'
        },
    ]

    return <>
        <div className={styles.cardsContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerTitle}
                >
                    <h2>Individual card</h2>
                </div>
                <div className={styles.headerBreadcrumbs}>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
            </div>

            <Card className={styles.ind_card}>
                <div className={styles.ind_block}>
                    <div>
                        <h2>Ronald Richards</h2>
                    </div>
                </div>

                <div className={styles.ind_table}>
                    <div>
                        <h2>Type card</h2>
                        <span>Silver</span>
                    </div>
                    <div>
                        <h2>Card Id</h2>
                        <span>123456789</span>
                    </div>
                    <div>
                        <h2>Expiration date</h2>
                        <span>11.02.2022</span>
                    </div>
                    <div>
                        <h2>Date of purchase</h2>
                        <span>14.12.2022</span>
                    </div>
                    <div>
                        <h2>Price</h2>
                        <span>123</span>
                    </div>
                </div>
            </Card>

            <div className={styles.cardFamily}>
                <Card className={styles.cardInfo}>
                    <h2 className={styles.cardTitle}>Card info</h2>
                    <div>
                        <h2>Buffer</h2>
                        <span>3 days</span>
                    </div>
                    <div>
                        <h2>Card type</h2>
                        <span>Individual</span>
                    </div>
                    <div>
                        <h2>Status</h2>
                        <span>Individual</span>
                    </div>
                    <div>
                        <h2>Promotion</h2>
                        <span>Normal</span>
                    </div>
                </Card>
                <Card className={styles.familyMembers}>
                    <h2 className={styles.cardTitle}>Family members</h2>
                    {
                        familyMembers?.length > 0 ?
                        <div>
                            <div className={styles.familyItems}>
                                {familyMembers?.map((member)=>{
                                    return (
                                        <div className={styles.memberBlock}>
                                            <h2>{member.name}</h2>
                                            <h4>{member.card}</h4>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.addFamilyMember}>+Add family member</div>
                        </div>
                        :
                        <div className={styles.noLinkedCards}>
                            <h2>No linked cards</h2>
                            <Button 
                                label="Add card"
                                variant="fill"
                                size="large"
                            />
                        </div>
                    }
                </Card>
            </div>
            
            <Card>
                <div className={styles.actionsRow}>
                    <h2>Сard orders</h2>
                    <div className={styles.cardOrderTool}>
                        <div
                            className={styles.searchContainer}
                            onClick={() => {
                                document
                                    .getElementById("search-input")
                                    ?.focus();
                            }}
                        >
                            <ReactSVG
                                src={"/images/icons/inputs/search.svg"}
                                className={styles.searchImg}
                            />
                            <input
                                id="search-input"
                                className={styles.searchInput}
                                type="text"
                                placeholder="Search"
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="large"
                            label="Filter"
                            icon={
                                <ReactSVG
                                    src="/images/icons/inputs/filter.svg"
                                    className={classNames(
                                        styles.iconContainer,
                                        styles.activeFilter
                                    )}
                                />
                            }
                            onClick={()=> setFilterOpen(!filterIsOpen)}
                        />
                        <div className={classNames(styles.filterContainer, {
                            [styles.filterOpen]: filterIsOpen,
                        })}>
                            <div className={styles.filterBlock}>
                                <div className={styles.filterSelectors}>
                                    <DatePicker
                                        mode="single"
                                        label="Create date"
                                        className={styles.servInput}
                                    />
                                    <DatePicker
                                        mode="single"
                                        label="Schedule date"
                                        className={styles.servInput}
                                    />
                                    <Select 
                                        label="City"
                                        labelStyle="outside"
                                        className={styles.servInput}
                                        options={[
                                            {
                                                label: "4140 Parker Rd",
                                                value: "1",
                                            },
                                            { label: "Another Branch", value: "2" },
                                            ]}
                                        onChange={(value) => {
                                            setCity(value);
                                        }}
                                    />
                                    <Select 
                                        label="Category"
                                        labelStyle="outside"
                                        className={styles.servInput}
                                        options={[
                                            {
                                                label: "4140 Parker Rd",
                                                value: "1",
                                            },
                                            { label: "Another Branch", value: "2" },
                                            ]}
                                        onChange={(value) => {
                                            setCategory(value);
                                        }}
                                    />
                                    <Select 
                                        label="Clinic"
                                        labelStyle="outside"
                                        className={styles.servInput}
                                        options={[
                                            {
                                                label: "4140 Parker Rd",
                                                value: "1",
                                            },
                                            { label: "Another Branch", value: "2" },
                                            ]}
                                        onChange={(value) => {
                                            setClinic(value);
                                        }}
                                    />
                                    <Select 
                                        label="Branch"
                                        labelStyle="outside"
                                        className={styles.servInput}
                                        options={[
                                            {
                                                label: "4140 Parker Rd",
                                                value: "1",
                                            },
                                            { label: "Another Branch", value: "2" },
                                            ]}
                                        onChange={(value) => {
                                            setBranch(value);
                                        }}
                                    />
                                    <Select 
                                        label="Doctors"
                                        labelStyle="outside"
                                        className={styles.servInput}
                                        options={[
                                            {
                                                label: "4140 Parker Rd",
                                                value: "1",
                                            },
                                            { label: "Another Branch", value: "2" },
                                            ]}
                                        onChange={(value) => {
                                            setDoctors(value);
                                        }}
                                    />
                                    <div className={styles.selects}>
                                        <h2>Service type</h2>
                                        <div>
                                            <Button
                                                label="Silver"
                                                variant="outline"
                                                size="large"
                                                className={styles.filterBtn}
                                                selected={serviceType === 'silver'}
                                                onClick={() =>
                                                    setServiceType('silver')
                                                }
                                            />
                                            <Button
                                                label="Gold"
                                                variant="outline"
                                                size="large"
                                                className={styles.filterBtn}
                                                selected={serviceType === 'gold'}
                                                onClick={() =>
                                                    setServiceType('gold')
                                                }
                                            />
                                            <Button
                                                label="Platinum"
                                                variant="outline"
                                                size="large"
                                                className={styles.filterBtn}
                                                selected={serviceType === 'platinum'}
                                                onClick={() =>
                                                    setServiceType('platinum')
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.selects}>
                                        <h2>Card types</h2>
                                        <div>
                                            <Button
                                                label="Silver"
                                                variant="outline"
                                                size="large"
                                                className={styles.filterBtn}
                                                selected={cardType === 'silver'}
                                                onClick={() =>
                                                    setCardType('silver')
                                                }
                                            />
                                            <Button
                                                label="Gold"
                                                variant="outline"
                                                size="large"
                                                className={styles.filterBtn}
                                                selected={cardType === 'gold'}
                                                onClick={() =>
                                                    setCardType('gold')
                                                }
                                            />
                                            <Button
                                                label="Platinum"
                                                variant="outline"
                                                size="large"
                                                className={styles.filterBtn}
                                                selected={cardType === 'platinum'}
                                                onClick={() =>
                                                    setCardType('platinum')
                                                }
                                            />
                                        </div>
                                    </div>
                                    <Select 
                                        label="Status"
                                        labelStyle="outside"
                                        className={styles.servInput}
                                        options={[
                                            {
                                                label: "4140 Parker Rd",
                                                value: "1",
                                            },
                                            { label: "Another Branch", value: "2" },
                                            ]}
                                        onChange={(value) => {
                                            setStatus(value);
                                        }}
                                    />
                                    <Select 
                                        label="Labels"
                                        labelStyle="outside"
                                        className={styles.servInput}
                                        options={[
                                            {
                                                label: "4140 Parker Rd",
                                                value: "1",
                                            },
                                            { label: "Another Branch", value: "2" },
                                            ]}
                                        onChange={(value) => {
                                            setLabels(value);
                                        }}
                                    />
                                    <div className={styles.minMax}>
                                        <h2>Price</h2>
                                        <div>                                        
                                            <Input
                                                className={styles.intervalInput}
                                                value={min}
                                                onChange={(value) => setMin(value)}
                                                defaultValue={min}
                                            />
                                            <div className={styles.divider} />
                                            <Input
                                                className={styles.intervalInput}
                                                value={max}
                                                onChange={(value) => setMax(value)}
                                                defaultValue={max}
                                            />
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className={styles.filterBtns}>
                                <Button
                                    label="Reset filter"
                                    className={styles.resetButton}
                                    size="large"
                                    variant="text"
                                    icon={
                                        <ReactSVG
                                            src="/images/icons/inputs/reset.svg"
                                            className={styles.iconContainer}
                                        />
                                    }
                                />
                                <Button label="Apply" size="large" variant="fill" />
                            </div>
                        </div>
                    </div>
                </div>    

                <TableWithDropdowns
                    columns={columns}
                    data={data}
                    className={styles.table}
                    rowClassName={styles.tableRow}
                    cellClassName={styles.tableCell}
                    headerClassName={styles.tableHeader}
                    bodyClassName={styles.tableBody}
                    pagination={{ pageSize: 10, initialPage: 1 }}
                    dropdownClassname={styles.dropDwn}
                />
            </Card>
        </div>
    </>
}

CorporateCards.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>
}