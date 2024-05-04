import { MovieTicket } from "../schema/model.js";

export const createMovieTicketController = async (req, res, next) => {
  try {
    let result = await MovieTicket.create(req.body);
    res.status(201).json({
      success: true,
      message: "Create successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const readAllMovieTicketController = async (req, res, next) => {
  try {
    let result = await MovieTicket.find({});
    res.status(200).json({
      success: true,
      message: "Read movie ticket successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const readSpecificMovieTicketController = async (req, res, next) => {
  try {
    let result = await MovieTicket.findById(req.params.id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "read movie ticket successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateMovieTicketController = async (req, res, next) => {
  try {
    let result = await MovieTicket.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      success: true,
      message: "update movie ticket successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteMovieTicketController = async (req, res, next) => {
  try {
    let result = await MovieTicket.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "delete movie ticket successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
