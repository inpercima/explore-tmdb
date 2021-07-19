<?php

class ListService {

  /**
   * constructor
   */
  public function __construct() {}

  /**
   * List all title from a public list in themoviedb.
   */
  public function listAll($listId, $language) {
    $page = 1;
    $data = $this->request($listId, $language, $page);
    $titles = $this->extract($data);
    $totalPages = $data->total_pages;
    for ($i = $page + 1; $i <= $totalPages; $i++) {
      $titles = array_merge($titles, $this->extract($this->request($listId, $language, $i)));
    }
    return json_encode($titles);
  }

  /**
   * Executes one or multiple requests to get all titles from a public list in themoviedb.
   */
  private function request($listId, $language, $page) {
    $apiKey = Config::API_KEY;
    return json_decode(file_get_contents("https://api.themoviedb.org/4/list/$listId?api_key=$apiKey&language=$language&page=$page"));
  }

  /**
   * Extract data for the result.
   */
  private function extract($data) {
    $titles = [];
    foreach($data->results as $key => $value) {
      $mediaType = $value->media_type;
      $title = $mediaType == 'tv' ? $value->name : $value->title;
      $commentId = "$mediaType:$value->id";
      $comment = $data->comments->$commentId;
      $comment = $comment == null ? '' : $comment;
      array_push($titles, (object) [ 'title' => $title, 'comment' => nl2br($comment) ]);
    }
    return $titles;
  }
}
?>
