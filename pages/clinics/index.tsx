import { ReactSVG } from "react-svg";
import { Table, AddClinicModal, Button } from "components";
import SideBarLayout from "layouts/SideBarLayout";
import styles from "styles/pages/clinics.module.css";
import tableStyles from "styles/components/Table.module.scss";
import { useState, useEffect } from "react";
import { useClinicsData } from "components/useClinicsData";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import Fuse from "fuse.js";

export default function Clinics({ list }) {
  const { isLoading, data, isError, error, refetch, status } = useClinicsData();

  const [isModalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const removeClinic = async (id) => {
    return axios.delete(`/asclepius/v1/api/clinics/${id}`).then((response) => {
      refetch();
    });
  };

  const { mutate: removeClinicMutation } = useMutation((id) =>
    removeClinic(id)
  );

  const columns = [
    {
      key: "logoUrl",
      title: "Icon",
      dataIndex: "logoUrl",
      render: (icon, key) => {
        return (
          <div className={tableStyles.tableIconCellTemplate} key={key}>
            <img
              alt=""
              src={icon ?? "/images/placeholder.png"}
              className={tableStyles.rowImg}
              height={50}
              width={50}
            />
          </div>
        );
      },
    },
    {
      key: "displayName",
      title: "Name",
      dataIndex: "displayName",
    },
    {
      key: "address",
      title: "Legal adress",
      dataIndex: "address",
      render: (record) => {
        return (
          <>
            <div className={styles.address}>{record?.address}</div>
          </>
        );
      },
    },
    {
      key: "isActive",
      title: "Status",
      dataIndex: "isActive",
      headerStyle: {
        justifyContent: "center",
      },
      render: (status, key) => {
        return (
          <div className={tableStyles.tableStatusCellTemplate} key={key}>
            <div
              className={`${tableStyles.tableStatus} ${
                status ? tableStyles.statusOpen : tableStyles.statusClose
              }`}
            >
              {status ? "Open" : "Close"}
            </div>
          </div>
        );
      },
    },
    {
      key: "workingHours",
      title: "Working hours",
      dataIndex: "workingHours",
      render: (record) => {
        return (
          <>
            <div className={styles.dataCheck}>
              <img
                src="/images/icons/table/i.svg"
                alt=""
                height={20}
                width={20}
              />
              <span>{record[0]?.startHour}</span>
              <span>-</span>
              <span>{record[0]?.endHour}</span>
            </div>
          </>
        );
      },
    },
    {
      key: "action",
      title: "",
      dataIndex: "id",
      render: (action, key) => {
        return (
          <div
            className={`${tableStyles.tableIconCellTemplate} ${styles.smallIcon} ${styles.action}`}
            key={key}
            onClick={() => removeClinicMutation(action)}
          >
            <img
              alt=""
              src="/images/icons/table/block.png"
              className={tableStyles.rowImg}
              height={20}
              width={20}
            />
          </div>
        );
      },
    },
  ];

  if (status !== "success") {
    return "Loading...";
  }

  const fuse = new Fuse(data, {
    includeScore: true,
    threshold: 0.4,
    keys: ["displayName"],
  });

  const result = fuse.search(searchValue);
  const searchResult = searchValue ? result.map((result) => result.item) : data;

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      {isModalOpen && (
        <AddClinicModal
          onCancel={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
          onSave={() => {
            setModalOpen(false);
          }}
        />
      )}
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <h3>All clinics</h3>
            <Button
              label="Add clinic"
              size="large"
              onClick={() => setModalOpen(!isModalOpen)}
            />
          </div>
          <div
            className={styles.searchContainer}
            onClick={() => {
              document.getElementById("search-input")?.focus();
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
              value={searchValue}
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>
        <Table
          columns={columns}
          data={searchResult?.sort((a,b)=> b.id - a.id)}
          pagination={{ pageSize: 10, initialPage: 1 }}
          detailedUrl={"./clinics/clinic_detailed"}
          rowClassName={styles.tableRow}
        />
      </div>
    </>
  );
}

Clinics.getLayout = (page) => {
  return <SideBarLayout>{page}</SideBarLayout>;
};
