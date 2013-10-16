<?php
    $values = $_POST;

    if($values['toSave'] == 'true')
	SaveScoreInTable($values);
    else
	echo json_encode(GetScoreTable($values));
    
    function GetScoreTable($values){
	$scores = array();
	
	$ligne = file_get_contents("../score.txt"); // lecture du contenu de la ligne
	$people = explode(";", $ligne);
		
	foreach($people as $thisPeople){
	    $id = explode(':', $thisPeople);
	    $id = $id[0];
	    
	    if(empty($id))
		continue;
	    $name_array = explode(':', $thisPeople);
	    $name = explode(',', $name_array[1]);
	    $name = $name[0];
	    $score = explode(',', $name_array[1]);
	    $score = $score[1];
	    
	    $scores[] = array('id' => $id, 'name' => $name, 'score' => $score);
	}
	
	return $scores;
    }
    function SaveScoreInTable($values){
	$fp = fopen ("../score.txt", "a+");
	
	fputs($fp, $values['id']. ':' . $values['name'] . ',' . $values['score'] . ";");

	fclose ($fp);
    }
?>
