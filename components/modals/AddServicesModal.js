import {useEffect, useState} from 'react';
import { Modal, getList, createTree, RichObjectTreeView } from 'components';
import { useQuery } from "@tanstack/react-query";
import styles from 'styles/components/Modals/addserviceModal.module.scss';

export default function AddServicesModal({
    onClose,
    contractId
}) {
    const [services, setServices] = useState([]);
    var getServices = useQuery(["key", 'allservices'], ()=> { return getList(`clinics/contract-type-to-services`, '1') });

    useEffect(()=>{
        const tree = createTree(getServices?.data)
        
        let newData = getServices?.data?.map((item)=>(item.services[0])).filter((item)=> item.parentServiceId == null);
        
        setServices(newData)
    },[getServices?.data])
    
    return <>
        <Modal onBackClick={onClose} className={styles.addService}> 
            <RichObjectTreeView 
                data={services ? services : [] } 
                originalData={getServices?.data ? getServices?.data?.map((item)=>(item.services)[0]) : []}
                pagination={{ pageSize: 4, initialPage: 1 }} 
                contractId={contractId}
                variant={"all services"}
            />
        </Modal>
    </>
}