// Dummy mock data
const characters = [
  {
    name: 'Super-Turtle',
    inventory: ['Diamond Sword', 'Healing Potion', 'Turtle Shield'],
    health: 200,
    damage: 1500,
  },
  {
    name: 'Maaorava',
    inventory: ['Iron Sword', 'Healing Potion', 'Nahka Shield'],
    health: 20,
    damage: 10,
  },
];

const getcharacters = (res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(characters));
};

const postCharacter = (req, res) => {
  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      // at this point, `body` has the entire request body stored in it as a string
      console.log('req body:', body);
      const item = JSON.parse(body);
      characters.push(item);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Item added'}));
    });
};

const deleteCharacter = (res, character) => {
  const characterIndex = characters.findIndex(
    (char) => char.name === character,
  );
  if (characterIndex !== -1) {
    characters.splice(characterIndex, 1);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Character Deleted'}));
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Character not found'}));
  }
};

const modifyCharacter = (req, res, character) => {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    body = Buffer.concat(body).toString();
    const modifiedCharacter = JSON.parse(body);
    const characterIndex = characters.findIndex(
      (char) => char.name === character,
    );
    if (characterIndex !== -1) {
      characters[characterIndex] = {
        ...characters[characterIndex],
        ...modifiedCharacter,
      };
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Character modified'}));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Character not found'}));
    }
  });
};

export {getcharacters, postCharacter, deleteCharacter, modifyCharacter};
