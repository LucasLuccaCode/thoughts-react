import { api } from "../../services/api";
import "./styles.css"

import HomeTitle from "./HomeTItle";
import Thoughts from "./Thoughts";
import { useQuery } from "@tanstack/react-query";

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

  const {
    data,
    isLoading,
    isLoadingError,
    error
  } = useQuery(['home-thoughts'], () => api.get('/thoughts'), {
    staleTime: Infinity,
    retry: false,
    retryDelay: 2000
  })

  const thoughts = data?.data.thoughts

  return (
    <div className="c-home__thoughts">
      <HomeTitle search={''} />
      <Thoughts thoughts={thoughts} isLoading={isLoading} />
    </div>
  )
}