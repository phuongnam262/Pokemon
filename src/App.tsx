import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';
import { Detail, Pokemon } from './interface';


interface Pokemons {
  name: string;
  url: string;
}


const App: React.FC = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>("");
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false
  })

  const types = [
    "all", "normal", "fire", "water", "electric", "grass", 
    "ice", "fighting", "poison", "ground", "flying", 
    "psychic", "bug", "rock", "ghost", "dragon", 
    "dark", "steel", "fairy"
  ];

  const fetchPokemonBatch = async (url: string) => {
    const res = await axios.get(url);
    const promises = res.data.results.map(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      return poke.data;
    });
    const results = await Promise.all(promises);
    return { 
      pokemons: results, 
      nextUrl: res.data.next 
    };
  };

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const { pokemons: newPokemons, nextUrl: newNextUrl } = 
          await fetchPokemonBatch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
        setPokemons(newPokemons);
        setNextUrl(newNextUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setLoading(false);
      }
    };
    getPokemon();
  }, []);

  const loadmore = async () => {
    if (!nextUrl) return;

    try {
      setLoading(true);
      let newPokemons: Pokemon[] = [];
      let currentUrl = nextUrl;
      
      // Nếu đang lọc theo type, tiếp tục load cho đến khi có ít nhất 5 Pokemon mới của type đó
      const targetCount = selectedType && selectedType !== "all" ? 5 : 20;
      
      while (newPokemons.length < targetCount && currentUrl) {
        const { pokemons: batch, nextUrl: newNextUrl } = await fetchPokemonBatch(currentUrl);
        
        if (selectedType && selectedType !== "all") {
          // Lọc Pokemon theo type được chọn
          const filteredBatch = batch.filter(pokemon => 
            pokemon.types.some((type: { type: { name: string } }) => type.type.name === selectedType)
          );
          newPokemons = [...newPokemons, ...filteredBatch];
        } else {
          newPokemons = [...newPokemons, ...batch];
        }
        
        currentUrl = newNextUrl;
        
        // Nếu không còn URL tiếp theo, thoát khỏi vòng lặp
        if (!currentUrl) break;
      }

      setNextUrl(currentUrl);
      setPokemons(prevPokemons => [...prevPokemons, ...newPokemons]);
      setLoading(false);
    } catch (error) {
      console.error("Error loading more Pokemon:", error);
      setLoading(false);
    }
  };

  const filteredPokemons = selectedType === "" || selectedType === "all"
    ? pokemons
    : pokemons.filter(pokemon => 
        pokemon.types.some(type => type.type.name === selectedType)
      );

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <div className="type-filter">
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '2px solid #30a7d7',
              marginBottom: '20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <PokemonCollection
          pokemons={filteredPokemons}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />
        {!viewDetail.isOpened && (nextUrl || filteredPokemons.length > 0) && (
          <div className="btn">
            <button onClick={loadmore} disabled={loading}>
              {loading ? "LOADDING..." : "LOAD MORE"}
            </button>
          </div>
        )}
        {filteredPokemons.length === 0 && !loading && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            No Pokemon found with selected type.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


// type Student = {
//   name: string,
//   age: number
// }

// let student: Student={
//   name: "John",
//   age: 20 
// }

// interface Student2{
//   name: string,
//   age: number
// }

// let student2: Student2={
//   name: "Alex",
//   age: 35
// }

// const printSomething:() =>string=()=>{
//   let name: string="Arthur";
//   return name;
// }

// const printSomething2:(age: number) =>string[]=(age: number)=>{
//   let name: string[]=["Arthur"];
//   return name;
// }
