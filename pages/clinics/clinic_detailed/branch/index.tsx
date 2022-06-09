import { ReactSVG } from 'react-svg';
import Card from '../../../../components/Card';
import OfferCard from '../../../../components/OfferCard';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import SideBarLayout from '../../../../layouts/SideBarLayout';
import tabStyles from '../../../../styles/components/Tabs.module.scss';
import cDStyles from '../../../../styles/pages/clinic_detailed.module.scss';
import styles from '../../../../styles/pages/branch.module.scss';
import tableStyles from '../../../../styles/components/Table.module.css';
import Breadcrumbs from 'nextjs-breadcrumbs';
import classNames from 'classnames';
import StuffCard from '../../../../components/StuffCard';
import GalleryCard from '../../../../components/GalleryCard';
import { useState } from 'react';
import Modal from '../../../../components/Modal';
import CheckBox from '../../../../components/CheckBox';
import Input from '../../../../components/Input';

interface ActionProps {
    icon?: string;
    onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
    <ReactSVG src={icon} onClick={onClick}></ReactSVG>
);

const Status = ({ active }: { active: boolean }) => {
    return (
        <div
            className={classNames(tableStyles.tableStatus, {
                [tableStyles.statusOpen]: active,
                [tableStyles.statusClosed]: !active,
            })}
        >
            {active ? 'Open' : 'Close'}
        </div>
    );
};

interface ServiceProps {
    isEdit?: boolean;
    onEdit?: () => void;
    onAdd?: () => void;
    onDelete?: () => void;
}

const ServiceActions = ({
    onEdit,
    onAdd,
    isEdit,
    onDelete,
}: GalleryActionsProps) => {
    return (
        <div className={cDStyles.branchActions}>
            <button className={cDStyles.edit} onClick={onEdit}>
                {isEdit ? 'Cancel' : 'Edit'}
            </button>
            <button
                className={cDStyles.add}
                onClick={isEdit ? onDelete : onAdd}
            >
                {isEdit ? 'Save' : 'Add service'}
            </button>
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
        <div className={cDStyles.branchActions}>
            <button className={cDStyles.edit} onClick={onEdit}>
                {isEdit ? 'Cancel' : 'Edit'}
            </button>
            <button
                className={cDStyles.add}
                onClick={isEdit ? onDelete : onAdd}
            >
                {isEdit ? 'Delete' : 'Add photo'}
            </button>
        </div>
    );
};

const OfferActions = () => {
    return (
        <div className={cDStyles.branchActions}>
            <button className={cDStyles.add}>Add branch</button>
        </div>
    );
};

const StuffActions = () => {
    return (
        <div className={cDStyles.branchActions}>
            <div
                className={cDStyles.searchContainer}
                onClick={() => {
                    document.getElementById('search-input')?.focus();
                }}
            >
                <ReactSVG
                    src={'/images/icons/inputs/search.svg'}
                    className={classNames(
                        cDStyles.searchImg,
                        cDStyles.iconContainer
                    )}
                />
                <input
                    id="search-input"
                    className={cDStyles.searchInput}
                    type="text"
                    placeholder="Search"
                />
            </div>
            <button className={cDStyles.add}>Add doctor</button>
        </div>
    );
};

