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
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false
  })


  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
        setNextUrl(res.data.next);
        
        const promises = res.data.results.map(async (pokemon: Pokemons) => {
          const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          return poke.data;
        });
        
        const results = await Promise.all(promises);
        setPokemons(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setLoading(false);
      }
    };
    getPokemon();
  }, [])

  const loadmore = async () => {
    try {
      setLoading(true);
      const res = await axios.get(nextUrl);
      setNextUrl(res.data.next);
      
      const promises = res.data.results.map(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        console.log(poke.data)
        return poke.data;

      });
      
      const results = await Promise.all(promises);
      setPokemons(prevPokemons => [...prevPokemons, ...results]);
      setLoading(false);
    } catch (error) {
      console.error("Error loading more Pokemon:", error);
      setLoading(false);
    }
  }
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={loadmore}>
              {loading ? "Loading..." : "Loading more"}</button>
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
