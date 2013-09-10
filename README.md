
#level-simple-stream
A [simple-stream](https://github.com/creationix/js-git/blob/master/specs/simple-stream.md) source and sink for [LevelUP](https://github.com/rvagg/node-levelup) and level backends like [LevelDOWN](https://github.com/rvagg/node-leveldown).

##API

###fromDOWN(levelBackend, options) -> stream

- `levelBackend`: any LevelDB backend that conforms to [Abstract LevelDOWN](https://github.com/rvagg/node-abstract-leveldown)

###fromUP(levelUpDB, options) -> stream

- `levelUpDB`: a [LevelUP](https://github.com/rvagg/node-levelup) instances
