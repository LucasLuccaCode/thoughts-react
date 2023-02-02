import { memo } from "react";
import { useAuth } from "../../contexts/authContext"
import "./styles.css"

import ThoughtInfo from "../ThoughtInfo";
import ThoughtActions from "../ThoughtActions";

function Thought({ thought }) {
  const { user } = useAuth()

  return (
    <li className="c-thoughts__card">
      <ThoughtInfo thought={thought} />
      <ThoughtActions
        userId={user?.id}
        likes={thought.likes}
        totalComments={thought.comments.length}
        thoughtId={thought.id}
      />
    </li>
  )
}

export default memo(Thought)