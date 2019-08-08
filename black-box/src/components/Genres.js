import React from 'react';

const Genres = () => {
  const genreList = [
    { name: "ROCK", id: "KnvZfZ7vAeA" },
    { name: "ELECTRONIC", id: "KnvZfZ7vAvF" },
    { name: "COUNTRY", id: "KnvZfZ7vAv6" },
    { name: "HIP-HOP / RAP", id: "KnvZfZ7vAv1" },
    { name: "METAL", id: "KnvZfZ7vAvt" },
    { name: "REGGAE", id: "KnvZfZ7vAed" },
    { name: "JAZZ", id: "KnvZfZ7vAvE" }
  ]

  return (
    <section className="genres">
        <div className="formatter">
            <h2>Genres</h2>
            <hr />
            <p className="subhead">Pick from a genre of music to see what the latest events are.</p>
            <div className="genList">
                {
                  genreList.map(gen => {
                    return <p key={gen.id} className={gen.id}>{gen.name}</p>
                  })
                }
            </div>
        </div>
    </section>
  )
}

export default Genres;