import styles from 'styles/components/Record/ServicesForRecord.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Select from 'react-select'
import { ReactSVG } from 'react-svg'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ServicesForRecord({services = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]}) {
    const [currentPage, setCurrentPage] = useState([])    
    const [currentPageNumber, setCurrentPageNumber] = useState(0)
    const [canNextPage, setCanNextPage] = useState(false)
    const [canPreviousPage, setCanPreviousPage] = useState(false)

    useEffect(()=>{
        setCurrentPage(services.slice(currentPageNumber*6,currentPageNumber*6+6))
        setCanNextPage(services.length>currentPageNumber*6+6)
        setCanPreviousPage(currentPageNumber>0)
    },[currentPageNumber])

    return (
        <>
            <div className={styles.services}>
                {currentPage.map((service) => (
                    <ServiceBlock key={`service-${service}`} service={null} co={service} />
                ))}
            </div>
            <div className={styles.pagination}>
                <span>
                    {currentPageNumber*6+1}-{currentPageNumber*6+6<services.length ? currentPageNumber*6+6 : services.length} of {services.length}
                </span>
                <div className={styles.pageSelection}>
                    <span>The page you are on</span>
                    <Select
                        options={Array.apply(null, Array(Math.trunc(services.length/6)+1)).map((x, i) => ({ value: i + 1, label: i + 1 }))}
                        onChange={(newValue) => setCurrentPageNumber(newValue?.value - 1)}
                        value={{ value: currentPageNumber + 1, label: currentPageNumber + 1 }}
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
                        onClick={() => setCurrentPageNumber(currentPageNumber-1)}
                    />
                    <ReactSVG
                        src="/images/icons/paginator/next.svg"
                        className={`${styles.paginationBtn} ${!canNextPage ? styles.disabled : ""}`}
                        onClick={() => setCurrentPageNumber(currentPageNumber+1)}
                    />
                </div>
            </div>
        </>
    )
}
// DELETE 'co'
// DELETE 'co'
// DELETE 'co'
// DELETE 'co'
// DELETE 'co'
// DELETE 'co'
// DELETE 'co'
// DELETE 'co'
// DELETE 'co'
function ServiceBlock({service, co}) {
	const [open, setOpen] = useState(false)
	const router = useRouter()

	const makeAnEntry = () => {
		router.push({query:{id: 'test', service: 'test'}})
	}

	return (
		<div 
			className={styles.serviceBlock}
			style={
				open ?
				{	
					boxShadow: "0px 4px 6px rgba(190, 187, 203, 0.25)",
					borderLeft: "3px solid #2751F2",
                    marginBottom: 8
				}
				:
				{}
			}
		>
			<div 
				className={styles.serviceHeader}
                style={ open ? { background: "#F4F7FF" } : {} }
				onClick={() => setOpen(!open)}
			>
				<span>{co}Service</span>
				<motion.div 
					className={styles.chevron}
					style={ 
						open ? 
						{ transform: "" } 
						: 
						{ transform: "rotateZ(-90deg)" }
					}
				>
					<Image 
						src="/images/icons/inputs/chevron.svg"
						width={24}
						height={24}
					/>
				</motion.div>						
			</div>
			<motion.div 
				className={styles.services}
				transition={{ease:"easeInOut", duration: 0.2}}
				initial={
					open ? 
					{ 
						height: "auto"
					} 
					: 
					{ 
						height: "0px"
					}
				}
				animate={ 
					open ? 
					{ 
						height: "auto"
					} 
					: 
					{ 
						height: "0px"
					}
				}
			>
				<div className={styles.serviceTable}>
					<table className={styles.table}>
						<tbody>
							<tr>
								<td>Title</td>
								<td>
									<div 
										className={styles.edit}
										onClick={makeAnEntry}
									>
										<Image 
                	        			    src="/images/icons/tabs/plus-circle.svg"
                	        			    width={20}
                	        			    height={20}
                	        			    alt=""
                	        			    onClick={() => {}}
                	        			/>
                                        Make an entry
									</div>						
								</td>
							</tr>
                            <tr>
								<td>Title</td>
								<td>
									<div 
										className={styles.edit}
										onClick={makeAnEntry}
									>
										<Image 
                	        			    src="/images/icons/tabs/plus-circle.svg"
                	        			    width={20}
                	        			    height={20}
                	        			    alt=""
                	        			    onClick={() => {}}
                	        			/>
                                        Make an entry
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</motion.div>
		</div>
	)
}