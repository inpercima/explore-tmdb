<?php
require_once 'config.php';

class ListsService {

  private $movies = [];

  /**
   * constructor
   */
  public function __construct() {}

  /**
   * List all movies from a public list in themoviedb.
   */
  public function listAll($query) {
    parse_str($query, $queryArr);
    $listId = $queryArr['listId'];
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
      array_push($this->movies, $value->title);
    }
    return $data;
  }
}
?>
