export type Libros = {
    id: string;
    titulo: string;
    categoria: string;
    declaracion: {
      número: string;
      año: string;
    };
    imagen: string;
    editorial: string;
  };