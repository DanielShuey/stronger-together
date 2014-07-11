# Stronger Together
*Dynamic traits for Javascript*

    (new Archer).with('bow').with('arrow').shoot()

    (new Archer).with(Bow).with('arrow').shoot()

    Archer
      @with Bow
      @with Arrow

    (new Archer).shoot()


##Setup

require('stronger-together.js').load()


## Detailed Example

    class Shark extends Traitable
      setName: (name) -> @name = name

      @trait 'tornado',
        on_include: ->
          setName('Sharknado')

        exitTornado: -> ...

>

    $ (new Shark).with('tornado').name
    $ => Sharknado


#### `Static Trait`

    class Animal extends Traitable
      @with Flying

    class Flying extends Trait
      fly: -> 'I am flying!'

>

    $ animal = new Animal
    $ animal.fly()
    $ => "I am flying!"


#### `Dynamic Trait`

    class Animal extends Traitable
      fly: -> 'I flap my arms but I do not get off the ground'

    class Flying extends Trait
      fly: -> 'I am flying!'

>

    $ animal = new Animal
    $ animal.fly()
    $ => "I flap my arms but I do not get off the ground"

    $ animal = (new Animal).with(Flying)
    $ animal.fly()
    $ => "I am flying!"


#### `Sub Trait`


    class Animal extends Traitable
      fly: -> 'I flap my arms but I do not get off the ground'

      @trait 'flying',
        fly: -> 'I am flying!'

>

    $ animal = new Animal
    $ animal.fly()
    $ => "I flap my arms but I do not get off the ground"

    $ animal = (new Animal).with('flying')
    $ animal.fly()
    $ => "I am flying!"
