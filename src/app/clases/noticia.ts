import { Comentario } from "./comentario";
import { Usuario } from "./usuario";

export class Noticia {
    id:number;
    titulo:string;
    contenido:string;
    contenido_corto:string;
    fecha_creacion:string;
    autor:Usuario;
    comentarios:Comentario[];
}
