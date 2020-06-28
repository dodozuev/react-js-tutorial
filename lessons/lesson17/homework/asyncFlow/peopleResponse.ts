interface Person {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  eye_color: string;
}

interface PeopleResponse {
  results: Person[];
}
