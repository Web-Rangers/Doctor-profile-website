import { ReactSVG } from "react-svg";
import { Table, AddClinicModal, Button, AlreadyExistClinic } from "components";
import SideBarLayout from "layouts/SideBarLayout";
import styles from "styles/pages/clinics.module.css";
import tableStyles from "styles/components/Table.module.scss";
import { useState, useEffect } from "react";
import { useClinicsData } from "components/useClinicsData";
import axios from "axios";
import {getList} from 'components';
import { useQuery, useMutation } from "@tanstack/react-query";
import Fuse from "fuse.js";

export default function Clinics({ list }) {
  const { data, refetch, status } = useClinicsData();
  var municipalities = useQuery(["key", 'municipalities'], ()=> { return getList(`municipalities`, '1') });

  const [isModalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [existClinic, setExistClinic] = useState({
    isOpen: false,
    data: null,
  })

  const [popup, setPopup] = useState({
    active:false,
    id: null
  });

  const removeClinic = async (id) => {
    return axios.get(`/asclepius/v1/api/clinics/${id}/deactivate`).then((response) => {
      refetch();
    });
  };

  const { mutate: removeClinicMutation } = useMutation((id: Number) =>
    removeClinic(id)
  );

  const updateClinic = async (id) => {
    return axios.get(`/asclepius/v1/api/clinics/${id}/activate`).then((response) => {
      refetch();
    });
  };

  const updateStatus = useMutation((id: Number) =>
    updateClinic(id)
  );

  function removeAfterValidation(removeId) {
    const searchCurrentClinic = data?.filter((clinic)=> clinic.id == removeId)[0];
    console.log(searchCurrentClinic)
    if(searchCurrentClinic?.isActive){
      console.log('sent delete request')
      removeClinicMutation(removeId)
    }else {
      console.log('sent put request')
      updateStatus.mutate(removeId)
    }
  }

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
        const activeOrNot = data?.filter((e)=>e.id == action)[0];
        return (
          <div
            className={`${tableStyles.tableIconCellTemplate} ${styles.smallIcon} ${styles.action}`}
            key={key}
            onClick={(event) => {event.defaultPrevented = true; setPopup({active:true, id: action})}}
          >
            {
              !activeOrNot.isActive ? <img
                alt="Active"
                src="/images/icons/clinics/active.png"
                className={tableStyles.rowImg}
                height={20}
                width={20}
              />  : <img
                alt="Deactive"
                src="/images/icons/table/block.png"
                className={tableStyles.rowImg}
                height={20}
                width={20}
              /> 
            }
            
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
      {
          existClinic.isOpen && <AlreadyExistClinic data={existClinic} onClose={()=> setExistClinic({isOpen: false, data: null})} />
      }
      {
        popup.active && <>
          <div className={styles.popup}>
            <h2>{`Are you sure?`}</h2>
            <div className={styles.btns}>
              <Button 
                onClick={()=>{setPopup({active: false, id: null}); removeAfterValidation(parseInt(popup.id))}}
                label="Yes"
                size="large"
                variant="fill"
              />
              <Button 
                onClick={()=>setPopup({active: false, id: null})}
                label="No"
                size="large"
                variant="outline"
              />
            </div>
          </div>
        </>
      }
      {isModalOpen && (
        <AddClinicModal
          onCancel={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
          onSave={() => {
            setModalOpen(false);
          }}
          isOpen={existClinic.isOpen}
          setExistClinic={(bol)=> setExistClinic({isOpen: bol.isOpen, data: bol.data})}
          municipalities={municipalities?.data}
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
