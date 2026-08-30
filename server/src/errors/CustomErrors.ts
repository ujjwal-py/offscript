export class CustomError extends Error {
    constructor(
        public statusCode: number,
        public errorCode: string,
        public message: string
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

    }
}

export class NotFoundError extends CustomError {
    constructor(message = "Resource not found") {
        super(404, "NF404", message);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message = "Unauthorized") {
        super(401, "UA401", message);
    }
}

export class ValidationError extends CustomError {
    constructor(message = "Validation Failed", public errors?: unknown) {
        super(400, "V400", message);
    }
}

