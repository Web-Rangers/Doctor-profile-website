import React from "react";
import { useTable, usePagination } from "react-table";
import styles from "styles/components/TableStaff.module.css";
import { ReactSVG } from "react-svg";
import Select from "react-select";
import Link from "next/link";

function TableStaff({ columns, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
		},
		usePagination
	);

	return (
		<>
			<div className={styles.tableWrap}>
				<table
					{...getTableProps()}
					className={styles.table}
					cellPadding={0}
					cellSpacing={0}
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr
								key={`header_row_${index}`}
								{...headerGroup.getHeaderGroupProps()}
							>
								{headerGroup.headers.map((column, index) => (
									<th
										key={`header_column_${index}`}
										{...column.getHeaderProps()}
									>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<Link
									key={row.original.id}
									href={`/staff/${row.original.id}`}
								>
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => {
											return (
												<td
													key={cell}
													{...cell.getCellProps()}
												>
													{cell.render("Cell")}
												</td>
											);
										})}
									</tr>
								</Link>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className={styles.pagination}>
				<span>
					{pageIndex * pageSize + 1}-{pageIndex * pageSize + page?.length} of {data?.length}
				</span>
				<div className={styles.pageSelection}>
					<span>The page you are on</span>
					<Select
						options={Array.apply(null, Array(pageCount)).map((x, i) => ({ value: i + 1, label: i + 1 }))}
						onChange={(newValue) => gotoPage(newValue?.value - 1)}
						defaultValue={{ value: pageIndex + 1, label: pageIndex + 1 }}
						styles={{
							control: (provided, state) => ({
								...provided,
								border: state.isFocused ? "1px solid #2751f2" : "1px solid #B3B1BB",
								fontWeight: 600,
							}),
						}}
					/>
				</div>
				<div className={styles.paginationButtons}>
					<ReactSVG
						src="/images/icons/paginator/prev.svg"
						className={`${styles.paginationBtn} ${!canPreviousPage ? styles.disabled : ""}`}
						onClick={() => previousPage()}
					/>
					<ReactSVG
						src="/images/icons/paginator/next.svg"
						className={`${styles.paginationBtn} ${!canNextPage ? styles.disabled : ""}`}
						onClick={() => nextPage()}
					/>
				</div>
			</div>
		</>
	);
}

export default TableStaff;