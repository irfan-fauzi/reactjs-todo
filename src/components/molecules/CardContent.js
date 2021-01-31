import React from 'react'

function CardContent({ title, date, content, onClick }) {
  return (
    <div className="card-content" onClick={onClick}>
      <p className="title">{title}</p>
      <p className="date">{date}</p>
      <p className="content">{content}</p>
    </div>
  )
}

export default CardContent
