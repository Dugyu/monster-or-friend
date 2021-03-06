import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('mover', {
  init: function () {
    this.pressed = false;
    this.lastAxis = new THREE.Vector2();
    const rig = document.querySelector('#rig');
    this.rig = rig.object3D;
    const scene = document.querySelector('a-scene');

    const camera = document.querySelector('a-camera');
    this.camera = camera.object3D;

    this.el.addEventListener('axismove', (evt) => {
      this.lastAxis.x = evt.detail.axis[2];
      this.lastAxis.y = evt.detail.axis[3];
    });

    /*
      Oculus Go track pad events
     */
    this.el.addEventListener('trackpaddown', (evt) => {
      this.pressed = true;
    });
    this.el.addEventListener('trackpadup', (evt) => {
      this.pressed = false;
    });

    /*
      Oculus touch controller events
     */
    this.el.addEventListener('thumbsticktouchstart', (evt) => {
      this.pressed = true;
    })
    this.el.addEventListener('thumbsticktouchend', (evt) => {
      this.pressed = false;
    })

    // Oculus Browser use B and Y as back button, so should we
    this.el.addEventListener('bbuttonup', (evt) => {
      scene.exitVR();
    })
    this.el.addEventListener('ybuttonup', (evt) => {
      scene.exitVR();
    })
  },
  tick: function (time, timeDelta) {
    if(this.pressed){
      const tweenForward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.camera.quaternion);
      if (this.lastAxis.y < 0) {
        // move backwards
        this.rig.position.sub(tweenForward.multiplyScalar(0.03))
      } else if (this.lastAxis.y > 0) {
        // move forwards
        this.rig.position.add(tweenForward.multiplyScalar(0.03))
      }
    }
  }
});
