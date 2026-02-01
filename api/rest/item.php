<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once $coreService->requireConfig();
require_once '../middleware/auth.middleware.php';
require_once '../service/item.service.php';

// Set CORS headers
$coreService->setHeader();

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key');
  http_response_code(200);
  exit;
}

$authMiddleware = new AuthMiddleware();
$itemService = new ItemService();

// Handle POST request - Add new item
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Require authentication for POST
  $authMiddleware->requireAuth();

  // Get JSON input
  $input = json_decode(file_get_contents('php://input'), true);

  // Validate input
  if (!$input) {
    http_response_code(400);
    echo json_encode(array('error' => 'Bad Request', 'message' => 'Invalid JSON input'));
    exit;
  }

  $title = isset($input['title']) ? trim($input['title']) : '';
  $comment = isset($input['comment']) ? trim($input['comment']) : '';
  $mediaType = isset($input['media_type']) ? trim($input['media_type']) : '';

  // Add item
  $result = $itemService->addItem($title, $comment, $mediaType);

  if ($result['success']) {
    http_response_code(201);
    echo json_encode($result);
  } else {
    http_response_code(400);
    echo json_encode(array('error' => 'Bad Request', 'message' => $result['error']));
  }
  exit;
}

// Handle GET request - Get all custom items
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $items = $itemService->getAllCustomItems();
  http_response_code(200);
  echo json_encode(array('items' => $items));
  exit;
}

// Method not allowed
http_response_code(405);
echo json_encode(array('error' => 'Method Not Allowed'));
?>
