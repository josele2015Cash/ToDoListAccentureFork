export const environment = {
  production: true
};

export const DB_TO_DO_LIST = "db_to_do_list";

export const CREATE_TABLE_CATEGORIA = `CREATE TABLE IF NOT EXISTS categoria (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  dt_fechaCreacion TEXT,
  dt_fechaModificacion TEXT,
  b_estado INTEGER NOT NULL
);`;

export const CREATE_TABLE_TAREA = `CREATE TABLE IF NOT EXISTS tarea (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  dt_fechaCreacion TEXT,
  dt_fechaModificacion TEXT,
  b_CHECK INTEGER NOT NULL,
  b_estado INTEGER NOT NULL,
  id_Categoria INTEGER NOT NULL,
  FOREIGN KEY (id_Categoria) REFERENCES categoria(id)
);`;

export interface categoria {
  id:number;
  nombre: string;
  dt_fechaCreacion: Date,
  dt_fechaModificacion: Date,
  b_estado: number
}

export interface Tarea {
  id: number;
  nombre: string;
  dt_fechaCreacion: Date,
  dt_fechaModificacion: Date,
  b_CHECK: number,
  b_estado: number,
  id_Categoria: number
}
