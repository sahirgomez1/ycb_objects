# YCB Object 3d annotation

UI to annotate videos using 3d objects, in a camera-object scene.
TO DO: Multi camera synchronization and model-in-the-loop.

## Installation and running

To install. First clone the repo using:
```
git clone https://github.com/sahirgomez1/ycb_objects.git

cd ycb_objects_app
```

In the project directory, install all dependencies with.
```
$ npm install
```
Then run to start the development server.
```
$ npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Currently, there are 4 different objects in the public folder for testing. Add your 3D objects to the public folder, use `.gltf` files. We suggest an [OBJ coverter](https://github.com/CesiumGS/obj2gltf), then optimize
your glTF assets with `gltf-pipeline`, [more info](https://www.npmjs.com/package/gltf-pipeline).\

[See demo](https://op3u5.csb.app/) 

Download [annotation_example](3Dannotation_Banana.json)

