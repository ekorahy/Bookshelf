import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookItemProps, ReadingStatus } from "../../types";
import { updateBookStatus, deleteBook } from "../../data/local/books"; // Import deleteBook

export default function BookItem({
  id,
  coverImage,
  status: initialStatus,
  title,
  author,
  category,
  description,
}: BookItemProps) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(initialStatus);

  const handleClick = () => {
    navigate(`/detail/${id}`);
  };

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
    deleteBook(id); // Panggil fungsi deleteBook dengan id buku
    // Tambahkan logika lain jika diperlukan setelah penghapusan buku
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
    <div className="relative cursor-pointer overflow-hidden rounded-md pb-14 shadow">
      <div className="relative" onClick={handleClick}>
        <img
          src={coverImage}
          className="h-60 w-full object-cover"
          alt="Cover book image"
        />
        <p className="absolute bottom-4 right-4 rounded-2xl bg-white px-3 py-1">
          {status}
        </p>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="mb-2 flex items-center justify-between">
          <p>{author}</p>
          <p className="font-bold text-slate-400">{category}</p>
        </div>
        <p className="line-clamp-3 text-justify">{description}</p>
        <div className="absolute bottom-4 mt-2 flex justify-between">
          <button
            onClick={handleChangeStatus}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            {getButtonText()}
          </button>
          <button
            onClick={handleDelete}
            className="ml-2 rounded bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
