import React from "react";
import Character from "./Character";

export default function CharacterList({ characters }) {
  return (
    <div className="card-grid">
      {characters &&
        characters.map((char) => {
          return <Character character={char} key={char.id} />;
        })}
    </div>
  );
}
