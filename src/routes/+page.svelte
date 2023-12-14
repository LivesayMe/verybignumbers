<script>
	import LossyInt from '$lib/lossyInt.js';
    import { onMount } from 'svelte';

	let score = new LossyInt(0);
	let increment = new LossyInt(1);

	onMount(() => {
		
		// let interval = setInterval(() => {
		// 	score = score.add(increment);
		// }, 1000);
		// return () => clearInterval(interval);
	});

	function test() {
		let test1 = new LossyInt(999999);
		let test2 = new LossyInt(1);
		test1.add(test2);
		console.log(test1);
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<div class="flex justify-center space-x-5">
			<span class="text-6xl font-mono text-center">Score: </span>
			<pre class="text-6xl font-mono text-center">{score}</pre>
		</div>	
		<pre class="text-6xl font-mono text-center">{increment}</pre>
		<div class="flex justify-center space-x-5">
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => score = score.add(increment)}>Increment</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => score = score.multiply(increment)}>Multiply</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => score = score.exp(increment)}>Exponentiate</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => score = score.tetrate(increment)}>Tetrate</button>
		</div>
		<div class="flex justify-center space-x-5">
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(1)}>+1</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(10)}>+10</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(100)}>+100</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(1000)}>+1000</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(10000)}>+10000</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(100000)}>+100000</button>
		</div>
		<div class="flex justify-center space-x-5">
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(-1)}>-1</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(-10)}>-10</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(-100)}>-100</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(-1000)}>-1000</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(-10000)}>-10000</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => increment = increment.add(-100000)}>-100000</button>
		</div>
	</div>
</div>
