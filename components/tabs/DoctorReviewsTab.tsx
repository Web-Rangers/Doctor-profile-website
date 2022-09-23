import styles from '/styles/components/Tabs/DoctorReviewsTab.module.scss';
import StarRatings from 'react-star-ratings';
import { Card, Button, Table } from 'components';
import AddDoctorServiceModal from 'components/modals/AddDoctorServiceModal';
import EditDoctorServiceModal from 'components/modals/EditDoctorServiceModal';

interface ReviewProps {
    author: string;
    rating: number;
    comment: string;
    key?: any;
}

interface DoctorReviewsTabProps {
    doctorId: string;
}

function Review({ author, rating, comment, ...props }: ReviewProps) {
    return (
        <div className={styles.review}>
            <div className={styles.row}>
                <div className={styles.author}>{author}</div>
                <div className={styles.rating}>
                    <StarRatings
                        rating={rating}
                        starRatedColor="#FFC14E"
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="2.5px"
                        // className={styles.rating}
                    ></StarRatings>
					<span className={styles.currentRating}>{`${rating} / `}</span>
					<span>{` 5`}</span>
                </div>
            </div>
			<div className={styles.comment}>{comment}</div>
        </div>
    );
}

export default function DoctorReviewsTab({ doctorId }: DoctorReviewsTabProps) {
    const reviews: ReviewProps[] = [
        {
            author: 'Wade Warren',
            comment:
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            rating: 4,
        },
        {
            author: 'Wade Warren',
            comment:
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            rating: 4.5,
        },
        {
            author: 'Wade Warren',
            comment:
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            rating: 3,
        },
        {
            author: 'Wade Warren',
            comment:
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            rating: 5,
        },
        {
            author: 'Wade Warren',
            comment:
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            rating: 3.5,
        },
    ];
    return (
        <Card cardTitle="Reviews" className={styles.reviews}>
            {reviews.map((review, i) => (
                <Review key={i} {...review} />
            ))}
        </Card>
    );
}
