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
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=36", {
    method: "GET",
  });

  const json = await response.json();
  const result = json.results;
  const allPoke = document.querySelector(".all-pokemon");

  result.forEach((r) => {
    //Push poke url to global
    pokeUrl.push(r.url);
  });
  //Print poke url
  console.log(pokeUrl);

  const request = pokeUrl.map((url) => fetch(url));
  Promise.all(request)
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      // Process the data here
      data.forEach((d) => {
        console.log(d);
        //create pokemon card
        const div = document.createElement("div");
        div.className = "poke-card";
        allPoke.append(div);
        //create pokemon name
        const p = document.createElement("p");
        p.innerText = `${d.name}`;
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
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
