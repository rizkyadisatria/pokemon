const jhttp = new XMLHttpRequest();

const pokemon = new Array(
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
  "Fearow",
  "Ekans",
  "Arbok",
  "Pikachu",
  "Raichu",
  "Sandshrew",
  "Sandslash",
  "Nidorina",
  "Nidoqueen",
  "Nidoran-f",
  "Nidorino",
  "Nidoking",
  "Clefairy",
  "Clefable",
  "Vulpix",
  "Ninetales",
  "Jigglypuff",
  "Wigglytuff",
  "Zubat",
  "Golbat",
  "Oddish",
  "Gloom",
  "Vileplume",
  "Paras",
  "Parasect",
  "Venonat",
  "Venomoth",
  "Diglett",
  "Dugtrio",
  "Meowth",
  "Persian",
  "Psyduck",
  "Golduck",
  "Mankey",
  "Primeape",
  "Growlithe",
  "Arcanine",
  "Poliwag",
  "Poliwhirl",
  "Poliwrath",
  "Abra",
  "Kadabra",
  "Alakazam",
  "Machop",
  "Machoke",
  "Machamp",
  "Bellsprout",
  "Weepinbell",
  "Victreebel",
  "Tentacool",
  "Tentacruel",
  "Geodude",
  "Graveler",
  "Golem",
  "Ponyta",
  "Rapidash",
  "Slowpoke",
  "Slowbro",
  "Magnemite",
  "Magneton",
  "Doduo",
  "Dodrio",
  "Seel",
  "Dewgong",
  "Grimer",
  "Muk",
  "Shellder",
  "Cloyster",
  "Gastly",
  "Haunter",
  "Gengar",
  "Onix",
  "Drowzee",
  "Hypno",
  "Krabby",
  "Kingler",
  "Voltorb",
  "Electrode",
  "Exeggcute",
  "Exeggutor",
  "Cubone",
  "Marowak",
  "Hitmonlee",
  "Hitmonchan",
  "Lickitung",
  "Koffing",
  "Weezing",
  "Rhyhorn",
  "Rhydon",
  "Chansey",
  "Tangela",
  "Kangaskhan",
  "Horsea",
  "Seadra",
  "Goldeen",
  "Seaking",
  "Staryu",
  "Starmie",
  "Scyther",
  "Jynx",
  "Electabuzz",
  "Magmar",
  "Pinsir",
  "Tauros",
  "Magikarp",
  "Gyarados",
  "Lapras",
  "Ditto",
  "Eevee",
  "Vaporeon",
  "Jolteon",
  "Flareon",
  "Porygon",
  "Omanyte",
  "Omastar",
  "Kabuto",
  "Kabutops",
  "Aerodactyl",
  "Snorlax",
  "Articuno",
  "Zapdos",
  "Moltres",
  "Dratini",
  "Dragonair",
  "Dragonite",
  "Mewtwo",
  "Mew",
  "Farfetchd",
  "Mr-mime"
);

const pokeRandom = pokemon[Math.floor(Math.random() * pokemon.length)];
const pokeGet = pokeRandom.toLowerCase();

document.querySelector(".reset").addEventListener("click", () => {
  location.reload();
});

const getApi = () => {
  jhttp.onload = function () {
    const response = JSON.parse(this.responseText);

    //getName
    const pokeTitle = document.querySelector(".pokemon-name");
    pokeTitle.innerText = `${response.species.name}`;

    //getPicture
    const pokePic = document.querySelector("img");
    pokePic.src = `${response.sprites.front_default}`;

    const result = document.querySelector(".result");
    result.style = "display: block;";

    const desc = document.querySelector(".desc");
    desc.style = "display: block";

    const pokeRecieved = document.querySelector(".recieved");
    pokeRecieved.innerText = `You got ${pokeGet}!`;
  };
  jhttp.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokeGet}`);
  jhttp.send();
};

let pokeUrl = [];

async function fetchPoke() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=144", {
    method: "GET",
  });

  const json = await response.json();
  const result = json.results;
  const allPoke = document.querySelector(".all-pokemon");

  result.forEach((r) => {
    //Push poke url to global
    pokeUrl.push(r.url);
  });

  const request = pokeUrl.map((url) => fetch(url));
  Promise.all(request)
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      // Process the data here
      data.forEach((d) => {
        const newName = d.name.replace(/-/g, " ");
        //create pokemon card
        const div = document.createElement("div");
        div.className = "poke-card";
        allPoke.append(div);
        //create pokemon name
        const p = document.createElement("p");
        p.innerText = `${newName}`;
        div.prepend(p);
        //create pokemon image
        const pokeImg = document.createElement("img");
        pokeImg.src = `${d.sprites.front_default}`;
        div.append(pokeImg);
        //create pokemon type
        const type = document.createElement("p");
        type.innerText = `${d.types[0].type.name}`;
        div.append(type);
        //create background color pokemon card
        if (d.types[0].type.name === "grass") {
          div.style =
            "background-color: #8dd694; border: #5dad65 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "water") {
          div.style =
            "background-color: #8dc6e6; border: #6f9eca 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "fire") {
          div.style =
            "background-color: #e69d8d; border: #c67d6d 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "bug") {
          div.style =
            "background-color: #bddd7a; border: #a2c170 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "normal") {
          div.style =
            "background-color: #b1b1b1; border: #959595 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "electric") {
          div.style =
            "background-color: #e7c859; border: #d0b34a 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "ground") {
          div.style =
            "background-color: #efbe85; border: #d0a068 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "poison") {
          div.style =
            "background-color: #a55db1; border: #8a4a95 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "fairy") {
          div.style =
            "background-color: #eea1ea; border: #c77fbc 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "flying") {
          div.style =
            "background-color: #c9adec; border: #a485cc 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "rock") {
          div.style =
            "background-color: #b99d72; border: #957d59 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "psychic") {
          div.style =
            "background-color: #d053bc; border: #a44094 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "ghost") {
          div.style =
            "background-color: #835e94; border: #6b4c79 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "dark") {
          div.style =
            "background-color: #686868; border: #434343 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "steel") {
          div.style =
            "background-color: #598fa3; border: #517c8b 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "fighting") {
          div.style =
            "background-color: #e07f60; border: #b1664f 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "dragon") {
          div.style =
            "background-color: #8859d5; border: #724cae 2px solid; border-radius: 15px;";
        } else if (d.types[0].type.name === "ice") {
          div.style =
            "background-color: #71d8de; border: #65c1c6 2px solid; border-radius: 15px;";
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
