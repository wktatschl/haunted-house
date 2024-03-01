import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 25)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
bricksColorTexture.colorSpace = THREE.SRGBColorSpace

const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
grassColorTexture.colorSpace = THREE.SRGBColorSpace

const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

// const windowColorTexture = textureLoader.load('/textures/window/color.jpg')
// windowColorTexture.colorSpace = THREE.SRGBColorSpace

// const windowAmbientOcclusionTexture = textureLoader.load('/textures/window/ambientOcclusion.jpg')
// const windowHeightTexture = textureLoader.load('/textures/window/height.png')
// const windowNormalTexture = textureLoader.load('/textures/window/normal.jpg')
// const windowMetalnessTexture = textureLoader.load('/textures/window/metalness.jpg')
// const windowOpacityTexture = textureLoader.load('/textures/window/opacity.jpg')
// const windowRoughnessTexture = textureLoader.load('/textures/window/roughness.jpg')


/**
 * House
 */

// Group
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
   new THREE.BoxGeometry(12, 7, 6),
   new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,

    }) 
)
walls.position.y = 3.5
walls.position.z = - 1
house.add(walls)

// Porch walls
const porchWallsGeometry = new THREE.BoxGeometry(.4, 4.5, 2.5)
const porchWallsMaterial = new THREE.MeshStandardMaterial({ 
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
})

const porchWall1 = new THREE.Mesh(porchWallsGeometry, porchWallsMaterial)
porchWall1.position.set(-1.5, 2.25, 2.5)

const porchWall2 = new THREE.Mesh(porchWallsGeometry, porchWallsMaterial)
porchWall2.position.set(1.5, 2.25, 2.5)

house.add(porchWall1, porchWall2)

// Tower walls
const towerWalls = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 5, 2.5),
    new THREE.MeshStandardMaterial({ 
         map: bricksColorTexture,
         aoMap: bricksAmbientOcclusionTexture,
         normalMap: bricksNormalTexture,
         roughnessMap: bricksRoughnessTexture,
     }) 
 )

towerWalls.position.set(0, 7, 2.5)
house.add(towerWalls)

// Tower roof
const towerRoof = new THREE.Mesh(
    new THREE.ConeGeometry(2.8, 2, 4),
    new THREE.MeshStandardMaterial({ color: '#151515'})
)

towerRoof.position.set(0, 10.5, 2.5)
towerRoof.rotation.y = Math.PI * .25
house.add(towerRoof)

// Roof

// Define geometry for mansard roof
const roofHeight = 2;
const roofBaseWidth = 6;
const roofTopWidth = 13;
const roofDepth = 6.2;

const roofShape = new THREE.Shape();
roofShape.moveTo(-roofBaseWidth / 2, 0);
roofShape.lineTo(-roofTopWidth / 2, roofHeight);
roofShape.lineTo(roofTopWidth / 2, roofHeight);
roofShape.lineTo(roofBaseWidth / 2, 0);
roofShape.lineTo(-roofBaseWidth / 2, 0);

const extrudeSettings = {
    steps: 2,
    depth: roofDepth,
    bevelEnabled: false,
};

const roofGeometry = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
const roofMaterial = new THREE.MeshStandardMaterial({ color: '#151515' });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);

roof.position.y = 9
roof.position.z = 2.1
roof.rotation.x = Math.PI

house.add(roof);


// const roof = new THREE.Mesh(
//     new THREE.ConeGeometry(3.5, 1, 4),
//     new THREE.MeshStandardMaterial({ color: '#b35f45'})
// )
// roof.position.y = 7.5
// roof.rotation.y = Math.PI * .25
// house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.8, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture

     })
)

door.position.y = 2.2
door.position.z = 2 + 0.01
house.add(door)

// Stairs
const stairsGeometry = new THREE.BoxGeometry(3, 1, 1.5)
const stairsMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1'})

const stair1 = new THREE.Mesh(stairsGeometry, stairsMaterial)
stair1.position.set(0, .45, 2.8)

const stair2 = new THREE.Mesh(stairsGeometry, stairsMaterial)
stair2.scale.set(.5, .75, .3)
stair2.position.set(0, .32, 3.7)

const stair3 = new THREE.Mesh(stairsGeometry, stairsMaterial)
stair3.scale.set(.5, .5, .3)
stair3.position.set(0, .17, 4.1)

const stair4 = new THREE.Mesh(stairsGeometry, stairsMaterial)
stair4.scale.set(.5, .25, .3)
stair4.position.set(0, .07, 4.4)

house.add(stair1, stair2, stair3, stair4)


// Windows
const windowGeometry = new THREE.PlaneGeometry(.9, 1, 100, 100)
const windowMaterial = new THREE.MeshStandardMaterial({ color: '#222222'})

const window1 = new THREE.Mesh(windowGeometry, windowMaterial)
window1.position.z = 3.8 + 0.005
window1.position.y = 6

const window2 = new THREE.Mesh(windowGeometry, windowMaterial)
window2.position.z = 3.8 + 0.005
window2.position.y = 8

const window3 = new THREE.Mesh(windowGeometry, windowMaterial)

