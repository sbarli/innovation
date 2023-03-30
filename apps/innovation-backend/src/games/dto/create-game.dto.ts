export class CreateGameDto {
  readonly currentActionNumber: number;
  readonly currentPlayerRef: string;
  readonly playerRefs: string[];
}
