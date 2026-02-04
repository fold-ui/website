import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

export const ThreeComponent = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        if (!mountRef.current) return

        // --- Dot Globe Construction ---
        const dotCount = 1000
        const baseRadius = 10
        const rotationSpeed = 0.0005
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(dotCount * 3)
        const originals = new Float32Array(dotCount * 3)
        const container = mountRef.current
        const interactionRadius = baseRadius * 0.25
        const viewOffsetX = container.clientWidth * 0.25
        const viewOffsetY = container.clientWidth * 0.1
        const starCount = 2000
        const starGeometry = new THREE.BufferGeometry()
        const starPositions = new Float32Array(starCount * 3)
        const width = container.clientWidth
        const height = container.clientHeight
        const scene = new THREE.Scene()

        scene.background = new THREE.Color(0x12131b)

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.z = 20

        // Apply the 30-degree tilt to camera "Up" vector
        const tiltAngle = (30 * Math.PI) / 180
        camera.up.set(Math.sin(tiltAngle), Math.cos(tiltAngle), 0).normalize()
        camera.lookAt(0, 0, 0)

        camera.setViewOffset(
            container.clientWidth,
            container.clientHeight,
            -viewOffsetX,
            viewOffsetY,
            container.clientWidth,
            container.clientHeight
        )

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)
        mountRef.current.appendChild(renderer.domElement)

        // --- Post-Processing (Bloom) ---
        const composer = new EffectComposer(renderer)
        composer.addPass(new RenderPass(scene, camera))
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height),
            1.2, // Strength
            0.4, // Radius
            0.85 // Threshold
        )
        composer.addPass(bloomPass)
        bloomPass.threshold = 0.1
        bloomPass.strength = 0.1
        composer.addPass(bloomPass)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.enableZoom = false

        for (let i = 0; i < dotCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / dotCount)
            const theta = Math.sqrt(dotCount * Math.PI) * phi

            const x = baseRadius * Math.cos(theta) * Math.sin(phi)
            const y = baseRadius * Math.sin(theta) * Math.sin(phi)
            const z = baseRadius * Math.cos(phi)

            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z
            originals.set([x, y, z], i * 3)
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const pointsMaterial = new THREE.PointsMaterial({
            color: 0x5328FF,
            size: 0.05,
            transparent: true,
            opacity: 0.8,
        })
        const points = new THREE.Points(geometry, pointsMaterial)
        scene.add(points)

        // --- Starfield Construction ---

        for (let i = 0; i < starCount; i++) {
            // Random positions in a large sphere around the scene
            const r = 400 + Math.random() * 500
            const theta = 2 * Math.PI * Math.random()
            const phi = Math.acos(2 * Math.random() - 1)

            starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            starPositions[i * 3 + 2] = r * Math.cos(phi)
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
        const starMaterial = new THREE.PointsMaterial({
            color: 0xAAAAAA,
            size: 1,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true, // Makes far stars smaller
        })
        const stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)

        // --- Ring Shader Definition ---
        const tubeShaderMat = {
            uniforms: {
                uTime: { value: 0.0 },
                uColor: { value: new THREE.Color(0x5328FF) },
                uTailLength: { value: 0.8 },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uTailLength;
        varying vec2 vUv;
        void main() {
            float progress = mod(vUv.x - uTime, 1.0);
            float alpha = smoothstep(1.0 - uTailLength, 1.0, progress);
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(uColor, alpha);
        }
      `,
        }

        // --- Create Animated Rings ---
        let beams = []
        const createRing = () => {
            const ringRadius = baseRadius + 0.5 + Math.random() * 1.5
            const yHeight = (Math.random() - 0.5) * 0.5
            const pts = []
            for (let i = 0; i <= 64; i++) {
                const t = (i / 64) * Math.PI * 2
                pts.push(
                    new THREE.Vector3(Math.cos(t) * ringRadius, yHeight, Math.sin(t) * ringRadius)
                )
            }
            const curve = new THREE.CatmullRomCurve3(pts)
            curve.closed = true

            const tubeGeo = new THREE.TubeGeometry(curve, 128, 0.04, 8, true)
            const mat = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(tubeShaderMat.uniforms),
                vertexShader: tubeShaderMat.vertexShader,
                fragmentShader: tubeShaderMat.fragmentShader,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })

            const mesh = new THREE.Mesh(tubeGeo, mat)
            mesh.rotation.x = (Math.random() - 0.5) * 0.3
            scene.add(mesh)

            return { mesh, speed: 0.0005 + Math.random() * 0.000008 }
        }

        for (let i = 0; i < 10; i++) beams.push(createRing())

        // --- Interaction ---
        const mouse = new THREE.Vector2(-100, -100)
        const raycaster = new THREE.Raycaster()

        const handleMouseMove = (e) => {
            mouse.x = (e.clientX / container.clientWidth) * 2 - 1
            mouse.y = -(e.clientY / container.clientHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)

        let frameId

        const animate = () => {
            frameId = requestAnimationFrame(animate)

            // stars
            stars.rotation.y += 0.000015
            stars.rotation.x += 0.000005
            const time = Date.now() * 0.001
            starMaterial.opacity = 0.65 + Math.sin(time * 0.5) * 0.25

            // Mouse Interaction logic
            raycaster.setFromCamera(mouse, camera)
            const posAttr = geometry.attributes.position
            const worldV = new THREE.Vector3()

            for (let i = 0; i < dotCount; i++) {
                worldV.set(originals[i * 3], originals[i * 3 + 1], originals[i * 3 + 2])
                worldV.applyMatrix4(points.matrixWorld)

                const dist = raycaster.ray.distanceToPoint(worldV)

                if (dist < interactionRadius) {
                    const normal = worldV.clone().normalize()
                    const move = ((interactionRadius - dist) / interactionRadius) * 0.8
                    posAttr.setXYZ(
                        i,
                        originals[i * 3] + normal.x * move,
                        originals[i * 3 + 1] + normal.y * move,
                        originals[i * 3 + 2] + normal.z * move
                    )
                } else {
                    posAttr.setXYZ(i, originals[i * 3], originals[i * 3 + 1], originals[i * 3 + 2])
                }
            }

            posAttr.needsUpdate = true
            points.rotation.y += rotationSpeed

            beams.forEach((b) => {
                b.mesh.material.uniforms.uTime.value += b.speed
                b.mesh.rotation.y = points.rotation.y
            })

            controls.update()
            composer.render()
        }
        animate()

        const handleResize = () => {
            if (!container) return

            const w = container.clientWidth
            const h = container.clientHeight

            const newViewOffsetX = w * 0.25
            const newViewOffsetY = w * 0.1
            camera.setViewOffset(w, h, -newViewOffsetX, newViewOffsetY, w, h)

            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
            composer.setSize(w, h)
        }

        // Use ResizeObserver to detect container size changes
        const resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(container)
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)

            cancelAnimationFrame(frameId)

            if (mountRef.current) mountRef.current.removeChild(renderer.domElement)

            geometry.dispose()
            pointsMaterial.dispose()
            renderer.dispose()
        }
    }, [])

    return (
        <div
            ref={mountRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                overflow: 'hidden',
            }}
        />
    )
}
