import { Person } from "./Person";

export type ExtractResponse = {
  inputString: string;
  extractedPersons: Array<Person>;
};
