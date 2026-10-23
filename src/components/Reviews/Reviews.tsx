"use client";

import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { getCamperReviews } from "@/lib/campers";
import { SpinnerCircularFixed } from "spinners-react";
import css from "./Reviews.module.css";

interface ReviewsProps {
  camperId: string;
}

export default function Reviews({ camperId }: ReviewsProps) {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["camperReviews", camperId],
    queryFn: () => getCamperReviews(camperId),
  });

  if (isLoading) {
    return (
      <div className={css.loading}>
        <SpinnerCircularFixed
          size={72}
          thickness={100}
          speed={100}
          color="#101828"
          secondaryColor="rgba(16, 24, 40, 0.2)"
        />
      </div>
    );
  }

  if (isError) {
    return <p>Failed to load reviews. Please try again later.</p>;
  }

  if (!reviews?.length) {
    return <p>No reviews yet.</p>;
  }

  return (
    <ul className={css.reviews}>
      {reviews.map((review) => (
        <li key={review.id} className={css.review}>
          <div className={css.reviewHeader}>
            <div className={css.avatar} aria-hidden="true">
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>

            <div className={css.wrapper}>
              <h3 className={css.reviewerName}>{review.reviewer_name}</h3>
              <div
                className={css.rating}
                aria-label={`Rating: ${review.reviewer_rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < review.reviewer_rating
                        ? css.starFilled
                        : css.starEmpty
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
