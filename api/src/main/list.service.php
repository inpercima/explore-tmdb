<?php
$mode = strpos($_SERVER['SERVER_NAME'], 'localhost') ? 'dev' : 'prod';
require_once "config.${mode}.php";

class ListsService {

  private $movies = [];

  /**
   * constructor
   */
  public function __construct() {}

  /**
   * List all movies from a public list in themoviedb.
   */
  public function listAll($listId) {
    $page = 1;
    $data = $this->request($listId, $page);
    $totalPages = $data->total_pages;
    for ($i = $page + 1; $i <= $totalPages; $i++) {
      $this->request($listId, $i);
    }
    return json_encode($this->movies);
  }

  private function request($listId, $page) {
    $apiKey = Config::API_KEY;
    $response = file_get_contents("https://api.themoviedb.org/4/list/$listId?api_key=$apiKey&page=$page");
    $data = json_decode($response);
    foreach($data->results as $key => $value) {
      $mediaType = $value->media_type;
      $title = $mediaType == 'tv' ? $value->name : $value->title;
      $commentId = "$mediaType:$value->id";
      $comment = $data->comments->$commentId;
      $comment = $comment == null ? '' : $comment;
      array_push($this->movies, (object) [ 'title' => $title, 'comment' => nl2br($comment) ]);
    }
    return $data;
  }
}
?>
