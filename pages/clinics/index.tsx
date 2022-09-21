import { ReactSVG } from "react-svg";
import { Table, AddClinicModal, Button, AlreadyExistClinic, dayz, getFirstStartEndHours } from "components";
import SideBarLayout from "layouts/SideBarLayout";
import styles from "styles/pages/clinics.module.css";
import tableStyles from "styles/components/Table.module.scss";
import { useState, useRef } from "react";
import { useClinicsData } from "components/useClinicsData";
import axios from "axios";
import {getList} from 'components';
import { useQuery, useMutation } from "@tanstack/react-query";
import Fuse from "fuse.js";
import classNames from 'classnames';

export default function Clinics({ list }) {
  const { data, refetch, status } = useClinicsData();
  let municipalities = useQuery(["key", 'municipalities'], ()=> { return getList(`municipalities`, '1') });

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

  const [workingHours, setWorkingHours] = useState([
    {
        days: 1,
        endHour: '',
        startHour: '',
        active: true
    },
    {
        days: 2,
        endHour: '',
        startHour: '',
        active: true
    },
    {
        days: 3,
        endHour: '',
        startHour: '',
        active: true
    },
    {
        days: 4,
        endHour: '',
        startHour: '',
        active: true
    },
    {
        days: 5,
        endHour: '',
        startHour: '',
        active: true
    },
    {
        days: 6,
        endHour: '',
        startHour: '',
        active: false
    },
    {
        days: 7,
        endHour: '',
        startHour: '',
        active: false
    }
]);

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

  const [workHourTable, setWorkHourTable] = useState('');

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
        const newWorkingHours = workingHours?.map((item)=>{
          const getCurrentDay = record != null && record.filter((e)=> e.dayId === item.days);
          if(getCurrentDay.length > 0){
              return {...item, startHour: getCurrentDay[0]?.startHour, endHour: getCurrentDay[0]?.endHour, active: true}
          } else {
              return {...item, active: false}
          }
        })
        return (
          <>
            <div 
              className={styles.dataCheck}
              onClick={(e)=> {
                e.stopPropagation(); 
                setWorkHourTable(record[0].clinicId)
                console.log(workHourTable, record)

              }}
            >
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
            <div className={classNames(styles.tableWorkingHours, {
                [styles.activeWorkHours]: workHourTable == record[0].clinicId 
              })}
              onClick={(e)=> {e.stopPropagation()}}
            >
              <div className={styles.workHeader}>
                <h2>Work schedule</h2>
                <div className={styles.x} onClick={()=>setWorkHourTable('')}>
                  <ReactSVG src="/images/icons/inputs/x.svg" />
                </div>
              </div>
              {newWorkingHours.map((_,i)=> {
                switch(i) {
                  case 0: 
                    return <>
                      <div className={styles.dayOfWeek}>
                        <span>Mon</span> {newWorkingHours[i]?.startHour ? `${newWorkingHours[i]?.startHour} - ${newWorkingHours[i]?.endHour} `: 'Day off'}
                      </div>
                    </> 
                  case 1: 
                    return <>
                      <div className={styles.dayOfWeek}>
                        <span>Tue</span> {newWorkingHours[i]?.startHour ? `${newWorkingHours[i]?.startHour} - ${newWorkingHours[i]?.endHour} `: 'Day off'}
                      </div>
                    </>
                  case 2: 
                    return <>
                      <div className={styles.dayOfWeek}>
                        <span>Wed</span> {newWorkingHours[i]?.startHour ? `${newWorkingHours[i]?.startHour} - ${newWorkingHours[i]?.endHour} `: 'Day off'}
                      </div>
                    </> 
                  case 3: 
                    return <>
                      <div className={styles.dayOfWeek}>
                        <span>Thu</span> {newWorkingHours[i]?.startHour ? `${newWorkingHours[i]?.startHour} - ${newWorkingHours[i]?.endHour} `: 'Day off'}
                      </div>
                    </> 
                  case 4: 
                    return <>
                      <div className={styles.dayOfWeek}>
                        <span>Fri</span> {newWorkingHours[i]?.startHour ? `${newWorkingHours[i]?.startHour} - ${newWorkingHours[i]?.endHour} `: 'Day off'}
                      </div>
                    </> 
                  case 5: 
                    return <>
                      <div className={styles.dayOfWeek}>
                        <span>Sat</span> {newWorkingHours[i]?.startHour ? `${newWorkingHours[i]?.startHour} - ${newWorkingHours[i]?.endHour} `: 'Day off'}
                      </div>  
                    </> 
                  case 6: 
                    return <>
                      <div className={styles.dayOfWeek}>
                        <span>Sun</span> {newWorkingHours[i]?.startHour ? `${newWorkingHours[i]?.startHour} - ${newWorkingHours[i]?.endHour} `: 'Day off'}
                      </div>
                    </> 
                }
                return <></>
              })}
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
