export function scrollToSection(id: string): void {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
}
