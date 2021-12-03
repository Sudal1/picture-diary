<template>
  <div class="home">
    <h2>Write Your day & Get Content for you</h2>
    <router-link :to="{ name: 'editor' }">
      <button>Get Start</button>
    </router-link>

    <h3>What is Sense Diary?</h3>

    <div class="homeInfo">
      <div class="intro">
        <h4><span><i class="material-icons">assignment</i>Introduce</span></h4>
        <p>Our program recommends YouTube content with the sentiments from the contents of the diary</p>
      </div>
      <div class="intro">
        <h4><span><i class="material-icons">lightbulb</i>Functional Core</span></h4>
        <p>Whenever write a diary, you can get<br>sentiments and recommended YouTube videos</p>
      </div>
      <div class="intro">
        <h4><span><i class="material-icons">star</i>Purpose</span></h4>
        <p>To get motivated to keep a diary,<br>watch our recommended YouTube videos</p>
      </div>
    </div>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92vh;

  h2 {
    font-size: 2.8rem;
    font-weight: 500;
    color: var(--primary);
    margin-bottom: 1.25em;
    letter-spacing: 0.1em;
  }

  h3 {
    font-size: 2rem;
    font-weight: 400;
    color: var(--primary);
    letter-spacing: 0.05em;
    border-top: 1px solid #cecece;
    width: 80%;
    margin: 3em 20em 2em;
    padding-top: 3em;
    text-align: center;
    font-weight: 400;
  }

  button {
    padding: 1em 1.2em 1em 1.3em;
    background: var(--point);
    color: #fff;
    border: 0;
    cursor: pointer;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
  }

  .homeInfo {
    display: flex;
    flex-direction: row;
    justify-content: center;

    div {
      text-align: center;
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 0 2em;
    }

    h4 {
      font-weight: 600;
      font-size: 18px;
    }

    span {
      border-bottom: 2px solid var(--point);
      color: var(--primary);
      padding: 10px 0;

      i {
        position: relative;
        top: 7px;
        margin-right: 5px;
        margin-left: -5px;
        color: var(--point);
      }

    }


    p {
      margin-top: 3em;
      color: #777;
      font-family: 'Noto Sans KR', sans-serif !important;
      font-size: 16px;
      letter-spacing: 0.05rem;
      font-weight: 400;
      line-height:1.6;
    }

  }
}
</style>