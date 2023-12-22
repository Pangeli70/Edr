/** ---------------------------------------------------------------------------
 * @module Brd/Edr
 * @author APG
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */
import { Drash } from "../deps.ts";
import { BrdEdrService } from "../classes/BrdEdrService.ts";


export class BrdEdrAnyImageResource extends Drash.Resource {
  
  public paths = ["/Brd/any/image"];

  public async GET(request: Drash.Request, response: Drash.Response) {

    let src = request.queryParam("src");
    const mode = request.queryParam("mode");

    if (!src) {
      throw new Drash.Errors.HttpError(
        400,
        "This resource requires the `src` URL query param.",
      );
    }

    try {
      const _fileStat = await Deno.stat(src);
    } catch (_error) {
      src = BrdEdrService.MissingImage;
    }

    if (!mode) {
      response.download(src!, "image/png");
    } else {
      response.file(src!);
    }
  }
}
