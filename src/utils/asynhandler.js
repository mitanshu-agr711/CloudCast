const asyncHandler = (requestHandler) => { //requestHandler is just a name
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
            catch((err) => next(err));
    }
}
export { asyncHandler };