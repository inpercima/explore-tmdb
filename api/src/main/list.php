<?php
require_once 'list.service.php';

$listsService = new ListsService();

$query = $_SERVER['QUERY_STRING'];
parse_str($query, $queryArr);
$listId = $queryArr['listId'];

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type");

// return json to client
echo $listsService->listAll($listId);
?>