export default function Branch() {
    const [galleryIsEditing, setGalleryIsEditing] = useState(false);
    const [servisecIsEditing, setServisecIsEditing] = useState(false);
    const [stuffModalIsOpen, setStuffModalIsOpen] = useState(false);
    const [branchModalIsOpen, setBranchModalIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    return (
        <>
            {branchModalIsOpen && (
                <Modal
                    onBackClick={() => setBranchModalIsOpen(false)}
                    className={styles.branchModal}
                >
                    <span className={styles.modalTitle}>Edit this branch</span>
                    <div className={styles.modalContent}>
                        <div className={styles.modalContentRow}>
                            <Input
                                type="text"
                                label="Phone number"
                                value={
                                    modalMode === 'add' ? '' : '480-555-0103'
                                }
                            />
                            <Input type="select" label="Status" value="Open" />
                        </div>
                        <div className={styles.modalContentRow}>
                            <Input
                                type="text"
                                label="Address"
                                value={
                                    modalMode === 'add'
                                        ? ''
                                        : '4140 Parker Rd. Allentown, New Mexico 31134'
                                }
                            />
                            <Input
                                type="time"
                                label="Working hours"
                                value={modalMode === 'add' ? '' : '11:00-19:00'}
                            />
                        </div>
                        <div className={styles.modalContentRow}>
                            <Input
                                type="text"
                                label="About clinic"
                                multiline
                                value={
                                    modalMode === 'add'
                                        ? ''
                                        : 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.  Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.'
                                }
                            />
                        </div>
                    </div>
                    <div className={styles.whiteSpace}></div>
                    <div className={styles.modalActions}>
                        <button
                            className={classNames(
                                styles.modalAction,
                                cDStyles.edit
                            )}
                            onClick={() => setBranchModalIsOpen(false)}
                        >
                            Cnacel
                        </button>
                        <button
                            className={classNames(
                                styles.modalAction,
                                cDStyles.add
                            )}
                            onClick={() => setBranchModalIsOpen(false)}
                        >
                            Save
                        </button>
                    </div>
                </Modal>
            )}
            {stuffModalIsOpen && (
                <Modal onBackClick={() => setStuffModalIsOpen(false)}>
                    <span className={cDStyles.modalText}>
                        Are you sure you want to remove this doctor?
                    </span>
                    <div className={cDStyles.modalActions}>
                        <button
                            className={classNames(
                                cDStyles.modalAction,
                                cDStyles.edit
                            )}
                            onClick={() => setStuffModalIsOpen(false)}
                        >
                            Cnacel
                        </button>
                        <button
                            className={classNames(
                                cDStyles.modalAction,
                                cDStyles.add
                            )}
                            onClick={() => setStuffModalIsOpen(false)}
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            )}
            <div className={cDStyles.container}>
                <div className={cDStyles.pageHeader}>
                    <div className={styles.pageHeaderLeft}>
                        <h3>Branch</h3>
                        <button className={cDStyles.add}>
                            Deactivate branch
                        </button>
                    </div>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={cDStyles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
                <div className={cDStyles.pageBody}>
                    <div className={cDStyles.row}>
                        <div className={cDStyles.colSmall}>
                            <Card className={cDStyles.smallCard}>
                                <img
                                    src={
                                        '/images/icons/clinics/medicalhouse.png'
                                    }
                                    className={cDStyles.clinicIcon}
                                />
                                <div className={cDStyles.clinicName}>
                                    Medical House
                                </div>
                                <div className={cDStyles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/clock.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span className={cDStyles.clinicInfText}>
                                        10:00-20:00
                                    </span>
                                </div>
                                <div className={cDStyles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/phone.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span className={cDStyles.clinicInfText}>
                                        480-555-0103
                                    </span>
                                </div>
                                <div className={cDStyles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/location.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span className={cDStyles.clinicInfText}>
                                        4140 Parker Rd. Allentown, New Mexico
                                        31134
                                    </span>
                                </div>
                            </Card>
                        </div>
                        <div className={cDStyles.colLarge}>
                            <Card
                                cardTitle="Detailded information"
                                cardActions={
                                    <EditAction
                                        icon="/images/icons/inputs/edit.svg"
                                        onClick={() => {
                                            setModalMode('edit');
                                            setBranchModalIsOpen(true);
                                        }}
                                    />
                                }
                            >
                                <div className={cDStyles.dataRow}>
                                    <div className={cDStyles.dataIndex}>
                                        Branch ID
                                    </div>
                                    <div className={cDStyles.dataValue}>
                                        94768466
                                    </div>
                                </div>
                                <div className={cDStyles.dataRow}>
                                    <div
                                        className={classNames(
                                            cDStyles.dataIndex,
                                            styles.dataIndex
                                        )}
                                    >
                                        Status
                                    </div>
                                    <div className={cDStyles.dataValue}>
                                        <Status active></Status>
                                    </div>
                                </div>
                                <div className={cDStyles.dataRow}>
                                    <div className={cDStyles.dataIndex}>
                                        About clinic
                                    </div>
                                    <div className={cDStyles.dataValue}>
                                        Amet minim mollit non deserunt ullamco
                                        est sit aliqua dolor do amet sint. Velit
                                        officia consequat duis enim velit
                                        mollit. Velit officia consequat duis
                                        enim velit mollit. Amet minim mollit non
                                        deserunt ullamco est sit aliqua dolor do
                                        amet sint. Amet minim
                                    </div>
                                </div>
                                <div className={styles.whiteSpace}></div>
                                <div
                                    className={classNames(
                                        cDStyles.dataRow,
                                        cDStyles.noMargin
                                    )}
                                >
                                    <div className={cDStyles.dataIndex}></div>
                                    <div className={cDStyles.dataValue}>
                                        <button className={cDStyles.textButton}>
                                            See all
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className={cDStyles.tabContainer}>
                        <Tabs>
                            <TabList className={tabStyles.tabList}>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="1"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/Service.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span>Services</span>
                                </Tab>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="2"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/offer.svg"
                                        className={cDStyles.iconContainer}
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
                                        className={cDStyles.iconContainer}
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
                                        className={cDStyles.iconContainer}
                                    />
                                    <span>Photo gallery</span>
                                </Tab>
                            </TabList>
                            <TabPanel className={tabStyles.tabPanel}>
                                <Card
                                    cardTitle="Services"
                                    cardActions={
                                        <ServiceActions
                                            isEdit={servisecIsEditing}
                                            onEdit={() =>
                                                setServisecIsEditing(
                                                    !servisecIsEditing
                                                )
                                            }
                                        />
                                    }
                                >
                                    <div className={styles.servicesContainer}>
                                        {Array.from(new Array(50).keys()).map(
                                            (i) => (
                                                <CheckBox
                                                    id={'service' + i}
                                                    key={'service' + i}
                                                    label={'Service ' + i}
                                                ></CheckBox>
                                            )
                                        )}
                                    </div>
                                </Card>
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <Card
                                    cardTitle="Offers"
                                    cardActions={<OfferActions />}
                                >
                                    <div className={cDStyles.cardContainer}>
                                        {Array.from(new Array(5).keys()).map(
                                            (i) => (
                                                <OfferCard
                                                    key={'offer' + i}
                                                    title="15.06.2022 - 06.06.2022"
                                                    className={
                                                        cDStyles.offerCard
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            cDStyles.title
                                                        }
                                                    >
                                                        {i !== 1 &&
                                                            'First visit: free!'}
                                                        {i === 1 &&
                                                            'Second visit: freeeee freeeeeeee!'}
                                                    </div>
                                                    <div
                                                        className={
                                                            cDStyles.description
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
                                                        className={
                                                            cDStyles.type
                                                        }
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
                                    <div
                                        className={cDStyles.stuffCardContainer}
                                    >
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
                                        className={
                                            cDStyles.galleryCardContainer
                                        }
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
                                                        cDStyles.galleryCard
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

Branch.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
