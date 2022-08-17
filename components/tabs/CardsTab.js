import {useState} from 'react';
import {Card, Button} from 'components';
import styles from 'styles/components/Tabs/CardsTab.module.scss';
import { ReactSVG } from "react-svg";
import classNames from "classnames";
import Image from 'next/image';

export default function CardsTab() {
    const cardList = [{
        name:'Silver Card',
        price: 120,
        cost_for_family_members: 20,
        expiration_date: '1 year',
        id: '123456789',
        promotion: 'Nominal',
        card_type: 'Percentage',
        buffer: '5 days',
        image: '../images/cards/card.png'
    },
    {
        name:'Gold card',
        price: 500,
        cost_for_family_members: 400,
        expiration_date: '5 month',
        id: '123456789',
        promotion: 'Nominal',
        card_type: 'Percentage',
        buffer: '5 days',
        image: '../images/cards/card.png'
    },
    {
        name:'Platinum card',
        price: 120,
        cost_for_family_members: 20,
        expiration_date: '1 year',
        id: '123456789',
        promotion: 'Nominal',
        card_type: 'Percentage',
        buffer: '5 days',
        image: '../images/cards/card.png'
    }]

    return <>
        <Card 
            className={styles.cards}
            cardTitle="Cards"
        >
            <Button 
                size="large"
                variant='fill'
                label='Add new card'
                className={styles.addNewCard}
            />
            {
                cardList.map((card)=>{
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [isOpen, setIsOpen] = useState(false)
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [isModalOpen, setModalOpen] = useState(false)

                    return <>
                        {
                            isModalOpen && 
                            // eslint-disable-next-line react/jsx-no-undef
                            <EditCard 
                                onCancel={()=> setModalOpen(false)}
                                onClose={()=> setModalOpen(false)}
                                onSave={()=> setModalOpen(false)}
                            />
                        }
                        <div className={styles.cardContainer}>
                            <div className={styles.cardBlock}>
                                <div className={styles.cardImage}>
                                    <Image src={card.image} alt="" />
                                </div>
                                <div className={styles.cardInfo}>
                                    <h2 className={styles.cardTitle}>{card.name}</h2>
                                    <div className={styles.aboutCard}>
                                        <div>
                                            <h2>Price</h2>
                                            <span>{card.price}</span>
                                        </div>
                                        <div>
                                            <h2>Cost for family members</h2>
                                            <span>{card.cost_for_family_members}</span>
                                        </div>
                                        <div>
                                            <h2>Expiration date</h2>
                                            <span>{card.expiration_date}</span>
                                        </div>
                                    </div>
                                    <div className={styles.cardBtns}>
                                        <Button label="History" size="large" variant="fill" />
                                        <div 
                                            className={styles.seeAllBtn} 
                                            onClick={()=>setIsOpen(!isOpen)}
                                        >
                                            <ReactSVG 
                                                src={"/images/icons/table/arrow.svg"} 
                                                className={classNames(styles.arrowIcon, {
                                                    [styles.rotateArrow]: isOpen
                                                })}
                                            />
                                            <span>{!isOpen ? 'See all' : 'Сollapse'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.editBtn}>
                                    <ReactSVG 
                                        src={"/images/icons/offer/edit.svg"} 
                                        className={classNames(styles.editIcon)}
                                        onClick={()=> setModalOpen(!isModalOpen)}
                                    />
                                </div>
                                <div></div>
                            </div>
                            <div className={classNames(styles.cardDropdown, {
                                [styles.activeDropdown]: isOpen
                            })}>
                                <div>
                                    <h2>id</h2>
                                    <span>{card.id}</span>
                                </div>
                                <div>
                                    <h2>Promotion</h2>
                                    <span>{card.promotion}</span>
                                </div>
                                <div>
                                    <h2>Card type</h2>
                                    <span>{card.card_type}</span>
                                </div>
                                <div>
                                    <h2>Buffer</h2>
                                    <span>{card.buffer}</span>
                                </div>
                            </div>
                        </div>
                    </>
                })
            }
        </Card>
    </>
}