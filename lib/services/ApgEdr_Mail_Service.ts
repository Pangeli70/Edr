/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Mail]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240701
 * @version 0.2 APG 20241017 Extends ApgUts_Service
 * @version 0.3 APG 20241107 Better error management
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
export class ApgEdr_ResendMail_Service extends Uts.ApgUts_Service {



    static override InitServiceName() {
        return ApgEdr_ResendMail_Service.name;
    }



    static async SendEmail(
        asender: string,
        arecipients: string[],
        asubject: string,
        ahtml: string,
        accn?: string[]
    ) {
        const e = this.LogBegin(this.SendEmail);
        const r = new Uts.ApgUts_Result<string>()

        const RESEND_API_KEY = Deno.env.get(ApgEdr_Env_eEntry.EMAIL_API);
        if (!RESEND_API_KEY) {
            return this.Error(r, e.method, "No Resend Email Api Key provided in environment variables");
        };

        const recipients = [...arecipients];
        if (accn) recipients.concat(accn);

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

        if (res.ok) {
            r.setPayload(await res.json());
        }
        else {
            return this.Error(r, e.method, 'Error while sending email');
        }

        this.LogEnd(e)
        return r;
    };




}