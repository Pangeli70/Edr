/** ---------------------------------------------------------------------------
 * @module [BrdEdr_Mail]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240701
 * ----------------------------------------------------------------------------
 */
import { Uts } from "../deps.ts";



/**
 * Servizio di invio delle email
 */
export class BrdEdr_Mail_Service {

    // TODO This must come from env and so we must check it
    // -- APG 20240707 
    static RESEND_API_KEY = "re_cTnot1B3_EhVbzJ96uKWQx6fHM6RBgCcQ";

    static async SendEmail(
        asender: string,
        arecipients: string[],
        asubject: string,
        ahtml: string,
        accn?: string
    ) {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: asender,      //'Acme <onboarding@resend.dev>',
                to: arecipients,    //['delivered@resend.dev'],
                subject: asubject,  //'hello world',
                html: ahtml,        //'<strong>it works!</strong>',
            })
        });

        const r = new Uts.BrdUts_RestResult('BrdEdr')

        if (res.ok) {
            r.ok = true;
            r.payload = {
                signature: "string",
                data: await res.json()
            } as Uts.BrdUts_IRestPayload;
        }
        else { 
            r.ok = true;
            r.message = 'Error while sending email';
        }

        return r;
    };




}