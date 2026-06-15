interface VantaOptions {
  el: HTMLElement;
  THREE?: unknown;
  [key: string]: unknown;
}

declare module "vanta/dist/vanta.birds.min" {
  const BIRDS: (opts: VantaOptions) => { destroy: () => void };
  export default BIRDS;
}
declare module "vanta/dist/vanta.clouds.min" {
  const CLOUDS: (opts: VantaOptions) => { destroy: () => void };
  export default CLOUDS;
}