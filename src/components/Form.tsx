import {Dispatch, useEffect, useState} from "react"
import {v4 as uuidv4} from "uuid"
import { Activity } from "../types"
import { categories } from "../data/category"
import { ActivityActions } from "../reducers/activityReducer"
import { ActivityState } from "../reducers/activityReducer"

type FromProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories:0
}

export default function Form({dispatch, state}: FromProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if(state.activeID){
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeID)[0]
      setActivity(selectedActivity)
    }
  }, [state.activeID])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () =>{
    const {name, calories} = activity
    return name.trim() !== "" && calories > 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    dispatch({type: "save-activity", payload: {newActivity: activity}})
    setActivity({
      ...initialState,
       id: uuidv4()
    })
  }

  return (
    <form
      className="space-y-5 bg-white p-10 rounder-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="">Categoria</label>
        <select
          className="border border-slate-300 p-2 rounder-lg w-full bg-white" 
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounder-lg"
          placeholder="Ej: Comida, Juego de naranja, ensalada, ejercicio o bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">  
        <label htmlFor="calories" className="font-bold">Calorias</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounder-lg"
          placeholder="Calorias Ej: 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input 
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  )
}
