import React from 'react'

type Props = {
    title: string,
    text: string,
    icon: React.ReactNode
}
export const Marketing = ({title, text, icon}: Props) => {
  return (
    <div>
        <span> {icon} </span>
        <h4> {title} </h4>
        <p>
            {text}
        </p>
    </div>
  )
}
