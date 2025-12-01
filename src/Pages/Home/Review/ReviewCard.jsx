import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review: reviewData }) => {
  // console.log(reviewData);
  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-sm">
      {/* Quote Icon */}
      <div className="text-teal-900 text-2xl mb-2">
        <FaQuoteLeft />
      </div>

      {/* Review Text */}
      <p className="text-gray-700 italic mb-4">{reviewData?.review}</p>

      {/* Divider */}
      <hr className="border-gray-200 my-4" />

      {/* Author Info */}
      <div className="flex items-center mt-2">
        <div className="w-10 h-10 rounded-full bg-teal-900 mr-3"></div>
        <div>
          <p className="font-semibold text-gray-900">{reviewData.userName}</p>
          <p className="text-gray-500 text-sm">{reviewData?.user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
