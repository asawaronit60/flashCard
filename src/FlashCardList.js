import React from 'react'
import Flashcard from './Flashcard'

export default function FlashCardList({ flashCards }) {
    return (
        <div className="card-grid">
            {flashCards.map(flashCard =>{
                return <Flashcard  flashCard ={flashCard} key={flashCard.id} />
            })}
        </div>
    )
}
