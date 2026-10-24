import { useAppDispatch } from "../lib/redux/hooks";
import { deleteTrip } from "../lib/redux/feature/trips/tripSlice";
import Link from "next/link";

type TripCardProps = {
    id: number;
    title: string;
    destination: string;
    budget: number
}

function TripCard({id, title, destination, budget}: TripCardProps){
    const dispatch = useAppDispatch();
    return(
        <article className="rounded-2xl border border-stone-200 bg-white p-5">
      <h3 className="text-lg font-bold text-stone-900">
        {title}
      </h3>

      <p className="mt-2 text-stone-600">
        📍 {destination}
      </p>

      <p className="mt-3 font-semibold text-green-800">
        Estimated budget: ETB {budget.toLocaleString()}
      </p>

      <Link
  href={`/dashboard/trips/edit/${id}`}
  className="mt-4 mr-3 inline-block rounded-lg bg-stone-200 px-4 py-2 font-semibold text-stone-800 hover:bg-stone-300"
>
  Edit
</Link>


<button
  type="button"
  onClick={() => dispatch(deleteTrip(id))}
  className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
>
  Delete
</button>

    </article>


    )

}
export default TripCard;