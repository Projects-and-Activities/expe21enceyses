<script lang="ts">
  import { cn } from '$lib/utils';

  let { children, class: className = '', ...restProps } = $props();
</script>

<div
  class={cn('bg-background/40 backdrop-blur-sm ', className)}
  style="
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25) inset; 
		overflow: hidden; 
		border-radius: 20px; 
		outline: 0.5px #494949 solid; 
		outline-offset: -1px;
	"
  {...restProps}
>
  {@render children()}
</div>
