import type { Commentary } from '@bbpl/common';
import { uniqueNamesGenerator, colors, type Config } from 'unique-names-generator';
import random from 'lodash/fp/random';
import range from 'lodash/fp/range';

const TAG_CONFIG: Config = {
  dictionaries: [colors],
  length: 1,
};

export function populateTags(commentary: Commentary): Commentary {
  const tags = range(0, random(0, 5)).map(() => uniqueNamesGenerator(TAG_CONFIG));
  return { ...commentary, tags };
}
