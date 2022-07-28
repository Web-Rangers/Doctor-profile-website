import { ReactSVG } from "react-svg";
import { TableWithDropdowns, Button, Card, DatePicker, Select, Input } from "components";
import { useState } from "react";
import classNames from "classnames";
import styles from "styles/components/Tabs/StuffCompanyTab.module.scss";

export default function StuffCompanyTab({data, columns, tableStyle}) {
    const [filterIsOpen, setFilterOpen] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [cardType, setCardType] = useState('');
    const [gender, setGender] = useState('');
    const [selectStatus, setSelectStatus] = useState('');

    return <>
        <Card 
            cardTitle="Staff"
            className={styles.stuffCard}
        >
            <div className={styles.actionsRow}>
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
                        placeholder="Search by id or surname"
                    />
                </div>
                <div>
                    <Button
                        variant="outline"
                        size="large"
                        label="Filter"
                        onClick={() => setFilterOpen(!filterIsOpen)}
                        icon={
                            <ReactSVG
                                src="/images/icons/inputs/filter.svg"
                                className={classNames(
                                    styles.iconContainer,
                                    styles.active
                                )}
                            />
                        }
                    />
                    <Button
                        className={styles.addOrderBtn}
                        variant="fill"
                        size="large"
                        label="Add order"
                    />
                </div>
            </div>
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
                            <Input 
                                label="Phone number"
                                className={styles.servInput}
                            />
                            <Input 
                                label="Mail"
                                className={styles.servInput}
                            />
                            <div className={styles.selects}>
                                <h2>Gender</h2>
                                <div>
                                    <Button
                                        label="Male"
                                        variant="outline"
                                        size="large"
                                        className={styles.filterBtn}
                                        selected={gender === 'male'}
                                        onClick={() =>
                                            setGender('male')
                                        }
                                    />
                                    <Button
                                        label="Female"
                                        variant="outline"
                                        size="large"
                                        className={styles.filterBtn}
                                        selected={gender === 'female'}
                                        onClick={() =>
                                            setGender('female')
                                        }
                                    />
                                </div>
                            </div>
                            <div className={styles.selects}>
                                <h2>Status</h2>
                                <div>
                                    <Button
                                        label="Active"
                                        variant="outline"
                                        size="large"
                                        className={styles.filterBtn}
                                        selected={selectStatus === 'active'}
                                        onClick={() =>
                                            setSelectStatus('active')
                                        }
                                    />
                                    <Button
                                        label="Deactived"
                                        variant="outline"
                                        size="large"
                                        className={styles.filterBtn}
                                        selected={selectStatus === 'deactive'}
                                        onClick={() =>
                                            setSelectStatus('deactive')
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

            {
                tableStyle === 'dropdown'
                &&
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
            }
            
        </Card>
    </>
}