Incomplete: I need to complete this at some stage for educational purposes.

(<https://en.wikipedia.org/wiki/Trait_(computer_programming)>)

Dynamic Traits have taken on a slightly different meaning via Rust
(<https://cs.wellesley.edu/~avh/dyn-trait-icse-seip-2022-preprint.pdf>)

This feature seems to be closer to a concept called "Talents".
> Like a trait, a talent represents a set of methods that constitute part of the behavior of an object. 
> Unlike traits, talents can be acquired (or lost) dynamically. 
    
(<https://scg.unibe.ch/archive/papers/Ress11a-Talents.pdf>)

# Stronger Together
*Dynamic traits for Javascript*

    (new Archer).with('bow').with('arrow').shoot()

    (new Archer).with(Bow).with(Arrow).shoot()

    Archer
      @with Bow
      @with Arrow

    (new Archer).shoot()


##Setup
> Will be updated to NPM when I'm satisfied with it

*Use this if you hate monkey patches*

`require('stronger-together.js').load()`

*Use this to patch all objects (so you don't need to extend Traitable)*

`require('stronger-together.js').patch()`

## Detailed Example

    class Shark extends Traitable
      @trait 'tornado',
        suffix: 'nado'
        on_include: -> console.log "I've had it with these..."

      @trait 'mega'
        prefix: 'mega'

      prefix: ''
      suffix: ''

      constructor: ->
        @title = 'shark'

      name: -> @prefix + @title + @suffix

>

    $ (new Shark).with('tornado').name()
    $ => 'I've had it with these...'
    $ => sharknado

    $ (new Shark).with('mega').with('tornado').name()
    $ => 'I've had it with these...'
    $ => megasharknado

***

#### Static Trait

    class Flying extends Trait
      fly: -> 'I am flying!'

    class Animal extends Traitable
      @with Flying

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
      @trait 'tornado',
        on_include: ->
          @setName('Sharknado')

      constructor: ->
        @name = 'Just a regular shark'

      setName: (name) -> @name = name

>

    $ (new Shark).with('tornado').name
    $ => Sharknado

## Credit

*Daniel Shuey - daniel.shuey@gmail.com*

## License

> Copyright 2014 Daniel Shuey

> Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

> Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
