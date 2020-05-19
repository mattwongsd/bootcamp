exports.expressAsyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.gResolverAsyncHandler = (fn) => (root, args, context, info) =>
  Promise.resolve(fn(root, args, context, info)).catch(
    // Throw error function
  );