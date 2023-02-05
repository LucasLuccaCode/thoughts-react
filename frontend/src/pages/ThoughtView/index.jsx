import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/authContext";
import './styles.css'

import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import ThoughtComments from "../../components/ThoughtComments";
import ThoughtAddComment from "../../components/ThoughtAddComment";
import { CommentsProvider } from "../../contexts/commentsContext";

export default function ThoughtView() {
  const { user } = useAuth()
  const { thoughtId } = useParams()

  const { data, isLoading } = useQuery([`thought-${thoughtId}`],
    () => api.get(`/thoughts/${thoughtId}`),
    {
      refetchOnWindowFocus: false,
      retry: false
    }
  )
  const thought = data?.data.thought

  return (
    <Modal>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className="c-thought max-width">
            <div className="c-thought__info">
              <h2>&#8220;{thought?.content}&#8221;</h2>
              <h3>by <span>{thought?.author.name}</span></h3>
            </div>

            <CommentsProvider comments={thought?.comments}>
              <ThoughtComments comments={thought?.comments} />
              <ThoughtAddComment userId={user?.id} thoughtId={thought?.id} />
            </CommentsProvider>
          </div>
        )
      }
    </Modal>
  )
}