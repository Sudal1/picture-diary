<template>
  <div class="header">
    <div class="headerWrap">

      <h2 class="title"><i class="xi-layout-full"></i><span>Sense</span> diary</h2>

      <nav>
        <ul>
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          /
          <li><router-link :to="{ name: 'diaries' }">Diary</router-link></li>
        </ul>
      </nav>

      <div class="user">
        <router-link to='/login' v-show="!userId"><i class="material-icons">person</i></router-link>
        <span v-show="userId">Welcome</span>
        <div class="drop" v-show="userId">
          <button class="btn">{{ userId }}</button>
          <div class="menu">
            <ul>
              <li><router-link to="/account">Account</router-link></li>
              <li @click="actionLogout">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from 'vuex'
import EventBus from '../common/EventBus'

export default {
  setup() {
    const store = useStore()
    const userId = computed(() => store.state.user.userId)

    onMounted(() => {
      EventBus.on('logout', () => store.dispatch('logout'))
    })
    
    onBeforeUnmount(() => {
      EventBus.remove('logout')
    })

    const actionLogout = () => {
      store.dispatch('logout')
    }

    return { userId, actionLogout }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.header {
  display: grid;
  justify-content: center;
  background: #fff;
  z-index: 1;
}

.headerWrap {
  display: grid;
  z-index: 2;
  text-transform: uppercase;
  width: 1200px;
  grid-template-columns: repeat(3, 1fr);
  color: var(--primary);
  height: 80px;
  align-items: center;

  h2 {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 0.1em;
    flex-basis: 400px;

    i {
      position: relative;
      top: 1px;
      margin-right: 8px;
      color: var(--point);
    }

    span {
      color: var(--point);
    }
  }

  nav {
    display: flex;
    justify-content: center;

    ul {
      list-style: none;
    }

    li {
      margin: 0 40px;
      display: inline-block;

      a {
        font-weight: 500;
        color: var(--primary);
        text-decoration: none;
        font-size: 14px;
        letter-spacing: 0.1em;
      }
    }
  }


  .user {
    font-size: 14px;
    font-weight: 600;
    display: grid;
    justify-content: end;
    letter-spacing: 0.1em;
    color: var(--primary);
    grid-template-columns: repeat(2, minmax(auto, auto));
    z-index: 100;

    i {
      font-size: 26px;
    }

    span {
      color: var(--point);
      margin-right: 15px;
    }

    a {
      color: var(--primary);
    }

    .drop {
      position: relative;
      z-index: 300;
      
      .btn {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-align: left;
        cursor: pointer;
        border: 0;
        color: var(--primary);
        z-index: 500;
      }

      .menu {
        visibility: hidden;
        opacity: 0;
        transition-property: opacity, visibility;
        transition-duration: .5s;
        position: absolute;
        padding-top: 32px;
        right: 0;
        font-weight: 600;
        color: var(--primary);
        font-size: 13px;
      }

      .menu ul {
        display: inline;
      }

      .menu li {
        display: grid;
        justify-content: center;
        padding: 15px 30px;
        background: #fff;
        border-top: 1px solid #ccc;

        button {
          text-transform: uppercase;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 0.1em;
          border: 0;
        }
      }

      .menu li:nth-child(1) {
        border-top: 5px solid;
        border-color: var(--point);
      }

    }

    .drop:hover .menu {
      visibility: visible;
      opacity: 1;
      transition-duration: .5s;
    }
  }

}


</style>