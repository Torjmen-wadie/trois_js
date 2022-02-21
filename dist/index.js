
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'

import {GLTFLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';


const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const loader = new GLTFLoader()
loader.load('animationv3.glb',function(glb)
{
    console.log(glb)
    const root = glb.scene;

    root.scale.set(0.2,0.2,0.2)
    scene.add(root);
},function (xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
    console.log ('An error occured')
}
)

const light = new THREE.DirectionalLight(0xffffff,2.0,1000)
light.position.set(50,50,50)
scene.add(light)

const light2 = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light2 );
//const geometry = new THREE.BoxGeometry(1,1,1)
//const material = new THREE.MeshBasicMaterial({
  //  color: 0x00ff00
//})

//const boxMesh = new THREE.Mesh(geometry,material)
//scene.add(boxMesh)

 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera (75, sizes.width/sizes.height, 0.1, 100)

camera.position.set(0,1,2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled= true
renderer.gammOuput = true




renderer.render(scene,camera)

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
} 

animate()