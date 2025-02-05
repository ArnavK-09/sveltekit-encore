<script lang="ts">
  import { client } from "$lib/getClient";

  let inputValue = ""; // State for the input field
  let message = ""; // State to hold the API response message
  let loading = false; // State to track loading state

  const doThis = async () => {
    if (!inputValue.trim()) {
      message = "Please enter a value";
      return;
    }

    try {
      loading = true;
      const res = await client.hello.get(inputValue);
      message = res.message; // Update the state with the API response
    } catch (error) {
      message = "Failed to fetch message"; // Handle errors gracefully
    } finally {
      loading = false;
    }
  };
</script>

<!-- Global Styles -->
<svelte:head>
  <style>
    /* Centered Page Layout */
    body {
      margin: 0;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background-color: #121212;
      color: #e0e0e0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      transition:
        background-color 0.3s ease,
        color 0.3s ease;
    }

    .container {
      text-align: center;
      max-width: 400px;
      padding: 2rem;
      border-radius: 1rem;
      background-color: #1e1e1e;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    /* Input Styling */
    .input {
      width: 20vw;
      padding: 1rem;
      font-size: 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #2b2b2b;
      color: #ffffff;
      margin-bottom: 1rem;
      transition:
        background-color 0.3s ease,
        transform 0.3s ease;
    }

    .input:focus {
      outline: none;
      background-color: #3b3b3b;
      transform: scale(1.02);
    }

    /* Button Styling */
    .btn {
      display: inline-block;
      width: 20vw;
      padding: 1rem;
      font-size: 1rem;
      font-weight: bold;
      color: #ffffff;
      background-color: #673ab7;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition:
        background-color 0.3s ease,
        transform 0.3s ease;
    }

    .btn:hover {
      background-color: #512da8;
      transform: scale(1.05);
    }

    /* Message Styling */
    .message {
      margin-top: 1rem;
      font-size: 1.2rem;
      color: #bb86fc;
      word-wrap: break-word;
    }

    /* Loading Spinner */
    .loading {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      border: 3px solid #ffffff;
      border-top-color: #673ab7;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .container {
        padding: 1.5rem;
      }

      .input,
      .btn {
        font-size: 0.9rem;
        padding: 0.8rem;
      }

      .message {
        font-size: 1rem;
      }
    }
  </style>
</svelte:head>

<!-- UI Components -->
<div class="container">
  <h1 style="margin-bottom: 1rem;">Hello World</h1>
  <p style="margin-bottom: 1.5rem;">
    Enter a value and click the button to get a response.
  </p>

  <!-- Input Field -->
  <input
    type="text"
    class="input"
    bind:value={inputValue}
    placeholder="Enter something..."
  />

  <!-- Button -->
  <button class="btn" on:click={doThis}>
    {#if loading}
      <span class="loading"></span>
      Fetching...
    {:else}
      DO THIS
    {/if}
  </button>

  <!-- Response Message -->
  {#if message}
    <div class="message">{message}</div>
  {/if}
</div>
