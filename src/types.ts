// Core data shapes used throughout the app

export interface Paragraph {
    id: string;
    text: string;
    timestamp: number;
}

export interface DocumentState {
    history: Paragraph[];
    activeText: string;
}

export interface Stats {
    words: number,
    characters: number;
    paragraphs: number; 
}
