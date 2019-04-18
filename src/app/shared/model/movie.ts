export class MovieClass {
    id:string = '0';
    title: string = '';
    lowercaseTitle: string = '';
    subline?: string = '';
    cover: string = '';
    age: number | null = null;
    description: string = '';
    length: number | null = null; 
    subtitle: boolean = false;
    year: string = '';
    createDate: Date | string = new Date();
}

export interface MovieInterface {
    id: string,
    title: string,
    lowercaseTitle: string,
    subline?: string,
    cover: string,
    age: number,
    description: string,
    length: number,
    subtitle: boolean,
    year: string,
    createDate: Date,
}

export function createInitialMovie(): MovieClass {
    return {
        id : '0',
        title: '',
        lowercaseTitle: '',
        subline: '',
        cover: '',
        age: null,
        description: '',
        length: null,
        subtitle: false,
        year: '',
        createDate: new Date()
    }
}

//TODO: id gernerieren