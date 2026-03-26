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
    $items = $this->extract($data);
    $totalPages = $data->total_pages;
    for ($i = $page + 1; $i <= $totalPages; $i++) {
      $items = array_merge($items, $this->extract($this->request($listId, $language, $i)));
    }
    return json_encode(array("name" => $data->name, "description" => $data->description, "items" => $items));
  }

  /**
   * Executes one or multiple requests to get all items from a public list in themoviedb.
   */
  private function request($listId, $language, $page) {
    $apiKey = Config::API_KEY;
    return json_decode(file_get_contents("https://api.themoviedb.org/4/list/$listId?api_key=$apiKey&language=$language&page=$page"));
  }

  /**
   * Extract data for the result.
   */
  private function extract($data) {
    $items = [];
    foreach($data->results as $key => $value) {
      $mediaType = $value->media_type;
      $title = $mediaType == 'tv' ? $value->name : $value->title;
      $originalTitle = $mediaType == 'tv' ? $value->original_name : $value->original_title;
      $releaseDate = $mediaType == 'tv' ? $value->first_air_date : $value->release_date;
      $commentId = "$mediaType:$value->id";
      $comment = $data->comments->$commentId;
      $comment = $comment == null ? '' : $comment;
      $cast = $this->getCast($value->id, $mediaType);
      array_push($items, (object) [ 'title' => $title, 'original_title' => $originalTitle, 'release_date' => $releaseDate, 'cast' => $cast, 'comment' => nl2br($comment) ]);
    }
    return $items;
  }

  /**
   * Fetches the top 5 main actors for a movie or TV show from the TMDB v3 credits endpoint.
   */
  private function getCast($movieId, $mediaType) {
    $apiKey = Config::API_KEY;
    $endpoint = $mediaType == 'tv' ? 'tv' : 'movie';
    $url = "https://api.themoviedb.org/3/$endpoint/$movieId/credits?api_key=$apiKey";
    $response = @file_get_contents($url);
    if ($response === false) {
      return [];
    }
    $credits = json_decode($response);
    if ($credits === null || !isset($credits->cast)) {
      return [];
    }
    $mainActors = array_slice($credits->cast, 0, 5);
    return array_map(function($actor) {
      return $actor->name;
    }, $mainActors);
  }
}
?>
