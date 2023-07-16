const validation = (pokeData, db, api) => {
  const errors = {};
  // Apply toLowerCase to avoid duplicate names with different capitalization
  const dbName = db.map((el) => el.name.toLowerCase());
  const apiName = api.map((el) => el.name.toLowerCase());

  // NAME
  if (!/^[a-zA-Z\s]+$/.test(pokeData.name)) {
    errors.name = "You must enter only letters.";
  }
  if (pokeData.name.length < 1 || pokeData.name.length > 25) {
    errors.name = "The name must be between 1 and 25 characters.";
  }
  if (!pokeData.name) {
    errors.name = "You must enter a name.";
  }
  if (dbName.includes(pokeData.name.toLowerCase())) {
    errors.name = "The name already exists.";
  }
  if (apiName.includes(pokeData.name.toLowerCase())) {
    errors.name = "The name already exists.";
  }

  // HP
  if (pokeData.hp < 1 || pokeData.hp > 255) {
    errors.hp = "Allowed range is from 1 to 255.";
  }
  if (!pokeData.hp) {
    errors.hp = "You must enter the HP points.";
  }

  // ATTACK
  if (pokeData.attack < 1 || pokeData.attack > 255) {
    errors.attack = "Allowed range is from 1 to 255.";
  }
  if (!pokeData.attack) {
    errors.attack = "You must enter the attack points.";
  }

  // DEFENSE
  if (pokeData.defense < 1 || pokeData.defense > 255) {
    errors.defense = "Allowed range is from 1 to 255.";
  }
  if (!pokeData.defense) {
    errors.defense = "You must enter the defense points.";
  }

  // SPEED
  if (pokeData.speed < 1 || pokeData.speed > 255) {
    errors.speed = "Allowed range is from 1 to 255.";
  }

  // HEIGHT
  if (pokeData.height < 0.1 || pokeData.height > 328.1) {
    errors.height = "Allowed range is from 0.1 to 328.1 feet.";
  }

  // WEIGHT
  if (pokeData.weight < 0.1 || pokeData.weight > 999.9) {
    errors.weight = "Allowed range is from 0.1 to 999.9 pounds.";
  }

  // IMAGE
  if (!/^https?:\/\/.*\.(png|jpg|jpeg|svg)$/.test(pokeData.image)) {
    errors.image = "You must enter a valid URL in PNG, JPG, JPEG, or SVG format.";
  }

  // TYPE
  if (pokeData.type.length < 1 || pokeData.type.length > 2) {
    errors.type = "You must select 1 or 2 types.";
  }

  return errors;
};

export default validation;
