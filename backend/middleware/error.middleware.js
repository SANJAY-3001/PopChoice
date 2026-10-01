export function errorHandler(
    error,
    req,
    res,
    next
) {

    console.error(error);


    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message
    });
}