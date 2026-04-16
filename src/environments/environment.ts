// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export interface categoria {
  id: number;
  nombre: string;
  dt_fechaCreacion: Date;
  dt_fechaModificacion: Date;
  b_estado: boolean;
}

export interface Tarea {
  id: number;
  nombre: string;
  dt_fechaCreacion: Date;
  dt_fechaModificacion: Date;
  b_CHECK: boolean;
  b_estado: boolean;
  id_Categoria: number;
}

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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
