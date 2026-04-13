import { Injectable, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { CREATE_TABLE_CATEGORIA, CREATE_TABLE_TAREA, DB_TO_DO_LIST } from '../../environments/environment';
export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  check: boolean;
}

export interface Tarea{
  id:number;
  nombre:String;
  dt_fechaCreacion:Date;
  dt_fechaModificacion:Date;
  b_estado:boolean;
  id_Categoria:number;
}

export interface Categoria{
  id:number;
  nombre:String;
  dt_fechaCreacion:Date;
  dt_fechaModificacion:Date;
  b_estado:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sqlite : SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private categoria: WritableSignal<Categoria[]> = signal <Categoria[]>([]);
  private tarea: WritableSignal<Tarea[]> = signal <Tarea[]>([]);

  public messages: Message[] = [
    {
      fromName: 'Ejemplo de titulo de la tarea',
      subject: 'Ejemplo de la tarea a realizar',
      date: '9:32 AM',
      id: 0,
      check: false
    },
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

  async initializPlugin(){
    this.db = await this.sqlite.createConnection( 
      DB_TO_DO_LIST,
      false,
      "no-encryption",
      1,
      false
    )
    await this.db.open(); 
    await this.db.execute(CREATE_TABLE_CATEGORIA);
    await this.db.execute(CREATE_TABLE_TAREA);
    return true;
  }

  async loadCategoriasByNombre(nombre: String){
    const res = await this.db.query("SELECT * FROM categoria" + 
    "WHERE NOMBRE like '%" + nombre + "%' ORDER BY nombre ASC");
    this.categoria.set(res.values as Categoria[]);
  }

  async loadTareasByIdCategoria(id_Categoria: number){
    const res = await this.db.query("SELECT * FROM tarea" + 
    "WHERE id_Categoria = " + id_Categoria + " ORDER BY nombre ASC");
    this.tarea.set(res.values as Tarea[]);
  }

  async loadTareasByNombre(nombre: String){
    const res = await this.db.query("SELECT * FROM tarea" + 
    "WHERE NOMBRE like '%" + nombre + "%' ORDER BY nombre ASC");
    this.tarea.set(res.values as Tarea[]);
  }
  //CRUD Categoria
  async addCategoria(categoria: Categoria){
    await this.db.run("INSERT INTO categoria (nombre, dt_fechaCreacion, dt_fechaModificacion, b_estado) VALUES ('" + 
    categoria.nombre + "', '" + categoria.dt_fechaCreacion + "', '" + categoria.dt_fechaModificacion + "', " + categoria.b_estado + ")");
  }

  async updateCategoria(categoria: Categoria){
    await this.db.run("UPDATE categoria SET nombre = '" + categoria.nombre + 
    "', dt_fechaCreacion = '" + categoria.dt_fechaCreacion + 
    "', dt_fechaModificacion = '" + categoria.dt_fechaModificacion + 
    "', b_estado = " + categoria.b_estado + " WHERE id = " + categoria.id);
  }

  async deleteCategoria(id: number){
    await this.db.run("DELETE FROM categoria WHERE id = " + id);
  }

  //CRUD Tarea
  async addTarea(tarea: Tarea){
    await this.db.run("INSERT INTO tarea (nombre, dt_fechaCreacion, dt_fechaModificacion, b_estado, id_Categoria) VALUES ('" + 
    tarea.nombre + "', '" + tarea.dt_fechaCreacion + "', '" + tarea.dt_fechaModificacion + "', " + tarea.b_estado + ", " + tarea.id_Categoria + ")");
  }

  async updateTarea(tarea: Tarea){
    await this.db.run("UPDATE tarea SET nombre = '" + tarea.nombre + 
    "', dt_fechaCreacion = '" + tarea.dt_fechaCreacion + 
    "', dt_fechaModificacion = '" + tarea.dt_fechaModificacion + 
    "', b_estado = " + tarea.b_estado + ", id_Categoria = " + tarea.id_Categoria + " WHERE id = " + tarea.id);
  }

  async deleteTarea(id: number){
    await this.db.run("DELETE FROM tarea WHERE id = " + id);
  }   

  getCategoria(): Categoria[]{
    return this.categoria();
  }
  
  getTarea(): Tarea[]{
    return this.tarea();
  }
}
