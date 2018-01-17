#pragma strict
import System.Collections.Generic; //FOR LIST.<STRING>

var Game_Status : boolean = false;

var Sequence_Total : int = 1;
var Sequence_Count : int = 1; //Temp one
var Sequence = new Array ();
var Simon : UnityEngine.UI.RawImage;
var Color_Current : Color;

var Title : UnityEngine.UI.Text;
var Score_Current : UnityEngine.UI.Text;
var Score_High : UnityEngine.UI.Text;

var Button_Restart : GameObject;
var Button_Quit : GameObject;

var Option_1 : GameObject;
var Option_2 : GameObject;
var Option_3 : GameObject;
var Option_4 : GameObject;
var Button_Current : GameObject;

function Start () {
	Button_Restart.SetActive(false);
	Button_Quit.SetActive(false);
	Simon.color = Color.black;
	PlayerPrefs.SetInt("Score_Current", 0);
	Simon_Trigger();
}

function Update () {
	if (PlayerPrefs.GetInt("Score_Current") > PlayerPrefs.GetInt("Score_High")) {
		PlayerPrefs.SetInt("Score_High", PlayerPrefs.GetInt("Score_Current"));
	}
	Score_Current.text = "Current Score: " + PlayerPrefs.GetInt("Score_Current");
	Score_High.text = "Highscore: " + PlayerPrefs.GetInt("Score_High");
}

function Simon_Trigger () {
	if (Game_Status == true) {
		Game_Status = false;
		if (Sequence_Total == 1) {
			yield WaitForSeconds(.5);
		}
		var Setter : int = Random.Range(1, 5);
		if (Setter == 1) {
			Sequence[Sequence_Total] = "Red";
		}else if (Setter == 2) {
			Sequence[Sequence_Total] = "Green";
		}else if (Setter == 3) {
			Sequence[Sequence_Total] = "Blue";
		}else if (Setter == 4) {
			Sequence[Sequence_Total] = "Yellow";
		}
		Sequence_Count = 1;
		while (Sequence_Count <= Sequence_Total) {
			Color_Switcher();
			yield WaitForSeconds(1);
			Simon.color = Color.black;
			if (Sequence_Count <= Sequence_Total - 1) {
				yield WaitForSeconds(.5);
			}
			Sequence_Count++;
		}
		Sequence_Count = 1;
		Game_Status = true;
	}
}

function Color_Switcher () {
	if (Sequence[Sequence_Count] == "Red") {
		Color_Current = Color.red;
	}else if (Sequence[Sequence_Count] == "Green") {
		Color_Current = Color.green;
	}else if (Sequence[Sequence_Count] == "Blue") {
		Color_Current = Color.blue;
	}else if (Sequence[Sequence_Count] == "Yellow") {
		Color_Current = Color.yellow;
	}
	Simon.color = Color_Current;
}

function Option () {
	if (Game_Status == true) {
		Debug.Log(Sequence_Count);
		if (Button_Current.name == Sequence[Sequence_Count]) {
			if (Sequence_Count >= Sequence_Total) {
				PlayerPrefs.SetInt("Score_Current", PlayerPrefs.GetInt("Score_Current") + 1);
				Sequence_Total++;
				Simon_Trigger();
			}else {
				Sequence_Count++;
			}
		}else {
			Game_Status = false;
			Button_Restart.SetActive(true);
			Button_Quit.SetActive(true);
			Title.text = "Game Over";
		}
	}
}

function Switcher_1 () {
	Button_Current = Option_1;
	Option();
}

function Switcher_2 () {
	Button_Current = Option_2;
	Option();
}

function Switcher_3 () {
	Button_Current = Option_3;
	Option();
}

function Switcher_4 () {
	Button_Current = Option_4;
	Option();
}

function RestartGame () {
	Application.LoadLevel("Game");
}

function ExitGame () {
	Application.Quit();
}