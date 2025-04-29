// pages/Characters.jsx
import { useState } from "react";
import HeroCard from "../components/common/HeroCard";
import SearchBar from "../components/ui/SearchBar";
import { charactersData } from "../data/characters";

const Characters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState(charactersData);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = charactersData.filter(
      (character) =>
        character.name.toLowerCase().includes(term.toLowerCase()) ||
        character.role.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredCharacters(filtered);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Персонажи</h1>

      <div
        className="search-container"
        style={{ maxWidth: "400px", margin: "0 auto 2rem auto" }}
      >
        <SearchBar onSearch={handleSearch} placeholder="Поиск персонажей..." />
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="text-center" style={{ padding: "2rem" }}>
          <p>По запросу "{searchTerm}" ничего не найдено.</p>
        </div>
      ) : (
        <div className="items-grid">
          {filteredCharacters.map((character) => (
            <HeroCard key={character.id} hero={character} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Characters;
