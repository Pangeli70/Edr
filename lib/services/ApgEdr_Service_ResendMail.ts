/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Mail]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/01]
 * @version 0.9.2 [APG 2024/10/17] Extends ApgUts_Service
 * @version 0.9.3 [APG 2024/11/07] Better error management
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */
import { Uts } from "../deps.ts";
import { ApgEdr_eEnvEntry } from "../enums/ApgEdr_eEnvEntry.ts";



/**
 * Service used to send emails using the Resend Email Web Api
 */
export class ApgEdr_Service_ResendMail

    extends Uts.ApgUts_Service {

    
    // TODO get this from env -- APG 20241211
    static sender = 'support@apg-web-dev-24.it'

    static override InitServiceName() {
        return ApgEdr_Service_ResendMail.name;
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

        const RESEND_API_KEY = Deno.env.get(ApgEdr_eEnvEntry.EMAIL_API);
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