import { createUploadthing, type FileRouter } from "uploadthing/next";

/**
 * UploadThing instance
 */
const f = createUploadthing();

/**
 * File upload routes (your CMS media layer)
 */
export const ourFileRouter = {
  /**
   * Project images (portfolio screenshots, thumbnails, etc.)
   */
  projectImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // You can add auth check here later if needed
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.url,
        key: file.key,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;