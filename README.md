# Game of Live and Death 2018
Dies ist der Beitrag von Matthias Leopold zur Code Competition Mai 2018, veranstaltet von IT-Talents.de ([Link zur Competition](https://www.it-talents.de/foerderung/code-competition/code-competition-05-2018)).

## Get started
Die Applikation wurde in Javascript mit dem [p5.js](https://p5js.org/) Framework erstellt. Dementsprechend ist das System Setup relativ komfortabel.

#### Lokal
Wenn sie die Applikation lokal laufen lassen wollen, können sie einen beliebigen Webserver ihrer Wahl in dem Wurzelverzeichnis dieses Projektes  starten. Für Entwicklungszwecke habe ich dafür den in die IDE [Atom](https://atom.io/) integrierten [live-server](https://atom.io/packages/atom-live-server) genutzt. 
Eine kurzes Beispiel, wie atom-live-server verwendet werden kann, ist [hier](https://www.youtube.com/watch?v=0Xy3yDDY4IE) zu finden.

#### Heroku
Alternativ habe ich die Applikation über [Heroku]() gehostet, sie ist unter folgender Adresse erreichbar:
* [https://golad2018.herokuapp.com/](https://golad2018.herokuapp.com/)

## Ordner Struktur
Auf Wurzel Ebene befinden sich die *index.html* und die *index.php*, beide besitzen identischen Inhalt. Die Datei *index.php* dient ausschließlich dem Zweck, dass Heroku das Projekt als Web Applikation erkennt und deployed.

Im Ordner *code* befindet sich meine "Hauptklasse": *sketch.js*, die cell Klasse *cell.js* und das Stylesheet *style.css*.

Der Ordner *pictures* beinhaltet alle verwendeten Bilder. Dabei wurden nur Bilder verwendet, welche als "frei zu Nutzen oder weiterzugeben" markiert sind. 