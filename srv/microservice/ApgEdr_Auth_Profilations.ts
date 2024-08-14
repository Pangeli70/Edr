/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813 Cleanup
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../deps.ts";

export const ApgEdr_Auth_Profilations: Edr.ApgEdr_Auth_TProfilation = {

    'pangeli70@gmail.com': {
        email: 'pangeli70@gmail.com',
        name: 'Paolo Giusto',
        surname: 'Angeli',
        companyId: '1234',
        companyName: 'Apg Solutions Srl',
        description: ['Sviluppatore'],
        companyRole: 'Titolare'
    },

    'paolo.angeli@bredasys.com': {
        email: 'paolo.angeli@bredasys.com',
        name: 'Paolo Giusto',
        surname: 'Angeli',
        companyId: '1234',
        companyName: 'Breda Sistemi Industriali S.p.A.',
        description: ['Disegnatore, progettista, sviluppatore'],
        companyRole: 'Tecnico di supporto'
    },

    'luca.comelli@bredasys.com': {
        email: 'luca.comelli@bredasys.com',
        name: 'Luca',
        surname: 'Comelli',
        companyId: '1234',
        companyName: 'Breda Sistemi Industriali S.p.A.',
        description: ['Web and social media manager'],
        companyRole: 'Marketing'
    }

}
