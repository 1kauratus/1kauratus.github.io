// Global variables
let scene, camera, renderer, globe, controls;
let properties = [];
let filteredProperties = [];
let currentPage = 'home';
let propertyTooltip;
let isRotating = true;
let propertyMap;
let mouseX = 0, mouseY = 0;

// Property data
const propertyData = [
    {
        id: 1,
        title: "Modern Downtown Loft",
        location: "New York, NY",
        address: "123 Broadway, New York, NY 10001",
        price: 1200000,
        beds: 2,
        baths: 2,
        sqft: 1200,
        coordinates: { lat: 40.7505, lng: -73.9934 },
        globeCoords: { lat: 40.7505, lng: -73.9934 },
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"
        ],
        description: "Stunning modern loft in the heart of downtown with floor-to-ceiling windows and premium finishes.",
        highlights: ["Floor-to-ceiling windows", "Premium finishes", "Modern appliances", "24/7 concierge"],
        features: ["Air Conditioning", "Hardwood Floors", "Stainless Steel Appliances", "In-unit Laundry", "Balcony", "Gym Access"],
        walkScore: 95,
        transitScore: 85,
        nearby: [
            { name: "Central Park", distance: "0.5 miles" },
            { name: "Times Square", distance: "0.8 miles" },
            { name: "Metro Station", distance: "0.2 miles" }
        ]
    },
    {
        id: 2,
        title: "Luxury Penthouse",
        location: "London, UK",
        address: "456 Mayfair Street, London W1K 1AB",
        price: 2500000,
        beds: 3,
        baths: 3,
        sqft: 2100,
        coordinates: { lat: 51.5074, lng: -0.1278 },
        globeCoords: { lat: 51.5074, lng: -0.1278 },
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800"
        ],
        description: "Exclusive penthouse with panoramic city views and luxury amenities in prestigious Mayfair.",
        highlights: ["Panoramic city views", "Luxury amenities", "Prime Mayfair location", "Private elevator"],
        features: ["Panoramic Views", "Private Elevator", "Fireplace", "Wine Cellar", "Terrace", "Concierge"],
        walkScore: 88,
        transitScore: 92,
        nearby: [
            { name: "Hyde Park", distance: "0.3 miles" },
            { name: "Oxford Street", distance: "0.5 miles" },
            { name: "Tube Station", distance: "0.1 miles" }
        ]
    },
    {
        id: 3,
        title: "Contemporary Apartment",
        location: "Tokyo, Japan",
        address: "789 Shibuya District, Tokyo 150-0002",
        price: 850000,
        beds: 1,
        baths: 1,
        sqft: 800,
        coordinates: { lat: 35.6762, lng: 139.6503 },
        globeCoords: { lat: 35.6762, lng: 139.6503 },
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
        ],
        description: "Ultra-modern apartment in vibrant Shibuya with cutting-edge smart home technology.",
        highlights: ["Smart home technology", "Shibuya location", "Modern design", "City access"],
        features: ["Smart Home", "High-speed Internet", "Modern Kitchen", "City Views", "Security System", "Parking"],
        walkScore: 98,
        transitScore: 95,
        nearby: [
            { name: "Shibuya Crossing", distance: "0.1 miles" },
            { name: "Meiji Shrine", distance: "0.7 miles" },
            { name: "JR Station", distance: "0.05 miles" }
        ]
    },
    {
        id: 4,
        title: "Waterfront Villa",
        location: "Sydney, Australia",
        address: "321 Harbour View, Sydney NSW 2000",
        price: 3200000,
        beds: 4,
        baths: 3,
        sqft: 2800,
        coordinates: { lat: -33.8688, lng: 151.2093 },
        globeCoords: { lat: -33.8688, lng: 151.2093 },
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
        ],
        description: "Spectacular waterfront villa with harbour views and private beach access.",
        highlights: ["Harbour views", "Private beach access", "Luxury finishes", "Prime location"],
        features: ["Ocean Views", "Private Beach", "Swimming Pool", "Garden", "Garage", "Security"],
        walkScore: 75,
        transitScore: 65,
        nearby: [
            { name: "Sydney Opera House", distance: "1.2 miles" },
            { name: "Harbour Bridge", distance: "1.5 miles" },
            { name: "Ferry Terminal", distance: "0.3 miles" }
        ]
    },
    {
        id: 5,
        title: "Desert Oasis",
        location: "Dubai, UAE",
        address: "567 Palm Jumeirah, Dubai 12345",
        price: 1800000,
        beds: 3,
        baths: 4,
        sqft: 2200,
        coordinates: { lat: 25.2048, lng: 55.2708 },
        globeCoords: { lat: 25.2048, lng: 55.2708 },
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
            "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800"
        ],
        description: "Luxurious beachfront property with stunning architecture and premium amenities.",
        highlights: ["Beachfront location", "Stunning architecture", "Premium amenities", "Resort-style living"],
        features: ["Beachfront", "Swimming Pool", "Spa", "Gym", "Valet Parking", "24/7 Security"],
        walkScore: 65,
        transitScore: 70,
        nearby: [
            { name: "Atlantis Resort", distance: "0.5 miles" },
            { name: "Dubai Marina", distance: "2.1 miles" },
            { name: "Metro Station", distance: "1.8 miles" }
        ]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('FUTURA script loaded successfully');
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Hide loading screen after a delay
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loadingScreen.style.display = 'none';
                initializeApp();
            }
        });
    }, 2000);
});

