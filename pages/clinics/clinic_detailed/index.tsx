import { ReactSVG } from 'react-svg';
import ReactSelect from 'react-select';
import Card from '../../../components/Card';
import OfferCard from '../../../components/OfferCard';
import StarRatings from 'react-star-ratings';
import Table from '../../../components/Table';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import SideBarLayout from '../../../layouts/SideBarLayout';
import tabStyles from '../../../styles/components/Tabs.module.scss';
import styles from '../../../styles/pages/clinic_detailed.module.scss';
import tableStyles from '../../../styles/components/Table.module.css';
import Breadcrumbs from 'nextjs-breadcrumbs';
import classNames from 'classnames';
import StuffCard from '../../../components/StuffCard';
import GalleryCard from '../../../components/GalleryCard';
import { useState } from 'react';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import ClinicModal from '../../../components/BranchModal';

interface ActionProps {
    icon?: string;
    onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
    <ReactSVG src={icon} onClick={onClick}></ReactSVG>
);

const BranchActions = () => {
    const options = [
        {
            value: '1',
            label: 'Services',
        },
        {
            value: '2',
            label: 'Ohther options',
        },
    ];
    return (
        <div className={styles.branchActions}>
            <button className={styles.reset}>
                <ReactSVG
                    src="/images/icons/inputs/reset.svg"
                    className={styles.iconContainer}
                />
                <span>Reset filter</span>
            </button>
            <ReactSelect
                options={options}
                className={styles.filter}
            ></ReactSelect>
            <button className={styles.add}>Add branch</button>
        </div>
    );
};

interface GalleryActionsProps {
    isEdit?: boolean;
    onEdit?: () => void;
    onAdd?: () => void;
    onDelete?: () => void;
}

const GalleryActions = ({
    onEdit,
    onAdd,
    isEdit,
    onDelete,
}: GalleryActionsProps) => {
    return (
        <div className={styles.branchActions}>
            <button className={styles.edit} onClick={onEdit}>
                {isEdit ? 'Cancel' : 'Edit'}
            </button>
            <button className={styles.add} onClick={isEdit ? onDelete : onAdd}>
                {isEdit ? 'Delete' : 'Add photo'}
            </button>
        </div>
    );
};

const OfferActions = () => {
    return (
        <div className={styles.branchActions}>
            <button className={styles.add}>Add branch</button>
        </div>
    );
};

const StuffActions = () => {
    return (
        <div className={styles.branchActions}>
            <div
                className={styles.searchContainer}
                onClick={() => {
                    document.getElementById('search-input')?.focus();
                }}
            >
                <ReactSVG
                    src={'/images/icons/inputs/search.svg'}
                    className={classNames(
                        styles.searchImg,
                        styles.iconContainer
                    )}
                />
                <input
                    id="search-input"
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search"
                />
            </div>
            <button className={styles.add}>Add doctor</button>
        </div>
    );
};

const branchColumns = [
    {
        key: 'city',
        title: 'City',
        dataIndex: 'city',
    },
    {
        key: 'address',
        title: 'Address',
        dataIndex: 'address',
    },
    {
        key: 'contact',
        title: 'Contact',
        dataIndex: 'contact',
    },
    {
        key: 'branchId',
        title: 'Branch Id',
        dataIndex: 'branchId',
    },
    {
        key: 'workingHours',
        title: 'Working hours',
        dataIndex: 'workingHours',
    },
    {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        headerStyle: {
            justifyContent: 'center',
        },
        render: (status, key) => {
            return (
                <div className={tableStyles.tableStatusCellTemplate} key={key}>
                    <div
                        className={`${tableStyles.tableStatus} ${
                            status
                                ? tableStyles.statusOpen
                                : tableStyles.statusClose
                        }`}
                    >
                        {status ? 'Open' : 'Close'}
                    </div>
                </div>
            );
        },
    },
];

const branches = [
    {
        city: 'Tbilisi',
        address: '7 Simon Chikovani St',
        contact: '947 536 759',
        branchId: '896568984605',
        workingHours: '10:30-17:00',
        status: true,
    },
    {
        city: 'Tbilisi',
        address: '14 Merab Aleksidze St',
        contact: '386 904 204',
        branchId: '476097356897',
        workingHours: '11:30-18:00',
        status: false,
    },
    {
        city: 'Batumi',
        address: '7 Simon Chikovani St',
        contact: '702 942 424',
        branchId: '0757462129067',
        workingHours: '09:30-16:00',
        status: true,
    },
    {
        city: 'Tbilisi',
        address: '30b Mikheil Chiaureli St',
        contact: '104 794 209',
        branchId: '7082453675100',
        workingHours: '08:00-17:00',
        status: true,
    },
    {
        city: 'Kutaisi',
        address: '8 Simon Chikovani St',
        contact: '573 673 367',
        branchId: '707005790797',
        workingHours: '07:30-18:00',
        status: false,
    },
    {
        city: 'Akhaltsikhe',
        address: '11 Simon Chikovani St',
        contact: '865 234 056',
        branchId: '896568984605',
        workingHours: '12:00-16:00',
        status: true,
    },
];

