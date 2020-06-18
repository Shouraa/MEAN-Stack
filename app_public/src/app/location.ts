export class Review {
  author: string;
  rating: number;
  reviewText: string;
}

class OpningTimes {
  days: string;
  opening: string;
  closing: string;
  closed: boolean;
}

export class Location {
  _id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  facilities: string[];
  coords: number[];
  reviews: any[];
  openingTimes: OpningTimes[];
}
