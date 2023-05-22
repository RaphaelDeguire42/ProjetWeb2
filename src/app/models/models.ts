export interface User {
    id: number;
    nom: string;
    email: string;
    mot_de_passe: string;
    date_de_naissance: string;
    image_profil: string;
    id_role: number;
}

export interface Bouteille {
    id: number;
    nom: string;
    code_saq: string;
    url_saq: string;
    url_img: string;
    garde: number;
    prix: number;
    id_type: number;
    id_format: number;
    id_pays: number;
    actif: boolean;
}

export interface Cellier {
    id: number;
    nom: string;
    id_user: number;
    id_couleur: number;
    hex_value: string;
}

export interface CellierBouteille extends Bouteille {
    id: number;
    id_bouteille: number;
    id_cellier: number;
    quantite: number;
    date_achat: string;
    millesime: number;
}


export interface NoteCommentaire {
    id: number;
    note: string;
    commentaire: string;
    id_user: number;
    id_bouteille: number;
}

export interface TypeBouteille {
    id: number;
    type: string;
}

export interface Format {
    id: number;
    format: string;
}

export interface Pays {
    id: number;
    pays: string;
}

export interface PastilleCouleur {
    id: number;
    couleur: string;
}

export interface Erreur {
    erreur: string;
    id_user: number;
}

export interface Panier {
    items: Array<PanierItem>;
}

export interface PanierItem {
    id: number;
    bouteille: string;
    nom: string;
    prix: number;
    quantite: number;
}

export interface AjoutBouteilleCellierData {
    id_bouteille: number;
    id_cellier: number;
}

export interface NouveauCellierData {
    id_couleur: number;
    nom: string;
}


export interface Couleur {
    id: number;
    nom: string;
    hex_value: string;
    created_at: string;
    updated_at: string;
}

export interface Utilisateur {
    // REMOVE ? WHEN REAL USERS
    id: number;
    nom: string;
    email: string;
    mot_de_passe?: string;
    date_de_naissance?: string;
    image_profil?: string;
    id_role?: number;
}

export interface Role {
    id: number;
    role: string;
}