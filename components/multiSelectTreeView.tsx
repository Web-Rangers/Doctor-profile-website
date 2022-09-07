import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Link from 'next/link';
import styles from 'styles/components/multiSelectTree.module.scss';
import { CheckBox } from 'components';
import Select from 'react-select';
import { style } from '@mui/system';
import {useEffect, useState, useCallback} from 'react';
import {ReactSVG} from 'react-svg';

interface RenderTree {
    id: string;
    title: string;
    children?: readonly RenderTree[];
}
  
export default function RichObjectTreeView({
    data,
    pagination
}) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [diplayedData, setDisplayedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const renderTree = (nodes: RenderTree) => {
        return (<TreeItem key={nodes?.id} nodeId={nodes?.id} label={
            <>
                <div className={styles.table}>
                    <div className={styles.checkbox}><CheckBox id={nodes?.id} /></div>
                    <div>{nodes?.title}</div>
                    <div>{nodes?.id}</div>
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
        return Math.min(currentPage * (pagination.pageSize || 10), data.length);
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
        </>
}
  