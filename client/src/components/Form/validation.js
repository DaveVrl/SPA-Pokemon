const validation = (pokeData , db , api) => {
    const errors = {};
    //Aplico toLowerCase para evitar nombres repetidos con min o mayus
    const dbName = db.map( el => el.name.toLowerCase());
    const apiName = api.map(el => el.name.toLowerCase());
    
//NAME
    if(!/^[a-zA-Z\s]+$/.test(pokeData.name)){
        errors.name = "Debes ingresar solo letras";
    }
    if(pokeData.name.length < 1 || pokeData.name.length > 25){
        errors.name = "El nombre debe tener entre 1 y 25 caracteres";
    }
    if(!pokeData.name){
      errors.name = "Debes ingresar un nombre";
    }
    if(dbName.includes(pokeData.name.toLowerCase())){
      errors.name = "El nombre ya existe";
    }
    if(apiName.includes(pokeData.name.toLowerCase())){
      errors.name = "El nombre ya existe";
    }
//HP
    if(pokeData.hp < 1 || pokeData.hp > 255){
        errors.hp = "El rango permitido es de 1 a 255";
    }
    if(!pokeData.hp){
      errors.hp = "Debes ingresar los puntos de hp"
    }
//ATTACK
    if(pokeData.attack < 1 || pokeData.attack > 255) {
      errors.attack = "El rango permitido es de 1 a 255";
    }
    if(!pokeData.attack) {
      errors.attack = "Debes ingresar los puntos de ataque";
    }
//DEFENSE
    if(pokeData.defense < 1 || pokeData.defense > 255) {
      errors.defense = "El rango permitido es de 1 a 255";
    }
    if(!pokeData.defense) {
      errors.defense = "Debes ingresar los puntos de defensa";
    }
//SPEED
   if(pokeData.speed < 1 || pokeData.speed > 255){
    errors.speed = "El rango permitido es de 1 a 255";
   }
   
//HEIGHT
   if (pokeData.height < 0.1 || pokeData.height > 328.1) {
    errors.height = "El rango permitido para la altura es de 0.1 a 328.1 pies";
   }
//WEIGHT
   if(pokeData.weight < 0.1 || pokeData.weight > 999.9) {
    errors.weight = "El rango permitido para el peso es de 0.1 a 999.9 libras";
   }
//IMAGE
   if(!/^https?:\/\/.*\.(png|jpg|jpeg|svg)$/.test(pokeData.image)){
    errors.image = "Debes ingresar una URL válida, en formato PNG , JPG , JPEG o SVG";
   }
//TYPE
   if (pokeData.type.length < 1 || pokeData.type.length > 2) {
     errors.type = "Debes seleccionar 1 o 2 tipos";
   }
   return errors;
};

export default validation;
