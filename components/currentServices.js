import {useState, useEffect} from 'react';
import {Button, Input, RichObjectTreeView, createTree} from 'components';
import {ReactSVG} from 'react-svg';
import Fuse from 'fuse.js';
import styles from 'styles/pages/clinic_detailed.module.scss';

export default function Services({currentServices, contractId, setServiceAddModal}) {
    const [service, setServices] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(()=>{
        currentServices.refetch();

        const tree = createTree(currentServices?.data, 'current')
        
        let newData = currentServices?.data?.map((item)=>(item)).filter((item)=> item.parentServiceId == null);

        setServices(newData)
    },[currentServices?.data, contractId])

    const fuse = new Fuse(service, {keys: ["title"]});

    return <>
        <div className={styles.servicesHeader}>
            <h2>Services</h2>
            <Button 
                label="Add Service"
                variant="fill"
                size="large"
                className={styles.serviceBtn}
                onClick={()=> setServiceAddModal(true)}
            />
            <div className={styles.servicesSearch}>
                <Input 
                    type="text"
                    className={styles.servInput}
                    value={searchValue}
                    onChange={(e)=> {
                        setSearchValue(e.toString())
                    }}
                />
                <ReactSVG 
                    className={styles.searchIcon}
                    src="/images/icons/inputs/search.svg" 
                />
            </div>
        </div>
        <RichObjectTreeView 
            data={service ? searchValue != '' ? fuse.search(searchValue).map((e)=> e.item) :  service : [] } 
            originalData={currentServices?.data && currentServices?.data?.map((item)=>(item))}
            pagination={{ pageSize: 8, initialPage: 1 }} 
            contractId={contractId}
            variant={"current"}
            refetch={()=> currentServices.refetch()}
        />
    </>
}