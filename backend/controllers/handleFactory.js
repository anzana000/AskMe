const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newQuestion = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: newQuestion,
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

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(204).json({
      status: "success",
      data: doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const question = await Model.findByIdAndUpdate(
      req.params.id,
      { question: req.body.question },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!question) {
      return next(new AppError("No document found with that id", 404));
    }
    res.status(201).json({
      status: "success",
      data: question,
    });
  });
