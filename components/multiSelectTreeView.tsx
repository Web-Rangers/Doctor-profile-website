import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Link from 'next/link';
import styles from 'styles/components/multiSelectTree.module.scss';
import { CheckBox, Modal, Input, Button } from 'components';
import Select from 'react-select';
import { style } from '@mui/system';
import {useEffect, useState, useCallback} from 'react';
import {ReactSVG} from 'react-svg';
import { useQuery } from "@tanstack/react-query";
import {getList} from 'components';
import axios from 'axios';

interface RenderTree {
    parentServiceId?: any;
    code: string;
    descriptionId: string;
    id: string;
    title: string;
    children?: readonly RenderTree[];
}
  
export default function RichObjectTreeView({
    data,
    originalData,
    pagination,
    contractId
}) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [diplayedData, setDisplayedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [services, setServices] = useState([]);
    const [currentService, setCurrentService] = useState(null);
    const [check, setCheck] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState({
        isOpen: false,
        node: null
    });

    var service = useQuery(["key", 'service'], ()=> { return getList(`accounting/contract-to-service/391/`, '391') });

    function recurseServices(parentId) {
        if(parentId != null){
            const service = originalData?.filter((item)=> item.id == parentId)[0];
            if(services.filter((item)=> item.id == service.id).length == 0){
                setServices((prev) => ([...prev, service]))
            }
            return recurseServices(service?.parentServiceId)
        }else {
            return false
        }
    }

    async function addService(item) {
        await axios.post('/asclepius/v1/api/accounting/contract-to-service', item)
                    .then((response)=> console.log(response))
                    .catch((error)=> console.log(error))
    }

    useEffect(()=>{
        service.refetch();
    },[service?.data])

    const renderTree = (nodes: RenderTree) => {
        return (<TreeItem key={nodes?.id} nodeId={nodes?.id} label={
            <>
                <div className={styles.table}>
                    <div 
                        className={styles.checkbox}
                    >
                        <CheckBox className={styles.disabledCheckbox} id={nodes?.id} />
                    </div>
                    <div>{nodes?.id}</div>
                    <div>{nodes?.title}</div>
                    <div>{nodes?.descriptionId ? nodes?.descriptionId : ''}</div>
                    <div></div>
                    <div>{nodes?.code}</div>
                    <button 
                        className={styles.addService}
                        onClick={(e)=> {
                            recurseServices(nodes?.parentServiceId)

                            if(services.filter((item)=> item.id == nodes?.id).length == 0){
                                setServices((prev) => ([...prev, nodes]))
                            }
                            setCurrentService(nodes)
                            e.stopPropagation(); 
                            setIsModalOpen({
                                isOpen: true,
                                node: nodes
                            })
                        }}
                    >
                        Add Service
                    </button>
                </div>
            </>
        }>
        {Array.isArray(nodes?.children)
            ? nodes?.children.map((node) => renderTree(node))
            : null}
        </TreeItem>)
    }

    const dataCallback = useCallback((data)=>{
        setDisplayedData(data);
    }, [data])

    const getStartPage = () => {
        return (currentPage - 1) * (pagination.pageSize || 10) + 1;
    };

    const getEndPage = () => {
        return Math.min(currentPage * (pagination.pageSize || 10), data?.length);
    };

    const selectPage = (selectedOption) => {
        setCurrentPage(selectedOption.value);
        setSelectedOption(selectedOption);
    };

    useEffect(() => {
        if (!pagination) return dataCallback(data);
        setSelectedOption(options[currentPage - 1]);
        setOptions(
            Array.from(
                Array(
                    Math.ceil(data.length / (pagination.pageSize || 10))
                ).keys()
            ).map((i) => ({ value: i + 1, label: i + 1 }))
        );

        dataCallback(
            data.slice(
                (currentPage - 1) * (pagination.pageSize || 10),
                currentPage * (pagination.pageSize || 10)
            )
        );
    }, [currentPage]);

    return <>
            {
                isModalOpen.isOpen && 
                <AddServicesModal 
                    node={isModalOpen.node} 
                    services={services} 
                    setServices={setServices} 
                    setIsModalOpen={setIsModalOpen}
                    contractId={contractId}
                    addService={(item)=>addService(item)}
                />
            }
            {<TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root']}
                className={styles.tableClass}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ flexGrow: 1, maxWidth: 1200, overflowY: 'auto' }}
            >
                <div className={styles.tableHeader}>
                    <div></div>
                    <div>Service Id</div>
                    <div>Service name</div>
                    <div>Type of service</div>
                    <div>Price</div>
                    <div>Duration</div>
                </div>
                {diplayedData?.map((item)=> {
                   return renderTree(item)
                })}
            </TreeView>}
            {pagination ? (
                <div className={styles.pagination}>
                    <div
                        className={styles.recordCounter}
                    >{`${getStartPage()}-${getEndPage()} of ${
                        data?.length
                    } records`}</div>
                    <div className={styles.paginationControls}>
                        <span className={styles.paginatorTitle}>
                            The page you’er on
                        </span>
                        {options.length > 0 && (
                            <Select
                                className={styles.pageSelect}
                                options={options}
                                placeholder=""
                                defaultValue={options[0]}
                                menuPlacement="top"
                                value={selectedOption}
                                onChange={selectPage}
                            />
                        )}
                        <div className={styles.paginationButtons}>
                            <ReactSVG
                                src="/images/icons/paginator/prev.svg"
                                className={`${styles.paginationBtn} ${
                                    currentPage === 1 ? styles.disable : ''
                                }`}
                                onClick={() => {
                                    setCurrentPage((origin) => origin - 1);
                                }}
                            />
                            <ReactSVG
                                src="/images/icons/paginator/next.svg"
                                className={`${styles.paginationBtn} ${
                                    currentPage === options.length
                                        ? styles.disable
                                        : ''
                                }`}
                                onClick={() => {
                                    setCurrentPage((origin) => origin + 1);
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
}
  

export function AddServicesModal({
    node,
    services,
    setServices,
    setIsModalOpen,
    contractId,
    addService
}) {
    const [inp, setInp] = useState({})
    return <>
        <Modal className={styles.services} onBackClick={()=> {setServices([]); setIsModalOpen({
            isOpen: false,
            node: null
        })}}>
            <h2>if you want to add service, you should add parent services too</h2>
                {
                    services?.map((serv)=>{
                        return <>
                            <div className={styles.servicesBlock}>
                                {
                                    serv.id == node.id && 
                                        <div className={styles.currentServ}>*Service You want</div>
                                }
                                <div>
                                    <h4>Service name</h4>
                                    <h2>{serv?.title}</h2>
                                </div>
                                <Input 
                                    label='Duration'
                                    onChange={(e)=> setInp((prev)=>({
                                        ...prev,
                                        [serv.title]: e
                                    }))}
                                />
                            </div>
                        </>
                    })
                }
            <Button 
                label='Add Service'
                variant='fill'
                size="large"
                onClick={()=> {
                    const serv = services.map((item)=>{
                        return {
                            "contract_id": contractId,
                            "service_id": item.id,
                            "param_values": [
                              {
                                "parameter_id": null,
                                "number_value": null,
                                "string_value": "string",
                                "date_value": null,
                                "service_param_value_list_id": inp[item.title]
                              }
                            ]
                          }
                    })
                    for(let i = 0; i < serv?.length; i++) {
                        addService(serv[i])
                    }
                }}
            />
        </Modal>
    </>
}