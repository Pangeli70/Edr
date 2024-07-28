/** ---------------------------------------------------------------------------
 * @module [ApgCdn]
 * @author [APG] Angeli Paolo Giusto 
 * @version 0.1 APG 20240109
 * @version 1.0 APG 20240701
 * @version 2.0 APG 20240713 Splitted in two parts extracting the customizable parts
 * ----------------------------------------------------------------------------
 */

// From importmap inside Html.head
import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";

// This div ID must be inside the Html
const ApgCdn_Logo3D_Canvas_ElementId = "ApgCdn_3DLogo_Placeholder_Div";


export class ApgCdn_Logo3D {

    Version = "1.0"

    window;
    document;

    glcanvasEl;
    glcanvasRect;

    scene;
    renderer;
    camera;

    gltfUrl;
    obj3D;
    objScale = 1;
    objRotation = { x: 0, y: 0, z: 0 };
    isLoaded = false;
    lastTime = 0;



    constructor(awindow, adocument) {
        this.window = awindow;
        this.document = adocument;
    }



    Init() {

        this.InitDom()

        this.InitRenderer();

        this.InitResize();

        this.scene = new THREE.Scene();

        this.InitCamera();

        this.InitLights();

        this.InitObject()

        this.InitAnimation();

        this.InitGltf();

        console.log('ApgCdn_Logo3D.js Ver.' + this.Version + ' is inited');

        return this;
    }



    InitLights() {
        throw new Error("Method not implemented.");
    }



    InitObject() {
        throw new Error("Method not implemented.");
    }



    InitAnimation() {
        throw new Error("Method not implemented.");
    }



    Animate(deltaTime) {
        throw new Error("Method not implemented.");
    }



    InitDom() {

        this.glcanvasEl = this.document.getElementById(ApgCdn_Logo3D_Canvas_ElementId);
        this.glcanvasRect = this.glcanvasEl.getBoundingClientRect();

    }



    InitRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        this.renderer.shadowMapEnabled = false;
        this.renderer.setSize(this.glcanvasRect.width, this.glcanvasRect.height);

        this.glcanvasEl.appendChild(this.renderer.domElement);
    }



    InitCamera() {
        const FIELDVIEW = 20;
        const RATIO = this.glcanvasRect.width / this.glcanvasRect.height;
        const NEAR = 1;
        const FAR = 300;
        this.camera = new THREE.PerspectiveCamera(
            FIELDVIEW,
            RATIO,
            NEAR,
            FAR);
        this.camera.position.z = 50;
    }



    InitGltf() {

        this.isLoaded = false;


        const loader = new GLTFLoader();


        loader.load(this.gltfUrl, (gltf) => {
            const object3D = gltf.scene;
            object3D.scale.x = this.objScale;
            object3D.scale.y = this.objScale;
            object3D.scale.z = this.objScale;
            object3D.position.x = 0;
            object3D.position.y = 0;
            object3D.position.z = 0;
            object3D.rotation.x = this.objRotation.x;
            object3D.rotation.y = this.objRotation.y;
            object3D.rotation.z = this.objRotation.z;

            this.obj3D = this.PostLoad(object3D)

            this.scene.add(this.obj3D);

            this.isLoaded = true;
            console.log('ApgCdn_Logo3D.js Ver.' + this.Version + ' object is loaded');
        });
    }



    PostLoad(aobject) {

        const r = new THREE.Object3D();
        r.add(aobject);
        return r;

    }



    InitResize() {

        // Install callback toResize the window
        this.window.onresize = () => {

            this.renderer.setSize(this.glcanvasRect.width, this.glcanvasRect.height);

            this.camera.aspect = this.glcanvasRect.width / this.glcanvasRect.height;

            this.camera.updateProjectionMatrix();
        };

    }


    Render() {

        const newTime = performance.now();
        const deltaTime = newTime - this.lastTime;
        this.lastTime = newTime;

        this.Animate(deltaTime);

        this.renderer.render(this.scene, this.camera);
        // console.log('ApgCdn_Logo3D.js Ver.' + this.Version + ' is rendering ' + newTime.toString());
    }


    Loop() {


        this.window.requestAnimationFrame(() => {
            if (this.isLoaded) {
                this.Render();
            }
            this.Loop()
        });

    }


}
