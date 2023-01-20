import { memo } from "react";
import { useAuth } from "../../../../contexts/authContext"
import "./styles.css"

import Content from "./Content";
import Actions from "./Actions";
import Comments from "./Comments";
import Form from "./Form";

function Thought({ thought }) {
  const { user } = useAuth()

  return (
    <li className="c-thoughts__card">
      <Content thought={thought} />
      <Actions 
        userId={user?.id} 
        likes={thought.likes} 
        thoughtId={thought.id} 
        />
      <Comments thought={thought} />
      <Form 
        userId={user?.id} 
        thoughtId={thought.id} 
      />
    </li>
  )
}

export default memo(Thought)