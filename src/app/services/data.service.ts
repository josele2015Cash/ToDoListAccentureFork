import { Injectable } from '@angular/core'; 
export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  check: boolean;
  idtable: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public messages: Message[] = [
    {
      fromName: 'Ejemplo de titulo de la tarea',
      subject: 'Ejemplo de la tarea a realizar',
      date: '9:32 AM',
      id: 0,
      check: false,
      idtable: 0
    },
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

}
