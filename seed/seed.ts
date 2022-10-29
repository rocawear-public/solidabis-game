import { PrismaClient } from '@prisma/client';
import axios from 'axios';
const prisma = new PrismaClient();

import { Character } from '@prisma/client';

const fetchNutrients = async () => {
  const data = (await axios.get(`https://fineli.fi/fineli/api/v1/foods`)).data as any[];
  const nutrients = data.filter((character: any) => character.type.code === 'FOOD');
  return nutrients;
};

const createCharacters = (nutrients: any[]) => {
  const items = nutrients.map((nutrient) => {
    return {
      name: nutrient.name.fi,
      health: parseInt(nutrient.energyKcal.toFixed()),
      attack: parseInt(nutrient.carbohydrate.toFixed()),
      defence: parseInt(nutrient.protein.toFixed()),
      delay: parseInt((nutrient.carbohydrate + nutrient.protein + nutrient.fat).toFixed()),
      color: '#' + [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
  }) as Character[];
  return items;
};

async function main() {
  const nutrients = await fetchNutrients();
  const characters = createCharacters(nutrients);

  for (const character of characters) {
    await prisma.character.create({
      data: character,
    });
  }

  console.log('Database seeded with characters');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
