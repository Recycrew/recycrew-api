
export interface IUsers {
  id: number;
  name: string;
  password: string;
  email: string;
  document_type?: string;
  document_number?: number;
  collector: boolean;
  phone_number?: string;
  isAdmin: boolean;
  cep?: number;
  street_and_number?: string;
  complement?: string;
  city_and_state?: string;
  created_at: Date;
}

export interface ICollections {
  id: number;
  donator_id: number;
  collector_id?: number;
  collect_date: Date;
  status: string;
}

export interface IMaterials {
  id: number;
  name: string;
  description?: string;
  isRecyclable?: boolean;
  created_at: Date;
}