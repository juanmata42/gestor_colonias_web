export type Factory = {
  [key: string]: string | undefined
  id: string;
  name: string;
  address: string;
  country: string;
  created_at: string;
  updated_at?: string;
}

export type ModifiedFactory = {
  id: string,
  result: string
}
