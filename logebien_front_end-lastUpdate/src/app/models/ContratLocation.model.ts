import { Annonce } from "./Annonce.model";
import { User } from 'src/app/models/User.model';


export class ContratLocation {
    annonce!: Annonce;
    created_at!: Date;
    datedebut!: Date;
    datefin!:Date;
    etat!: string;
    id!: number;
    idpayement!: string;
    locataire!: User;
    montant!: number;
}