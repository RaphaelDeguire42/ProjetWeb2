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
    img_saq: string;
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
}

export interface CellierBouteille {
    id: number;
    id_bouteille: number;
    id_cellier: number;
    quantite: number;
    date_achat: string;
    garde: number;
    millesime: number;
}

export interface NoteCommentaire {
    id: number;
    note: string;
    commentaire: string;
    id_user: number;
    id_bouteille: number;
}

export interface Type {
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
    id: number;
    texte: string;
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