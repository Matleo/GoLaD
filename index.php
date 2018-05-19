<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <link rel="stylesheet" href="style.css">
    <script src="p5/p5.min.js"></script>
    <script src="p5/addons/p5.dom.min.js"></script>
    <script src="p5/addons/p5.sound.min.js"></script>
    <script src="sketch.js"></script>
  </head>
  <body>
    <h1> Game of Life and Death 2018 </h1>
    <div id="canvas_wrapper">
      <div id ="canvas_container"></div>
    </div>
    <div id ="regeln">
      <h3>Spielregeln:</h3>
      <p>Sie sehen eine Ansammlung von Zellen vor sich. Jede dieser Zelle kann entweder lebendig(gelb) oder tot(braun) sein.</p>
      <p>Durch anklicken einer Zelle können sie den aktuellen Status ändern. </p>
      <p>Mit dem Betätigen des Enter-Buttons, wird ein Zyklus der folgenden Regeln durchlaufen: </p>
      <ul>
        <li>1. Jede lebende Zelle, welche nicht 2 oder 3 lebende Nachbarzellen hat, stirbt</li>
        <li>2. Jede tote Zelle, die genau 3 lebende Nachbarzellen hat, wird wiederbelebt</li>
        <li>Jede Zelle hat dabei genau 8 Nachbarzellen. Eine Zelle am Rand des Spielfeldes hat ihre Nachbarzellen auch auf der gegenüberliegenden Seite)</li>
      </ul>
      <p>Autor: Matthias Leopold</p>
    </div>
  </body>
</html>