function initializeApp() {
    console.log('Initializing FUTURA application...');
    
    // Initialize properties
    properties = [...propertyData];
    filteredProperties = [...properties];
    
    // Initialize 3D globe
    initGlobe();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize property tooltip
    initPropertyTooltip();
    
    // Initialize animations
    initAnimations();
    
    // Initialize properties page
    initPropertiesPage();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize property modal
    initPropertyModal();
    
    console.log('FUTURA application initialized successfully');
}

// Globe initialization
function initGlobe() {
    console.log('Initializing 3D globe...');
    
    const canvas = document.getElementById('globe-canvas');
    const container = canvas.parentElement;
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1);
    
    // Add realistic starfield background
    addStarField();
    
    // Create globe with higher detail
    const geometry = new THREE.SphereGeometry(2, 128, 128);
    
    // Load Earth texture
    const earthTexture = createEarthTexture();
    
    // Enhanced material for more realistic Earth
    const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        transparent: false,
        shininess: 100,
        specular: 0x222222
    });
    
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // Add cloud layer for realism
    const cloudGeometry = new THREE.SphereGeometry(2.01, 64, 64);
    const cloudTexture = createCloudTexture();
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.3,
        depthWrite: false
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    
    // Store clouds reference for animation
    globe.userData.clouds = clouds;
    
    // Add stunning atmosphere effect with multiple layers
    const atmosphereGeometry1 = new THREE.SphereGeometry(2.05, 64, 64);
    const atmosphereMaterial1 = new THREE.MeshPhongMaterial({
        color: 0x4fc3f7,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const atmosphere1 = new THREE.Mesh(atmosphereGeometry1, atmosphereMaterial1);
    scene.add(atmosphere1);
    
    // Second atmosphere layer for depth
    const atmosphereGeometry2 = new THREE.SphereGeometry(2.08, 64, 64);
    const atmosphereMaterial2 = new THREE.MeshPhongMaterial({
        color: 0x29b6f6,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide
    });
    const atmosphere2 = new THREE.Mesh(atmosphereGeometry2, atmosphereMaterial2);
    scene.add(atmosphere2);
    
    // Outer glow effect
    const glowGeometry = new THREE.SphereGeometry(2.12, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x03a9f4,
        transparent: true,
        opacity: 0.03,
        side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    
    // Enhanced realistic lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    scene.add(ambientLight);
    
    // Main sun light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Secondary light for atmosphere
    const secondaryLight = new THREE.DirectionalLight(0x87ceeb, 0.3);
    secondaryLight.position.set(-5, 3, -5);
    scene.add(secondaryLight);
    
    // Add hemisphere light for realistic sky illumination
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x223344, 0.6);
    scene.add(hemisphereLight);
    
    // Add property markers
    addPropertyMarkers();
    
    // Set initial camera position
    camera.position.z = 5;
    
    // Add mouse controls
    addGlobeControls();
    
    // Start render loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Globe control buttons
    document.getElementById('rotate-toggle').addEventListener('click', toggleRotation);
    document.getElementById('reset-view').addEventListener('click', resetView);
    
    console.log('3D globe initialized successfully');
}

function createEarthTexture() {
    // Load ultra-realistic Earth texture
    const textureLoader = new THREE.TextureLoader();
    
    // Try multiple high-quality Earth texture sources
    const earthTextureSources = [
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_earth_daymap.jpg'
    ];
    
    // Try to load the first available texture
    const earthTexture = textureLoader.load(
        earthTextureSources[0],
        function(texture) {
            console.log('Ultra-realistic Earth texture loaded successfully');
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
        },
        function(progress) {
            console.log('Loading ultra-realistic Earth texture...', progress);
        },
        function(error) {
            console.log('Primary texture failed, using enhanced fallback');
            return createEnhancedFallbackTexture();
        }
    );
    
    return earthTexture;
}

function createEnhancedFallbackTexture() {
    // Ultra-realistic fallback Earth texture with detailed continents
    const canvas = document.createElement('canvas');
    canvas.width = 4096;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    
    // Deep ocean base with realistic colors
    const oceanGradient = ctx.createRadialGradient(2048, 1024, 0, 2048, 1024, 2048);
    oceanGradient.addColorStop(0, '#001122');
    oceanGradient.addColorStop(0.3, '#003366');
    oceanGradient.addColorStop(0.6, '#0066aa');
    oceanGradient.addColorStop(0.8, '#0088cc');
    oceanGradient.addColorStop(1, '#0099dd');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add realistic continent colors and details
    const continentColors = ['#1a4d1a', '#2d5a2d', '#336633', '#4d804d'];
    
    // North America - detailed shape
    ctx.fillStyle = continentColors[0];
    drawRealisticContinent(ctx, [
        [400, 400], [600, 350], [750, 400], [800, 600], 
        [700, 800], [500, 850], [300, 750], [250, 550]
    ]);
    
    // South America
    ctx.fillStyle = continentColors[1];
    drawRealisticContinent(ctx, [
        [600, 1000], [750, 950], [800, 1200], [750, 1500], 
        [650, 1600], [550, 1550], [500, 1300], [520, 1100]
    ]);
    
    // Europe & Africa
    ctx.fillStyle = continentColors[2];
    drawRealisticContinent(ctx, [
        [1800, 300], [2000, 250], [2100, 400], [2150, 800], 
        [2100, 1200], [2000, 1400], [1900, 1300], [1750, 800], [1700, 500]
    ]);
    
    // Asia
    ctx.fillStyle = continentColors[3];
    drawRealisticContinent(ctx, [
        [2200, 200], [2800, 180], [3200, 300], [3400, 500], 
        [3300, 800], [3000, 900], [2600, 850], [2300, 600], [2100, 400]
    ]);
    
    // Australia
    ctx.fillStyle = continentColors[0];
    drawRealisticContinent(ctx, [
        [2800, 1300], [3100, 1280], [3200, 1400], [3100, 1500], 
        [2900, 1520], [2700, 1450]
    ]);
    
    // Add mountain ranges with darker greens
    ctx.fillStyle = '#1a3d1a';
    addMountainRanges(ctx);
    
    // Ice caps with realistic snow texture
    ctx.fillStyle = '#f8f8ff';
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.ellipse(2048, 100, 800, 80, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(2048, 1948, 800, 80, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    
    return new THREE.CanvasTexture(canvas);
}

function drawRealisticContinent(ctx, points) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        const cp1x = points[i-1][0] + (points[i][0] - points[i-1][0]) * 0.3;
        const cp1y = points[i-1][1] + (points[i][1] - points[i-1][1]) * 0.3;
        const cp2x = points[i][0] - (points[i][0] - points[i-1][0]) * 0.3;
        const cp2y = points[i][1] - (points[i][1] - points[i-1][1]) * 0.3;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fill();
}

function addMountainRanges(ctx) {
    // Himalayas
    ctx.beginPath();
    ctx.ellipse(2800, 600, 200, 30, Math.PI/6, 0, Math.PI * 2);
    ctx.fill();
    
    // Andes
    ctx.beginPath();
    ctx.ellipse(650, 1300, 30, 300, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Rockies
    ctx.beginPath();
    ctx.ellipse(500, 600, 25, 200, Math.PI/8, 0, Math.PI * 2);
    ctx.fill();
}

function createCloudTexture() {
    // Create realistic cloud texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create cloud patterns
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    // Generate random cloud formations
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 40 + 20;
        
        ctx.globalAlpha = Math.random() * 0.6 + 0.2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add smaller cloud details
        for (let j = 0; j < 3; j++) {
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 60;
            const smallRadius = radius * (Math.random() * 0.5 + 0.3);
            
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, smallRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    return new THREE.CanvasTexture(canvas);
}

function addStarField() {
    // Create realistic star field
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
        // Random positions in a large sphere
        const radius = 500;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Star colors (white with slight variations)
        const brightness = 0.5 + Math.random() * 0.5;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function addPropertyMarkers() {
    properties.forEach((property, index) => {
        // Create elegant marker group
        const markerGroup = new THREE.Group();
        
        // Main marker sphere with premium look
        const markerGeometry = new THREE.SphereGeometry(0.025, 32, 32);
        const markerMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.9,
            shininess: 100,
            specular: 0x333333,
            emissive: 0x001122
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        
        // Add elegant glow ring around marker
        const ringGeometry = new THREE.RingGeometry(0.03, 0.04, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        
        // Add pulsing outer ring
        const outerRingGeometry = new THREE.RingGeometry(0.05, 0.055, 32);
        const outerRingMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });
        const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
        
        // Add vertical beam of light
        const beamGeometry = new THREE.CylinderGeometry(0.002, 0.008, 0.15, 8);
        const beamMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.6
        });
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.position.y = 0.075;
        
        // Convert lat/lng to 3D coordinates
        const phi = (90 - property.globeCoords.lat) * (Math.PI / 180);
        const theta = (property.globeCoords.lng + 180) * (Math.PI / 180);
        
        const radius = 2.02;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        // Position marker group
        markerGroup.position.set(x, y, z);
        
        // Orient marker to face outward from Earth
        markerGroup.lookAt(x * 2, y * 2, z * 2);
        
        // Add all elements to group
        markerGroup.add(marker);
        markerGroup.add(ring);
        markerGroup.add(outerRing);
        markerGroup.add(beam);
        
        // Store property data
        markerGroup.userData = property;
        marker.userData = property;
        
        // Elegant pulsing animation
        gsap.to(marker.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.2
        });
        
        // Ring rotation animation
        gsap.to(ring.rotation, {
            z: Math.PI * 2,
            duration: 8,
            repeat: -1,
            ease: "none"
        });
        
        // Outer ring counter-rotation
        gsap.to(outerRing.rotation, {
            z: -Math.PI * 2,
            duration: 12,
            repeat: -1,
            ease: "none"
        });
        
        // Beam opacity pulse
        gsap.to(beam.material, {
            opacity: 0.2,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3
        });
        
        scene.add(markerGroup);
    });
}

function addGlobeControls() {
    const canvas = document.getElementById('globe-canvas');
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    // Mouse events
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onMouseWheel);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    
    function onMouseDown(event) {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
        canvas.style.cursor = 'grabbing';
    }
    
    function onMouseMove(event) {
        if (isDragging) {
            const deltaX = event.clientX - previousMousePosition.x;
            const deltaY = event.clientY - previousMousePosition.y;
            
            globe.rotation.y += deltaX * 0.01;
            globe.rotation.x += deltaY * 0.01;
            
            // Limit vertical rotation
            globe.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globe.rotation.x));
            
            previousMousePosition = { x: event.clientX, y: event.clientY };
        } else {
            // Check for marker hover
            checkMarkerHover(event);
        }
        
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    
    function onMouseUp() {
        isDragging = false;
        canvas.style.cursor = 'grab';
    }
    
    function onMouseWheel(event) {
        event.preventDefault();
        const zoomSpeed = 0.1;
        camera.position.z += event.deltaY * zoomSpeed * 0.01;
        camera.position.z = Math.max(3, Math.min(10, camera.position.z));
    }
    
    function onTouchStart(event) {
        event.preventDefault();
        if (event.touches.length === 1) {
            isDragging = true;
            previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
    }
    
    function onTouchMove(event) {
        event.preventDefault();
        if (isDragging && event.touches.length === 1) {
            const deltaX = event.touches[0].clientX - previousMousePosition.x;
            const deltaY = event.touches[0].clientY - previousMousePosition.y;
            
            globe.rotation.y += deltaX * 0.01;
            globe.rotation.x += deltaY * 0.01;
            
            globe.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globe.rotation.x));
            
            previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
    }
    
    function onTouchEnd(event) {
        event.preventDefault();
        isDragging = false;
    }
    
    canvas.style.cursor = 'grab';
}

