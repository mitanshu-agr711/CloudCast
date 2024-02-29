const asyncHandler = (requestHandler) => { //requestHandler is just a name
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
            catch((err) => next(err));
    }
}
export { asyncHandler };