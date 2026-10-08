import { createClient } from "@supabase/supabase-js";
import { CustomError } from "../errors/CustomErrors";

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type UploadedImage = {
    path: string;
    publicUrl: string;
};

export const uploadPostImage = async (
    file: Express.Multer.File
): Promise<UploadedImage> => {
    const bucket = process.env.SUPABASE_BUCKET;
    if (!bucket) {
        throw new CustomError(500, "SUPABASE_CONFIG_ERROR", "Storage is not configured");
    }

    const extension = file.mimetype.split("/")[1] ?? "bin";
    const path = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
    const { error } = await supabase.storage
        .from(bucket)
        .upload(path, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
        });

    if (error) {
        throw new CustomError(500, "SUPABASE_UPLOAD_ERROR", "Failed to upload image");
    }

    const publicUrl = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    return { path, publicUrl };
};

export const deletePostImage = async (publicUrl: string | null) => {
    const bucket = process.env.SUPABASE_BUCKET;
    if (!bucket || !publicUrl) return;

    const marker = `/storage/v1/object/public/${bucket}/`;
    const pathname = new URL(publicUrl).pathname;
    const markerIndex = pathname.indexOf(marker);
    if (markerIndex === -1) return;

    const path = decodeURIComponent(pathname.slice(markerIndex + marker.length));
    if (!path) return;

    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) {
        throw new CustomError(500, "SUPABASE_DELETE_ERROR", "Failed to delete image");
    }
};