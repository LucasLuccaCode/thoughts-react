import { createContext, useCallback, useContext, useRef, useState } from "react";

const CommentsContext = createContext()

const perPage = 10

export function CommentsProvider({ children, comments }) {
  const [commentsPage, setCommentsPage] = useState(perPage)
  const commentsRef = useRef()

  const scrollIntoDown = useCallback(() => {
    commentsRef.current.lastElementChild?.scrollIntoView()
  }, [commentsRef.current])

  const nextComments = useCallback(() => {
    const next = Math.min(comments.length, commentsPage + perPage)
    setCommentsPage(next)
  }, [comments, commentsPage])

  const value = {
    commentsPage,
    setCommentsPage,
    commentsRef,
    scrollIntoDown,
    perPage,
    nextComments
  }

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  )
}

export function useComments() {
  const context = useContext(CommentsContext)

  return context
}