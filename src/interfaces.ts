enum DOCUMENT {
  CPF,
  RG
}

enum MATERIAL {
  PLASTICO,
  VIDRO,
  METAL,
  PAPEL
}

export interface IUser {
  id: number;
  name: string;
  password: string;
  email: string;
  document_type: DOCUMENT;
  document_number: string;
  address: string;
  is_collector: boolean;
  donation?: IDonation[];
  collect?: ICollect[];
}


export interface IDonation {
  id: number;
  material: MATERIAL;
  donor: object;
  donorId: number;
  description: string;
  collect?: ICollect;
}

export interface ICollect {
  id: number;
  collector: ICollect['id'];
  collectorId: number;
  donation: IDonation['id'];
  donationId: number;
}