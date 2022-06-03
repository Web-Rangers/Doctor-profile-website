import { useState, useEffect } from "react";
import styles from "../styles/components/Table.module.css";
import Select from "react-select";
import { ReactSVG } from "react-svg";

export default function Table({ columns, data, pagination }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [diplayedData, setDisplayedData] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const selectPage = (selectedOption) => {
        setCurrentPage(selectedOption.value);
        setSelectedOption(selectedOption);
    };

    useEffect(() => {
        if (!pagination)
            return setDisplayedData(data);
        setSelectedOption(options[currentPage - 1]);
        setOptions(Array.from(Array(Math.ceil(data.length / (pagination.pageSize || 10))).keys()).map(i => ({ value: i + 1, label: i + 1 })));
        setDisplayedData(data.slice((currentPage - 1) * (pagination.pageSize || 10), currentPage * (pagination.pageSize || 10)));
    }, [currentPage])

    return (<div className={styles.table}>
        <div className={`${styles.tableHeader} ${styles.tableRowTemplate}`}>
            {columns.map(({ key, title, headerStyle }) => {
                return (
                    <div className={`${styles.tableHeaderCell} ${styles.tableCellTemplate}`} style={headerStyle ? headerStyle : null} key={key}>
                        {title}
                    </div>
                )
            })}
        </div>
        {diplayedData.map((record, index) => <TableRow columnsDefinition={columns} record={record} key={`table-row-${index}`} />)}
        {pagination ? (
            <div className={styles.pagination}>
                <div className={styles.recordCounter}>{`${(currentPage - 1) * (pagination.pageSize || 10) + 1}-${(currentPage - 1) * (pagination.pageSize || 10) + (pagination?.pageSize || 10)} of ${data.length} records`}</div>
                <div className={styles.paginationControls}>
                    <span className={styles.paginatorTitle}>The page you’er on</span>
                    {options.length > 0 && (<Select
                        className={styles.pageSelect}
                        options={options}
                        placeholder=""
                        defaultValue={options[0]}
                        menuPlacement="top"
                        value={selectedOption}
                        onChange={selectPage} />)}
                    <div className={styles.paginationButtons}>
                        <ReactSVG src="/images/icons/paginator/prev.svg" className={`${styles.paginationBtn} ${currentPage === 1 ? styles.disable : ""}`} onClick={() => { setCurrentPage(origin => origin - 1) }}></ReactSVG>
                        <ReactSVG src="/images/icons/paginator/next.svg" className={`${styles.paginationBtn} ${currentPage === options.length ? styles.disable : ""}`} onClick={() => { setCurrentPage(origin => origin + 1) }}></ReactSVG>
                    </div>

                </div>
            </div>
        ) : null}
    </div>);
}

const TableRow = ({ record, columnsDefinition }) => {
    return (
        <div className={`${styles.tableRow} ${styles.tableRowTemplate}`}>
            {columnsDefinition.map(({ dataIndex, render }, index) => {
                if (render)
                    return render(record[dataIndex], `data-${record.key}-${index}`);
                return (
                    <div className={`${styles.tableCell} ${styles.tableCellTemplate}`} key={`data-${record.key}-${index}`} >
                        {record[dataIndex]}
                    </div>
                );
            }
            )
            }
        </div >
    )
}