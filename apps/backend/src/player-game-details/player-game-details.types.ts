import { registerEnumType } from '@nestjs/graphql';

export enum SplayOption {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
}

registerEnumType(SplayOption, { name: 'SplayOption' });
