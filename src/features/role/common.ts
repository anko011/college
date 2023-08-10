import {translit} from "@/share/lib/stringService";


export const createSystemName = (name: string) => `ROLE_${translit(name).replace(/[^a-zA-Z ]/g, "").split(' ').join('').toUpperCase()}`