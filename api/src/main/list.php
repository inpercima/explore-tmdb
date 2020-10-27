<?php
require_once 'list.service.php';

$listsService = new ListsService();

$query = $_SERVER['QUERY_STRING'];
parse_str($query, $queryArr);
$listId = $queryArr['listId'];

// return json to client
echo $listsService->listAll($listId);
?>
