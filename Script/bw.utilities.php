<?php
    header('Content-Type: application/json');
    $values = $_POST;
//    $values = array('toSave' => false);
    
    if($values['toSave'] == 'true')
	SaveScoreInTable($values);
    else
	echo json_encode(GetScoreTable($values));
    
    function GetScoreTable($values){
	$scores = json_decode(file_get_contents("../score.txt")); // lecture du contenu de la ligne
	foreach ($scores as $key => $value) {
	    $rang[$key] = $value->score;
	}
	array_multisort($rang, SORT_DESC, $scores);
	array_slice($scores, 0, 10);
	
	file_put_contents("../score.txt", json_encode($scores));
	
	return $scores;
    }
    function SaveScoreInTable($values){
	// SAVE
	$ancient = json_decode(file_get_contents("../score.txt"));
	$ancient[] = $values;
	file_put_contents("../score.txt", json_encode($ancient));
	echo json_encode('{\'ok\':\'ok\'}');
    }
?>
