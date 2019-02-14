# SpaceInvaders

## Descripción

Juego vintage de marcianos que se mueven en bloque descendiendo por el display.
En la base esta el defender que se oculta tras algunos shelters de los disparos realizados por 
invaders. 
- Solamente disparan los invaders inferiores de cada columna.
- Los disparos al impactar en el defender provocan la pérdida de una vida.
- Los disparos del defender al impactar en un invader provocan su 'muerte' e incrementan los puntos del player.
- Los disparos al impactar en los shelter o bien los degradan o bien los atraviesan por agujeros que puedan haber creado impactos anteriores.
- La velocidad de los invaders se incrementa con el transcurso del tiempo según se aproximan a la base del display.
- Existen 4 tipos de invader que se diferencian básicamente en los puntos que devengan.
- Existe un 5 tipo de invader que se desplaza lateralmente en la parte superior del display que no dispara.

Mini descripción del proyecto.

Juego implementado dentro de un flujo de 3 pantallas:
1- Splash: Pantalla inicial. contiene título una tabla de enemigos con los puntos de cada tipo
	  Press any key to start.
2- Game : 
3- Exit:  Pantalla de gameover. Muestra puntuación, puede capturar el nombre y añadir el player en el hall of fame.   

## MVP - (CANVAS)

Definición del MVP.
- Diseño de las tres pantallas. 
- Generacion de las clases

## Backlog
- Clase Shelter : 
	* atributos: posicionX, posicionY, size.
	* métodos: onshell(): debe decidir como encajar el impacto del proyectil y modificar
			      el aspecto.

- Clase movingThing{
       propiedades: sprite[], positionx, positiony,;
       draw(): 
       
  }
  Esta clase servira de base tanto para Defender, Invader, bomb 

- ArrayofEnemies: Implementar un array 2x2 para ubicar los 55 enemigos en 5 filas de 11.

- Sprites, sonidos, ...
                  





## Estructuras de Datos


Game {
    atributes: 
        geometria,
	enemies, bombs[], defender;
    metodos: 
	constructor(), bucle(),
};

flyingThing{
atributes:
 	canvas, contexto, posx, posy
    	size,speed,direction
    metodos:
       constructor, draw(),
}

	Defender extends flyingThing{
	    atributes:
		canvas, contexto, posx, posy
		size,speed,direction
	    metodos:
	       constructor(),

	}

	Invader extends flyingThing {
	    atributes: positionx, positionY, speed, canshot
	    metodos: constructor(), move(), 
	}

	bomb {
	   atributes: size,color,shape, positionx, positiony,direction, speed.
	   metodos:  move(), draw()
	}

## States y States Transitions

Definicion del las transiciones del juego y del main.

- splashScreen
- gameScreen
- gameoverScreen
- winScreen

funciones de transicion.

## Task List
Definicion de las tareas por orden de prioridad
1 - Crear pantallas (splash, juego, gameover)
2-  Transiciones 
3 - Definir Game,: Creacion() 
4 - Definir movingObject
5-  Defender: creación, movimiento
6-  Defender: disparo. 
7-  Definir Bomb().
8-  Invader : creación, movimiento.
9-  Invader : Shot()
10- Game: Checkcolisions();



## Links

### Template project iOs & Swift 
[Link url](https://www.raywenderlich.com/1167-how-to-make-a-game-like-space-invaders-with-spritekit-and-swift-part-1)

### to play in the meanwhile
[Link url](http://www.freeinvaders.org/)

### Trello
[Link url](https://trello.com)

### Git

Especificar las url del proyecto y del deploy

[Link Repositorio](http://github.com)

[Link Deploy](http://github.com)

### Slides.com

Especificar la url de la presentacion

[Link Slides.com](http://slides.com)

## Instrucciones del juego 

Al finalizar el juego generar las instrucciones



