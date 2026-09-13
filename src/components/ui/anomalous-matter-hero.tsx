import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m *= m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
  void main() {
    float displacement = snoise(position * 1.8 + uTime * 0.34) * 0.18;
    vec3 displaced = position + normal * displacement;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(displaced, 1.0)).xyz;
    gl_Position = projectionMatrix * vec4(vPosition, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLightPosition;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDirection = normalize(uLightPosition - vPosition);
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float fresnel = pow(1.0 - abs(dot(normal, normalize(-vPosition))), 2.2);
    gl_FragColor = vec4(uColor * (0.28 + diffuse * 0.5 + fresnel * 0.85), 0.76);
  }
`;

function readThemeColor(element: HTMLElement) {
  const value = getComputedStyle(element).getPropertyValue("--anomaly-color").trim();
  const [red = 171, green = 99, blue = 255] = value.split(" ").map(Number);
  return new THREE.Color(red / 255, green / 255, blue / 255);
}

export function GenerativeArtScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 20);
    camera.position.z = 3.15;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.16, 5);
    const uniforms = {
      uTime: { value: 0 },
      uLightPosition: { value: new THREE.Vector3(0.8, 0.6, 2.5) },
      uColor: { value: readThemeColor(mount) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      wireframe: true,
      transparent: true,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.z = -0.18;
    scene.add(mesh);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = new THREE.Vector2(0.25, 0.15);
    let frameId = 0;
    let elapsed = 0;
    let previousTime = performance.now();
    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      if (!reduceMotion.matches) {
        elapsed += delta;
        mesh.rotation.y += delta * 0.1;
        mesh.rotation.x += delta * 0.035;
      }
      uniforms.uTime.value = elapsed;
      uniforms.uLightPosition.value.set(pointer.x * 2.2, pointer.y * 1.6, 2.5);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.set(
        ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1,
        -(((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 - 1),
      );
    };
    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => {
      uniforms.uColor.value.copy(readThemeColor(mount));
    });
    resizeObserver.observe(mount);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    resize();
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}

export function AnomalousMatterHero({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <GenerativeArtScene className="absolute top-[-6rem] right-[-14rem] h-[42rem] w-[42rem] opacity-60 sm:right-[-8rem] lg:right-[-2rem]" />
    </div>
  );
}