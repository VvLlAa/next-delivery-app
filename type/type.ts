export interface Delivery {
  id: string;
  status: string;
  createdAt: string;
  fromAddress: string;
  toAddress: string;
}

export interface DeliveryDetails {
  entity: {
    uuid: string;
    number: string;
    statuses: StatusType[];
    sender: SenderAndRecipientType;
    recipient: SenderAndRecipientType;
    from_location: LocationType;
    to_location: LocationType;
    services: ServiceType[];
    packages: PackageType[];
    delivery_detail: DeliverySummary;
  };
}

export interface DeliveriesState {
  deliveries: Delivery[];
  error: null | string;
}

export interface StatusType {
  city: string;
  date_time: string;
  name: string;
}

export interface SenderAndRecipientType {
  company: string;
  name: string;
  passport_requirements_satisfied: boolean;
  phones: {
    number: string;
  }[];
}

export interface LocationType {
  code: number;
  city: string;
  country: string;
  region: string;
  longitude: number;
  address: string;
}

export interface ServiceType {
  code: string;
  sum: number;
  total_sum: number;
  discount_sum: number;
  vat_sum: number;
}

export interface PackageType {
  barcode: string;
  weight: number;
  length: number;
  width: number;
  weight_volume: number;
  weight_calc: number;
  height: number;
  comment: string;
}

export interface DeliverySummary {
  delivery_sum: number;
  total_sum: number;
  delivery_vat_sum: number;
}
