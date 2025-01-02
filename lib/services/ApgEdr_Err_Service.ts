/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1 APG 20240728
 * ----------------------------------------------------------------------------
 */


import {Drash} from "../deps.ts";


export class ApgEdr_Err_Service extends Drash.ErrorHandler {

    public catch(
        error: Error,
        request: Request,
        response: Drash.Response,
        
    ): void {


        // Any error that should return a stack trace is handled here. Since
        // Drash's default error handler returns a stack trace, just use its
        // implementation.
        if (error instanceof SomeErrorThatShouldReturnStackTraces) {
            return super.catch(error, request, response);
        }

        // Handle all other errors and return a JSON response -- not a stack
        // trace like the above
        return response.json({
            message: "Some fantastic error message for clients.",
        });


    }
}