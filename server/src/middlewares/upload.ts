import multer from "multer";

const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
    }
};

export const upload = multer({
    storage: multer.memoryStorage(), // was diskStorage
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});