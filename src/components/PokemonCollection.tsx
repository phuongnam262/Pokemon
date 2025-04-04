// rafce //dùng lệnh tắt này sẽ ra cái form ở dưới 

import React from 'react'
import { Detail, Pokemon, PokemonDetail } from '../interface';
import PokemonList from './PokemonList';
import "./pokemonStyle.css"

interface Props {
    pokemons: PokemonDetail[],
    viewDetail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}
const PokemonCollection: React.FC<Props> = (props) => {
    const { pokemons, viewDetail, setDetail } = props;
    const selectPokemon = (id: number) => {
        if (!viewDetail.isOpened) {
            setDetail({
                id: id,
                isOpened: true
            })
        }
    }
    return (
        <> 
            <section className={viewDetail.isOpened ? "collection-container-active" : "collection-container"}>
                {viewDetail.isOpened ? (
                    <div className="overlay"></div>
                ) : (
                    <div className=""></div>
                )}
                {pokemons.map((pokemon) => {
                    return (
                        <div key={pokemon.id} onClick={() => selectPokemon(pokemon.id)}>
                            <PokemonList
                                viewDetail={viewDetail}
                                setDetail={setDetail}
                                key={pokemon.id}
                                name={pokemon.name}
                                id={pokemon.id}
                                abilities={pokemon.abilities}
                                image={pokemon.sprites.front_default}
                                types={pokemon.types}
                                stats={pokemon.stats}
                                height={pokemon.height}
                                weight={pokemon.weight}
                                base_experience={pokemon.base_experience}
                            />
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default PokemonCollection
