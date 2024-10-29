// ThreeScene.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

interface ThreeSceneProps {
    loginCheck: boolean; // Add this prop to receive loginCheck
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ loginCheck }) => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const clock = useRef(new THREE.Clock());
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null); 
    let isAnimationPlaying = false;

    useEffect(() => {
        // loginCheck
        if (loginCheck) {
            console.log('User is logged in');
            // Add any logic that depends on loginCheck
        

        // Set up scene, camera, renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.current = camera;
        const cameraHeight = 2.6;
        camera.position.set(0, cameraHeight, 3);

        const renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        renderer.setPixelRatio(window.devicePixelRatio / 2);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Load models
        const loader = new GLTFLoader();

        let suitcaseMixer: THREE.AnimationMixer | undefined;
        let bookMixer: THREE.AnimationMixer | undefined;
        let doorMixer: THREE.AnimationMixer | undefined;
        let suitcaseModel: THREE.Object3D | undefined;
        let bookshelfModel: THREE.Object3D | undefined;
        let deskModel: THREE.Object3D | undefined;
        let bookModel: THREE.Object3D | undefined;
        let doorModel: THREE.Object3D | undefined;
        let suitcaseBox: THREE.Box3 | undefined;
        let bookshelfBox: THREE.Box3 | undefined;
        let deskBox: THREE.Box3 | undefined;
        let bookBox: THREE.Box3 | undefined;
        let doorBox: THREE.Box3 | undefined;
        

        // Load the suitcase model
        const suitcasePath = '/model/old_pitchman_suitcase.glb';

        loader.load(suitcasePath, (gltf) => {
            suitcaseModel = gltf.scene;
            suitcaseModel.position.set(0, 1.28, 0);
            scene.add(suitcaseModel);
        
            suitcaseMixer = new THREE.AnimationMixer(suitcaseModel);
            
            const animations = gltf.animations;
            animations.forEach((clip) => {
                const action = suitcaseMixer!.clipAction(clip);
                action.paused = true; // Ensure the action starts paused
                action.clampWhenFinished = true; // Clamping when finished
            });
        
            const boxHelper1 = new THREE.BoxHelper(suitcaseModel, 0xff0000); // Red box for visibility
            scene.add(boxHelper1);
        
            suitcaseBox = new THREE.Box3().setFromObject(suitcaseModel);
        
            // Inside the GLTFLoader callback for the suitcase model
        document.addEventListener('click', (event) => {
            console.log('Suitcase clicked!');
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();
            
            // Get the bounding rectangle of the canvas
            const rect = renderer.domElement.getBoundingClientRect();
        
            // Normalize mouse coordinates for raycasting relative to the canvas
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
            raycaster.setFromCamera(mouse, camera);
            
            // Raycast with 'true' to test against children of the suitcase model
            const intersects = raycaster.intersectObject(suitcaseModel!, true);
            
            if (intersects.length > 0) {
                console.log('suitcase should move');
                const action = suitcaseMixer!.clipAction(animations[0]); // Assuming the first animation
                
                action.setLoop(THREE.LoopOnce, 1);
                
                if (!isAnimationPlaying) {
                    action.paused = false;
                    action.play();
                    isAnimationPlaying = true;
                } else {
                    action.paused = true;
                    action.stop();
                    isAnimationPlaying = false;
                }
            }
        });
        }, undefined, (error) => {
            console.error('Error loading suitcase model:', error);
        });

        // Load the bookshelf model
        const bookshelfPath = '/model/victorian_bookshelf.glb';
        loader.load(bookshelfPath, (gltf) => {
            bookshelfModel = gltf.scene;
            bookshelfModel.position.set(-4, 0, 0);
            const scaleFactor = 1.8;
            bookshelfModel.scale.set(scaleFactor, scaleFactor, scaleFactor);
            scene.add(bookshelfModel);

            const boxHelper2 = new THREE.BoxHelper(bookshelfModel, 0x0000FF); // Red box for visibility
             scene.add(boxHelper2);

            bookshelfBox = new THREE.Box3().setFromObject(bookshelfModel);
        });

        // Load the desk model
        const deskPath = '/model/pedestal_desk.glb';
        loader.load(deskPath, (gltf) => {
            deskModel = gltf.scene;
            deskModel.scale.set(2.5, 2.5, 2.5);
            deskModel.rotation.y = THREE.MathUtils.degToRad(180);
            deskModel.position.set(0, 0, -2);
            scene.add(deskModel);

            const boxHelper3 = new THREE.BoxHelper(deskModel, 0x00ff00); // Green box for visibility
            scene.add(boxHelper3);

            deskBox = new THREE.Box3().setFromObject(deskModel);
        });

        // Load the book model
        const bookPath = '/model/historical_book.glb';
        loader.load(bookPath, (gltf) => {
            bookModel = gltf.scene;
            bookModel.scale.set(0.18, 0.18, 0.18);
            bookModel.rotation.y = THREE.MathUtils.degToRad(180);
            bookModel.position.set(0, 1.9, -2.25);
            scene.add(bookModel);

            const boxHelper4 = new THREE.BoxHelper(bookModel, 0x800080);
            scene.add(boxHelper4);

            // Create invisible bounding box for click detection
            const boundingBoxGeometry = new THREE.BoxGeometry(1, 1, 1.2);
            const boundingBoxMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xff0000, 
                transparent: true, 
                opacity: 0 
            });
            const boundingBoxMesh = new THREE.Mesh(boundingBoxGeometry, boundingBoxMaterial);
            boundingBoxMesh.position.copy(bookModel.position);
            scene.add(boundingBoxMesh);

            // Setup book animations
            bookMixer = new THREE.AnimationMixer(bookModel);
            const bookAnimations = gltf.animations;
            
            if (bookAnimations && bookAnimations.length > 0) {
                const bookAction = bookMixer.clipAction(bookAnimations[0]);
                bookAction.clampWhenFinished = true;
                bookAction.loop = THREE.LoopOnce;
                
                // Add click event listener for book interaction
                document.addEventListener('click', (event) => {
                    const raycaster = new THREE.Raycaster();
                    const mouse = new THREE.Vector2();
                    
                    const rect = renderer.domElement.getBoundingClientRect();
                    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                    
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObject(boundingBoxMesh);
                    
                    if (intersects.length > 0) {
                        if (!isAnimationPlaying) {
                            bookAction.reset();
                            bookAction.play();
                            isAnimationPlaying = true;
                        } else {
                            bookAction.reset();
                            bookAction.stop();
                            isAnimationPlaying = false;
                        }
                    }
                });
            }

            bookBox = new THREE.Box3().setFromObject(bookModel);
        });

        // Load the door model
        const doorPath = '/model/front_door.glb';
        loader.load(doorPath, (gltf) => {
            doorModel = gltf.scene;
            doorModel.scale.set(0.027, 0.027, 0.027);
            doorModel.rotation.y = THREE.MathUtils.degToRad(270);
            doorModel.position.set(0, 0, 5.4);
            scene.add(doorModel);

            const boxHelper5 = new THREE.BoxHelper(doorModel, 0xFFFF00);
            scene.add(boxHelper5);

            doorMixer = new THREE.AnimationMixer(doorModel);
            const doorAnimation = gltf.animations;

            if(doorAnimation && doorAnimation.length > 0) {
                const doorAction = doorMixer.clipAction(doorAnimation[0]);
                doorAction.clampWhenFinished = true;
                doorAction.loop = THREE.LoopOnce;

                document.addEventListener('click', (event) => {
                    const raycaster = new THREE.Raycaster();
                    const mouse = new THREE.Vector2();

                    const rect = renderer.domElement.getBoundingClientRect();
                    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                    mouse.y = ((event.clientY - rect.top) / rect.height) * 2 + 1;

                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObject(doorModel!);

                    if(intersects.length > 0) {
                        if (!isAnimationPlaying) {
                            doorAction.reset();
                            doorAction.play();
                            isAnimationPlaying = true;
                        } else { 
                            doorAction.reset();
                            doorAction.stop();
                            isAnimationPlaying = false;
                        }
                    }
                })
            }

            doorBox = new THREE.Box3().setFromObject(doorModel);
        });

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        // Create room
        const roomSize = 10;
        const wallThickness = 0.1;

        const floorGeometry = new THREE.BoxGeometry(roomSize, wallThickness, roomSize);
        const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -wallThickness / 2;
        scene.add(floor);

        // Controls
        const controls = new PointerLockControls(camera, renderer.domElement);
        document.addEventListener('click', () => controls.lock());

        const keys: { [key: string]: boolean } = {};

        document.addEventListener('keydown', (event) => {
            keys[event.code] = true;
        });

        document.addEventListener('keyup', (event) => {
            keys[event.code] = false;
        });

        const checkCollision = (cameraPosition: THREE.Vector3) => {
            
            const cameraBox = new THREE.Box3().setFromCenterAndSize(cameraPosition, new THREE.Vector3(0.5, cameraHeight, 0.5));

            return (
                (suitcaseBox && suitcaseBox.intersectsBox(cameraBox)) ||
                (bookshelfBox && bookshelfBox.intersectsBox(cameraBox)) ||
                (deskBox && deskBox.intersectsBox(cameraBox)) ||
                (bookBox && bookBox.intersectsBox(cameraBox)) ||
                (doorBox && doorBox.intersectsBox(cameraBox))
            );
        };

        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.current.getDelta();

            if (suitcaseMixer) suitcaseMixer.update(delta);
            if (bookMixer) bookMixer.update(delta);
            if (doorMixer) doorMixer.update(delta);

            if (suitcaseModel) suitcaseBox?.setFromObject(suitcaseModel);
            if (bookshelfModel) bookshelfBox?.setFromObject(bookshelfModel);
            if (deskModel) deskBox?.setFromObject(deskModel);
            if (bookModel) bookBox?.setFromObject(bookModel);
            if (doorModel) doorBox?.setFromObject(doorModel);

            const direction = new THREE.Vector3();
            const moveForward = keys['KeyS'];
            const moveBackward = keys['KeyW'];
            const moveLeft = keys['KeyA'];
            const moveRight = keys['KeyD'];

            if (moveForward) direction.z = -1;
            if (moveBackward) direction.z = 1;
            if (moveLeft) direction.x = -1;
            if (moveRight) direction.x = 1;

            direction.normalize();
            
            const moveSpeed = 5 * delta;
            controls.moveRight(direction.x * moveSpeed);

            if (moveForward || moveBackward || moveLeft || moveRight) {
                const velocity = new THREE.Vector3();
                controls.getDirection(velocity);
        
                const newPosition = camera.position.clone();
                newPosition.addScaledVector(velocity, moveSpeed * (moveForward ? -1 : 1));
                newPosition.x += direction.x * moveSpeed;
        
                newPosition.y = cameraHeight;
        
                if (!checkCollision(newPosition)) {
                    camera.position.copy(newPosition);
                } else {
                    console.log('Collision detected!');
                }
            }

            renderer.render(scene, camera);
        };

        animate();

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
            renderer.setPixelRatio(window.devicePixelRatio / 2);
        };

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
        }
    }, [loginCheck]);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeScene;
