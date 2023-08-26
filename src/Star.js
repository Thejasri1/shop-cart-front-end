/** @format */

import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Star = ({ star }) => {
  let ratingsStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return star >= index + 1 ? (
      <FaStar style={{ color: "goldenrod" }} />
    ) : star >= number ? (
      <FaStarHalfAlt style={{ color: "goldenrod" }} />
    ) : (
      <AiOutlineStar style={{ color: "goldenrod" }} />
    );
  });
  return <div>{ratingsStar}</div>;
};
export default Star;
