import classNames from 'classnames';
import { Button, Card, DatePicker, Input, Select } from 'components';
import Radio from 'components/inputs/radio';
import SideBarLayout from 'layouts/SideBarLayout';
import Image from 'next/image';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { useState } from 'react';
import styles from 'styles/pages/AddUser.module.scss';
import pageStyles from 'styles/pages/page.module.scss';

export default function AddUser() {
    const [gender, setGender] = useState('');
    const [clinic, setClinic] = useState('');
    const [type, setType] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [branch, setBranch] = useState('');
    return (
        <div className={pageStyles.container}>
            <div className={pageStyles.pageHeader}>
                <div className={pageStyles.pageHeaderLeft}>
                    <h3>New user</h3>
                </div>
                <Breadcrumbs
                    omitRootLabel={true}
                    listClassName={pageStyles.breadcrumbs}
                    replaceCharacterList={[{ from: '_', to: ' ' }]}
                />
            </div>
            <div className={pageStyles.pageBody}>
                <Card cardTitle="General information">
                    <div className={styles.row}>
                        <div className={styles.columnLeft}>
                            <Input label="Name" />
                            <Input label="Surname" />
                            <Input label="Date of birth" type="date" />
                            {/* // <DatePicker label="Date of birth" mode="single" /> */}
                            <div className={styles.genderRadio}>
                                <div className={styles.genderLabel}>Gender</div>
                                <Radio name="gender" label="Male" id="male" />
                                <Radio
                                    name="gender"
                                    label="Female"
                                    id="female"
                                />
                            </div>
                        </div>
                        <div className={styles.columnRight}>
                            <span className={styles.label}>Profile photo</span>
                            <img
                                alt=''
                                src="/images/users/user.png"
                                className={styles.doctorImage}
                            />
                            <Button
                                label="Change"
                                size="large"
                                variant="fill"
                            />
                        </div>
                    </div>
                </Card>
                <Card cardTitle="Contacts">
                    <div className={styles.row}>
                        <div
                            className={classNames(
                                styles.columnLeft,
                                styles.halfw
                            )}
                        >
                            <Select
                                label="City"
                                labelStyle="outside"
                                onChange={() => { }}
                                options={[]}
                            />
                            <Input label="E-mail" />
                        </div>
                        <div
                            className={classNames(
                                styles.columnRight,
                                styles.halfw
                            )}
                        >
                            <Input label="Registration address" />
                            <Input label="Phone Number" />
                        </div>
                    </div>
                </Card>
                <Card cardTitle="Card">
                    <div className={styles.row}>
                        <div
                            className={classNames(
                                styles.columnLeft,
                                styles.halfw
                            )}
                        >
                            <Select
                                label="Card type"
                                labelStyle="outside"
                                onChange={() => { }}
                                options={[]}
                            />
                        </div>
                        <div
                            className={classNames(
                                styles.columnRight,
                                styles.halfw
                            )}
                        >
                            <DatePicker
                                mode="single"
                                label="Card valid until"
                            />
                        </div>
                    </div>
                </Card>
                <div className={styles.buttons}>
                    <Button label="Cancel" size="large" variant="outline" />
                    <Button label="Add" size="large" variant="fill" />
                </div>
            </div>
        </div>
    );
}

AddUser.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
