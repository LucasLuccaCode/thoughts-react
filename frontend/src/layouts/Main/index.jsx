import { Outlet } from "react-router-dom";
import MessageProvider from "../../contexts/MessageProvider";
import Messages from "../../components/Messages"

export default function Main() {
  return (
    <main>
      <MessageProvider>
        <Messages />
        <Outlet />
      </MessageProvider>
    </main>
  )
}