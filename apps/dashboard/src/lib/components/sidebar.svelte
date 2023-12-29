<script>
  let isOpen = true;
  const toggleSidebar = () => {
    isOpen = !isOpen;
  };
</script>

<div class="flex h-screen bg-gray-200">
  <div class={`bg-white w-64 absolute sm:relative  shadow p-5 ${isOpen ? 'translate-x-0 ease-out transition-medium' : '-translate-x-full ease-in transition-medium'}`}>
    <button on:click={toggleSidebar} class="mb-5">Toggle Sidebar</button>
  </div>
  <div class="w-full ml-64 sm:ml-0">
    <!-- Other content -->
  </div>
</div>
