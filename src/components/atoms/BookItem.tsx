import { BookItemProps } from "../../types";

export default function BookItem({
  coverImage,
  status,
  title,
  author,
  category,
  description,
}: BookItemProps) {
  return (
    <div className="shadow rounded-md overflow-hidden">
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
        <div className="flex items-center justify-between mb-2">
          <p>{author}</p>
          <p className="font-bold text-slate-400">{category}</p>
        </div>
        <p className="line-clamp-3 text-justify">{description}</p>
      </div>
    </div>
  );
}
