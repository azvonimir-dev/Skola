let scene, camera, renderer, player, buildings = [];
let activeModal = false;

function init() {
    const container = document.getElementById('game-container');
    
    // 1. Scena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0e0ff);

    // 2. Kamera
    camera = new THREE.OrthographicCamera(
        window.innerWidth / -40, window.innerWidth / 40,
        window.innerHeight / 40, window.innerHeight / -40,
        1, 1000
    );
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Svjetla
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // 5. Podloga (Trava)
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0x7ec850 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 6. Igrač (Kockica/Lik)
    const playerGeo = new THREE.BoxGeometry(1, 1.5, 1);
    const playerMat = new THREE.MeshLambertMaterial({ color: 0xff4757 });
    player = new THREE.Mesh(playerGeo, playerMat);
    player.position.set(0, 0.75, 0);
    player.castShadow = true;
    scene.add(player);

    // 7. Stvaranje zgrada i učitavanje podataka
    stvoriGrad();

    // Resize event
    window.addEventListener('resize', onWindowResize);
    
    // Pokretanje petlje
    animate();
}

function stvoriGrad() {
    // Ovo su podatci koji se mogu učitati i iz npr. data/razina1.json datoteke
    const zgradePodatci = [
        { ime: "Učionica Informatike", x: -8, z: -8, boja: 0xff6b6b, pitanje: "Koji uređaj služi za unos teksta u računalo?", opcije: ["Monitor", "Tipkovnica", "Zvučnik"], tocno: 1 },
        { ime: "Gradska Knjižnica", x: 8, z: -8, boja: 0x48dbfb, pitanje: "Što od navedenog NE SMIJEŠ dijeliti na internetu?", opcije: ["Omiljeno jelo", "Kućnu adresu i lozinku", "Ime najdraže boje"], tocno: 1 },
        { ime: "Zabavni Park", x: 0, z: 10, boja: 0x1dd1a1, pitanje: "Što je algoritam?", opcije: ["Slijed koraka za rješavanje zadatka", "Kompjuterski miš", "Igra na računalu"], tocno: 0 }
    ];

    zgradePodatci.forEach(data => {
        const geo = new THREE.BoxGeometry(4, 5, 4);
        const mat = new THREE.MeshLambertMaterial({ color: data.boja });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(data.x, 2.5, data.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);

        buildings.push({ mesh: mesh, data: data });
    });
}

function animate() {
    requestAnimationFrame(animate);

    const isModalOpen = !document.getElementById('quiz-modal').classList.contains('hidden');

    if (!isModalOpen) {
        const speed = 0.15;
        if (keys.w || keys.ArrowUp) player.position.z -= speed;
        if (keys.s || keys.ArrowDown) player.position.z += speed;
        if (keys.a || keys.ArrowLeft) player.position.x -= speed;
        if (keys.d || keys.ArrowRight) player.position.x += speed;

        // Kamera prati igrača
        camera.position.x = player.position.x + 20;
        camera.position.z = player.position.z + 20;

        // Detekcija blizine zgrada
        buildings.forEach(b => {
            const dist = player.position.distanceTo(b.mesh.position);
            if (dist < 3.5) {
                otvoriZadatak(b.data);
                player.position.x -= 0.5; // Lagani odmak da ne otvara modal beskonačno
            }
        });
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.left = window.innerWidth / -40;
    camera.right = window.innerWidth / 40;
    camera.top = window.innerHeight / 40;
    camera.bottom = window.innerHeight / -40;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;
