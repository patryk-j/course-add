export interface Answers {
  label: string;
  preference: Preferences;
}

export interface Question {
  text: string;
  answers: Answers[];
}

export enum Preferences {
  Visual = "V",
  Aural = "A",
  Read = "R",
  Kinesthetic = "K",
}
