import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing";

/**
 * UploadThing App Router handler
 * This exposes your upload endpoints to the frontend
 */
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});