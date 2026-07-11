/**
 * Controller to handle API health check requests.
 */
class HealthController {
  /**
   * Responds with the system status, uptime, and current time.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  check(req, res, next) {
    try {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new HealthController();
