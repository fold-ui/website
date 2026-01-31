import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const LogoViewer = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        const container = mountRef.current
        if (!container) return

        let width = container.clientWidth
        let height = container.clientHeight

        // --- Scene Setup ---
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x12131b)

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.set(-200, 0, 400) // Set Z to ensure visibility

        const offsetAmount = -450
        camera.setViewOffset(width, height, offsetAmount, 300, width, height)

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)
        container.appendChild(renderer.domElement)

        // --- Materials ---
        const haloMaterial = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                color: { value: new THREE.Color(0x583cf7) },
                power: { value: 4 },
                intensity: { value: 0.5 },
            },
            vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPosition.xyz);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        uniform vec3 color;
        uniform float power;
        uniform float intensity;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float fresnel = pow(1.0 - dot(vNormal, vViewDir), power);
          gl_FragColor = vec4(color, fresnel * intensity);
        }
      `,
        })

        // --- SVG & Geometry ---
        const svgMarkup = `<svg viewBox="0 0 268 308" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(1,0,0,1,-378.233,-358.407)">
        <g transform="matrix(1.20265,0,0,1.10696,-103.757,-54.763)">
          <g transform="matrix(1.05146e-17,-0.232093,0.783096,0.451495,273.487,554.131)">
            <path d="M419.906,162.542L118.49,162.542L118.49,274.913L419.906,274.913"/>
          </g>
          <g transform="matrix(0.523761,-0.302393,0.747409,0.430013,197.824,430.33)">
            <rect x="172.138" y="162.542" width="247.768" height="112.371"/>
          </g>
          <g transform="matrix(1,0,0,1,389.119,358.608)">
            <path d="M181.552,109.51L104.329,153.558L73.11,135.923L16.694,168.495L100.652,216.799L234.108,139.748L181.552,109.51Z"/>
          </g>
        </g>
      </g>
    </svg>`

        const loader = new SVGLoader()
        const svgData = loader.parse(svgMarkup)
        const group = new THREE.Group()

        // Material - metallic look
        const material = new THREE.MeshStandardMaterial({
            color: 0x4a4a5a,
            metalness: 0.7,
            roughness: 0.3,
            side: THREE.DoubleSide,
            envMapIntensity: 1.0,
        })

        svgData.paths.forEach((path) => {
            const shapes = SVGLoader.createShapes(path)
            shapes.forEach((shape) => {
                const geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: 100,
                    bevelEnabled: true,
                    bevelThickness: 5,
                    bevelSize: 2,
                    bevelSegments: 10,
                })
                const mesh = new THREE.Mesh(geometry, material)
                group.add(mesh)

                const mesh1 = new THREE.Mesh(geometry, haloMaterial)
                group.add(mesh1)
            })
        })

        const box = new THREE.Box3().setFromObject(group)
        const center = box.getCenter(new THREE.Vector3())
        group.position.set(-center.x - 20, -center.y + 250, -center.z)
        group.scale.y = -1

        const pivot = new THREE.Group()
        pivot.add(group)
        scene.add(pivot)

        // --- Stars ---
        const starCount = 0
        const starPositions = new Float32Array(starCount * 3)
        for (let i = 0; i < starCount; i++) {
            const r = 400 + Math.random() * 500
            const theta = 2 * Math.PI * Math.random()
            const phi = Math.acos(2 * Math.random() - 1)
            starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            starPositions[i * 3 + 2] = r * Math.cos(phi)
        }
        const starGeometry = new THREE.BufferGeometry()
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
        const starMaterial = new THREE.PointsMaterial({
            color: 0xa6a6c5,
            size: 1,
            transparent: true,
            opacity: 0.8,
        })
        const stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)

        // --- Lighting ---
        scene.add(new THREE.AmbientLight(0xffffff, 0.4))
        const d1 = new THREE.DirectionalLight(0xffffff, 0.6)
        d1.position.set(1, 1, 1)
        scene.add(d1)

        // --- Post-Processing ---
        const composer = new EffectComposer(renderer)
        composer.addPass(new RenderPass(scene, camera))

        // Bloom
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.2, 0.4, 0.85)
        composer.addPass(bloomPass)


        // --- Controls & Interaction ---
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        let autoRotate = true
        let resumeTimeout
        controls.addEventListener('start', () => {
            autoRotate = false
            clearTimeout(resumeTimeout)
        })
        controls.addEventListener('end', () => {
            resumeTimeout = setTimeout(() => {
                autoRotate = true
            }, 3000)
        })

        const mouse = { x: 0, y: 0 }
        const targetMouse = { x: 0, y: 0 }
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect()
            targetMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            targetMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        }
        container.addEventListener('mousemove', onMouseMove)

        // --- Animation Loop ---
        let frameId
        const animate = () => {
            frameId = requestAnimationFrame(animate)
            const time = Date.now() * 0.0001

            starMaterial.opacity = 0.65 + Math.sin(time * 0.5) * 0.25
            mouse.x += (targetMouse.x - mouse.x) * 0.05
            mouse.y += (targetMouse.y - mouse.y) * 0.05

            stars.rotation.y += 0.00005 + mouse.x * 0.0005
            stars.rotation.x += 0.00002 + mouse.y * 0.0005

            if (autoRotate) pivot.rotation.y += 0.0002

            controls.update()
            composer.render()
        }
        animate()

        // --- Resize Handler ---
        const handleResize = () => {
            if (!container) return

            width = container.clientWidth
            height = container.clientHeight
            camera.aspect = width / height
            camera.setViewOffset(width, height, offsetAmount, 300, width, height)
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
            composer.setSize(width, height)
        }

        // Use ResizeObserver to detect container size changes
        const resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(container)
        window.addEventListener('resize', handleResize)

        // --- Cleanup ---
        return () => {
            cancelAnimationFrame(frameId)
            resizeObserver.disconnect()
            window.removeEventListener('resize', handleResize)
            container.removeEventListener('mousemove', onMouseMove)
            container.removeChild(renderer.domElement)
            // Clean up geometries/materials to prevent memory leaks
            starGeometry.dispose()
            starMaterial.dispose()
            haloMaterial.dispose()
        }
    }, [])

    return (
        <div
            ref={mountRef}
            style={{
                width: '100%',
                height: '100%',
                background: '#1A1B23',
                position: 'absolute',
                inset: 0,
                zIndex: 1,
            }}
        />
    )
}

export default LogoViewer
