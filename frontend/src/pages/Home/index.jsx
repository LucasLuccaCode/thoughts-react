import { api } from "../../services/api";
import "./styles.css"

import HomeTitle from "./HomeTItle";
import Thoughts from "../../components/Thoughts";
import { Outlet } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const queryParams = Object.fromEntries(url.searchParams)

  try {
    const { data } = await api.get("/thoughts", {
      params: queryParams
    })

    if (data.error) {
      throw new Response("", {
        status: 404,
        statusText: data.error,
      });
    }

    return { search: search || '', thoughts: data.thoughts };
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default function Home() {
  return (
    <div className="c-home__thoughts">
      <HomeTitle search={''} />
      <Thoughts />

      <Outlet />
    </div>
  )
}