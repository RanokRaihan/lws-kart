import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarRating = ({ rating, color = "gold" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="star-rating">
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} color={color} />
        ))}
      {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} color={color} />}
      {Array(Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0)))
        .fill(null)
        .map((_, index) => (
          <FontAwesomeIcon
            key={index + fullStars + (hasHalfStar ? 1 : 0)}
            icon={faStar}
            color="lightgray"
          />
        ))}
    </div>
  );
};

export default StarRating;