function checkMarkerHover(event) {
    const rect = document.getElementById('globe-canvas').getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    // Get all markers
    const markers = scene.children.filter(child => 
        child.userData && child.userData.id
    );
    
    const intersects = raycaster.intersectObjects(markers, true);
    
    if (intersects.length > 0) {
        const property = intersects[0].object.userData;
        if (property && property.id) {
            showPropertyTooltip(property, event.clientX, event.clientY);
            document.getElementById('globe-canvas').style.cursor = 'pointer';
            
            // Add click handler
            document.getElementById('globe-canvas').onclick = () => {
                openPropertyModal(property);
            };
        }
    } else {
        hidePropertyTooltip();
        document.getElementById('globe-canvas').style.cursor = 'grab';
        document.getElementById('globe-canvas').onclick = null;
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    // Auto-rotate globe
    if (isRotating) {
        globe.rotation.y += 0.002;
        
        // Animate clouds slightly faster for realism
        if (globe.userData.clouds) {
            globe.userData.clouds.rotation.y += 0.003;
        }
    }
    
    renderer.render(scene, camera);
}

function toggleRotation() {
    isRotating = !isRotating;
    const icon = document.querySelector('#rotate-toggle i');
    icon.className = isRotating ? 'fas fa-pause' : 'fas fa-play';
}

function resetView() {
    gsap.to(camera.position, { x: 0, y: 0, z: 5, duration: 1 });
    gsap.to(globe.rotation, { x: 0, y: 0, z: 0, duration: 1 });
}

function onWindowResize() {
    const container = document.querySelector('.globe-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Property tooltip functions
function initPropertyTooltip() {
    propertyTooltip = document.getElementById('property-tooltip');
}

function showPropertyTooltip(property, x, y) {
    if (!propertyTooltip) return;
    
    // Populate tooltip content
    propertyTooltip.querySelector('.tooltip-image img').src = property.images[0];
    propertyTooltip.querySelector('.tooltip-price').textContent = formatPrice(property.price);
    propertyTooltip.querySelector('.tooltip-title').textContent = property.title;
    propertyTooltip.querySelector('.tooltip-location').textContent = property.location;
    propertyTooltip.querySelector('.beds').textContent = property.beds;
    propertyTooltip.querySelector('.baths').textContent = property.baths;
    propertyTooltip.querySelector('.sqft').textContent = property.sqft.toLocaleString() + ' sq ft';
    
    // Position tooltip
    propertyTooltip.style.left = (x + 20) + 'px';
    propertyTooltip.style.top = (y - 100) + 'px';
    
    // Show tooltip with animation
    propertyTooltip.classList.add('visible');
    gsap.fromTo(propertyTooltip, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3 }
    );
}

function hidePropertyTooltip() {
    if (!propertyTooltip) return;
    propertyTooltip.classList.remove('visible');
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navigation link clicks with smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            
            // Professional page transition animation
            gsap.to('.page.active', {
                opacity: 0,
                y: -30,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    showPage(targetPage);
                    gsap.fromTo('.page.active', 
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                    );
                }
            });
            
            // Update active nav link with professional animation
            navLinks.forEach(l => {
                l.classList.remove('active');
                gsap.to(l, { 
                    scale: 1, 
                    duration: 0.2 
                });
            });
            
            link.classList.add('active');
            gsap.to(link, { 
                scale: 1.05, 
                duration: 0.2 
            });
            
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Professional CTA buttons functionality
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (button.classList.contains('primary')) {
                // Navigate to properties page with smooth transition
                gsap.to('.page.active', {
                    opacity: 0,
                    y: -30,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        showPage('properties');
                        gsap.fromTo('.page.active', 
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                        );
                    }
                });
                
                // Update navigation
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector('[data-page="properties"]').classList.add('active');
                
            } else if (button.classList.contains('secondary')) {
                // Add pulse effect to globe container
                gsap.to('.globe-container', {
                    scale: 1.02,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            }
        });
    });
    
    // Add scroll effects for navbar like professional realtor sites
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Initialize page-specific functionality
        if (pageId === 'properties') {
            renderProperties();
        }
    }
}

