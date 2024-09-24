const Timeline = require("../models/timeline");

exports.addTimeline = async (req, res) => {
  try {
    const { title, description, from, to } = req.body;
    await Timeline.create({
      title,
      description,
      timeline: {
        from,
        to,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Timeline Created Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error While Creating Timeline",
    });
  }
};

exports.deleteTimeline = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedTimeline = await Timeline.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Timeline Deleted",
      deletedTimeline,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error While Deleting Timeline",
    });
  }
};

exports.getAllTimelines = async (req, res) => {
  try {
    const allTimelines = await Timeline.find({});
    return res.status(200).json({
      success: true,
      message: "Timelines Fetched Successfully",
      allTimelines,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error While Fetching Timeline",
    });
  }
};
