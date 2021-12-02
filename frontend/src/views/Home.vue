<template>
  <div class="home">
    <h2>Write Your day & Get Content for you</h2>
    <button>get start</button>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.home {
  letter-spacing: 1px;
  text-align: center;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  height:92vh;

  h2 {
    font-size:2.5rem;
    font-weight: 400;
    color: var(--primary);
    margin-bottom:3rem;
  }

  button {
    padding: 1em 1.2em 1em 1.3em;
    background: var(--point);
    color:#fff;
    border:0;
    cursor: pointer;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size:1rem;
    font-weight:500;
  }
}
</style>