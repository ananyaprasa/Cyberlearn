import mongoose from 'mongoose';
import { z } from 'zod';

// ObjectId validation helper
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Enhanced ObjectId validation with existence check
export const validateObjectIdExists = (Model, paramName = 'id', fieldName = '_id') => {
  return async (req, res, next) => {
    const id = req.params[paramName] || req.body[paramName] || req.query[paramName];
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: `${paramName} parameter is required`
      });
    }
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid ${paramName} format`
      });
    }
    
    try {
      const exists = await Model.findById(id);
      if (!exists) {
        return res.status(404).json({
          success: false,
          error: `${Model.modelName} not found`
        });
      }
      
      // Store the found document for later use
      req.foundDocument = exists;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Database validation error'
      });
    }
  };
};

// Middleware to validate ObjectId parameters
export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: `${paramName} parameter is required`
      });
    }
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid ${paramName} format`
      });
    }
    
    next();
  };
};

// Middleware to validate request body with Zod schema
export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData; // Replace with validated data
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => 
          `${err.path.join('.')}: ${err.message}`
        ).join(', ');
        
        return res.status(400).json({
          success: false,
          error: `Validation failed: ${errorMessages}`
        });
      }
      
      return res.status(400).json({
        success: false,
        error: 'Invalid request data'
      });
    }
  };
};

// Middleware to validate query parameters
export const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      const validatedQuery = schema.parse(req.query);
      req.query = validatedQuery;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => 
          `${err.path.join('.')}: ${err.message}`
        ).join(', ');
        
        return res.status(400).json({
          success: false,
          error: `Query validation failed: ${errorMessages}`
        });
      }
      
      return res.status(400).json({
        success: false,
        error: 'Invalid query parameters'
      });
    }
  };
};

// Sanitize string inputs
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/\s+/g, ' '); // Remove extra whitespace
};

// Middleware to sanitize request body
export const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    }
  }
  next();
};

// Middleware to prevent empty/null required fields
export const validateRequiredFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    const emptyFields = [];
    
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        missingFields.push(field);
      } else if (req.body[field] === null || req.body[field] === undefined || 
                 (typeof req.body[field] === 'string' && req.body[field].trim() === '')) {
        emptyFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    if (emptyFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Empty required fields: ${emptyFields.join(', ')}`
      });
    }
    
    next();
  };
};

// Middleware to prevent duplicate submissions
export const preventDuplicateSubmission = async (req, res, next) => {
  try {
    if (!req.user || !req.body.assignmentId) {
      return next();
    }
    
    const Submission = mongoose.model('Submission');
    const existingSubmission = await Submission.findOne({
      assignment: req.body.assignmentId,
      student: req.user._id
    });
    
    if (existingSubmission) {
      return res.status(409).json({
        success: false,
        error: 'Submission already exists for this assignment'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Error checking for duplicate submission'
    });
  }
};

// Middleware to validate classroom enrollment before submission
export const validateClassroomEnrollment = async (req, res, next) => {
  try {
    if (!req.user || !req.body.assignmentId) {
      return next();
    }
    
    const Assignment = mongoose.model('Assignment');
    const User = mongoose.model('User');
    
    const assignment = await Assignment.findById(req.body.assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }
    
    // If assignment is tied to a classroom, check enrollment
    if (assignment.classroom) {
      const user = await User.findById(req.user._id);
      if (!user.enrolledClasses.includes(assignment.classroom)) {
        return res.status(403).json({
          success: false,
          error: 'Must be enrolled in classroom to submit assignment'
        });
      }
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Error validating classroom enrollment'
    });
  }
};

// Middleware to validate grade bounds
export const validateGradeBounds = async (req, res, next) => {
  try {
    if (req.body.grade === null || req.body.grade === undefined) {
      return next();
    }
    
    const submissionId = req.params.id;
    const Submission = mongoose.model('Submission');
    
    const submission = await Submission.findById(submissionId).populate('assignment');
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }
    
    const maxPoints = submission.assignment.points || 100;
    const grade = req.body.grade;
    
    if (grade < 0 || grade > maxPoints) {
      return res.status(400).json({
        success: false,
        error: `Grade must be between 0 and ${maxPoints}`
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Error validating grade bounds'
    });
  }
};