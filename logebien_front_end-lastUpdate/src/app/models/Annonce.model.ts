import { Photo } from "./Photo.model";
import { TypeBien } from "./Type_bien.model";
import { User } from "./User.model";

export class Annonce {
    id!: number;
    titre!: string;
    nbchambre!: number;
    nblits!: number;
    etat!: string;
    superficie!: number;
    status!: string;
    prixHiver!: number;
    prixEte!: number;
    prixPrintemps!: number;
    prixAutomne!: number;
    user_id!: number;
    type_bien_id!: number;
    pays!: string;
    ville!: string;
    gouvernorat!: string;
    rue!: string;
    code_postal!: string;
    longitude!: number;
    latitude!: number;
    typebien!: TypeBien;     // Assuming you have a TypeBien interface or model
    image!: string;
    photos!: Photo[];         // Assuming you have a Photo interface or model
    user!: User;           // Assuming you have a User interface or model
  }