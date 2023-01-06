import { Outlet } from "react-router-dom";

import Messages from "../../components/Messages"

export default function Main() {
  return (
    <main>
      <Messages />
      <Outlet />
    </main>
  )
}