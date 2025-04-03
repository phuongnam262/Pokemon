export interface Pokemon{
  id:number;
  name:string;
  sprites:{
    front_default:string;
  };
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

export interface Detail{
  id: number;
  isOpened: boolean;
}

export interface PokemonDetail extends Pokemon{
  abilities?:{
    ability: {
      name: string;
    }
  }[]
}