// Animations
function initAnimations() {
    // Hero section animations
    gsap.fromTo('.hero-badge', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );
    
    gsap.fromTo('.hero-title', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4 }
    );
    
    gsap.fromTo('.hero-subtitle', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
    );
    
    gsap.fromTo('.hero-stats', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8 }
    );
    
    gsap.fromTo('.hero-actions', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.0 }
    );
    
    gsap.fromTo('.hero-features', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2 }
    );
    
    gsap.fromTo('.globe-container', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.5 }
    );
}

// Properties page functionality
function initPropertiesPage() {
    initFilters();
}

function initFilters() {
    const filters = {
        location: document.getElementById('location-filter'),
        beds: document.getElementById('beds-filter'),
        baths: document.getElementById('baths-filter'),
        price: document.getElementById('price-filter'),
        area: document.getElementById('area-filter'),
        sort: document.getElementById('sort-filter')
    };
    
    const clearButton = document.querySelector('.clear-filters');
    
    // Add event listeners to all filters
    Object.values(filters).forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
    
    // Clear filters button
    if (clearButton) {
        clearButton.addEventListener('click', clearFilters);
    }
    
    function applyFilters() {
        filteredProperties = [...properties];
        
        // Location filter
        if (filters.location.value) {
            filteredProperties = filteredProperties.filter(property => 
                property.location.toLowerCase().includes(filters.location.value)
            );
        }
        
        // Beds filter
        if (filters.beds.value) {
            filteredProperties = filteredProperties.filter(property => 
                property.beds >= parseInt(filters.beds.value)
            );
        }
        
        // Baths filter
        if (filters.baths.value) {
            filteredProperties = filteredProperties.filter(property => 
                property.baths >= parseInt(filters.baths.value)
            );
        }
        
        // Price filter
        if (filters.price.value) {
            const [min, max] = filters.price.value.split('-').map(Number);
            filteredProperties = filteredProperties.filter(property => 
                property.price >= min && property.price <= max
            );
        }
        
        // Area filter
        if (filters.area.value) {
            const [min, max] = filters.area.value.split('-').map(Number);
            filteredProperties = filteredProperties.filter(property => 
                property.sqft >= min && property.sqft <= max
            );
        }
        
        // Sort
        if (filters.sort.value) {
            switch (filters.sort.value) {
                case 'price-low':
                    filteredProperties.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProperties.sort((a, b) => b.price - a.price);
                    break;
                case 'size':
                    filteredProperties.sort((a, b) => b.sqft - a.sqft);
                    break;
                case 'newest':
                default:
                    // Keep original order
                    break;
            }
        }
        
        renderProperties();
    }
    
    function clearFilters() {
        Object.values(filters).forEach(filter => {
            if (filter) filter.value = '';
        });
        filteredProperties = [...properties];
        renderProperties();
    }
}

