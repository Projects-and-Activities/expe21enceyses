<script lang="ts">
  import './layout.css';
  import { ModeWatcher } from 'mode-watcher';

  import favicon from '$lib/assets/favicon.png';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { Toaster } from '$lib/components/ui/sonner';

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /><title>EXPE21ENCE YSES</title></svelte:head>

<Navbar />
<ModeWatcher />
<Toaster />
{@render children()}
<Footer />
