# Stronger Together
*Dynamic traits for Javascript*

    (new Archer).with('bow').with('arrow').shoot()

    (new Archer).with(Bow).with('arrow').shoot()

    Archer
      @with Bow
      @with Arrow

    (new Archer).shoot()


##Setup

`require('stronger-together.js').load()`

*Patch all objects (don't need to extend Traitable)*

`require('stronger-together.js').patch()`

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

***

#### Static Trait

    class Animal extends Traitable
      @with Flying

    class Flying extends Trait
      fly: -> 'I am flying!'

>

    $ animal = new Animal
    $ animal.fly()
    $ => "I am flying!"

***

#### Dynamic Trait

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

***

#### Sub Trait


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

***

#### `on_include`

*The on_include is an optional initializer that runs when it is included into an object*

    class Shark extends Traitable
      setName: (name) -> @name = name

      @trait 'tornado',
        on_include: ->
          setName('Sharknado')

>

    $ (new Shark).with('tornado').name
    $ => Sharknado

## Credit

Daniel Shuey - daniel.shuey@gmail.com

## License

Copyright 2014 Daniel Shuey

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