function renderProperties() {
    const grid = document.getElementById('properties-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    filteredProperties.forEach((property, index) => {
        const card = createPropertyCard(property);
        grid.appendChild(card);
        
        // Animate cards on load
        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, delay: index * 0.1 }
        );
    });
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.onclick = () => openPropertyModal(property);
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.images[0]}" alt="${property.title}">
            <div class="property-price">${formatPrice(property.price)}</div>
            <button class="property-favorite">
                <i class="far fa-heart"></i>
            </button>
        </div>
        <div class="property-info">
            <h3 class="property-title">${property.title}</h3>
            <p class="property-location">${property.location}</p>
            <div class="property-specs">
                <span class="spec"><i class="fas fa-bed"></i> ${property.beds}</span>
                <span class="spec"><i class="fas fa-bath"></i> ${property.baths}</span>
                <span class="spec"><i class="fas fa-ruler-combined"></i> ${property.sqft.toLocaleString()} sq ft</span>
            </div>
            <div class="property-features">
                ${property.features.slice(0, 3).map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Favorite button functionality
    const favoriteBtn = card.querySelector('.property-favorite');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        favoriteBtn.classList.toggle('active');
        const icon = favoriteBtn.querySelector('i');
        icon.className = favoriteBtn.classList.contains('active') ? 'fas fa-heart' : 'far fa-heart';
    });
    
    return card;
}