const clinicData = {
    email: 'MedHouse@gmail.com',
    phone: '480-555-0103',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    time: '11:00-19:00',
    registrationDate: '01.01.2001',
    about: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.  Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
};

export default function ClinicDetailed() {
    const [galleryIsEditing, setGalleryIsEditing] = useState(false);
    const [stuffModalIsOpen, setStuffModalIsOpen] = useState(false);
    const [clinicEdtModalIsOpen, setClinicEdtModalIsOpen] = useState(false);
    return (
        <>
            {clinicEdtModalIsOpen && (
                <ClinicModal
                    data={clinicData}
                    onClose={() => setClinicEdtModalIsOpen(false)}
                    onSave={(newData) => {
                        console.log(newData);
                        setClinicEdtModalIsOpen(false);
                    }}
                    onCancel={() => setClinicEdtModalIsOpen(false)}
                />
            )}
            {stuffModalIsOpen && (
                <Modal onBackClick={() => setStuffModalIsOpen(false)}>
                    <span className={styles.modalText}>
                        Are you sure you want to remove this doctor?
                    </span>
                    <div className={styles.modalActions}>
                        <button
                            className={classNames(
                                styles.modalAction,
                                styles.edit
                            )}
                            onClick={() => setStuffModalIsOpen(false)}
                        >
                            Cnacel
                        </button>
                        <button
                            className={classNames(
                                styles.modalAction,
                                styles.add
                            )}
                            onClick={() => setStuffModalIsOpen(false)}
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            )}
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h3>Clinics</h3>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
                <div className={styles.pageBody}>
                    <div className={styles.row}>
                        <div className={styles.colSmall}>
                            <Card className={styles.smallCard}>
                                <img
                                    src={
                                        '/images/icons/clinics/medicalhouse.png'
                                    }
                                    className={styles.clinicIcon}
                                />
                                <div className={styles.clinicName}>
                                    Medical House
                                </div>
                                <div className={styles.clinicRating}>
                                    <StarRatings
                                        rating={4}
                                        starRatedColor="#FFC14E"
                                        numberOfStars={5}
                                        starDimension="15px"
                                        starSpacing="2.5px"
                                        className={styles.rating}
                                    ></StarRatings>
                                    <span className={styles.clinicRatingCount}>
                                        4
                                    </span>
                                    <span
                                        className={styles.clinicRatingDelimiter}
                                    >
                                        /
                                    </span>
                                    <span className={styles.clinicRatingMax}>
                                        5
                                    </span>
                                </div>
                                <div className={styles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/clock.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span className={styles.clinicInfText}>
                                        10:00-20:00
                                    </span>
                                </div>
                                <div className={styles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/phone.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span className={styles.clinicInfText}>
                                        480-555-0103
                                    </span>
                                </div>
                                <div className={styles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/location.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span className={styles.clinicInfText}>
                                        4140 Parker Rd. Allentown, New Mexico
                                        31134
                                    </span>
                                </div>
                            </Card>
                        </div>
                        <div className={styles.colLarge}>
                            <Card
                                cardTitle="Detailded information"
                                cardActions={
                                    <EditAction
                                        icon="/images/icons/inputs/edit.svg"
                                        onClick={() =>
                                            setClinicEdtModalIsOpen(true)
                                        }
                                    />
                                }
                            >
                                <div className={styles.dataRow}>
                                    <div className={styles.dataIndex}>
                                        E-mail
                                    </div>
                                    <div className={styles.dataValue}>
                                        MedHouse@gmail.com
                                    </div>
                                </div>
                                <div className={styles.dataRow}>
                                    <div className={styles.dataIndex}>
                                        Amount of orders
                                    </div>
                                    <div className={styles.dataValue}>128</div>
                                </div>
                                <div className={styles.dataRow}>
                                    <div className={styles.dataIndex}>
                                        Registration date
                                    </div>
                                    <div className={styles.dataValue}>
                                        05.11.2018
                                    </div>
                                </div>
                                <div className={styles.dataRow}>
                                    <div className={styles.dataIndex}>
                                        E-mail
                                    </div>
                                    <div className={styles.dataValue}>
                                        MedHouse@gmail.com
                                    </div>
                                </div>
                                <div className={styles.dataRow}>
                                    <div className={styles.dataIndex}>
                                        About clinic
                                    </div>
                                    <div className={styles.dataValue}>
                                        Amet minim mollit non deserunt ullamco
                                        est sit aliqua dolor do amet sint. Velit
                                        officia consequat duis enim velit
                                        mollit. Velit officia consequat duis
                                        enim velit mollit. Amet minim mollit non
                                        deserunt ullamco est sit aliqua dolor do
                                        amet sint. Amet minim
                                    </div>
                                </div>
                                <div
                                    className={classNames(
                                        styles.dataRow,
                                        styles.noMargin
                                    )}
                                >
                                    <div className={styles.dataIndex}></div>
                                    <div className={styles.dataValue}>
                                        <button className={styles.textButton}>
                                            See all
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className={styles.tabContainer}>
                        <Tabs>
                            <TabList className={tabStyles.tabList}>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="1"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/branch.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span>Branches</span>
                                </Tab>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="2"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/offer.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span>Offers</span>
                                </Tab>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="3"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/stuff.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span>Stuff</span>
                                </Tab>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="4"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/gallery.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span>Photo gallery</span>
                                </Tab>
                            </TabList>
                            <TabPanel className={tabStyles.tabPanel}>
                                <Card
                                    cardTitle="Branches"
                                    cardActions={<BranchActions />}
                                >
                                    <Table
                                        columns={branchColumns}
                                        data={branches}
                                        pagination={false}
                                        rowClassName={styles.tableRow}
                                    ></Table>
                                </Card>
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <Card
                                    cardTitle="Offers"
                                    cardActions={<OfferActions />}
                                >
                                    <div className={styles.cardContainer}>
                                        {Array.from(new Array(5).keys()).map(
                                            (i) => (
                                                <OfferCard
                                                    key={'offer' + i}
                                                    title="15.06.2022 - 06.06.2022"
                                                    className={styles.offerCard}
                                                >
                                                    <div
                                                        className={styles.title}
                                                    >
                                                        {i !== 1 &&
                                                            'First visit: free!'}
                                                        {i === 1 &&
                                                            'Second visit: freeeee freeeeeeee!'}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.description
                                                        }
                                                    >
                                                        Amet minim mollit non
                                                        deserunt ullamco est sit
                                                        aliqua dolor do amet
                                                        sint. Velit officia
                                                        consequat duis enim
                                                        velit mollit.
                                                        Exercitation veniam
                                                        consequat sunt nostrud
                                                        amet.
                                                    </div>
                                                    <div
                                                        className={styles.type}
                                                    >
                                                        Silver card
                                                    </div>
                                                </OfferCard>
                                            )
                                        )}
                                    </div>
                                </Card>
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <Card
                                    cardTitle="Stuff"
                                    cardActions={<StuffActions />}
                                >
                                    <div className={styles.stuffCardContainer}>
                                        {Array.from(new Array(5).keys()).map(
                                            (i) => (
                                                <StuffCard
                                                    key={'stuff' + i}
                                                    data={{
                                                        icon: '/images/icons/stuff/stuff1.png',
                                                        address:
                                                            '11 Simon Chikovani St',
                                                        amountOfOrders: 143,
                                                        city: 'Akhaltsikhe',
                                                        clinic: 'Medical House',
                                                        description:
                                                            'Dentist•Clinic doctor',
                                                        gender: 'Male',
                                                        name: 'Brooklyn Simmons',
                                                        rating: 4.7,
                                                        registrationDate:
                                                            '04.11.2017',
                                                    }}
                                                    onDelete={() => {
                                                        setStuffModalIsOpen(
                                                            true
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                </Card>
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <Card
                                    cardTitle="Photo gallery"
                                    cardActions={
                                        <GalleryActions
                                            onEdit={() => {
                                                setGalleryIsEditing(
                                                    !galleryIsEditing
                                                );
                                            }}
                                            isEdit={galleryIsEditing}
                                        />
                                    }
                                >
                                    <div
                                        className={styles.galleryCardContainer}
                                    >
                                        {Array.from(new Array(6).keys()).map(
                                            (i) => (
                                                <GalleryCard
                                                    id={'gallery' + i}
                                                    key={'gallery' + i}
                                                    src={
                                                        '/images/gallery/photo' +
                                                        (i + 1) +
                                                        '.png'
                                                    }
                                                    className={
                                                        styles.galleryCard
                                                    }
                                                    isEdit={galleryIsEditing}
                                                />
                                            )
                                        )}
                                    </div>
                                </Card>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

ClinicDetailed.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
