import baseX from "base-x";

const b58 = baseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

const prefixes = {
  mealPlan: "mp",
  mealPlanRecipe: "mpr",
  recipe: "recipe",
  account: "acc",
  userRecipe: "userRecipe",
  ingredient: "ingred",
  groceryList: "groc",
  collection: "coll",
  collectionRecipe: "collRec",
  fitnessProfile: "fp",
  food: "food",
  file: "file",
  message: "msg",
  conversation: "conv",
  chat: "chat",
  mealPlanItem: "mpItem",
} as const;

export function newId<TPrefix extends keyof typeof prefixes>(prefix: TPrefix) {
  const buf = crypto.getRandomValues(new Uint8Array(20));

  /**
   * epoch starts more recently so that the 32-bit number space gives a
   * significantly higher useful lifetime of around 136 years
   * from 2023-11-14T22:13:20.000Z to 2159-12-22T04:41:36.000Z.
   */
  const EPOCH_TIMESTAMP = 1_700_000_000_000;

  const t = Date.now() - EPOCH_TIMESTAMP;

  buf[0] = (t >>> 24) & 255;
  buf[1] = (t >>> 16) & 255;
  buf[2] = (t >>> 8) & 255;
  buf[3] = t & 255;

  return `${prefixes[prefix]}_${b58.encode(buf)}` as const;
}

export function newIdWithoutPrefix(maxLength: number): string {
  const buf = crypto.getRandomValues(new Uint8Array(20));
  const encoded = b58.encode(buf);
  return encoded.slice(0, maxLength);
}
