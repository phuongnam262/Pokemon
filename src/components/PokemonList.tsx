import React, { useEffect, useState } from 'react'
import "./pokemonStyle.css"
import { Detail } from '../interface';

interface Props {
    viewDetail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>;
    abilities: {
        ability: {
            name: string;
        }
    }[] | undefined;
    name: string;
    id: number;
    image: string;
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        }
    }[];
    height: number;
    weight: number;
    base_experience: number;
}

const PokemonList: React.FC<Props> = (props) => {
    const { name, id, image, abilities, types, stats, height, weight, base_experience, viewDetail, setDetail } = props;
    const [isSelected, setSelected] = useState(false)
    useEffect(() => {
        setSelected(id === viewDetail?.id)
    }, [viewDetail])

    const closeDetail = () => {
        setDetail({
            id: 0,
            isOpened: false
        })
    }

    const getTypeColor = (type: string): string => {
        const typeColors: { [key: string]: string } = {
            normal: '#A8A878',
            fire: '#F08030',
            water: '#6890F0',
            electric: '#F8D030',
            grass: '#78C850',
            ice: '#98D8D8',
            fighting: '#C03028',
            poison: '#A040A0',
            ground: '#E0C068',
            flying: '#A890F0',
            psychic: '#F85888',
            bug: '#A8B820',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#7038F8',
            dark: '#705848',
            steel: '#B8B8D0',
            fairy: '#EE99AC'
        };
        return typeColors[type] || '#888888';
    }

    const formatStatName = (name: string): string => {
        return name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    return (
        <div className="">
            {isSelected ? (
                <section className="pokemon-list-detailed">
                    <div className="detail-container">
                        <p className="detail-close" onClick={closeDetail}>
                            X
                        </p>
                        <div className="detail-info">
                            <img src={image} alt="pokemon" className='detail-img' />
                            <p className="detail-name">{name}</p>
                            <div className="detail-types">
                                {types.map((type) => (
                                    <span 
                                        key={type.type.name}
                                        className="type-badge"
                                        style={{
                                            backgroundColor: getTypeColor(type.type.name),
                                            color: '#fff',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            margin: '0 4px',
                                            fontSize: '0.8em'
                                        }}
                                    >
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="detail-stats">
                            <h3>Base Stats</h3>
                            <div className="stats-container">
                                {stats.map((stat) => (
                                    <div key={stat.stat.name} className="stat-item">
                                        <span className="stat-name">{formatStatName(stat.stat.name)}</span>
                                        <div className="stat-bar-container">
                                            <div 
                                                className="stat-bar"
                                                style={{
                                                    width: `${(stat.base_stat / 255) * 100}%`,
                                                    backgroundColor: stat.base_stat > 100 ? '#4CAF50' : '#FFA726'
                                                }}
                                            ></div>
                                        </div>
                                        <span className="stat-value">{stat.base_stat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="detail-info-grid">
                            <div className="info-item">
                                <span className="info-label">Height</span>
                                <span className="info-value">{height/10}m</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Weight</span>
                                <span className="info-value">{weight/10}kg</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Base Experience</span>
                                <span className="info-value">{base_experience}</span>
                            </div>
                        </div>
                        <div className="detail-skill">
                            <p className="detail-ability">Abilities: </p>
                            {abilities?.map((ab) => (
                                <div key={ab.ability.name} className="">{ab.ability.name}</div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="pokemon-list-container">
                    <p className="pokemon-name">{name}</p>
                    <img src={image} alt="pokemon" />
                    <div className="pokemon-types">
                        {types.map((type) => (
                            <span 
                                key={type.type.name}
                                className="type-badge"
                                style={{
                                    backgroundColor: getTypeColor(type.type.name),
                                    color: '#fff',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    margin: '0 4px',
                                    fontSize: '0.8em'
                                }}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default PokemonList
