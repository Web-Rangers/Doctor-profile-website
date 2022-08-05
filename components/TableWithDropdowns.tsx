import { useState, useEffect, useCallback } from 'react';
import styles from 'styles/components/TableWithDropdown.module.scss';
import Select from 'react-select';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { Button } from 'components';
import Link from 'next/link'


interface ColumnDefinition {
    key: string;
    title: string;
    dataIndex: string;
    form: string;
    headerStyle?: React.CSSProperties;
    cellStyle?: React.CSSProperties;
    render?: (record: any, key: any) => React.ReactNode;
}

interface Pagination {
    pageSize: number;
    initialPage?: number;
}

interface TableProps {
    columns: ColumnDefinition[];
    data: any[];
    pagination?: Pagination;
    className?: string;
    rowClassName?: string;
    cellClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
    dropdownClassname: string;
    detailedUrl: string;
}

export default function Table({
    columns = [],
    data = [],
    pagination,
    rowClassName,
    cellClassName,
    headerClassName,
    bodyClassName,
    className,
    dropdownClassname = '',
    detailedUrl=''
}: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [diplayedData, setDisplayedData] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdown, setDropdown] = useState([]);

    const getStartPage = () => {
        return (currentPage - 1) * (pagination.pageSize || 10) + 1;
    };

    const getEndPage = () => {
        return Math.min(currentPage * (pagination.pageSize || 10), data.length);
    };

    const dataCallback = useCallback((data)=>{
        setDisplayedData(data);
    }, [data])

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
    }, [currentPage, data]);

    useEffect(()=>{
        const getDataKeys = data?.map((item, i)=>({
            key: i,
            dropdown: false,
        }))
        setDropdown(getDataKeys)
    },[])

    const tableHeader = (
        <div
            className={styles.headerBack}
            onScroll={(event) => {
                const target = event.target as HTMLElement;
                const header = target.parentNode.querySelector(
                    `.${styles.tableBody}`
                );
                if (target.scrollLeft !== header.scrollLeft)
                    header.scrollTo(target.scrollLeft, 0);
            }}
        >
            <div
                className={classNames(
                    styles.tableHeader,
                    styles.tableRowTemplate,
                    rowClassName,
                    headerClassName
                )}
            >
                {columns?.map(({ key, title, headerStyle, dataIndex, form=null }) => {
                    if(dataIndex !== 'hidden'){
                        return (
                            <div
                                className={`${styles.tableHeaderCell} ${styles.tableCellTemplate} ${cellClassName}`}
                                style={headerStyle ? headerStyle : null}
                                key={key}
                            >
                                {title}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );

    const dropdownFunc = (index) => {
        setDropdown((prevState)=>{
            const setNewData = prevState.map((item)=>{
                if(item.key === index){
                    return {...item, dropdown: !item.dropdown}
                }else {
                    return {...item, dropdown: false}
                }
            })
            return setNewData
        })
    }

    return (
        <div className={classNames(styles.table, className)}>
            {tableHeader}
            <div
                className={classNames(styles.tableBody, bodyClassName)}
                onScroll={(event) => {
                    const target = event.target as HTMLElement;
                    const header = target.parentNode.querySelector(
                        `.${styles.headerBack}`
                    );
                    if (target.scrollLeft !== header.scrollLeft)
                        header.scrollTo(target.scrollLeft, 0);
                }}
            >
                {diplayedData.map((record, index) => {
                    return (
                        <>
                            <div 
                                className={classNames(styles.column, {
                                    [styles.columnOpen]: dropdown[index].dropdown,
                                })} 
                                >
                                <div>
                                    <TableRow
                                        columnsDefinition={columns}
                                        record={record}
                                        key={`table-row-${index}`}
                                        rowClassName={rowClassName}
                                        cellClassName={cellClassName}
                                        dropDown={()=> dropdownFunc(index)}
                                        detailedUrl={detailedUrl}
                                    />
                                </div>
                                <div className={classNames(styles.dropdown, dropdownClassname,
                                    {
                                        [styles.statusOpen]: dropdown[index].dropdown,
                                        [styles.statusClosed]: !dropdown[index].dropdown,
                                      }
                                    )}>
                                    {
                                        columns?.map((item, i)=>{
                                            let state = item.form !== 'array_boxes' && item.form !== 'review';
                                            if(item.dataIndex === 'hidden'){
                                                return <>
                                                    <div className={styles.dropdownCol}>
                                                        <h2>{item.title}</h2>
                                                        {
                                                            item.form == 'array_boxes' && 
                                                            <div>
                                                            {
                                                                record[item.key]?.map((e)=>{
                                                                    return <span className={styles.arrayBoxes}>{e}</span>
                                                                })
                                                            }
                                                            </div>
                                                        }

                                                        {
                                                            item.form === 'review' && (
                                                                <div className={styles.reviewBlock}>
                                                                    <ReactSVG
                                                                        src="/images/icons/table/star.svg"
                                                                        className={styles.starBtn}
                                                                    />
                                                                    <span>{record[item.key]}</span>
                                                                </div>
                                                            )
                                                        }
                                                        
                                                        {
                                                            state && <span>{record[item.key]}</span>
                                                        }
                                                    </div>
                                                </>
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
                })}
                
            </div>
            {pagination ? (
                <div className={styles.pagination}>
                    <div
                        className={styles.recordCounter}
                    >{`${getStartPage()}-${getEndPage()} of ${
                        data.length
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
        </div>
    );
}

interface TableRowProps {
    columnsDefinition: ColumnDefinition[];
    record: any;
    rowClassName?: string;
    cellClassName?: string;
    dropDown:any;
    detailedUrl: any;
}

const TableRow = ({
    record,
    columnsDefinition,
    rowClassName,
    cellClassName,
    dropDown,
    detailedUrl
}: TableRowProps) => {
    return (
        <div
            className={classNames(
                styles.tableRow,
                styles.tableRowTemplate,
                rowClassName
            )}
        >
            {columnsDefinition.map(
                ({ dataIndex, render, cellStyle }, index) => {
                    let colLenght = columnsDefinition.filter(e=>e.dataIndex !=='hidden').length;
                    if (render){
                        return <>
                        {
                            index === 0 ? 
                            <div onClick={()=> dropDown()}>
                                {
                                    render(
                                        record[dataIndex],
                                        `data-${record.key}-${index}`,
                                    )
                                }
                            </div> 
                            :
                            (index !== colLenght - 1) ?  
                            <Link href={detailedUrl}>
                                {render(
                                    record[dataIndex],
                                    `data-${record.key}-${index}`,
                                )}
                            </Link> : 
                                render(
                                    record[dataIndex],
                                    `data-${record.key}-${index}`,
                                )
                        }
                        </>
                    }
                    
                    return <>
                    {
                        index === 0 ? 
                        <div
                            className={`${styles.tableCell} ${styles.tableCellTemplate} ${cellClassName}`}
                            key={`data-${record.key}-${index}`}
                            style={cellStyle ? cellStyle : null}
                            onClick={()=> dropDown()}
                        >
                            {record[dataIndex]}
                        </div>
                        :
                        <Link href={detailedUrl}>
                            <div
                                className={`${styles.tableCell} ${styles.tableCellTemplate} ${cellClassName}`}
                                key={`data-${record.key}-${index}`}
                                style={cellStyle ? cellStyle : null}
                            >
                                {record[dataIndex]}
                            </div>
                        </Link>
                    }
                    
                    </>
                }
            )}
        </div>
    );
};
