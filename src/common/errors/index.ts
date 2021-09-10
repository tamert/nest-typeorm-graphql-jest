import { HttpException } from '@nestjs/common';

interface IErrData {
    msg?: string;
    raise?: boolean;
}

export const authorizationFailed = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 400,
            error: data?.msg || 'AUTHORIZATION_FAILED',
        },
        400,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const unauthorized = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 401,
            error: data?.msg || 'UNAUTHORIZED',
        },
        401,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const jwtTokenExpiredSignature = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 403,
            error: data?.msg || 'JWT_TOKEN_EXPIRED',
        },
        403,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const refreshTokenExpiredSignature = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 419,
            error: data?.msg || 'REFRESH_TOKEN_EXPIRED',
        },
        419,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const resetTokenExpiredSignature = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 403,
            error: data?.msg || 'RESET_TOKEN_EXPIRED',
        },
        403,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const confirmTokenExpiredSignature = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 403,
            error: data?.msg || 'CONFIRM_TOKEN_EXPIRED',
        },
        403,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const accountBlocked = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 423,
            error: data?.msg || 'ACCOUNT_BLOCKED',
        },
        423,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const accessDenied = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 403,
            error: data?.msg || 'ACCESS_DENIED',
        },
        403,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const badRequest = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 400,
            error: data?.msg || 'BAD_REQUEST',
        },
        400,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const notFound = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 404,
            error: data?.msg || 'NOT_FOUND',
        },
        404,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const internalServerError = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 500,
            error: data?.msg || 'INTERNAL_SERVER_ERROR',
        },
        500,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const serviceUnavailable = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 503,
            error: data?.msg || 'SERVICE_UNAVAILABLE',
        },
        503,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};

export const corsNotAllowed = (data?: IErrData) => {
    const err = new HttpException(
        {
            status: 400,
            error: data?.msg || 'CORS_NOT_ALLOWED',
        },
        400,
    );

    if (data?.raise) {
        throw err;
    }

    return err;
};
