# Balatro TS
## Overview
Balatro TS is a project that aims to build your mod in LUA and automatically convert it to whatever the mod loading is for Balatro.

### Automatically Convert?
While there is still discussions on which mod loaders should be used for Balatro we are able to wrap all this up so we can have a way to easily develop and deploy/package to different 

### Why Typescript
One of the problems with modding in dynamic languages like LUA and Typescript is that as a new developer you don't have easy access to the apis. By creating a typescript project and having the project handle the transpiling to LUA you are able to use all the advanced language features of typescript, aswell as great support in IDEs like vscode.

### Isn't this just another 'mod loader'
Basically yeah, but i prefer typescript than lua. This also means i don't need to write the mod-loader themselves and just the modding framework.

## Goals
### Proper tooling
Being able to have the project setup, and when you make any saves it automatically builds and deploys your mods while doing local development.

Additionally being able to build (maybe eventually publish) a mod.

The goal is for all modding to be really streamlined for the modding developer.
 
### Load/Unloading of mods  (TODO)
A mod should be able to be reloaded at runtime, loading the latest executed code and cleaning up the old code. (Perhaps with an F5 button press or something

### Global Mod State  (TODO)
Each mod should have it's own 'state', when a mod is reloaded the state should remain intact. This way we can support hotloading mods while in the middle of a run it should handle it gracefully.

Any of the below features should work gracefully with hotloading.

### UI Wrappers (TODO)
As part of a mod we should be able to go, this.createButton() or something and it automatically creates a button.
Additionally if a hotload happens the references to the mod should work correctly.

 
