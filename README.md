# YCB Object 3d annotation

## Installation and running

To install. First clone the repo using:
```
git clone https://github.com/sahirgomez1/ycb_objects.git
cd ycb_objects_app
```

In the project directory, you can run
```
npm install
```
to install all dependencies. Then run.
```
npm start
```
Add your 3D objects to the public folder, use `.gltf` files. We suggest an [OBJ coverter](https://github.com/CesiumGS/obj2gltf), then optimize
your glTF assets with `gltf-pipeline`, [more info](https://www.npmjs.com/package/gltf-pipeline). 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
