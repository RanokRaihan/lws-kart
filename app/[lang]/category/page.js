import { createCategory } from "@/actions";

export default function categoryAddPage() {
  return (
    <div className="p-6 max-w-[450px] mx-auto">
      <form action={createCategory} autoComplete="off">
        <div className="flex flex-col">
          <label htmlFor="name">name</label>
          <input type="text" name="name" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="link">Link</label>
          <input type="text" name="link" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image">image</label>
          <input type="text" name="image" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="icon">icon</label>
          <input type="text" name="icon" />
        </div>
        <div className="flex flex-col">
          <button
            className=" bg-blue-500 text-white rounded-md inline-block my-4 py-2"
            type="submit"
          >
            save
          </button>
        </div>
      </form>
    </div>
  );
}
