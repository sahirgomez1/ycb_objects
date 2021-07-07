# YCB Object 3d annotation

## Installation and running

To install. First clone the repo using:
```
git clone https://github.com/sahirgomez1/ycb_objects.git

cd ycb_objects_app
```

In the project directory, run to install all dependencies.
```
$ npm install
```
Then run to start the development server.
```
$ npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Currently, there are 4 different objects in the public folder for testing. Add your 3D objects to the public folder, use `.gltf` files. We suggest an [OBJ coverter](https://github.com/CesiumGS/obj2gltf), then optimize
your glTF assets with `gltf-pipeline`, [more info](https://www.npmjs.com/package/gltf-pipeline). \

[See demo](https://op3u5.csb.app/) 

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

