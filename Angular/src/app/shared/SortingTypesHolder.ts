
import { Student } from 'src/app/classes/student';
// this class holds all the interface and types needed to sort the student and admin tables
export type SortColumn = keyof Student | '' ;
export type SortDirection = 'asc' | 'desc' | '';

export const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export  const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
}

