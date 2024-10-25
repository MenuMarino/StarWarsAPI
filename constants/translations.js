// This could be done using a library like https://www.npmjs.com/package/translate
// but that may cause the api to be slow, instead here are all the possible values

const translations = {
  films: 'películas',
  people: 'personas',
  planets: 'planetas',
  species: 'especies',
  starships: 'naves_estelares',
  vehicles: 'vehículos',

  // people
  name: 'nombre',
  birth_year: 'año_de_nacimiento',
  eye_color: 'color_de_ojos',
  gender: 'género',
  hair_color: 'color_de_cabello',
  height: 'altura',
  mass: 'masa',
  skin_color: 'color_de_piel',
  homeworld: 'mundo_natal',
  films: 'películas',
  species: 'especies',
  starships: 'naves_estelares',
  vehicles: 'vehículos',
  url: 'url',
  created: 'creado',
  edited: 'editado',

  // films
  title: 'título',
  episode_id: 'episodio_id',
  opening_crawl: 'texto_inicial',
  director: 'director',
  producer: 'productor',
  release_date: 'fecha_de_lanzamiento',
  characters: 'personajes',
  planets: 'planetas',
  starships: 'naves_estelares',
  vehicles: 'vehículos',
  species: 'especies',

  // starships
  model: 'modelo',
  starship_class: 'clase_de_nave',
  manufacturer: 'fabricante',
  cost_in_credits: 'costo_en_créditos',
  length: 'longitud',
  crew: 'tripulación',
  passengers: 'pasajeros',
  max_atmosphering_speed: 'velocidad_atmosférica_máxima',
  hyperdrive_rating: 'clasificación_de_hipervelocidad',
  MGLT: 'MGLT',
  cargo_capacity: 'capacidad_de_carga',
  consumables: 'consumibles',
  pilots: 'pilotos',

  // vehicles
  vehicle_class: 'clase_de_vehículo',

  // species
  classification: 'clasificación',
  designation: 'designación',
  average_height: 'altura_promedio',
  average_lifespan: 'esperanza_de_vida_promedio',
  eye_colors: 'colores_de_ojos',
  hair_colors: 'colores_de_cabello',
  skin_colors: 'colores_de_piel',
  language: 'idioma',
  people: 'personas',

  // planets
  diameter: 'diámetro',
  rotation_period: 'período_de_rotación',
  orbital_period: 'período_orbital',
  gravity: 'gravedad',
  population: 'población',
  climate: 'clima',
  terrain: 'terreno',
  surface_water: 'agua_superficial',
  residents: 'residentes',
};

module.exports = {
  translations,
};
