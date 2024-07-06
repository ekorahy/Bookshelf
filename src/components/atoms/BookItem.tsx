import { useNavigate } from "react-router-dom";
import { BookItemProps } from "../../types";

export default function BookItem({
  id,
  coverImage,
  status,
  title,
  author,
  category,
  description,
}: BookItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-md shadow"
      onClick={handleClick}
    >
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
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="mb-2 flex items-center justify-between">
          <p>{author}</p>
          <p className="font-bold text-slate-400">{category}</p>
        </div>
        <p className="line-clamp-3 text-justify">{description}</p>
      </div>
    </div>
  );
}
