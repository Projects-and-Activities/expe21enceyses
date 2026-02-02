<script lang="ts">
  import './layout.css';
  import { ModeWatcher } from 'mode-watcher';

  import favicon from '$lib/assets/favicon.svg';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar />
<ModeWatcher />
{@render children()}
<Footer />
