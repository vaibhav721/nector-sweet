export interface ServiceableCity {
  id: string;
  name: string;
  label: string;
  isActive: boolean;
}

export interface ServiceableArea {
  id: string;
  cityId: string;
  name: string;
  label: string;
  isActive: boolean;
}

export interface ServiceablePincode {
  id: string;
  cityId: string;
  areaId: string;
  pincode: string;
  isActive: boolean;
  etaLabel: string;
}

export interface WaitlistRequest {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  city: string;
  area: string;
  pincode: string;
  note?: string;
  createdAt: string;
}
