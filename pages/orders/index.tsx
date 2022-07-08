import { ReactSVG } from "react-svg";
import { Table, Button, Card } from "components";
import SideBarLayout from "layouts/SideBarLayout";
import styles from "styles/pages/orders.module.scss";
import tableStyles from "styles/components/Table.module.scss";
import { useState } from "react";
import Breadcrumbs from "nextjs-breadcrumbs";
import classNames from "classnames";

export default function Orders() {
    const [isModalOpen, setModalOpen] = useState(false);
    const columns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "name",
        },
    ];

    const data = [];

    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h3>Orders</h3>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: "_", to: " " }]}
                    />
                </div>
                <Card>
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
                                placeholder="Search"
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="large"
                            label="Filter"
                            onClick={() => {}}
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
                    </div>
                    <Table
                        columns={columns}
                        data={data}
                        pagination={{ pageSize: 10, initialPage: 1 }}
                    />
                </Card>
            </div>
        </>
    );
}

Orders.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
