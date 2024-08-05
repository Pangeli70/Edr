/** ---------------------------------------------------------------------------
 * @module [ApgCdn]
 * @author [APG] Angeli Paolo Giusto 
 * @version 0.1 APG 20240109
 * @version 1.0 APG 20240701
 * @version 1.1 APG 20240713 Splitted in two parts extracting the customizable parts
 * @version 1.2 APG 20240804 Importmap refinement
 * ----------------------------------------------------------------------------
 */



// From importmap inside Html.head
import * as THREE from "three";
import { ApgCdn_Logo3D } from "ApgLogo3D";

// import { ApgCdn_Logo3D } from "/assets/js/ApgCdn_Logo3D_V01.js"; // localhost
// import { ApgCdn_Logo3D } from "https://apg-01.b-cdn.net/assets/js/ApgCdn_Logo3D_V01.js"; // CDN

class ApgCdn_Logo3D_Apg_2024 extends ApgCdn_Logo3D {

    deltaZ;

    greenLight;

    accumulator;


    constructor(awindow, adocument) {

        super(awindow, adocument);

        this.gltfUrl = "/assets/gltf/ApgCdn_Logo3D_APG_2024_V01.glb";

        this.accumulator = 0;

    }


    InitObject() {
        this.objScale = 15;
    }



    InitAnimation() {

        const rad360 = 2 * Math.PI;

        // Z turns per minute
        const TPM_Z = 5;
        // Z turns per second
        const TPS_Z = TPM_Z / 60;
        // Delta Z turns in Radians per millisecond
        this.deltaZ = (TPS_Z * rad360) / 1000;

        // Waves per minute
        const WPM_Y = 16;
        // Waves per second
        const WPS_Y = WPM_Y / 60;
        // Oscillation amplitude in radians
        this.WAmp_Y = (45 / 360) * rad360;
        // Delta X Radians per millisecond
        this.deltaY = (WPS_Y * this.WAmp_Y) / 1000;

        // Time accumulator for animation
        this.lastTime = performance.now();

        // Flip the oscillation
        this.flipY = false;
    }



    InitLights() {
        this.whiteLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this.whiteLight.position.x = 0;
        this.whiteLight.position.z = 50;
        this.scene.add(this.whiteLight);

        this.greenLight = new THREE.PointLight(0xbbffbb, 50);
        this.greenLight.position.x = 0;
        this.greenLight.position.z = 0;
        this.greenLight.position.y = 0;
        this.scene.add(this.greenLight);

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    }



    PostLoad(aobject) {

        const r = new THREE.Object3D();

        const N = 6;
        const DeltaRot = (Math.PI * 2) / N;

        const colors = [0xFF0080, 0xFF8000, 0xFFFF00, 0x80FF00, 0x0080FF, 0x8000FF];

        for (let i = 0; i < 6; i++) {

            const clone = aobject.clone();
            const mesh = clone.children[0].children[0]
            mesh.material = new THREE.MeshStandardMaterial({
                color: colors[i],
                metalness: 1,
                roughness: 0.5
            });
            mesh.material.needsUpdate = true;


            clone.rotation.z = i * DeltaRot;
            r.add(clone);
        }

        return r;

    }



    Animate(deltaTime) {

        if (this.isLoaded) {

            const deltaZ = (this.deltaZ * deltaTime);
            this.obj3D.rotation.z -= deltaZ;

            this.accumulator += deltaTime;

            const sin = Math.sin(this.accumulator / 3000) / 4 + 0.24;
            this.obj3D.rotation.y = sin;

            const cos = Math.cos(this.accumulator / 2000) * 5;
            this.greenLight.position.z = 1;
            this.greenLight.position.y = cos;
            this.greenLight.position.x = -cos * sin;

            // console.log(cos)
        }
    }
}

new ApgCdn_Logo3D_Apg_2024(window, document).Init().Loop();
