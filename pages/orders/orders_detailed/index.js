import { useState } from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import styles from 'styles/pages/ordersDetailed.module.scss';
import { Card, Input, Button } from 'components';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import classNames from 'classnames';

export default function OrdersDetailed() {
    const [commentValue, setCommentValue] = useState('');

    const [comments, setComments] = useState([
        {
            name: 'Katona Beatrix',
            time: '10:00',
            message:
                'The specialist approached me very well, and the consultations helped. It seemed to me that his approach was very gentle, he behaved very professionally. Thank you!',
            image: '/images/users/user3.png',
        },
        {
            name: 'Brooklyn Simmons',
            time: '10:00',
            message:
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
            image: '/images/users/user2.png',
        },
    ]);

    const transaction_keys = [
        {
            key: 'transaction_id',
            title: 'Transaction id',
        },
        {
            key: 'date',
            title: 'Date',
        },
        {
            key: 'destination',
            title: 'Destination',
        },
        {
            key: 'amount',
            title: 'Amount',
        },
        {
            key: 'refunded',
            title: 'Refunded',
        },
    ];

    const transaction_date = [
        {
            transaction_id: '745983985',
            date: '03.05.2020',
            destination: 'Doctor',
            amount: '100',
            refunded: '142',
        },
        {
            transaction_id: '745983985',
            date: '03.05.2020',
            destination: 'Doctor',
            amount: '100',
            refunded: '142',
        },
        {
            transaction_id: '745983985',
            date: '03.05.2020',
            destination: 'Doctor',
            amount: '100',
            refunded: '142',
        },
        {
            transaction_id: '745983985',
            date: '03.05.2020',
            destination: 'Doctor',
            amount: '100',
            refunded: '142',
        },
    ];

    const addComment = () => {
        const body = {
            name: 'Katona Beatrix',
            role: 'Patient',
            message: commentValue,
            image: '../images/users/user2.png',
        };

        if (commentValue !== '') {
            setComments((prevComments) => [...prevComments, body]);

            setCommentValue('');
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerLeft}>
                        <h3>Orders</h3>
                    </div>
                    <div className={styles.headerRight}>
                        <Breadcrumbs
                            omitRootLabel={true}
                            listClassName={styles.breadcrumbs}
                            replaceCharacterList={[{ from: '_', to: ' ' }]}
                        />
                    </div>
                </div>

                <Card className={classNames(styles.order, styles.done)}>
                    <div className={styles.orderBlock}>
                        <div>
                            <h2>Cameron Williamson</h2>
                        </div>
                        <div className={styles.more}>
                            <ReactSVG src="../images/icons/offer/more.svg" />
                        </div>
                    </div>

                    <div className={styles.orderTable}>
                        <div>
                            <h2>Email</h2>
                            <span>Cameron@gmail.com</span>
                        </div>
                        <div>
                            <h2>Phone number</h2>
                            <span>(239) 555-0108</span>
                        </div>
                        <div>
                            <h2>Patient id</h2>
                            <span>469356911</span>
                        </div>
                        <div>
                            <h2>Order id</h2>
                            <span>469356911</span>
                        </div>
                        <div>
                            <h2>Status</h2>
                            <span>
                                <span className={styles.done}></span>
                                Done
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className={styles.mitingCard}>
                    <div className={styles.column}>
                        <div className={styles.title}>Meeting link</div>
                        <div className={styles.value}>
                            https://meet.google.com/ekz-wrmw-fdd
                        </div>
                    </div>
                    <Button
                        className={styles.callBtn}
                        size="large"
                        variant="fill"
                        label="Start call"
                        icon={
                            <ReactSVG src={'/images/icons/inputs/phone.svg'} />
                        }
                    />
                </Card>

                <Card className={styles.mitingCard}>
                    <div className={styles.column}>
                        <div className={styles.title}>Name of service</div>
                        <div className={styles.value}>Diagnostics</div>
                        <div className={styles.title}>Name of subservice</div>
                        <div className={styles.value}>
                            Electroencephalography with video monitoring (EEG
                            video)
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.title}>
                            Estimated service time
                        </div>
                        <div className={styles.value}>30 min</div>
                        <div className={styles.title}>
                            Estimated service time
                        </div>
                        <div className={styles.value}>29.04.2022 11:30 am</div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.title}>Price</div>
                        <div className={styles.value}>1540</div>
                        <div className={styles.title}>Platform Commission</div>
                        <div className={styles.value}>156</div>
                    </div>
                </Card>

                <Card cardTitle="Chat" className={styles.comments}>
                    <div className={styles.commentList}>
                        {comments?.map((comment, i) => {
                            return (
                                <>
                                    <div
                                        className={classNames(
                                            styles.commentForm,
                                            { [styles.answer]: i % 2 != 0 }
                                        )}
                                    >
                                        <div className={styles.image}>
                                            <img src={comment.image} alt="" />
                                        </div>
                                        <div className={styles.commentInfo}>
                                            <p>{comment.message}</p>
                                            <span>{comment.time}</span>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div className={styles.inputContainer}>
                        <ReactSVG src={'/images/icons/inputs/paper-clip.svg'}/>
                        <Input placeholder='Type your message' className={styles.input}/>
                        <div className={styles.send}>
                            <ReactSVG src={'/images/icons/inputs/paper-airplane.svg'}/>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

OrdersDetailed.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
