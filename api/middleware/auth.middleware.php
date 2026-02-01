<?php

class AuthMiddleware {

  /**
   * constructor
   */
  public function __construct() {}

  /**
   * Validate API key from request headers
   * Returns true if valid, false otherwise
   */
  public function validateApiKey() {
    $headers = getallheaders();
    $apiKey = null;

    // Check for API key in Authorization header
    if (isset($headers['Authorization'])) {
      $apiKey = str_replace('Bearer ', '', $headers['Authorization']);
    } elseif (isset($headers['X-API-Key'])) {
      $apiKey = $headers['X-API-Key'];
    }

    // Compare with configured API key
    if ($apiKey && $apiKey === Config::CUSTOM_API_KEY) {
      return true;
    }

    return false;
  }

  /**
   * Send 401 Unauthorized response
   */
  public function unauthorizedResponse() {
    http_response_code(401);
    echo json_encode(array('error' => 'Unauthorized', 'message' => 'Invalid or missing API key'));
    exit;
  }

  /**
   * Require authentication - validate or send 401
   */
  public function requireAuth() {
    if (!$this->validateApiKey()) {
      $this->unauthorizedResponse();
    }
  }
}
?>