window3.scale.x = 1.8
window3.scale.y = 1.2

window3.position.x = 3.6
window3.position.z = 2 + 0.005
window3.position.y = 2.4

const window4 = new THREE.Mesh(windowGeometry, windowMaterial)
window4.position.z = 3.8 + 0.005
window4.position.y = 8

window4.scale.x = 1.8
window4.scale.y = 1.2

window4.position.x = -3.6
window4.position.z = 2 + 0.005
window4.position.y = 2.4

const window5 = new THREE.Mesh(windowGeometry, windowMaterial)
window5.position.z = 3.8 + 0.005
window5.position.y = 8

window5.scale.x = 1.8
window5.scale.y = 1.2

window5.position.x = -3.6
window5.position.z = 2 + 0.005
window5.position.y = 5.8

const window6 = new THREE.Mesh(windowGeometry, windowMaterial)
window6.position.z = 3.8 + 0.005
window6.position.y = 8

window6.scale.x = 1.8
window6.scale.y = 1.2

window6.position.x = 3.6
window6.position.z = 2 + 0.005
window6.position.y = 5.8

const window7 = new THREE.Mesh(windowGeometry, windowMaterial)
window7.position.z = 3.8 + 0.005
window7.position.y = 8

const window8 = new THREE.Mesh(windowGeometry, windowMaterial)
window8.position.z = 3.8 + 0.005
window8.position.y = 8

house.add(window1, window2, window3, window4, window5, window6, window7, window8)

// behind window

// const backgroundGeometry = new THREE.PlaneGeometry(1.1, 1.1); 
// const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
// const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);

// // Position the background behind the window
// backgroundMesh.position.z = 3.8 + 0.025; 
// backgroundMesh.position.y = 6; 

// // Add the background mesh to the scene
// scene.add(backgroundMesh);


// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(1, 1.5, 1)
bush1.position.set(2.5, 0.2, 3)

// const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush2.scale.set(0.8, .8, 0.8)
// bush2.position.set(3.6, 0.1, 3)

// const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush3.scale.set(1, 1, 1.2)
// bush3.position.set(-3.5, 0.1, 3)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(1, 1.8, 1)
bush4.position.set(-2.3, 0, 3)

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial)
bush5.scale.set(.7, .9, .7)
bush5.position.set(-4.7, 0, 3)

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial)
bush6.scale.set(.5, .5, .5)
bush6.position.set(4.5, 0, 3)

const bush7 = new THREE.Mesh(bushGeometry, bushMaterial)
bush7.scale.set(.8, 1.2, 1)
bush7.position.set(5.5, 0, 3)

scene.add(bush1, bush4, bush5, bush6, bush7)

// Graves group
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1'})

for (let i = 0; i < 150; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 7 + Math.random() * 12
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)
}



// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 40),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
     })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.26)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 3, 7)
doorLight.position.set(0, 3, 3)
house.add(doorLight)

// Ghosts
const ghost1 = new THREE.PointLight('#ff00ff', 6, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 6, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 6, 3)
scene.add(ghost3)

const ghost4 = new THREE.PointLight('#dddddd', 6, 3)
scene.add(ghost4)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 18
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
ghost4.castShadow = true

walls.castShadow = true

bush1.castShadow = true
// bush2.castShadow = true
// bush3.castShadow = true
bush4.castShadow = true
bush5.castShadow = true
bush6.castShadow = true
bush7.castShadow = true

roof.castShadow = true

towerWalls.castShadow = true
towerWalls.receiveShadow = true
towerRoof.castShadow = true

stair1.castShadow = true
stair2.castShadow = true
stair3.castShadow = true
stair4.castShadow = true

stair1.receiveShadow = true
stair2.receiveShadow = true
stair3.receiveShadow = true
stair4.receiveShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

ghost4.shadow.mapSize.width = 256
ghost4.shadow.mapSize.height = 256
ghost4.shadow.camera.far = 7

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update ghost
    const ghost1Angle = elapsedTime * .25
    ghost1.position.x = Math.cos(ghost1Angle) * 8
    ghost1.position.z = Math.sin(ghost1Angle) * 7
    ghost1.position.y = (Math.sin(ghost1Angle) * 3) - 1

    const ghost2Angle = - elapsedTime * 0.22
    ghost2.position.x = Math.cos(ghost2Angle) * 7
    ghost2.position.z = Math.sin(ghost2Angle) * 7
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * .18
    ghost3.position.x = Math.cos(ghost3Angle) * (15 + Math.sin(elapsedTime * .12))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * .5))
    ghost3.position.y = Math.sin(elapsedTime * 2) + Math.sin(elapsedTime * 4)

    const ghost4Angle = elapsedTime * .18
    ghost4.position.x = Math.cos(ghost4Angle) * (15 + Math.sin(elapsedTime * .12))
    ghost4.position.z = Math.sin(ghost4Angle) * (12 + Math.sin(elapsedTime * .5))
    ghost4.position.y = Math.sin(elapsedTime * 2) + Math.sin(elapsedTime * 4)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()