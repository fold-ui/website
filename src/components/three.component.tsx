import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'

type ThreeComponentProps = {
    alignRight?: boolean
    variant?: 'planet' | 'sun'
}

export const ThreeComponent = ({ alignRight = false, variant = 'planet' }: ThreeComponentProps) => {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mountRef.current) return

        const isSun = variant === 'sun'
        // --- Dot Globe Construction ---
        const dotCount = 1000
        const baseRadius = 11
        const rotationSpeed = isSun ? 0.00025 : 0.0005
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(dotCount * 3)
        const originals = new Float32Array(dotCount * 3)
        const container = mountRef.current
        const interactionRadius = baseRadius * 0.8
        const repelStrength = baseRadius * 0.7
        const starCount = isSun ? 100 : 2000
        const starGeometry = new THREE.BufferGeometry()
        const starPositions = new Float32Array(starCount * 3)
        const starCoordinates = new Float32Array(starCount * 2)
        const starDepths = new Float32Array(starCount)
        const width = Math.max(container.clientWidth, 1)
        const height = Math.max(container.clientHeight, 1)
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        // Keep the planet beside the copy on desktop and above it on narrow screens.
        const fitCamera = () => {
            const halfFov = THREE.MathUtils.degToRad(camera.fov / 2)
            const w = Math.max(container.clientWidth, 1)
            const h = Math.max(container.clientHeight, 1)
            // Extend the starfield into the fade without enlarging or moving the planet.
            const styles = getComputedStyle(container)
            const fadeHeight = parseFloat(styles.getPropertyValue('--hero-space-fade-height')) || 0
            const fadeOffset = parseFloat(styles.getPropertyValue('--hero-space-fade-offset')) || 0
            const sceneHeight = Math.max(h - fadeHeight - fadeOffset, 1)
            camera.aspect = w / sceneHeight
            const wideHero = alignRight && w > 760
            camera.position.z = Math.max(wideHero ? 18 : 22, (wideHero ? 13.5 : 14) / (Math.tan(halfFov) * Math.min(camera.aspect, 1)))
            if (wideHero) camera.setViewOffset(w, sceneHeight, -w * 0.27, -sceneHeight * 0.12, w, h)
            else if (alignRight) {
                const diameter = Math.min(w * 0.85, 340)
                camera.position.z = baseRadius * Math.sqrt(1 + (sceneHeight / (diameter * Math.tan(halfFov))) ** 2)
                camera.setViewOffset(w, sceneHeight, -w * 0.16, sceneHeight / 2 - 250, w, h)
            }
            else camera.clearViewOffset()
            camera.lookAt(0, 0, 0)
            camera.updateProjectionMatrix()
        }

        // Apply the 30-degree tilt to camera "Up" vector
        const tiltAngle = (30 * Math.PI) / 180
        camera.up.set(Math.sin(tiltAngle), Math.cos(tiltAngle), 0).normalize()
        fitCamera()

        let renderer: THREE.WebGLRenderer
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        } catch (error) {
            geometry.dispose()
            starGeometry.dispose()
            console.warn('The hero illustration needs WebGL to render.', error)
            return
        }

        renderer.setClearColor(0x000000, 0)
        renderer.toneMapping = THREE.LinearToneMapping
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(width, height)
        container.appendChild(renderer.domElement)

        // Keep the nighttime bloom and render the sun's translucent peach halo
        // directly, so it blends naturally into the light page background.
        const composer = isSun ? null : new EffectComposer(renderer)
        const bloomPass = isSun ? null : new UnrealBloomPass(new THREE.Vector2(width, height), 0.1, 0.2, 0.08)
        const outputPass = isSun ? null : new OutputPass()
        if (composer) {
            composer.addPass(new RenderPass(scene, camera, null, 0x000000, 0))
            composer.addPass(bloomPass)
            composer.addPass(outputPass)
        }
        const renderScene = () => {
            if (composer) composer.render()
            else renderer.render(scene, camera)
        }

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
            color: isSun ? 0x34303D : 0x5328ff,
            size: isSun ? 0.075 : 0.05,
            transparent: true,
            opacity: isSun ? 0.45 : 0.8,
        })
        const points = new THREE.Points(geometry, pointsMaterial)
        scene.add(points)

        // A transparent, softly tinted corona gives the daytime sun warmth
        // while leaving the page background visible through it.
        const haloGeometry = isSun ? new THREE.PlaneGeometry(baseRadius * 3.4, baseRadius * 3.4) : null
        const haloMaterial = isSun ? new THREE.ShaderMaterial({
            uniforms: {
                uInnerColor: { value: new THREE.Color(0xffe5bf) },
                uOuterColor: { value: new THREE.Color(0xffdfd2) },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uInnerColor;
                uniform vec3 uOuterColor;
                varying vec2 vUv;
                void main() {
                    float radius = length(vUv - 0.5) * 2.0;
                    float core = 0.06 * (1.0 - smoothstep(0.0, 0.72, radius));
                    float corona = 0.08 * exp(-pow((radius - 0.58) / 0.2, 2.0));
                    float alpha = (core + corona) * (1.0 - smoothstep(0.78, 1.0, radius));
                    vec3 color = mix(uInnerColor, uOuterColor, smoothstep(0.2, 0.9, radius));
                    gl_FragColor = vec4(color, alpha);
                    #include <colorspace_fragment>
                }
            `,
            transparent: true,
            depthWrite: false,
            depthTest: false,
        }) : null

        if (isSun) {
            const halo = new THREE.Mesh(haloGeometry, haloMaterial)
            halo.quaternion.copy(camera.quaternion)
            halo.renderOrder = -1
            scene.add(halo)
        }

        // --- Starfield Construction ---

        for (let i = 0; i < starCount; i++) {
            starCoordinates[i * 2] = Math.random()
            starCoordinates[i * 2 + 1] = Math.random()
            starDepths[i] = 400 + Math.random() * 500
        }

        // Keep the starfield aligned to the screen so every star drifts southwest.
        const layoutStars = () => {
            const halfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
            for (let i = 0; i < starCount; i++) {
                const depth = starDepths[i]
                const halfHeight = depth * halfFov * 1.7
                starPositions[i * 3] = (starCoordinates[i * 2] * 2 - 1) * halfHeight * camera.aspect
                starPositions[i * 3 + 1] = (starCoordinates[i * 2 + 1] * 2 - 1) * halfHeight
                starPositions[i * 3 + 2] = -depth
            }
            starGeometry.attributes.position.needsUpdate = true
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
        layoutStars()
        const starMaterial = new THREE.PointsMaterial({
            color: isSun ? 0x000000 : 0x34303D,
            size: 2,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true, // Makes far stars smaller
        })
        const stars = new THREE.Points(starGeometry, starMaterial)
        stars.position.copy(camera.position)
        stars.quaternion.copy(camera.quaternion)
        scene.add(stars)

        // --- Ring Shader Definition ---
        const tubeShaderMat = {
            uniforms: {
                uTime: { value: 0.0 },
                uColor: { value: new THREE.Color(isSun ? 0x34303D : 0x5328ff) },
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
            // Convert the linear ring colour to the renderer's display colour space.
            #include <colorspace_fragment>
        }
      `,
        }

        // --- Create Animated Rings ---
        const beams = []
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
                blending: isSun ? THREE.NormalBlending : THREE.AdditiveBlending,
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
        const interactionSphere = new THREE.Sphere(new THREE.Vector3(), baseRadius)
        const hitPoint = new THREE.Vector3()
        const localHit = new THREE.Vector3()
        const inversePointsMatrix = new THREE.Matrix4()

        const handleMouseMove = (e: MouseEvent) => {
            const bounds = container.getBoundingClientRect()
            mouse.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1
            mouse.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1
        }

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        let frameId = 0
        let previousTime = 0

        const animate = (now: number) => {
            const frameScale = previousTime ? Math.min((now - previousTime) / (1000 / 60), 2) : 1
            previousTime = now

            // Move the background stars from the upper right toward the lower left.
            for (let i = 0; i < starCount; i++) {
                starCoordinates[i * 2] = (starCoordinates[i * 2] - 0.0002 * frameScale + 1) % 1
                starCoordinates[i * 2 + 1] = (starCoordinates[i * 2 + 1] - 0.000135 * frameScale + 1) % 1
            }
            layoutStars()
            const time = now * 0.001
            starMaterial.opacity = 0.65 + Math.sin(time * 0.5) * 0.25

            // Push the nearby surface dots away from the cursor and ease them back.
            raycaster.setFromCamera(mouse, camera)
            points.updateMatrixWorld()
            const isOverPlanet = raycaster.ray.intersectSphere(interactionSphere, hitPoint) !== null
            if (isOverPlanet) {
                inversePointsMatrix.copy(points.matrixWorld).invert()
                localHit.copy(hitPoint).applyMatrix4(inversePointsMatrix)
            }
            const posAttr = geometry.attributes.position

            for (let i = 0; i < dotCount; i++) {
                const index = i * 3
                const x = originals[index]
                const y = originals[index + 1]
                const z = originals[index + 2]
                let targetX = x
                let targetY = y
                let targetZ = z
                let responseSpeed = 0.032

                if (isOverPlanet) {
                    const dx = x - localHit.x
                    const dy = y - localHit.y
                    const dz = z - localHit.z
                    const distance = Math.hypot(dx, dy, dz)

                    if (distance < interactionRadius) {
                        responseSpeed = 0.105
                        const falloff = Math.pow(1 - distance / interactionRadius, 1.5)
                        // Remove the radial part so dots spread across the globe's surface.
                        const radialPart = (dx * x + dy * y + dz * z) / (baseRadius * baseRadius)
                        const tangentX = dx - radialPart * x
                        const tangentY = dy - radialPart * y
                        const tangentZ = dz - radialPart * z
                        const tangentLength = Math.hypot(tangentX, tangentY, tangentZ) || 1
                        const push = repelStrength * falloff / tangentLength
                        const lift = 1.5 * falloff / baseRadius
                        targetX += tangentX * push + x * lift
                        targetY += tangentY * push + y * lift
                        targetZ += tangentZ * push + z * lift
                    }
                }

                const response = 1 - Math.exp(-responseSpeed * frameScale)
                posAttr.setXYZ(
                    i,
                    positions[index] += (targetX - positions[index]) * response,
                    positions[index + 1] += (targetY - positions[index + 1]) * response,
                    positions[index + 2] += (targetZ - positions[index + 2]) * response
                )
            }

            posAttr.needsUpdate = true
            points.rotation.y += rotationSpeed * frameScale

            beams.forEach((b) => {
                b.mesh.material.uniforms.uTime.value += b.speed * frameScale
                b.mesh.rotation.y = points.rotation.y
            })

            renderScene()
            if (!reducedMotion.matches && !document.hidden) frameId = requestAnimationFrame(animate)
        }

        const updateAnimation = () => {
            cancelAnimationFrame(frameId)
            previousTime = 0
            if (!document.hidden) animate(performance.now())
        }
        window.addEventListener('mousemove', handleMouseMove)
        reducedMotion.addEventListener('change', updateAnimation)
        document.addEventListener('visibilitychange', updateAnimation)
        updateAnimation()

        const handleResize = () => {
            const w = container.clientWidth
            const h = container.clientHeight
            if (!w || !h) return

            camera.aspect = w / h
            fitCamera()
            stars.position.copy(camera.position)
            stars.quaternion.copy(camera.quaternion)
            layoutStars()
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setSize(w, h)
            composer?.setPixelRatio(renderer.getPixelRatio())
            composer?.setSize(w, h)
            renderScene()
        }

        // Use ResizeObserver to detect container size changes
        const resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(container)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            reducedMotion.removeEventListener('change', updateAnimation)
            document.removeEventListener('visibilitychange', updateAnimation)
            resizeObserver.disconnect()
            cancelAnimationFrame(frameId)

            renderer.domElement.remove()

            geometry.dispose()
            pointsMaterial.dispose()
            haloGeometry?.dispose()
            haloMaterial?.dispose()
            starGeometry.dispose()
            starMaterial.dispose()
            beams.forEach(({ mesh }) => {
                mesh.geometry.dispose()
                mesh.material.dispose()
            })
            bloomPass?.dispose()
            outputPass?.dispose()
            composer?.dispose()
            renderer.dispose()
            renderer.forceContextLoss()
        }
    }, [alignRight, variant])

    return (
        <div
            ref={mountRef}
            aria-hidden="true"
            className="hero-planet"
            data-celestial-body={variant}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                overflow: 'hidden',
            }}
        />
    )
}
