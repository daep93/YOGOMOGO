<template>
  <div class="random__board__wrapper">
    <div class="random__board__header"></div>
    <div class="random__border__section">
      <transition-group name="reandom__cell" tag="div" class="random__container">
        <div
          v-for="cell in cells"
          :key="cell.id"
          :data-value="cell.id"
          @click="selectedId(cell.id)"
          class="random__cell"
        >
          <p>{{ words[cell.number] }}</p>
        </div>
      </transition-group>

      <div class="modal__card">
        <div class="modal__card__wrapper">
          <div class="modal__exit">별로</div>
          <div class="modal__header">
            <div v-show="selectedStore == '꽝'">
              <img src="../../assets/image/unicorn.png" alt="" />
            </div>
            <div v-show="selectedStore != '꽝'">
              <img :src="selectedImage" alt="" />
            </div>
          </div>
          <div class="modal__section">{{ selectedStore }}</div>
          <div class="move__to__detail" @click="moveDetail">
            상세 페이지로 이동
          </div>
        </div>
      </div>
    </div>
    <div class="gray__background">
      <fire-works></fire-works>
    </div>
    <div class="random__btn__conatiner">
      <div class="random__btn" @click="shuffle">섞어섞어</div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/group/RandomBoard.css';
import { init } from '@/assets/js/group/RandomBoard';
import FireWorks from '@/components/group/Fireworks';
export default {
  data() {
    return {
      cells: Array.apply(null, { length: 9 }).map(function(_, index) {
        return {
          id: index,
          number: index,
        };
      }),
      colorList: [],
      words: ['오', '늘', '은', '무', '엇', '을', '먹', '을', '까'],
      id: 0,
      selectedStore: '꽝',
      selectedImage: '꽝',
      randomArr: [],
      randomImg: [],
      randomName: [],
    };
  },
  components: {
    FireWorks,
  },
  methods: {
    shuffle() {
      this.numberOfGridColumn();
      const randomSection = document.querySelector('.random__border__section');
      randomSection.style.fontSize = '1rem';
      this.words = [
        'YOGOMOGO',
        'YOGOMOGO',
        'YOGOMOGO',
        'YOGOMOGO',
        'YOGOMOGO',
        'YOGOMOGO',
        'YOGOMOGO',
        'YOGOMOGO',
        'YOGOMOGO',
      ];
      this.cells = _.shuffle(this.cells);
    },
    numberOfGridColumn() {
      const randomContainer = document.querySelector('.random__container');
      const arrlength = this.cells.length;
      if (this.colorList.length === 0) {
        for (let i = 0; i < arrlength; i++) {
          this.randomColor();
        }
      }
      randomContainer.style.gridTemplateColumns = `repeat(${Math.floor(Math.sqrt(arrlength))}, 1fr)`;
    },
    randomColor() {
      // random color generator
      let colorCode = Math.floor(Math.random() * 16777215).toString(16);
      this.colorList.push(colorCode);
    },
    selectedId(id) {
      if (id < this.randomArr.length) {
        this.id = this.randomArr[id];
        this.selectedImage = this.randomImg[id];
        this.selectedStore = this.randomName[id];
      } else {
        this.selectedStore = '꽝';
      }
    },
    moveDetail() {
      this.$router.push({
        name: 'GroupPopUP',
        params: { id: this.id, from: 'recommend' },
      });
    },
    moveToBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.numberOfGridColumn();
    init();
  },
  created() {
    this.randomArr = this.$router.history.current.params.randomArr;
    this.randomImg = this.$router.history.current.params.randomImg;
    this.randomName = this.$router.history.current.params.randomName;
  },
};
</script>
