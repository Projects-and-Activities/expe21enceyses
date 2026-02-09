<script lang="ts">
  import { useTask } from '@threlte/core';
  import { Text } from '@threlte/extras';

  let { color = '#7F52BB' } = $props();

  const PARTICLE_COUNT = 50;
  const AREA_WIDTH = 100;
  const DEPTH = 30;

  const VOCAB = [
    '+',
    'HIRED',
    'INTERN',
    'GROWTH',
    'FUTURE',
    'DEV',
    'OFFER',
    'JOB',
    'PRACTICUM',
    'APPLY',
    'GOAL',
    '↑',
    '★',
    '●'
  ];

  const getRandomItem = () => VOCAB[Math.floor(Math.random() * VOCAB.length)];

  const particles = Array.from({ length: PARTICLE_COUNT }).map(() => {
    const item = getRandomItem();
    const isSymbol = item.length === 1;

    return {
      x: (Math.random() - 0.5) * AREA_WIDTH,
      y: (Math.random() - 0.5) * 60,
      z: -5 - Math.random() * DEPTH,

      speed: (isSymbol ? 0.05 : 0.02) + Math.random() * 0.05,
      rotationSpeed: (Math.random() - 0.5) * 1,

      text: item,
      // Symbols are larger, words are smaller/subtler
      scale: isSymbol ? 1.5 + Math.random() : 0.8 + Math.random() * 0.5,
      opacity: isSymbol ? 0.3 + Math.random() * 0.4 : 0.15 + Math.random() * 0.2,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: undefined as any
    };
  });

  useTask((delta) => {
    particles.forEach((p) => {
      // Float up (Career Ladder)
      p.y += p.speed * (delta * 60);

      if (p.ref) {
        p.ref.rotation.y += p.rotationSpeed * delta;
      }

      // Reset when hitting top
      if (p.y > 35) {
        p.y = -35;
        p.x = (Math.random() - 0.5) * AREA_WIDTH;

        // Regenerate content on reset for variety
        const newItem = getRandomItem();
        p.text = newItem;
        const isSymbol = newItem.length === 1;
        p.scale = isSymbol ? 1.5 + Math.random() : 0.8 + Math.random() * 0.5;
        p.opacity = isSymbol ? 0.3 + Math.random() * 0.4 : 0.15 + Math.random() * 0.2;
      }

      if (p.ref) {
        p.ref.position.set(p.x, p.y, p.z);
        p.ref.text = p.text; // Update text in case it changed on reset
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
    anchorX="center"
    anchorY="middle"
    bind:ref={p.ref}
  />
{/each}
