const pokeContainer = document.getElementById('poke_container');
const pokemonsNumber = 251;
const colors =  {
  fire: '#ee6565',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#F4E7DA',
  rock:'#D5D5D4',
  fairy: '#FCEAFF',
  poison: '#a069d1',
  bug: '#F8D5A3',
  dragon: '#97B3E6',
  psychich: '#eaeda1',
  flying:'#F5F5F5',
  fighting:'#E6E0D4',
  normal:'#F5F5F5'
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonsNumber; i++) {
    await getPokemon(i);
  }
}

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const res = await fetch(url);
  const pokemon = await res.json();

  createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon) {
  const pokemonElement = document.createElement('div');
  pokemonElement.classList.add('pokemon');

  const pokemonTypes = pokemon.types.map(elementType => elementType.type.name);
  const type =  mainTypes.find(type => pokemonTypes.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const color = colors[type];
  pokemonElement.style.backgroundColor = color;

  const pokeInnerHTML = `

    <div class="img-container">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
    </div>

    <div class="info">
      <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type}</span> </small>
    </div>
  ` ;

  pokemonElement.innerHTML = pokeInnerHTML;

  pokeContainer.appendChild(pokemonElement);
}
