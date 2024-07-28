/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Mail]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240701
 * ----------------------------------------------------------------------------
 */
import {
    Uts
} from "../deps.ts";
import {
    ApgEdr_Env_eEntry
} from "../enums/ApgEdr_Env_eEntry.ts";



/**
 * Service used to send emails using the Resend Email Web Api
 */
export class ApgEdr_ResendMail_Service {


    static async SendEmail(
        asender: string,
        arecipients: string[],
        asubject: string,
        ahtml: string,
        accn?: string
    ) {


        const RESEND_API_KEY = Deno.env.get(ApgEdr_Env_eEntry.EMAIL_API);
        if (!RESEND_API_KEY) { 
            throw new Error("No Resend Email Api Key provided in environment");
        };

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: asender,      //'Acme <onboarding@resend.dev>',
                to: arecipients,    //['delivered@resend.dev'],
                subject: asubject,  //'hello world',
                html: ahtml,        //'<strong>it works!</strong>',
            })
        });

        const r = new Uts.ApgUts_RestResult(import.meta.url)

        if (res.ok) {
            r.ok = true;
            r.payload = {
                signature: "string",
                data: await res.json()
            } as Uts.ApgUts_IRestPayload;
        }
        else { 
            r.ok = true;
            r.message = 'Error while sending email';
        }

        return r;
    };




}