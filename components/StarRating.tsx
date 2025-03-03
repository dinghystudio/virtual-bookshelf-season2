"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateBookRatingAction } from "@/app/actions/bookActions";

function StarRatingWrapper({
  standalone,
  bookId,
  ...props
}: {
  standalone?: boolean;
  bookId: number;
  filledStars: number;
}) {
  const [id] = useState(bookId);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFormSubmit() {
    formRef.current?.requestSubmit();
  }

  if (standalone) {
    return (
      <form ref={formRef} action={updateBookRatingAction}>
        <StarRating {...props} submitHandler={handleFormSubmit} />
        <input type="hidden" name="id" value={id} />
      </form>
    );
  }

  return <StarRating {...props} />;
}

function StarRating({
  filledStars,
  submitHandler,
}: {
  filledStars: number;
  submitHandler?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(filledStars);

  function onClickStar(starIndex: number) {
    if (isEditing) {
      setRating(starIndex);
    }
  }

  useEffect(() => {
    if (submitHandler && rating !== filledStars) {
      submitHandler();
    }
  }, [rating]);

  return (
    <>
      <input type="hidden" name="rating" value={rating} />
      <figure
        className="flex text-yellow-500"
        onMouseEnter={() => setIsEditing(true)}
        onMouseLeave={() => setIsEditing(false)}
      >
        {Array.from(Array(5).keys()).map((key) => (
          <Star
            key={key}
            size={24}
            className={cn(
              isEditing &&
                "stroke-yellow-500 hover:fill-yellow-500 cursor-pointer has-[~_&:hover]:fill-yellow-500",
              !isEditing && key + 1 <= rating && "fill-yellow-500"
            )}
            onClick={() => onClickStar(key + 1)}
          />
        ))}
      </figure>
    </>
  );
}

export default StarRatingWrapper;
