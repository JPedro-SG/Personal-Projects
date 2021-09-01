import React from 'react'

const Card = ({feed}) => {
    // https://www.reddit.com/.rss dangerouslySetInnerHTML={{__html: content}}
    
    let authorFormatted = feed.author.slice(3)
    const day = feed.pubDate.slice(5, 7)
    const month = feed.pubDate.slice(8, 10)
    const year = feed.pubDate.slice(0, 4)
    const dateFormatted = `${month}/${day}/${year}`
    
    return (
        <div  className="card" >
            <div className="card__title">
                <strong className="title">{feed.title}</strong>
                <span className="subtitle">{authorFormatted} - {dateFormatted}</span>
            </div>
            <a href={`${feed.link}`} target="_blank" >Read More</a>

        </div>
    )
}

export default Card;