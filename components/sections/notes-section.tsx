import React from 'react'
import { reviews } from '@/src/data/niaro'

const rot = [-3, 2, -1, 3]

export default function NotesSection() {
  return (
    <section className="notes wrap">
      <div className="section-intro">
        <span className="eyebrow">06 / NOTES FROM CUSTOMERS</span>
        <h2>
          Postcards
          <br />
          <em>we kept.</em>
        </h2>
      </div>
      <div className="reviews">
        {reviews.map(([quote, name], i) => (
          <div
            className="review"
            key={name}
            style={{ rotate: `${rot[i % rot.length]}deg` }}
          >
            <span>NI</span>
            <p>{quote}</p>
            <small>{name}</small>
          </div>
        ))}
      </div>
    </section>
  )
}
