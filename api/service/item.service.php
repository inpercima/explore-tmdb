<?php

class ItemService {

  private $db;

  /**
   * constructor - Initialize database connection
   */
  public function __construct() {
    $dbPath = Config::DB_PATH;
    
    // Create database directory if it doesn't exist
    $dbDir = dirname($dbPath);
    if (!file_exists($dbDir)) {
      mkdir($dbDir, 0755, true);
    }

    // Initialize SQLite database
    try {
      $this->db = new PDO("sqlite:$dbPath");
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->initializeDatabase();
    } catch (PDOException $e) {
      error_log("Database connection failed: " . $e->getMessage());
      throw $e;
    }
  }

  /**
   * Initialize database schema
   */
  private function initializeDatabase() {
    $setupSql = file_get_contents(__DIR__ . '/../database/setup.sql');
    $this->db->exec($setupSql);
  }

  /**
   * Add a new custom item to the database
   * 
   * @param string $title - Title of the item
   * @param string $comment - Comment about the item
   * @param string $mediaType - Type of media (movie or tv)
   * @param string $createdBy - Username of creator
   * @return array - Result with success status and item data
   */
  public function addItem($title, $comment, $mediaType, $createdBy = 'inpercima') {
    // Validate input
    if (empty($title)) {
      return array('success' => false, 'error' => 'Title is required');
    }

    if (empty($mediaType) || !in_array($mediaType, array('movie', 'tv'))) {
      return array('success' => false, 'error' => 'Media type must be either "movie" or "tv"');
    }

    try {
      $stmt = $this->db->prepare(
        "INSERT INTO custom_items (title, comment, media_type, created_by, created_at) 
         VALUES (:title, :comment, :media_type, :created_by, datetime('now'))"
      );

      $stmt->bindParam(':title', $title, PDO::PARAM_STR);
      $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
      $stmt->bindParam(':media_type', $mediaType, PDO::PARAM_STR);
      $stmt->bindParam(':created_by', $createdBy, PDO::PARAM_STR);

      $stmt->execute();
      $itemId = $this->db->lastInsertId();

      return array(
        'success' => true,
        'id' => $itemId,
        'title' => $title,
        'comment' => $comment,
        'media_type' => $mediaType,
        'created_by' => $createdBy
      );
    } catch (PDOException $e) {
      error_log("Failed to add item: " . $e->getMessage());
      return array('success' => false, 'error' => 'Failed to add item to database');
    }
  }

  /**
   * Get all custom items from the database
   * 
   * @return array - Array of custom items
   */
  public function getAllCustomItems() {
    try {
      $stmt = $this->db->query(
        "SELECT id, title, comment, media_type, created_at, created_by 
         FROM custom_items 
         ORDER BY created_at DESC"
      );

      $items = array();
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($items, array(
          'id' => $row['id'],
          'title' => $row['title'],
          'comment' => nl2br($row['comment']),
          'media_type' => $row['media_type'],
          'created_at' => $row['created_at'],
          'created_by' => $row['created_by']
        ));
      }

      return $items;
    } catch (PDOException $e) {
      error_log("Failed to get items: " . $e->getMessage());
      return array();
    }
  }

  /**
   * Get custom items formatted for list display (compatible with TMDb format)
   * 
   * @return array - Array of items with title and comment only
   */
  public function getCustomItemsForDisplay() {
    try {
      $stmt = $this->db->query(
        "SELECT title, comment 
         FROM custom_items 
         ORDER BY created_at DESC"
      );

      $items = array();
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($items, array(
          'title' => $row['title'],
          'comment' => nl2br($row['comment'])
        ));
      }

      return $items;
    } catch (PDOException $e) {
      error_log("Failed to get items for display: " . $e->getMessage());
      return array();
    }
  }
}
?>
