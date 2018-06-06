window.onload=main;
window.onunload = function() {};
function main(){
	var scene = new THREE.Scene();
        
	var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
	//camera = new THREE.OrthographicCamera(-4, 4, 4, 0, 1, 10);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled=true;
	renderer.setClearColor(0x44aaaa);
	var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

	var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 4, 4);
	var plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({color: 0x555555,specular:0x555555,shininess:1000}));
	plane.rotation.x=-Math.PI/2;
	plane.position.y=-0.81;
	plane.receiveShadow = true;
	//scene.add(plane);

	camera.lookAt(new THREE.Vector3(0,0,0));
	document.body.appendChild(renderer.domElement);
	var geometry = new THREE.CubeGeometry(1,1,1);
	//var material = new THREE.MeshLambertMaterial({color:0x00ffff});
	var material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        specular:0xff0000,
        shininess:30
        });
	var cube = new THREE.Mesh(geometry, material); 
	cube.castShadow = true;
	scene.add(cube);

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(1, 10, 5);
	spotLight.castShadow = true;
	scene.add(spotLight);

	camera.position.z = 10;
	camera.position.y=2;
	camera.rotateX(-0.1);

	var geometry = new THREE.CircleGeometry(10);
	var groundMirror = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: 360 * window.devicePixelRatio,
					textureHeight: 360 * window.devicePixelRatio,
					color: 0xaaaaaa,
					recursion: 1
	} );
	groundMirror.position.y = -0.51;
	groundMirror.rotateX( - Math.PI / 2 );
	scene.add( groundMirror );

	function render() {
		requestAnimationFrame(render);
		//cube.rotation.x += 0.1;
		cube.rotation.y += 0.02;
		renderer.render(scene, camera);
	}
	render();
	return true;
}
