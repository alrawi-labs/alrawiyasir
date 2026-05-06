let springRAF: number | null = null;

/**
 * Gerçek fizik tabanlı yay simülasyonu ile scroll.
 * Stiffness düşük + damping düşük = elastik his.
 */
export const springScrollTo = (targetY: number) => {
  if (springRAF !== null) cancelAnimationFrame(springRAF);

  const stiffness = 0.045;
  const damping   = 0.62;
  const mass      = 1;

  let position = window.scrollY;
  let velocity = 0;
  let lastTime: number | null = null;

  const step = (now: number) => {
    const dt     = lastTime ? Math.min((now - lastTime) / 16, 4) : 1;
    lastTime     = now;

    const force  = (targetY - position) * stiffness;
    const damper = velocity * damping;
    const accel  = (force - damper) / mass;

    velocity += accel * dt;
    position += velocity * dt;

    window.scrollTo(0, position);

    if (Math.abs(targetY - position) < 0.5 && Math.abs(velocity) < 0.5) {
      window.scrollTo(0, targetY);
      springRAF = null;
      return;
    }

    springRAF = requestAnimationFrame(step);
  };

  springRAF = requestAnimationFrame(step);
};