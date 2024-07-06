import { useState } from "react";
import { BookItemProps, ReadingStatus } from "../../types";
import { updateBookStatus, deleteBook } from "../../data/local/books";
import { RiDeleteBinLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { BiCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function BookItem({
  id,
  coverImage,
  status: initialStatus,
  title,
  author,
  category,
  description,
}: BookItemProps) {
  const [status, setStatus] = useState(initialStatus);

  const handleChangeStatus = () => {
    let newStatus: ReadingStatus;

    switch (status) {
      case "not read":
        newStatus = "currently reading";
        break;
      case "currently reading":
        newStatus = "read";
        break;
      case "read":
        newStatus = "not read";
        break;
      default:
        newStatus = "not read";
        break;
    }

    setStatus(newStatus);
    updateBookStatus(id, newStatus);
  };

  const handleDelete = () => {
    deleteBook(id);
  };

  const getButtonText = () => {
    switch (status) {
      case "not read":
        return "Mark as Currently Reading";
      case "currently reading":
        return "Mark as Read";
      case "read":
        return "Mark as Not Read";
      default:
        return "Change Status";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-md pb-14 shadow">
      <div className="relative">
        <img
          src={coverImage}
          className="h-60 w-full object-cover"
          alt="Cover book image"
        />
        <p className="absolute bottom-4 right-4 rounded-2xl bg-white px-3 py-1">
          {status}
        </p>
      </div>
      <div className="p-3">
        <h3 className="w-max text-lg font-bold underline hover:text-slate-500">
          <Link to={`/detail/${id}`}>{title}</Link>
        </h3>
        <div className="mb-2 flex items-center justify-between">
          <p className="flex items-center gap-2">
            <VscAccount /> {author}
          </p>
          <p className="flex items-center gap-2 text-slate-400">
            <BiCategoryAlt /> {category}
          </p>
        </div>
        <p className="line-clamp-3 text-justify">{description}</p>
        <div className="absolute bottom-4 mt-2 flex gap-2">
          <button
            onClick={handleChangeStatus}
            className="rounded bg-slate-400 px-4 py-2 text-white hover:bg-slate-500"
          >
            {getButtonText()}
          </button>
          <button
            onClick={handleDelete}
            className="rounded bg-red-400 px-4 py-2 text-white hover:bg-red-500"
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
    </div>
  );
}
