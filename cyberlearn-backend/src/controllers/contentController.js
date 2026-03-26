import Content from "../models/Content.js";
import mongoose from "mongoose";

// ================= CREATE CONTENT (Admin) =================
export const createContent = async (req, res) => {
  try {
    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required to create content" 
      });
    }

    const content = await Content.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= GET ALL PUBLISHED CONTENT (Public) =================
export const getAllContent = async (req, res) => {
  try {
    const { category, difficulty, page, limit } = req.query;
    let filter = { published: true };

    if (category) {
      filter.category = category;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 5;

    const skip = (pageNumber - 1) * limitNumber;

    const contents = await Content.find(filter)
      .populate("createdBy", "name")
      .skip(skip)
      .limit(limitNumber);

    const total = await Content.countDocuments(filter);
    
    res.json({
      success: true,
      data: contents // Direct array, not nested
    });
  
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= GET CONTENT BY ID (Public) =================
export const getContentById = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ 
        success: false, 
        message: "Content not found" 
      });
    }

    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ 
        success: false, 
        message: "Content not found" 
      });
    }

    // Only return published content for public access
    if (!content.published) {
      return res.status(404).json({ 
        success: false, 
        message: "Content not found" 
      });
    }

    // Map to frontend expected format - CRITICAL FIX
    const response = {
      id: content._id,
      title: content.title || "Untitled",
      difficulty: content.difficulty || "Easy", // Safe default
      category: content.category || "General",
      content: content.markdownContent || content.content || "", // Map markdownContent → content with fallback
      description: content.description || "",
      published: content.published,
      createdAt: content.createdAt
    };

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= POST CONTENT =================
export const updateContent = async (req, res) => {
  try {
    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= DELETE CONTENT =================
export const deleteContent = async (req, res) => {
  try {
    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    await Content.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      data: { message: "Content deleted" }
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

//================= PUBLISH TOGGLE =================
export const togglePublish = async (req, res) => {
  try {
    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ 
        success: false, 
        message: "Content not found" 
      });
    }

    content.published = !content.published;

    await content.save();

    res.json({
      success: true,
      data: {
        message: "Publish status updated",
        published: content.published
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};



