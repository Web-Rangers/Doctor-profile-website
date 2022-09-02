import { useState, useEffect } from 'react';
import styles from 'styles/components/Table.module.scss';
import Select from 'react-select';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { Button } from 'components';
import Link from 'next/link';

interface ColumnDefinition {
    key: string;
    title: string;
    dataIndex: string;
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
    detailedUrl?: string;
    querys?: string;
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
    detailedUrl = '',
    querys
}: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [diplayedData, setDisplayedData] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

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
        if (!pagination) return setDisplayedData(data);
        setSelectedOption(options[currentPage - 1]);
        setOptions(
            Array.from(
                Array(
                    Math.ceil(data.length / (pagination.pageSize || 10))
                ).keys()
            ).map((i) => ({ value: i + 1, label: i + 1 }))
        );
        setDisplayedData(
            data.slice(
                (currentPage - 1) * (pagination.pageSize || 10),
                currentPage * (pagination.pageSize || 10)
            )
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, data]);

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
                {columns.map(({ key, title, headerStyle }) => {
                    return (
                        <div
                            className={`${styles.tableHeaderCell} ${styles.tableCellTemplate} ${cellClassName}`}
                            style={headerStyle ? headerStyle : null}
                            key={key}
                        >
                            {title}
                        </div>
                    );
                })}
            </div>
        </div>
    );

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
                {diplayedData?.map((record, index) => (
                    <TableRow
                        columnsDefinition={columns}
                        record={record}
                        key={`table-row-${index}`}
                        rowClassName={rowClassName}
                        cellClassName={cellClassName}
                        detailedUrl={detailedUrl}
                        querys={querys}
                    />
                ))}
            </div>
            {pagination ? (
                <div className={styles.pagination}>
                    <div
                        className={styles.recordCounter}
                    >{`${getStartPage()}-${getEndPage()} of ${data.length
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
                                className={`${styles.paginationBtn} ${currentPage === 1 ? styles.disable : ''
                                    }`}
                                onClick={() => {
                                    setCurrentPage((origin) => origin - 1);
                                }}
                            />
                            <ReactSVG
                                src="/images/icons/paginator/next.svg"
                                className={`${styles.paginationBtn} ${currentPage === options.length
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
    detailedUrl: string;
    querys?: string;
}

const TableRow = ({
    record,
    columnsDefinition,
    rowClassName,
    cellClassName,
    detailedUrl,
    querys
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
                    if (render) {
                        return <>
                            {
                                index !== columnsDefinition.length - 1 ?
                                    <Link href={{ pathname: detailedUrl, query: { id: record['id'], parentId: [`${querys}`] } }}>
                                        {render(
                                            record[dataIndex],
                                            `data-${record.key}-${index}`
                                        )}
                                    </Link> : render(
                                        record[dataIndex],
                                        `data-${record.key}-${index}`
                                    )
                            }
                        </>
                    }
                    return <>
                        {
                            index !== columnsDefinition.length + 1 ? 
                            (
                                <Link href={{ pathname: detailedUrl, query: { id: record['id'] } }}>
                                    <div
                                        className={`${styles.tableCell} ${styles.tableCellTemplate} ${cellClassName}`}
                                        key={`data-${record.key}-${index}`}
                                        style={cellStyle ? cellStyle : null}
                                    >
                                        {record[dataIndex]}
                                    </div>
                                </Link>
                                ) : <div
                                    className={`${styles.tableCell} ${styles.tableCellTemplate} ${cellClassName}`}
                                    key={`data-${record.key}-${index}`}
                                    style={cellStyle ? cellStyle : null}
                                >
                                    {record[dataIndex]}
                                </div>
                        }
                    </>
                }
            )}
        </div>
    );
};
