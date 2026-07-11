import analysisService from '../services/analysisService.js';

/**
 * Controller to handle company analysis requests.
 */
class AnalysisController {
  /**
   * Triggers the analysis service for the submitted company and returns the results.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async analyze(req, res, next) {
    try {
      const { companyName } = req.body;
      
      const analysisResult = await analysisService.analyzeCompany(companyName);
      
      res.status(200).json(analysisResult);
    } catch (error) {
      next(error);
    }
  }
}

export default new AnalysisController();
