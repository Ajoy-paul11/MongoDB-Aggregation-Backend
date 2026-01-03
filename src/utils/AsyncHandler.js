export const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        // try {
        //     await requestHandler(req, res, next);
        // } catch (err) {
        //     next(err);
        // }
        return Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};
