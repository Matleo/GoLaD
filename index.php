<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">



    <script src="p5/p5.min.js"></script>
    <script src="p5/addons/p5.dom.min.js"></script>
    <script src="p5/addons/p5.sound.min.js"></script>
    <script src="sketch.js"></script>
  </head>
  <body>
    <h1> Game of Life and Death 2018 </h1>
    <div id="canvas_wrapper">
      <div id ="canvas_container"></div>
        <button style = "color:black;float:left;" type="button" class="btn btn-primary" onclick="startSimulation()">Start <i class="fas fa-step-forward"></i></button>
        <div class="btn-toolbar" role="toolbar" style="float:right;">
          <div class="button-group mr-4" role="group">
            <button type="button" class="btn btn-success" onclick="setAlive(true)">Alle Beleben</button>
            <button type="button" class="btn btn-danger" onclick="setAlive(false)">Alle Töten</button>
          </div>
          <div class="input-group">
            <span class="input-group-addon">
                <button type="button" class="btn btn-secondary" onclick="setAlive(null)"><i class="fas fa-random"></i></button>
            </span>
            <input id ="alive_percentage" type="number" class="form-control" placeholder="Lebendig-Prozentsatz">
          </div>
        </div>

      </div>
    <div id ="regeln">
      <h3>Spielregeln:</h3>
      <p>Sie sehen eine Ansammlung von Zellen vor sich. Jede dieser Zelle kann entweder lebendig(farbig) oder tot(scharz-weiß) sein.</p>
      <p>Durch anklicken einer Zelle können sie den aktuellen Status ändern. </p>
      <p>Mit dem Betätigen des Enter-Buttons, wird ein Zyklus der folgenden Regeln durchlaufen: </p>
      <ul>
        <li>1. Jede lebende Zelle, welche nicht 2 oder 3 lebende Nachbarzellen hat, stirbt</li>
        <li>2. Jede tote Zelle, die genau 3 lebende Nachbarzellen hat, wird wiederbelebt</li>
        <li>Jede Zelle hat dabei genau 8 Nachbarzellen. Eine Zelle am Rand des Spielfeldes hat ihre Nachbarzellen auch auf der gegenüberliegenden Seite)</li>
      </ul>
      <p>Autor: Matthias Leopold</p>
    </div>

    <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>
  </body>
</html>
