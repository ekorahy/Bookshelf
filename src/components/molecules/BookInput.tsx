import { useState } from "react";
import { Book, BookInputProps, initialFormData } from "../../types";

export default function BookInput({ onSave }: BookInputProps) {
  const [formData, setFormData] = useState<Book>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      id: +new Date(),
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      cover_image: formData.cover_image || "/default_cover.png",
    };
    onSave(dataToSave);
    setFormData(initialFormData);
  };

  const labelClassName = "flex flex-col gap-2";
  const inputClassName = "rounded-md border border-gray-300 p-2 outline-none";

  return (
    <form
      className="grid grid-cols-1 gap-4 rounded-md bg-white"
      onSubmit={handleSubmit}
    >
      <label className={labelClassName}>
        <span className="font-semibold">Book Cover (URL)</span>
        <input
          type="text"
          className={inputClassName}
          name="cover_image"
          value={formData.cover_image}
          onChange={handleChange}
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">Title*</span>
        <input
          type="text"
          className={inputClassName}
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">Author*</span>
        <input
          type="text"
          className={inputClassName}
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">ISBN*</span>
        <input
          type="text"
          className={inputClassName}
          name="ISBN"
          value={formData.ISBN}
          onChange={handleChange}
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">Category/Genre*</span>
        <input
          type="text"
          className={inputClassName}
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">Description*</span>
        <textarea
          className={`${inputClassName} min-h-40`}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">Publication Date (Year)*</span>
        <input
          type="text"
          className={inputClassName}
          name="publication_date"
          value={formData.publication_date}
          onChange={handleChange}
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">Publisher*</span>
        <input
          type="text"
          className={inputClassName}
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">Language*</span>
        <input
          type="text"
          className={inputClassName}
          name="language"
          value={formData.language}
          onChange={handleChange}
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">Page Count*</span>
        <input
          type="number"
          className={inputClassName}
          name="page_count"
          value={formData.page_count}
          onChange={handleChange}
        />
      </label>
      <label className={labelClassName}>
        <span className="font-semibold">Status*</span>
        <select
          className={inputClassName}
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="not read">Not Read</option>
          <option value="currently reading">Currently Reading</option>
          <option value="read">Read</option>
        </select>
      </label>
      <button
        type="submit"
        className="mt-4 rounded-md bg-slate-400 p-2 text-white hover:bg-slate-500"
      >
        Save Book
      </button>
    </form>
  );
}
