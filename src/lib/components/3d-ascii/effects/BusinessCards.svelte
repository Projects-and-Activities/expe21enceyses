<script lang="ts">
  import { useTask } from '@threlte/core';
  import { Text } from '@threlte/extras';

  let { color = '#7F52BB' } = $props();

  const PARTICLE_COUNT = 60;
  const AREA_WIDTH = 250;
  const DEPTH = 30;

  const VOCAB = [
    'CEO',
    'CTO',
    'HR',
    'CONNECT',
    'LINK',
    'MEET',
    'CHAT',
    'MAIL',
    'WEB',
    'APP',
    'NET',
    'WORK',
    'HIRE',
    '@',
    '#',
    '✉',
    '☎',
    '⚡',
    '➜'
  ];

  const getRandomItem = () => VOCAB[Math.floor(Math.random() * VOCAB.length)];

  const particles = Array.from({ length: PARTICLE_COUNT }).map(() => {
    const item = getRandomItem();
    const isSymbol = item.length === 1;

    return {
      x: (Math.random() - 0.5) * AREA_WIDTH,
      y: (Math.random() - 0.5) * 60,
      z: -5 - Math.random() * DEPTH,

      // Falling speed (Gravity)
      speed: (isSymbol ? 0.08 : 0.04) + Math.random() * 0.05,

      // Tumbling speeds (Cards rotate on multiple axes)
      rotationSpeedX: (Math.random() - 0.5) * 2,
      rotationSpeedY: (Math.random() - 0.5) * 1,

      text: item,
      scale: isSymbol ? 1.5 + Math.random() : 0.8 + Math.random() * 0.5,
      opacity: isSymbol ? 0.4 + Math.random() * 0.4 : 0.2 + Math.random() * 0.3,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: undefined as any
    };
  });

  useTask((delta) => {
    particles.forEach((p) => {
      p.y -= p.speed * (delta * 60);

      // Adds a gentle left/right drift based on their fall position
      p.x += Math.sin(p.y * 0.2) * 0.02;

      if (p.ref) {
        // Tumble effect (Falling paper rotates on X and Y)
        p.ref.rotation.x += p.rotationSpeedX * delta;
        p.ref.rotation.y += p.rotationSpeedY * delta;
      }

      // Reset when hitting bottom
      if (p.y < -35) {
        p.y = 35; // Send back to top
        p.x = (Math.random() - 0.5) * AREA_WIDTH;
        p.z = -5 - Math.random() * DEPTH;

        // Regenerate content
        const newItem = getRandomItem();
        p.text = newItem;
        const isSymbol = newItem.length === 1;
        p.scale = isSymbol ? 1.5 + Math.random() : 0.8 + Math.random() * 0.5;
      }

      if (p.ref) {
        p.ref.position.set(p.x, p.y, p.z);
        p.ref.text = p.text;
      }
    });
  });
</script>

{#each particles as p, i (i)}
  <Text
    text={p.text}
    position={[p.x, p.y, p.z]}
    fontSize={p.scale}
    {color}
    fillOpacity={p.opacity}
    bind:ref={p.ref}
  />
{/each}
