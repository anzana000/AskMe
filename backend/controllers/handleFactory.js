const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (!req.body.user) req.body.user = req.user;
    if (req.body.role) delete req.body.role;
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.getOne = (Model, popOption) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOption) query = query.populate(popOption);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //To allow for nested GET review on Question {hack}
    let filter = {};
    if (req.params.askId) filter = { question: req.params.askId };

    //*EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    //*SEND RESPONSE
    res.status(200).json({
      status: "success",

      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model, mode) =>
  catchAsync(async (req, res, next) => {
    //! Check if the currently logged in user has created th document
    const document = await Model.findById(req.params.id);
    let id_user;
    if (mode === "answer") id_user = document.user._id;
    if (mode === "question") id_user = document.user.find((i) => i._id)._id;

    console.log(id_user, req.user._id);
    if (!id_user.equals(req.user._id))
      return next(
        new AppError("You are not allowed to perform this action", 403)
      );

    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(204).json({
      status: "success",
      data: doc,
    });
  });

exports.updateOne = (Model, mode) =>
  catchAsync(async (req, res, next) => {
    //! Check if the currently logged in user has created th document
    const document = await Model.findById(req.params.id);
    let id_user;
    if (mode === "answer") id_user = document.user._id;
    if (mode === "question") id_user = document.user.find((i) => i._id)._id;

    console.log(id_user, req.user._id);
    if (!id_user.equals(req.user._id))
      return next(
        new AppError("You are not allowed to perform this action", 403)
      );
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
