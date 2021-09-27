<template>
  <div class="header">

    <router-link :to="{ name: 'home' }">
      <div class="title">
        <h2>그림<span>일기</span></h2>
        <p><span>Picture</span>Diary</p>
      </div>
    </router-link>

    <div class="search">
      <input type="search">
      <button><i class="far fa-search"></i></button>
    </div>
    <nav>
      <ul class="catalog">
        <router-link to="/home" tag="li">홈</router-link>
        <router-link to="/about" tag="li">내정보</router-link>
        <router-link to="/articles" tag="li">일기 보기</router-link>
      </ul>
    </nav>

  </div>
</template>

<script>
</script>

<style scoped>
h2 {
  position: relative;
  left: 5px;
  color: #c5c5c5;
  letter-spacing: 3px;
  font-size:28px;
  font-weight:bold;
}

h2 > span {
  margin-left: 15px;
  color:#c2c4ff;
}

p {
  color: #c5c5c5;
  text-transform: uppercase;
  font-size:11px;
  letter-spacing: 3px;
  margin-top:10px;
}

p > span {
  margin-right: 13px;
  color:#c2c4ff;
}

.header {
  display: flex;
  flex-direction:row;
  border-top:7px solid #c2c4ff;
  padding:30px 30px 33px;
  align-items: center;
}

.header .title {  flex-shrink: 2; flex-grow: 1;  }
.header .search {  flex-shrink: 1; margin-top:3px; }
.header .search input { border: 0 !important; padding: 0px 0 5px !important; font-size:16px !important; width:150px; }
.header .search button { border: 0 !important; padding: 0px 0 5px !important; margin-left:5px; position: relative; top:1px; background: transparent !important;}
.header .search button i { font-size:24px; color: #c5c5c5; }

</style>