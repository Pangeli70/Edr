/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto 
 * @version 0.1 APG 20240109
 * @version 1.0 APG 20240701
 * @version 1.1 APG 20240713 Splitted in two parts extracting the customizable parts
 * ----------------------------------------------------------------------------
 */

// From importmap inside Html.head
import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";


export class ApgEdr_Logo3D {
    
    
    // This div ID must be inside the Html
    #CANVAS_ELEMENT_ID = "ApgEdr_3DLogo_Placeholder_Div";
    
    // This div ID must be inside the Html
    #HOST_ELEMENT_ID = "ApgEdr_3DLogo_AssetsHost_Hidden";

    Version = "1.0"

    window;
    document;

    glCanvasEl;
    glCanvasRect;
    glAssetsHost;

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

        console.log('ApgEdr_Logo3D.js Ver.' + this.Version + ' is inited');

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

        this.glCanvasEl = this.document.getElementById(this.#CANVAS_ELEMENT_ID);
        if (!this.glCanvasEl) {
            throw new Error(this.#CANVAS_ELEMENT_ID + " element is not defined");
        }
        this.glCanvasRect = this.glCanvasEl.getBoundingClientRect();

        const hostEl = document.getElementById(this.#HOST_ELEMENT_ID);
        if (hostEl == undefined) {
            throw new Error(this.#HOST_ELEMENT_ID + " element is not defined");
        }
        const host = hostEl.value;
        if (host == undefined) {
            throw new Error(this.#HOST_ELEMENT_ID + " value is not defined");
        }
        this.glAssetsHost = host;


    }



    InitRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        this.renderer.shadowMapEnabled = false;
        this.renderer.setSize(this.glCanvasRect.width, this.glCanvasRect.height);

        this.glCanvasEl.appendChild(this.renderer.domElement);
    }



    InitCamera() {
        const FIELDVIEW = 20;
        const RATIO = this.glCanvasRect.width / this.glCanvasRect.height;
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

        const gltfUrl = this.glAssetsHost + this.gltfUrl;

        loader.load(gltfUrl, (gltf) => {
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
            console.log('ApgEdr_Logo3D.js Ver.' + this.Version + ': GLTF logo is loaded');
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

            this.renderer.setSize(this.glCanvasRect.width, this.glCanvasRect.height);

            this.camera.aspect = this.glCanvasRect.width / this.glCanvasRect.height;

            this.camera.updateProjectionMatrix();
        };

    }


    Render() {

        const newTime = performance.now();
        const deltaTime = newTime - this.lastTime;
        this.lastTime = newTime;

        this.Animate(deltaTime);

        this.renderer.render(this.scene, this.camera);
        // console.log('ApgEdr_Logo3D.js Ver.' + this.Version + ' is rendering ' + newTime.toString());
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
