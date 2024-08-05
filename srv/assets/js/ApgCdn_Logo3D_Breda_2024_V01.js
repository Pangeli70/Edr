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


class ApgCdn_Logo3D_Breda_2024 extends ApgCdn_Logo3D {

    deltaY;
    WAmp_X;
    deltaX;
    flipX = true;
    whiteLight;
    greenLight;



    constructor(awindow, adocument) {

        super(awindow, adocument);

        this.gltfUrl = "/assets/gltf/ApgCdn_Logo3D_Breda_2024_V01.glb"

    }

    
    InitObject() {
        this.objScale = 80;
        this.objRotation = {
            x: 0,
            y: 0,
            z: 0
        }
    }



    InitAnimation() {
        // Radians per Y turn
        const rad360 = 2 * Math.PI;

        // Y turns per minute
        const TPM_Y = 5;
        // Y turns per second
        const TPS_Y = TPM_Y / 60;
        // Delta Y turns in Radians per millisecond
        this.deltaY = (TPS_Y * rad360) / 1000;

        // Waves per minute
        const WPM_X = 16;
        // Waves per second
        const WPS_X = WPM_X / 60;
        // Oscillation amplitude in radians
        this.WAmp_X = (22.5 / 360) * rad360;
        // Delta X Radians per millisecond
        this.deltaX = (WPS_X * this.WAmp_X) / 1000;

        // Time accumulator for animation
        this.lastTime = performance.now();

        // Flip the oscillation
        this.flipX = false;
    }



    InitLights() {
        this.whiteLight = new THREE.DirectionalLight(0xbbffbb, 1);
        this.whiteLight.position.x = 10;
        this.whiteLight.position.z = 10;
        this.scene.add(this.whiteLight);

        this.greenLight = new THREE.DirectionalLight(0xbbffbb, 0.8);
        this.greenLight.position.x = -20;
        this.greenLight.position.z = -10;
        this.scene.add(this.greenLight);
    }



    Animate(deltaTime) {
        if (this.isLoaded) {

            const deltaY = (this.deltaY * deltaTime);
            this.obj3D.rotation.y += deltaY;

            const deltaX = (this.deltaX * deltaTime);
            if (!this.flipX) {
                if (this.obj3D.rotation.x > -this.WAmp_X) {
                    this.obj3D.rotation.x -= deltaX;
                } else {
                    this.obj3D.rotation.x = -this.WAmp_X;
                    this.flipX = true;
                }
            } else {
                if (this.obj3D.rotation.x <= this.WAmp_X) {
                    this.obj3D.rotation.x += deltaX;
                } else {
                    this.obj3D.rotation.x = this.WAmp_X;
                    this.flipX = false;
                }
            }
        }
    }
}

new ApgCdn_Logo3D_Breda_2024(window, document).Init().Loop();
