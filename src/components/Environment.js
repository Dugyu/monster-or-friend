import AFRAME from 'aframe';
import EnvFrag from '../shaders/EnvironmentFrag.glsl';
import EnvVert from '../shaders/EnvironmentVert.glsl';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('environment', {
  init: function () {
    const sphereGeometry = new THREE.SphereGeometry(8000, 32, 32);

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true, 
      side: THREE.DoubleSide 
    });

    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff8bff'),
      side: THREE.DoubleSide
    });

    this.noiseMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0
        }
      },
      vertexShader: EnvVert,
      fragmentShader: EnvFrag,
      side: THREE.DoubleSide 
    });

    const sphere = new THREE.Mesh(sphereGeometry, this.noiseMaterial);
    sphere.frustumCulled = false;

    this.el.object3D.add(sphere)
  },

  tick: function (time, timeDelta) {
    this.noiseMaterial.uniforms.time.value = time;
  }
});