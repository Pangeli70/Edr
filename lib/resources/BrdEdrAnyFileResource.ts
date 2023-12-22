/** ---------------------------------------------------------------------------
 * @module Brd/Edr
 * @author APG
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */
import { Drash, Uts } from "../deps.ts";

export class BrdEdrAnyFileResource extends Drash.Resource {


    public paths = ["/Brd/any/file/:file"];

    public async GET(request: Drash.Request, response: Drash.Response) {

        const encodedFile = request.pathParam("file");

        if (!encodedFile) {
            throw new Drash.Errors.HttpError(
                400,
                "Path parameter for the file is not specified.",
            );
        }

        const realFile = decodeURIComponent(encodedFile);

        const fileInfo = await Deno.stat(realFile);

        if (fileInfo.isFile) {

            const extension = Uts.Std.Path.extname(realFile).toLowerCase(); 
            
            switch( extension){

                /** These ones are managed by Drash MIME types */
                case '.pdf':
                case '.dxf':
                case '.dwg':{
                    response.file(realFile);
                    break;
                }
                /** Generic MIME by vendor */
                default :{
                    response.download(realFile, "application/vnd");
                    break;
                }
            }
        }
        else {
            response.text(`FILE NOT FOUND!! [${realFile}]`, 404)
        }

    }

}
