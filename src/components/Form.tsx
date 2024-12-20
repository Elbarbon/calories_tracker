import { categories } from "../data/category"

export default function Form() {
  return (
    <form
      className="space-y-5 bg-white p-10 rounder-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="">Categoria</label>
        <select
          className="border border-slate-300 p-2 rounder-lg w-full bg-white" id="category"
        >
          
        </select>
      </div>
    </form>
  )
}
