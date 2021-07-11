function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      gameStart: true,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    specialAttackTime() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(val) {
      if (val <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
        this.gameStart = false;
      } else if (val <= 0) {
        this.winner = "monster";
        this.gameStart = false;
      }
    },
    monsterHealth(val) {
      if (val <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
        this.gameStart = false;
      } else if (val <= 0) {
        this.winner = "player";
        this.gameStart = false;
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogger("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(2, 44);
      this.playerHealth -= attackValue;
      this.addLogger("monster", "attack", attackValue);
    },
    specialAttack() {
      const specialBtn = document.getElementById("specialBtn");
      const attackValue = getRandomValue(40, 100);
      this.monsterHealth -= attackValue;
      this.addLogger("player", "special-attack", attackValue);
      this.attackPlayer();
    },
    heal() {
      const healBtn = document.getElementById("healBtn");
      const healValue = getRandomValue(10, 80);

      if (this.playerHealth === 100) {
        return true;
      } else if (this.playerHealth < 100) {
        if (this.playerHealth + healValue >= 100) {
          this.playerHealth = 100;
        } else if (this.playerHealth + healValue < 100) {
          this.playerHealth += healValue;
        }
      }
      this.addLogger("player", "heal", healValue);
      healBtn.disabled = true;
      this.attackPlayer();
    },

    playAgain() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.gameStart = true;
      this.showLog = true;
      this.logMessages = [];
    },

    surrender() {
      this.playerHealth = 0;
      this.winner = "monster";
      this.logMessages = [];
    },

    addLogger(who, what, value) {
      this.logMessages.unshift({
        who,
        what,
        value,
      });
    },
  },
});

app.mount("#game");

const data = { msg: "hello", msgNum: "123" };

const handler = {
  set(target, key, value) {
    if (key === "msgNum") {
      target.msgNum = value + "1111";
    }

    console.log(target);
    console.log(key);
    console.log(value);

    // {msg: "hello"}
    // msg
    // Heeeellllllooooo
  },
};
const proxy = new Proxy(data, handler);

proxy.msgNum = "Heo";
console.log(proxy.msgNum);
