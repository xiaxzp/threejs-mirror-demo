window.onload=main;
window.onunload = function() {};
function main(){
	var scene = new THREE.Scene();
        
	var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
	//camera = new THREE.OrthographicCamera(-4, 4, 4, 0, 1, 10);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled=true;
	//renderer.setClearColor(0x44aaaa);
	var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight( 0x333333 );
	directionalLight.position.set( -10, 15, 20 );

	// Shadow parameters
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.x = 1024*2;
	directionalLight.shadow.mapSize.y = 1024*2;
	directionalLight.shadow.camera.right = 20;
	directionalLight.shadow.camera.top = 30;
	directionalLight.shadow.camera.left = -20;
	directionalLight.shadow.camera.bottom = -20;

	// Model specific Shadow parameters
	renderer.shadowMap.renderSingleSided = false;
	renderer.shadowMap.renderReverseSided = false;
	directionalLight.shadow.bias = -0.001;
	directionalLight.name = "directionalLight";
	scene.add( directionalLight );
	
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(1, 10, 5);
	spotLight.castShadow = true;
	scene.add(spotLight);

	var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 4, 4);
	var plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({color: 0x555555,specular:0x555555,shininess:1000}));
	plane.rotation.x=-Math.PI/2;
	plane.position.y=-0.81;
	plane.receiveShadow = true;
	scene.add(plane);

	
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


	camera.lookAt(new THREE.Vector3(0,0,0));
	camera.position.z = 10;
	camera.position.y=2;
	camera.rotateX(-0.04);

	var geometry = new THREE.PlaneGeometry(1000, 1000, 4, 4);//THREE.CircleGeometry(10);
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

	sky = new THREE.Sky();
	sky.name = "sky";
	sky.scale.x=1000;
	sky.scale.y=1000;
	sky.scale.z=1000;
	console.log(sky);
	console.log(sky.material.color);
	scene.add( sky );
	sunSphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 20000, 16, 8 ),
		new THREE.MeshBasicMaterial( { color: 0xffffff } )
	);
	sunSphere.position.y = - 700;
	sunSphere.visible = false;
	sunSphere.name = "sunSphere";
	scene.add( sunSphere );
	distanceSky = 400;

	effectControllerSky  = {
		turbidity: 10,
		rayleigh: 2,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.8,
		luminance: 1,
		inclination: 0.0, // elevation / inclination
		azimuth: 0.25, // Facing front,
		sun: ! true
	};

	var uniforms = sky.material.uniforms;
            uniforms.turbidity.value = effectControllerSky.turbidity;
            uniforms.rayleigh.value = effectControllerSky.rayleigh;
            uniforms.luminance.value = effectControllerSky.luminance;
            uniforms.mieCoefficient.value = effectControllerSky.mieCoefficient;
            uniforms.mieDirectionalG.value = effectControllerSky.mieDirectionalG;

            var theta = Math.PI * ( effectControllerSky.inclination - 0.5 );
            var phi = 2 * Math.PI * ( effectControllerSky.azimuth - 0.5 );

            sunSphere.position.x = distanceSky * Math.cos( phi );
            sunSphere.position.y = distanceSky * Math.sin( phi ) * Math.sin( theta );
            sunSphere.position.z = distanceSky * Math.sin( phi ) * Math.cos( theta );

            sunSphere.visible = effectControllerSky.sun;

            sky.material.uniforms.sunPosition.value.copy( sunSphere.position );



	function render() {
		requestAnimationFrame(render);
		//cube.rotation.x += 0.1;
		cube.rotation.y += 0.02;
		renderer.render(scene, camera);
	}
	render();
	return true;
}
