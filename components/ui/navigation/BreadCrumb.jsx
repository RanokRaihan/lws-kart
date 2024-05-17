import { faChevronRight, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const BreadCrumb = ({ currentPage }) => {
  return (
    <div className="container py-4 flex items-center gap-3">
      <Link href="/" className="text-primary text-base">
        <FontAwesomeIcon icon={faHouse} className="size-4" />
      </Link>
      <span className="text-sm text-gray-400">
        <FontAwesomeIcon icon={faChevronRight} className="size-4" />
      </span>
      <p className="text-gray-600 font-medium">{currentPage}</p>
    </div>
  );
};

export default BreadCrumb;
