export interface Student {
  pagination: any;
  id?: string;
  name: string;
  age: string;
  mark: number;
  gender: 'male' | 'female';
  city?: string;
  createAt?: number;
  updateAt?: number;
}
