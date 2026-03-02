'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import styles from './ReviewsList.module.scss';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getAllReviews } from '@/redux/slices/reviewSlice';

export default function ReviewsList() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  
  const { reviews, loading, error } = useAppSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    if (id) {
      dispatch(getAllReviews(id as string));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>

      {reviews?.length === 0 && <p>No reviews yet</p>}

      {reviews?.map((review) => (
        <div key={review._id} className={styles.reviewCard}>
          <div className={styles.rating}>
            {'⭐'.repeat(review.rating)}
          </div>

          <p className={styles.comment}>{review.comment}</p>

          <p className={styles.user}>
            - {review.userId?.firstName} {review.userId?.lastName}
          </p>
        </div>
      ))}
    </div>
  );
}