// Property Modal
function initPropertyModal() {
    const modal = document.getElementById('property-modal');
    const closeBtn = document.querySelector('.modal-close');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Close modal
    closeBtn.addEventListener('click', closePropertyModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePropertyModal();
    });
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePropertyModal();
        }
    });
}

function openPropertyModal(property) {
    const modal = document.getElementById('property-modal');
    
    // Populate modal content
    populateModalContent(property);
    
    // Show modal
    modal.classList.add('active');
    modal.style.display = 'flex';
    
    // Animate modal in
    gsap.fromTo('.modal-content', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4 }
    );
    
    // Initialize map after modal is shown
    setTimeout(() => {
        if (propertyMap) {
            propertyMap.remove();
        }
        initPropertyMap(property);
    }, 500);
}

function closePropertyModal() {
    const modal = document.getElementById('property-modal');
    
    gsap.to('.modal-content', {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    });
}

function populateModalContent(property) {
    // Main image and thumbnails
    document.getElementById('modal-main-image').src = property.images[0];
    
    const thumbnailsContainer = document.getElementById('image-thumbnails');
    thumbnailsContainer.innerHTML = '';
    property.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="Property image ${index + 1}">`;
        thumbnail.onclick = () => changeMainImage(image, thumbnail);
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Property info
    document.getElementById('modal-title').textContent = property.title;
    document.getElementById('modal-location').textContent = property.address;
    document.getElementById('modal-price').textContent = formatPrice(property.price);
    
    const specsContainer = document.getElementById('modal-specs');
    specsContainer.innerHTML = `
        <span class="spec"><i class="fas fa-bed"></i> ${property.beds} Beds</span>
        <span class="spec"><i class="fas fa-bath"></i> ${property.baths} Baths</span>
        <span class="spec"><i class="fas fa-ruler-combined"></i> ${property.sqft.toLocaleString()} sq ft</span>
    `;
    
    // Highlights
    const highlightsContainer = document.getElementById('modal-highlights');
    highlightsContainer.innerHTML = property.highlights.map(highlight => 
        `<div class="highlight-item">${highlight}</div>`
    ).join('');
    
    // Features
    const featuresContainer = document.getElementById('modal-features');
    featuresContainer.innerHTML = property.features.map(feature => 
        `<div class="feature-item">${feature}</div>`
    ).join('');
    
    // Description
    document.getElementById('modal-description').innerHTML = `<p>${property.description}</p>`;
    
    // Nearby places
    const nearbyContainer = document.getElementById('modal-nearby');
    nearbyContainer.innerHTML = property.nearby.map(place => 
        `<div class="nearby-item">
            <span>${place.name}</span>
            <span>${place.distance}</span>
        </div>`
    ).join('');
    
    // Calculator
    document.getElementById('calc-price').value = property.price;
}

function changeMainImage(imageSrc, thumbnail) {
    document.getElementById('modal-main-image').src = imageSrc;
    
    // Update thumbnail active state
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

function initPropertyMap(property) {
    const mapContainer = document.getElementById('property-map');
    if (!mapContainer || !property.coordinates) return;
    
    // Initialize Leaflet map
    propertyMap = L.map('property-map').setView([property.coordinates.lat, property.coordinates.lng], 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(propertyMap);
    
    // Add marker for property
    L.marker([property.coordinates.lat, property.coordinates.lng])
        .addTo(propertyMap)
        .bindPopup(`<b>${property.title}</b><br>${property.address}`)
        .openPopup();
}

// Payment Calculator
function calculatePayment() {
    const price = parseFloat(document.getElementById('calc-price').value);
    const downPayment = parseFloat(document.getElementById('calc-down').value) || 0;
    const rate = parseFloat(document.getElementById('calc-rate').value) / 100 / 12;
    const term = parseInt(document.getElementById('calc-term').value) * 12;
    
    const loanAmount = price - downPayment;
    
    if (loanAmount <= 0) {
        document.getElementById('calc-result').innerHTML = 'Please enter a valid loan amount';
        return;
    }
    
    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    
    document.getElementById('calc-result').innerHTML = `
        <div>Monthly Payment: <strong>${formatPrice(monthlyPayment)}</strong></div>
        <div style="font-size: 0.9em; margin-top: 0.5rem;">
            Loan Amount: ${formatPrice(loanAmount)}<br>
            Total Interest: ${formatPrice((monthlyPayment * term) - loanAmount)}
        </div>
    `;
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}