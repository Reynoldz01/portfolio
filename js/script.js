document.addEventListener("DOMContentLoaded", function () {
    // Set up the scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("3d-container").appendChild(renderer.domElement);

    // Create a cube
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Position the cube
    cube.position.set(0, 2, 0); // Adjusted the cube's position

    // Position the camera
    camera.position.z = 7;

    // Track mouse movement
    var mouseX = 0;
    var mouseY = 0;

    document.addEventListener('mousemove', function (event) {
        mouseX = (event.clientX / window.innerWidth) * 4 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Define a scaling factor for the mouse movement
    var mouseMoveScale = 2;

    // Animate the cube based on mouse movement
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the cube based on mouse position with reduced scaling
        cube.rotation.x += (mouseY * mouseMoveScale - cube.rotation.x) * 0.05;
        cube.rotation.y += (mouseX * mouseMoveScale - cube.rotation.y) * 0.05;

        renderer.render(scene, camera);
    }

    // Fade-in effect for the cube
    cube.material.transparent = true;
    cube.material.opacity = 0;

    // Trigger the fade-in effect
    TweenMax.to(cube.material, 2, { opacity: 1, ease: Power2.easeInOut });

    // Adjust the cube size based on window resize
    window.addEventListener('resize', function () {
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
    });

    // Start the animation
    animate();
});
