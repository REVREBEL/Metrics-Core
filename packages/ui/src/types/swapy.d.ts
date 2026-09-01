declare module "swapy" {
  interface Swapy {}
  interface Config {}
  export function createSwapy(container: HTMLElement, config?: Partial<Config>): Swapy;
}
