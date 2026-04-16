import { Injectable, WritableSignal, signal } from '@angular/core';
import { categoria, CREATE_TABLE_CATEGORIA, CREATE_TABLE_TAREA, DB_TO_DO_LIST, Tarea } from '../../environments/environment';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Databases {
  private db!: SQLiteObject;
  private categoria: WritableSignal<categoria[]> = signal <categoria[]>([]);
  private tarea: WritableSignal<Tarea[]> = signal <Tarea[]>([]);

  constructor(private sqlite: SQLite) {
  }

  async initializPlugin(){
    this.db = await this.sqlite.create(
      {name: DB_TO_DO_LIST.toString(), location: 'default'}
    ).then(async (dbA: SQLiteObject) => {
      return dbA;
    }).catch((err) => {
      alert("Error al crear o abrir base de datos: " + JSON.stringify(err));
      throw err;
    });

    return true;
  }

  async createTables(){
    if (!this.db) {
      alert("Error: La base de datos no está inicializada.");
      return;
    }
    await this.db.executeSql(CREATE_TABLE_CATEGORIA).then(() => {
      console.log("Tabla categoria creada o ya existe");
    }).catch((err) => {
      alert("Error al crear tabla categoria posiblemente ya existe: " + JSON.stringify(err));
    });

    await this.db.executeSql(CREATE_TABLE_TAREA).then(() => {
      console.log("Tabla tarea creada o ya existe");      
    }).catch((err) => {
      alert("Error al crear tabla tarea posiblemente ya existe: " + JSON.stringify(err));
    });
    return true;
  }

  async loadLastCategoriaId(): Promise<number> {
    if (!this.db) {
      alert("Error: La base de datos no está inicializada.");
      return 0;
    }
    try {
      const res = await this.db.executeSql("SELECT id FROM categoria ORDER BY id DESC LIMIT 1", undefined);
      if (res.rows.length > 0) {
        return res.rows.item(0).id;
      } else {
        return 0; // No hay categorías, por lo que el próximo ID será 1
      }
    } catch (err) {
      alert("Error al cargar el último ID de categoría: " + JSON.stringify(err));
      return 0;
    }
  }

  async loadAllCategorias(): Promise<categoria[]> {
    if (!this.db) {
      alert("Error: La base de datos no está inicializada.");
      return [];
    }
    try {
      const res = await this.db.executeSql("SELECT * FROM categoria ",undefined)
       .then((res) => {        
        let items: categoria[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          items.push(res.rows.item(i));
        }
        this.categoria.set(items);
        return items;
      }).catch((err) => {
        alert("Error al cargar categorias: " + JSON.stringify(err));
        throw [];
      });
      return [];
    } catch (err) {
      alert("Error al cargar categorias: " + JSON.stringify(err));
      return [];
    }
  }

  async loadCategoriasByNombre(nombre: string){
    if (!this.db) {
      alert("Error: La base de datos no está inicializada.");
      return;
    }
    try {
      const res = await this.db.executeSql("SELECT * FROM categoria WHERE NOMBRE like ? ORDER BY nombre ASC", [`%${nombre}%`]);
      let items: categoria[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        items.push(res.rows.item(i));
      }
      this.categoria.set(items);
      return items;
    } catch (err) {
      alert("Error al cargar categorias: " + JSON.stringify(err));
      return [];
    }
  }

  async addCategoria(categoria: categoria){
    if (!this.db) {
      alert("Error: La base de datos no está inicializada.");
      return;
    }

    // Usamos parámetros ? para evitar errores de formato y seguridad
    // Como dt_fechaCreacion tiene DEFAULT en el esquema, podemos omitirlo si es necesario,
    // pero aquí lo incluimos siguiendo tu lógica original.
    const sql = "INSERT INTO categoria (nombre, dt_fechaCreacion, dt_fechaModificacion, b_estado) VALUES (?, ?, ?, ?)";
    const params = [categoria.nombre, categoria.dt_fechaCreacion, categoria.dt_fechaModificacion, categoria.b_estado];

    await this.db.executeSql(sql, params).then((res) => {
      console.log("Categoria agregada con id: " + res.insertId);
      return res.insertId;
    }).catch((err) => {
      alert("Error al agregar categoria: " + JSON.stringify(err));
      return null;
    });
  }

  async loadTareasByIdCategoria(id_Categoria: number){
    if (!this.db) {
      alert("Error: La base de datos no está inicializada.");
      return;
    }
    const res = await this.db.executeSql("SELECT * FROM tarea" +
    " WHERE id_Categoria = " + id_Categoria + " ORDER BY nombre ASC").then((res) => {
      this.tarea.set(res.values as Tarea[]);
      return res.values as Tarea[];
    }).catch((err) => {
      alert("Error al cargar tareas por id de categoria: " + JSON.stringify(err));
    });
  }

  async loadTareasByNombre(nombre: String){
    if (!this.db) {
      alert("Error: La base de datos no está inicializada.");
      return;
    }

    const res = await this.db.executeSql("SELECT * FROM tarea" +
    " WHERE NOMBRE like '%" + nombre + "%' ORDER BY nombre ASC").then((res) => {
      this.tarea.set(res.values as Tarea[]);
      return res.values as Tarea[];
    }).catch((err) => {
      alert("Error al cargar tareas por nombre: " + JSON.stringify(err));
      return [];
    });
  }

  async updateCategoria(categoria: categoria){
    await this.db.executeSql("UPDATE categoria SET nombre = '" + categoria.nombre +
    "', dt_fechaModificacion = '" + categoria.dt_fechaModificacion +
    "', b_estado = " + categoria.b_estado + " WHERE id = " + categoria.id).then((res) => {
      console.log("Categoria actualizada con id: " + categoria.id);
      return res;
    }).catch((err) => {
      alert("Error al actualizar categoria: " + JSON.stringify(err));return null;
    });
  }

  async deleteCategoria(id: number){
    await this.db.executeSql("DELETE FROM categoria WHERE id = " + id).then((res) => {
      console.log("Categoria eliminada con id: " + id);
    }).catch((err) => {
      alert("Error al eliminar categoria: " + JSON.stringify(err));
    });
  }

  //CRUD Tarea
  async addTarea(tarea: Tarea){
    await this.db.executeSql("INSERT INTO tarea (nombre, dt_fechaCreacion, dt_fechaModificacion, b_estado, id_Categoria) VALUES ('" +
    tarea.nombre + "', '" + tarea.dt_fechaCreacion + "', '" + tarea.dt_fechaModificacion + "', " + tarea.b_estado + ", " + tarea.id_Categoria + ")")
    .then((res) => {
      console.log("Tarea agregada con id: " + res.insertId);
    }).catch((err) => {
      alert("Error al agregar tarea: " + err);
    });
  }

  async updateTarea(tarea: Tarea){
    await this.db.executeSql("UPDATE tarea SET nombre = '" + tarea.nombre +
    "', dt_fechaCreacion = '" + tarea.dt_fechaCreacion +
    "', dt_fechaModificacion = '" + tarea.dt_fechaModificacion +
    "', b_estado = " + tarea.b_estado + ", id_Categoria = " + tarea.id_Categoria + " WHERE id = " + tarea.id)
    .then((res) => {
      console.log("Tarea actualizada con id: " + tarea.id);
    }).catch((err) => {
      alert("Error al actualizar tarea: " + err);
    });
  }

  async deleteTarea(id: number){
    await this.db.executeSql("DELETE FROM tarea WHERE id = " + id).then((res) => {
      console.log("Tarea eliminada con id: " + id);
    }).catch((err) => {
      alert("Error al eliminar tarea: " + err);
    });
  }

  getCategoria(): categoria[]{
    return this.categoria();
  }

  getTarea(): Tarea[]{
    return this.tarea();
  }
}
